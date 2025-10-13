<script lang="ts">
    import PanelCard from "./PanelCard.svelte";

    interface Speaker {
        name: string;
        role: string;
        image: string;
    }

    interface Panel {
        id: number;
        title: string;
        subtitle: string;
        description: string;
        time: string;
        speakers: Speaker[];
    }

    let panels: Panel[] = [
        {
            id: 1,
            title: "LA SOCIETÀ CHE NON TACE",
            subtitle: "Come rendere il lavoro un antidoto alla criminalità?",
            description:
                "Esploreremo l'economia sommersa con cui la mafia soffoca i nostri territori. Attraverso testimonianze dirette, racconteremo come sia possibile rigenerare lavoro e comunità: dai patrimoni confiscati possono nascere nuove opportunità, segni concreti di un'economia che torna a essere bene comune.",
            time: "15:00",
            speakers: [
                {
                    name: "Sandro Ruotolo",
                    role: "Giornalista ed Europarlamentare dal 2024",
                    image: "/Sandro_Ruotolo.png",
                },
                {
                    name: "Cristina Seveso",
                    role: 'Presidente della cooperativa "Il grillo parlante"',
                    image: "/Cristina_Seveso.png",
                },
                {
                    name: "Gabriele Ambrosio",
                    role: "Attivista di Libera",
                    image: "/Gabriele_Ambrosio.png",
                },
            ],
        },
        {
            id: 2,
            title: "CARA ITALIA, TVB",
            subtitle: "Come si costruisce davvero l'integrazione?",
            description:
                "Ci confronteremo con le sfide quotidiane dei giovani in Italia privi di cittadinanza, specialmente quando si affacciano al mondo del lavoro. Testimonianze dirette e momenti di riflessione per esplorare ostacoli reali e opportunità concrete: come costruire insieme una società più inclusiva?",
            time: "16:30",
            speakers: [
                {
                    name: "Sonny Olumati",
                    role: "Attivista per i diritti umani",
                    image: "/Sonny_Olumati.png",
                },
                {
                    name: "Remon Karam",
                    role: "Attivista per i diritti umani",
                    image: "/Remon_Karam.png",
                },
            ],
        },
        {
            id: 3,
            title: "IL MARE DI GAZA",
            subtitle: "L'operazione della Global Sumud Flottila",
            description:
                "Un racconto di coraggio e solidarietà dal mare. Scopriremo come la Global Sumud Flottila opera per portare aiuti umanitari e sensibilizzare la comunità internazionale. Testimonianze dirette di chi ha partecipato alle missioni, tra sfide, speranza e l'importanza della mobilitazione civile per i diritti umani.",
            time: "17:45",
            speakers: [
                {
                    name: "Paolo Romano",
                    role: "Coordinatore Global Sumud Flottila",
                    image: "/Paolo_Romano.jpg",
                },
                {
                    name: "Benedetta Scuderi",
                    role: "Attivista Global Sumud Flottila",
                    image: "/Benedetta_Scuderi.jpg",
                },
            ],
        },
    ];
</script>

<section class="panels w-full px-4 py-8 md:px-6 md:py-12 lg:px-8">
    <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6 mx-auto"
    >
        {#each panels as panel}
            <PanelCard {panel} />
        {/each}
    </div>
</section>

<style>
    :global(html) {
        @apply scroll-smooth;
    }
</style>
