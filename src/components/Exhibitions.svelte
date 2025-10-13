<script lang="ts">
    interface Exhibition {
        id: number;
        title: string;
        subtitle: string;
        description: string;
        time: string;
        organizedBy: string;
    }

    let exhibitions: Exhibition[] = [
        {
            id: 1,
            title: "MOSTRA FOTOGRAFICA ANPI",
            subtitle: "Memoria e resistenza",
            description:
                "A 80 anni dalla Liberazione un viaggio nella memoria collettiva attraverso una mostra fotografica e il libro \"Fuori dall'officina. La resistenza nel Saronnese.",
            time: "10:00 - 18:00",
            organizedBy: "ANPI Saronno e ANPI Caronno",
        },
        {
            id: 2,
            title: "MOSTRA HEART OF GAZA",
            subtitle: "La ferita di una terra raccontata dai suoi figli",
            description:
                "Disegni e storie dalla Palestina. Un viaggio che racconta la vita, la resistenza e la dignità di un popolo.",
            time: "10:00 - 18:00",
            organizedBy: "Associazione Palestina Varese",
        },
    ];

    let hoveredId: number | null = $state(null);
</script>

<section class="w-full px-4 py-8 md:px-6 md:py-12 lg:px-8">
    <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-6">
            {#each exhibitions as exhibition}
                <div
                    class="border border-black backdrop-blur-2xl p-6 md:p-8 transition-all duration-300 ease-out flex flex-col"
                    class:border-opacity-60={hoveredId === exhibition.id}
                    class:shadow-lg={hoveredId === exhibition.id}
                    class:scale-105={hoveredId === exhibition.id}
                    onmouseenter={() => (hoveredId = exhibition.id)}
                    onmouseleave={() => (hoveredId = null)}
                >
                    <div class="mb-3">
                        <span
                            class="inline-block text-xs font-semibold uppercase tracking-widest mb-4 transition-all duration-300"
                            class:opacity-100={hoveredId === exhibition.id}
                        >
                            Mostra
                        </span>
                    </div>

                    <h3
                        class="text-2xl font-bold mb-1 transition-all duration-300"
                        class:tracking-wide={hoveredId === exhibition.id}
                    >
                        {exhibition.title}
                    </h3>

                    <h4
                        class="text-lg mb-4 transition-all duration-300"
                        class:opacity-100={hoveredId === exhibition.id}
                    >
                        {exhibition.subtitle}
                    </h4>

                    <p
                        class="text-sm leading-relaxed mb-6 flex-grow transition-all duration-300"
                    >
                        {exhibition.description}
                    </p>

                    <div
                        class="space-y-2 text-sm border-t border-black/20 pt-4"
                    >
                        <div
                            class="transition-all duration-300"
                            class:translate-x-1={hoveredId === exhibition.id}
                        >
                            <span class="font-semibold">Orario:</span>
                            <span class="opacity-80"> {exhibition.time}</span>
                        </div>

                        <div
                            class="transition-all duration-300"
                            class:translate-x-1={hoveredId === exhibition.id}
                        >
                            <span class="font-semibold">A cura di:</span>
                            <span class="opacity-80">
                                {exhibition.organizedBy}</span
                            >
                        </div>
                    </div>
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
