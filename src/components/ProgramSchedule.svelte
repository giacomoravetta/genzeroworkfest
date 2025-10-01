<script lang="ts">
    import { onMount } from "svelte";
    import Island from "./Island.svelte";
    import type { ProgramSection } from "../lib/notion";

    // Props: initial data (empty for client-side only fetching)
    let { programSections = [] }: { programSections?: ProgramSection[] } =
        $props();

    let isLoading = $state(true);
    let error = $state<string | null>(null);

    // Dati di fallback se Notion non è configurato o fallisce
    const fallbackData: ProgramSection[] = [
        {
            title: "Mattina",
            description:
                "Vogliamo sfidare questa società che ci vuole solo produttori. Tra giochi, creatività e socializzazione, ci prendiamo il tempo di essere umani: non macchine, non numeri, non ingranaggi. Riprendiamoci il nostro tempo.",
            events: [
                {
                    time: "10:00 - 12:30",
                    title: "DUNGEONS & DRAGONS",
                    description:
                        "Gioco di ruolo da tavolo collaborativo. Lasciati trasportare in un'avventura epica dove ogni scelta conta e l'immaginazione non ha confini. Con: Samuele Zambon - Su prenotazione",
                },
                {
                    time: "10:00 - 12:30",
                    title: "CUCITO E UNCINETTO",
                    description:
                        "Riscopri il piacere di creare qualcosa con le tue mani. Con: Benny Garegnani, Alessia Manzo - A cura di: Isola del Riuso",
                },
                {
                    time: "10:00 - 12:30",
                    title: "DISEGNO CREATIVO",
                    description:
                        "Ritrova la tua creatività attraverso il disegno. Tema: creare insieme decorazioni per abbellire gli spazi. Con: Giulia Luppino",
                },
                {
                    time: "10:00 - 12:30",
                    title: "GIOCHI DA TAVOLO",
                    description:
                        "Sfide strategiche, risate e condivisione. Uno spazio libero dove ritrovare il piacere del gioco senza schermi.",
                },
                {
                    time: "11:00",
                    title: "YOGA",
                    description:
                        "Ferma il tempo, muovi il corpo. Una pratica per riconnetterti con te stesso. Con: Daniela Franceschinelli - Su prenotazione",
                },
                {
                    time: "10:00 - 18:00",
                    title: "STAND E MOSTRE",
                    description:
                        "Mostra ANPI, Heart of Gaza, Quiz interattivo Agedo, Stand informativi: CGIL, Comunità Islamica, Emergency, Amnesty International e altri",
                },
            ],
        },
        {
            title: "Pomeriggio",
            description:
                "Il momento perfetto per workshop intensivi, sessioni collaborative e networking attivo. Energia e focus per portare avanti progetti concreti.",
            events: [
                {
                    time: "Da definire",
                    title: "LA SOCIETÀ CHE NON TACE",
                    description:
                        "Come rendere il lavoro un antidoto alla criminalità? Esploreremo l'economia sommersa con cui la mafia soffoca i nostri territori attraverso testimonianze dirette.",
                },
                {
                    time: "Da definire",
                    title: "CARA ITALIA, TVB",
                    description:
                        "Come si costruisce davvero l'integrazione? Ci confronteremo con le sfide quotidiane dei giovani in Italia privi di cittadinanza nel mondo del lavoro.",
                },
                {
                    time: "10:00 - 18:00",
                    title: "STAND E MOSTRE (continua)",
                    description:
                        "Proseguono le attività mattutine: mostre, quiz interattivi e stand informativi",
                },
            ],
        },
        {
            title: "Sera",
            description:
                "Finiamo la giornata come meglio sappiamo fare: mangiando, bevendo e ballando insieme.",
            events: [
                {
                    time: "Da definire",
                    title: "LA FESTA È SERVITA",
                    description:
                        "Chiudiamo come meglio sappiamo fare: mangiando, bevendo e ballando insieme.",
                },
                {
                    time: "Tutta la sera",
                    title: "MUSICA DAL VIVO",
                    description:
                        "Artisti locali e performance dal vivo per accompagnare la serata",
                },
                {
                    time: "Tutta la sera",
                    title: "DJ SET",
                    description: "Musica per ballare e divertirsi insieme",
                },
                {
                    time: "Tutta la sera",
                    title: "BEER PONG",
                    description: "Sfide amichevoli e tanto divertimento",
                },
                {
                    time: "Tutta la sera",
                    title: "SORPRESE",
                    description:
                        "E tante altre attività a sorpresa per concludere al meglio la giornata!",
                },
            ],
        },
    ];

    // Start with fallback data, will be replaced by fresh data from API
    let displayData = $state(fallbackData);

    // Fetch data directly on mount
    onMount(async () => {
        console.log("🎯 [SVELTE] Component mounted, fetching data...");

        try {
            const timestamp = new Date().getTime();
            const url = `/api/program-data?t=${timestamp}`;

            const response = await fetch(url, {
                cache: "no-store",
                headers: {
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("📥 [SVELTE] Data received:", {
                isArray: Array.isArray(data),
                length: data?.length || 0,
            });

            if (data && Array.isArray(data) && data.length > 0) {
                displayData = data;
                console.log(
                    "✅ [SVELTE] Program data loaded! Sections:",
                    data.length,
                );
                console.log(
                    "✅ [SVELTE] First section:",
                    data[0]?.title,
                    "Events:",
                    data[0]?.events?.length,
                );
                error = null;
            } else {
                console.warn("⚠️ [SVELTE] No data received, using fallback");
                error = "No data available";
            }
        } catch (err) {
            console.error("❌ [SVELTE] Failed to fetch program data:", err);
            error = err instanceof Error ? err.message : "Failed to load data";
            // Keep fallback data on error
        } finally {
            isLoading = false;
        }
    });
</script>

<section
    class="relative flex flex-col justify-center items-start w-full h-auto px-4 sm:px-6 lg:px-40 pt-8 sm:pt-12 lg:pt-16"
>
    <div class="h-[120dvh]"></div>
    <div id="program" class="flex flex-col w-full h-full">
        <h1
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl backdrop-blur-xl w-fit border-2 border-black p-3 sm:p-4 lg:p-5 mb-8 sm:mb-10 lg:mb-5"
        >
            Programma
        </h1>

        {#if isLoading}
            <div class="flex justify-center items-center py-12">
                <div class="text-center">
                    <div
                        class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"
                    ></div>
                    <p class="mt-4 text-gray-600">Caricamento programma...</p>
                </div>
            </div>
        {:else if error}
            <div
                class="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8"
            >
                <p class="text-yellow-800">
                    ⚠️ Impossibile caricare i dati aggiornati. Mostrando
                    programma di base.
                </p>
            </div>
            <div class="flex flex-col gap-8 sm:gap-10 lg:gap-5">
                {#each displayData as section}
                    <div class="flex w-full lg:basis-1/3 h-fit">
                        <Island
                            content={{
                                title: section.title,
                                description: section.description,
                                events: section.events,
                            }}
                        />
                    </div>
                {/each}
            </div>
        {:else}
            <div class="flex flex-col gap-8 sm:gap-10 lg:gap-5">
                {#each displayData as section}
                    <div class="flex w-full lg:basis-1/3 h-fit">
                        <Island
                            content={{
                                title: section.title,
                                description: section.description,
                                events: section.events,
                            }}
                        />
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</section>
