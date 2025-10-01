// Utility per fetchare dati da Notion usando l'API versione 2025-09-03
// Questa versione supporta i nuovi "data sources"

export interface Event {
  time: string;
  title: string;
  description: string;
  tagline?: string;
  credits?: string;
  booking?: boolean;
  bookingLink?: string;
  section?: string;
  guests?: string;
  type?: string;
}

export interface ProgramSection {
  title: string;
  description: string;
  events: Event[];
}

// Funzione per estrarre testo da rich text di Notion
function extractText(richText: any): string {
  if (!richText) return "";
  if (Array.isArray(richText)) {
    return richText.map((text: any) => text.plain_text || "").join("");
  }
  return "";
}

// Funzione per pulire l'ID del database (rimuove parametri query come ?v=...)
function cleanDatabaseId(id: string): string {
  // Rimuovi tutto dopo ? (parametri query)
  const cleanId = id.split("?")[0].trim();
  // Rimuovi trattini se presenti
  return cleanId.replace(/-/g, "");
}

// Funzione per fetchare i dati del programma da Notion
export async function getProgramData(): Promise<ProgramSection[]> {
  try {
    const apiKey = import.meta.env.NOTION_API_KEY;
    let databaseId = import.meta.env.NOTION_DATABASE_ID;

    if (!apiKey || !databaseId) {
      console.warn(
        "Notion non configurato (NOTION_API_KEY o NOTION_DATABASE_ID mancanti), uso dati di fallback",
      );
      return [];
    }

    // Pulisci l'ID del database da eventuali parametri query
    databaseId = cleanDatabaseId(databaseId);
    console.log("🔍 Database ID pulito:", databaseId);

    // Step 1: Recupera il database per ottenere i data sources
    const databaseResponse = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2025-09-03",
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (!databaseResponse.ok) {
      const errorData = await databaseResponse.json();
      console.error("❌ Errore nel recupero database:", errorData);
      return [];
    }

    const database = await databaseResponse.json();

    // Step 2: Ottieni il primo data source (per database classici ce n'è solo uno)
    const dataSources = database.data_sources || [];

    if (dataSources.length === 0) {
      console.error("❌ Nessun data source trovato nel database");
      return [];
    }

    const dataSourceId = dataSources[0].id;
    console.log("✅ Data source ID:", dataSourceId);

    // Step 3: Query del data source per ottenere i record
    const queryResponse = await fetch(
      `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2025-09-03",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sorts: [
            {
              property: "Time",
              direction: "ascending",
            },
          ],
        }),
        cache: "no-store",
      },
    );

    if (!queryResponse.ok) {
      const errorData = await queryResponse.json();
      console.error("❌ Errore nella query del data source:", errorData);
      return [];
    }

    const data = await queryResponse.json();
    console.log("✅ Record trovati:", data.results?.length || 0);

    // Mappa per raggruppare eventi per sezione
    const sectionsMap = new Map<string, Event[]>();

    for (const page of data.results) {
      if (!page.properties) continue;

      const properties = page.properties;

      // Estrai le proprietà dell'evento
      const name =
        properties.Name?.type === "title"
          ? extractText(properties.Name.title)
          : "";

      const tagline =
        properties.Tagline?.type === "rich_text"
          ? extractText(properties.Tagline.rich_text)
          : "";

      const description =
        properties.Description?.type === "rich_text"
          ? extractText(properties.Description.rich_text)
          : "";

      const time =
        properties.Time?.type === "rich_text"
          ? extractText(properties.Time.rich_text)
          : "";

      const credits =
        properties.Credits?.type === "rich_text"
          ? extractText(properties.Credits.rich_text)
          : "";

      const booking =
        properties.Booking?.type === "checkbox"
          ? properties.Booking.checkbox === true
          : false;

      const bookingLink =
        properties.BookingLink?.type === "url"
          ? properties.BookingLink.url || ""
          : "";

      const guests =
        properties.Guests?.type === "rich_text"
          ? extractText(properties.Guests.rich_text)
          : "";

      const eventType =
        properties.Type?.type === "select"
          ? properties.Type.select?.name || ""
          : "";

      // Determina la sezione
      let section = "Mattina"; // default

      // Se esiste una colonna Section nel database, usala
      if (properties.Section?.type === "select") {
        const sectionValue = properties.Section.select?.name || "";

        // Mappa i valori inglesi ai valori italiani
        if (sectionValue === "Morning") {
          section = "Mattina";
        } else if (sectionValue === "Afternoon") {
          section = "Pomeriggio";
        } else if (sectionValue === "Night") {
          section = "Sera";
        } else if (sectionValue === "All Day") {
          section = "Tutto il giorno";
        } else {
          section = sectionValue || "Mattina";
        }
      } else {
        // Altrimenti, determina la sezione dall'orario
        const timeStr = time.toLowerCase();
        if (
          timeStr.includes("pomeriggio") ||
          timeStr.startsWith("14") ||
          timeStr.startsWith("15") ||
          timeStr.startsWith("16") ||
          timeStr.startsWith("17") ||
          timeStr.startsWith("18")
        ) {
          section = "Pomeriggio";
        } else if (
          timeStr.includes("sera") ||
          timeStr.includes("serata") ||
          timeStr.startsWith("19") ||
          timeStr.startsWith("20") ||
          timeStr.startsWith("21") ||
          timeStr.startsWith("22") ||
          timeStr.startsWith("23")
        ) {
          section = "Sera";
        }
      }

      // Crea l'oggetto evento
      const event: Event = {
        time,
        title: name,
        description: description || tagline,
        tagline,
        credits,
        booking,
        bookingLink,
        section: properties.Section?.select?.name || undefined,
        guests,
        type: eventType,
      };

      // Aggiungi l'evento alla sezione corrispondente
      if (!sectionsMap.has(section)) {
        sectionsMap.set(section, []);
      }
      sectionsMap.get(section)!.push(event);
    }

    // Converti la mappa in array di sezioni
    const sections: ProgramSection[] = [];

    // Definisci l'ordine e le descrizioni delle sezioni
    const sectionConfig = [
      {
        title: "Mattina",
        description:
          "Vogliamo sfidare questa società che ci vuole solo produttori. Tra giochi, creatività e socializzazione, ci prendiamo il tempo di essere umani: non macchine, non numeri, non ingranaggi. Riprendiamoci il nostro tempo.",
      },
      {
        title: "Pomeriggio",
        description:
          "Il momento perfetto per workshop intensivi, sessioni collaborative e networking attivo. Energia e focus per portare avanti progetti concreti.",
      },
      {
        title: "Sera",
        description:
          "Finiamo la giornata come meglio sappiamo fare: mangiando, bevendo e ballando insieme.",
      },
      {
        title: "Tutto il giorno",
        description:
          "Eventi e attività che si svolgono durante tutta la giornata.",
      },
    ];

    for (const config of sectionConfig) {
      const events = sectionsMap.get(config.title) || [];
      if (events.length > 0) {
        sections.push({
          title: config.title,
          description: config.description,
          events,
        });
      }
    }

    console.log("📊 Sezioni create:", sections.length);
    sections.forEach((s) =>
      console.log(`  - ${s.title}: ${s.events.length} eventi`),
    );

    return sections;
  } catch (error) {
    console.error("❌ Errore nel fetch dei dati da Notion:", error);
    if (error instanceof Error) {
      console.error("   Messaggio:", error.message);
      console.error("   Stack:", error.stack);
    }
    return [];
  }
}
