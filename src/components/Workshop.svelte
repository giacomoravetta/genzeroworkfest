<script lang="ts">
    interface Person {
        name: string;
        role: string;
        handle?: string;
    }

    interface Activity {
        id: number;
        type: "workshop" | "interactive";
        title: string;
        subtitle: string;
        description: string;
        time: string;
        organizedBy?: string;
        with?: Person[];
        bookingRequired: boolean;
        bookingLink?: string;
        status?: "active" | "coming";
    }

    let activities: Activity[] = [
        {
            id: 1,
            type: "workshop",
            title: "YOGA",
            subtitle: "Ferma il tempo, muovi il corpo",
            description:
                "Basta pensare sempre alla produttività. Fermati, respira e riscopri il piacere del movimento consapevole. Una pratica per riconnetterti con te stesso, lontano dalla frenesia quotidiana.",
            time: "11:00",
            with: [
                {
                    name: "Daniela Franceschinelli",
                    // role: "<a href='www.giacomoravetta.com'>@essenzialmenteyoga</a>",
                },
            ],
            organizedBy: "Kamayoga",
            bookingRequired: true,
            bookingLink: "https://tally.so/r/w4eBJX",
        },
        {
            id: 2,
            type: "workshop",
            title: "DUNGEONS & DRAGONS",
            subtitle: "Gioco di ruolo da tavolo collaborativo",
            description:
                "Lasciati trasportare in un'avventura epica dove ogni scelta conta e l'immaginazione non ha confini. Collabora con altri giocatori per superare sfide, risolvere enigmi e scrivere la vostra storia.",
            time: "10:00 - 12:30",
            with: [
                {
                    name: "Samuele Brambilla",
                    role: "",
                },
            ],
            bookingRequired: true,
            bookingLink: "https://tally.so/r/nrzB8v",
        },
        {
            id: 3,
            type: "workshop",
            title: "CUCITO E UNCINETTO",
            subtitle: "Il tempo fatto a mano",
            description:
                "Riscopri il piacere di creare qualcosa con le tue mani. Punto dopo punto, ritrova il valore della lentezza e del fare artigiano. Porta a casa un oggetto unico, nato dalla tua creatività e pazienza.",
            time: "10:00 - 12:30",
            organizedBy: "Isola del Riuso",
            bookingRequired: false,
        },
        {
            id: 4,
            type: "workshop",
            title: "DISEGNO CREATIVO",
            subtitle: "Traccia la tua visione",
            description:
                "Ritrova la tua creatività attraverso il disegno. Lascia che la matita parli per te, senza giudizi, senza performance: solo espressione pura. Tema del laboratorio: creare insieme decorazioni per abbellire gli spazi.",
            time: "10:00 - 12:30",
            bookingRequired: false,
        },
        {
            id: 5,
            type: "workshop",
            title: "GIOCHI DA TAVOLO",
            subtitle: "Giocare è una cosa seria",
            description:
                "Sfide strategiche, risate e condivisione. Uno spazio libero dove ritrovare il piacere del gioco senza schermi, dove l'unica notifica che conta è il tuo turno.",
            time: "10:00 - 12:30",
            bookingRequired: false,
        },
        {
            id: 6,
            type: "workshop",
            title: "WORKSHOP EMERGENCY",
            subtitle: "YEP Young Emergency People",
            description:
                "Destinazione utopia YEP, la comunità di giovani volontari under 30 di EMERGENCY, ti invita a prendere parte a un viaggio. Per farlo non serve un biglietto, basta chiudere gli occhi, fermare l\’orologio una manciata di istanti e fare un salto in una pagina bianca con una valigia vuota! È così che immaginiamo lo stand di EMERGENCY al Generazione Zero Workfest festival 2025, un viaggio da intraprendere insieme, dentro se stessi per riuscire a comprendere l’altro, tra domande empatia ed immaginazione",
            time: "10:00 - 12:30",
            bookingRequired: false,
        },
        {
            id: 7,
            type: "interactive",
            title: "QUIZ INTERATTIVO",
            subtitle: "Metti alla prova le tue conoscenze",
            description:
                "Un quiz per scoprire quanto ne sai davvero su diritti, inclusione e diversità. Divertente, educativo e sorprendente.",
            time: "10:00 - 18:00",
            organizedBy: "Agedo",
            bookingRequired: false,
        },
    ];

    let hoveredId: number | null = $state(null);
</script>

<section class="w-full px-4 py-8 md:px-6 md:py-12 lg:px-8">
    <div class="max-w-7xl mx-auto">
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6"
        >
            {#each activities as activity}
                <div
                    class="border border-black backdrop-blur-2xl p-6 transition-all duration-300 ease-out flex flex-col"
                    class:border-opacity-60={hoveredId === activity.id}
                    class:shadow-lg={hoveredId === activity.id}
                    class:scale-105={hoveredId === activity.id}
                    onmouseenter={() => (hoveredId = activity.id)}
                    onmouseleave={() => (hoveredId = null)}
                >
                    <div class="mb-3">
                        <span
                            class="inline-block text-xs font-semibold uppercase tracking-widest mb-3 transition-all duration-300"
                            class:opacity-100={hoveredId === activity.id}
                        >
                            {#if activity.type === "workshop"}
                                Workshop
                            {:else}
                                Interattivo
                            {/if}
                        </span>
                        {#if activity.status === "coming"}
                            <div
                                class="text-xs font-semibold uppercase tracking-widest opacity-60"
                            >
                                In allestimento
                            </div>
                        {/if}
                    </div>

                    <h3
                        class="text-lg font-bold mb-1 transition-all duration-300"
                        class:tracking-wide={hoveredId === activity.id}
                    >
                        {activity.title}
                    </h3>

                    <h4
                        class="text-sm mb-3 transition-all duration-300"
                        class:opacity-100={hoveredId === activity.id}
                    >
                        {activity.subtitle}
                    </h4>

                    {#if activity.description}
                        <p
                            class="text-xs leading-relaxed mb-4 flex-grow transition-all duration-300"
                        >
                            {activity.description}
                        </p>
                    {/if}

                    <div
                        class="space-y-1 text-xs border-t border-black/20 pt-3 mb-4"
                    >
                        <div
                            class="transition-all duration-300"
                            class:translate-x-1={hoveredId === activity.id}
                        >
                            <span class="font-semibold">Orario:</span>
                            <span class="opacity-80"> {activity.time}</span>
                        </div>

                        {#if activity.with && activity.with.length > 0}
                            <div
                                class="transition-all duration-300"
                                class:translate-x-1={hoveredId === activity.id}
                            >
                                <span class="font-semibold">Con:</span>
                                <span class="opacity-80">
                                    {#each activity.with as person, index}
                                        {person.name}{#if person.role}
                                            ({person.role})
                                        {/if}{#if index < activity.with.length - 1},
                                        {/if}
                                    {/each}
                                </span>
                            </div>
                        {/if}

                        {#if activity.organizedBy}
                            <div
                                class="transition-all duration-300"
                                class:translate-x-1={hoveredId === activity.id}
                            >
                                <span class="font-semibold">A cura di:</span>
                                <span class="opacity-80">
                                    {activity.organizedBy}</span
                                >
                            </div>
                        {/if}
                    </div>

                    {#if activity.bookingRequired && activity.bookingLink}
                        <a
                            href={activity.bookingLink}
                            class="w-full text-center border border-black px-3 py-2 font-semibold text-xs transition-all duration-300 ease-out hover:bg-black hover:text-white"
                        >
                            Prenota
                        </a>
                    {:else if activity.bookingRequired}
                        <div
                            class="w-full text-center border border-black px-3 py-2 font-semibold text-xs opacity-50 cursor-not-allowed"
                        >
                            Prenota
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    :global(html) {
        @apply scroll-smooth;
    }
</style>
