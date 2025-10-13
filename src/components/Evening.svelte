<script lang="ts">
    interface EveningEvent {
        title: string;
        subtitle: string;
        description: string;
        program: string[];
    }

    let eveningEvent: EveningEvent = {
        title: "LA FESTA È SERVITA",
        subtitle: "Chiudiamo come meglio sappiamo fare",
        description: "Mangiando, bevendo e ballando insieme.",
        program: [
            "Musica dal vivo",
            "DJ set",
            "Beer Pong",
            "E tante sorprese!",
        ],
    };

    let isHovered = $state(false);
    let hoveredItem: number | null = $state(null);
</script>

<section class="w-full px-4 py-8 md:px-6 md:py-12 lg:px-8 b">
    <div class="w-full mx-auto">
        <div
            class="border border-black backdrop-blur-2xl p-8 md:p-12 transition-all duration-300 ease-out"
            class:border-opacity-60={isHovered}
            class:shadow-lg={isHovered}
            onmouseenter={() => (isHovered = true)}
            onmouseleave={() => (isHovered = false)}
        >
            <div class="mb-8">
                <div class="flex items-center gap-3 mb-4">
                    <span
                        class="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 border border-black transition-all duration-300"
                        class:border-opacity-60={isHovered}
                    >
                        Sera
                    </span>
                    <div
                        class="text-2xl transition-all duration-300"
                        class:translate-x-2={isHovered}
                    >
                        🎉
                    </div>
                </div>

                <h2
                    class="text-4xl md:text-5xl font-bold mb-2 transition-all duration-300"
                    class:tracking-wide={isHovered}
                    class:text-opacity-100={isHovered}
                >
                    {eveningEvent.title}
                </h2>

                <p
                    class="text-lg md:text-xl transition-all duration-300"
                    class:opacity-100={isHovered}
                    class:translate-y-1={isHovered}
                >
                    {eveningEvent.subtitle}
                </p>

                <p
                    class="text-base mt-2 transition-all duration-300"
                    class:opacity-100={isHovered}
                >
                    {eveningEvent.description}
                </p>
            </div>

            <div class="border-t border-black/20 pt-8">
                <h3
                    class="text-sm font-semibold uppercase tracking-widest mb-6 transition-all duration-300"
                    class:opacity-100={isHovered}
                >
                    Programma
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {#each eveningEvent.program as item, index}
                        <div
                            class="flex items-center gap-3 transition-all duration-300 p-3"
                        >
                            <span
                                class="text-sm md:text-base font-semibold transition-all duration-300"
                                class:tracking-wide={hoveredItem === index}
                            >
                                {item}
                            </span>
                        </div>
                    {/each}
                </div>
            </div>

            <div
                class="mt-8 text-center text-sm font-semibold opacity-60 transition-all duration-300"
                class:opacity-100={isHovered}
                class:scale-105={isHovered}
            >
                ✨ Ti aspettiamo! ✨
            </div>
        </div>
    </div>
</section>

<style>
    :global(html) {
        @apply scroll-smooth;
    }
</style>
