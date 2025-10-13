<script lang="ts">
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
    let { panel }: { panel: Panel } = $props();

    let hoveredSpeaker: number | null = $state(null);
    let isCardHovered = $state(false);
</script>

<div
    class="flex flex-col border border-black backdrop-blur-2xl p-8 transition-all duration-300 ease-out"
    class:border-opacity-60={isCardHovered}
    class:shadow-lg={isCardHovered}
    class:scale-105={isCardHovered}
    onmouseenter={() => (isCardHovered = true)}
    onmouseleave={() => (isCardHovered = false)}
>
    <div class="mb-6 space-y-1">
        <div class="flex items-center gap-2 mb-2">
            <span
                class="inline-block text-xs font-semibold uppercase tracking-widest px-2 py-1 border border-black transition-all duration-300"
                class:border-opacity-60={isCardHovered}
            >
                Panel
            </span>
            <div
                class="text-sm font-semibold transition-all duration-300"
                class:translate-x-2={isCardHovered}
                class:text-opacity-100={isCardHovered}
            >
                {panel.time}
            </div>
        </div>
        <h2
            class="text-2xl font-bold mb-2 transition-all duration-300"
            class:translate-y-1={isCardHovered}
            class:tracking-wide={isCardHovered}
        >
            {panel.title}
        </h2>
        <h3
            class="text-lg transition-all duration-300"
            class:opacity-100={isCardHovered}
        >
            {panel.subtitle}
        </h3>
    </div>

    <p
        class="text-sm leading-relaxed mb-8 transition-all duration-300"
        class:opacity-100={isCardHovered}
    >
        {panel.description}
    </p>

    <div class="space-y-6">
        <h4
            class="text-sm font-semibold uppercase tracking-wider transition-all duration-300"
        >
            Relatori
        </h4>
        <div class="space-y-4">
            {#each panel.speakers as speaker, index}
                <div
                    class="flex items-start gap-4 transition-all duration-300 cursor-pointer group"
                    class:translate-x-2={hoveredSpeaker === index}
                    onmouseenter={() => (hoveredSpeaker = index)}
                    onmouseleave={() => (hoveredSpeaker = null)}
                >
                    <div
                        class="relative overflow-hidden flex-shrink-0 rounded-full"
                    >
                        <img
                            src={speaker.image}
                            alt={speaker.name}
                            class="w-16 h-16 object-cover transition-all duration-500 ease-out"
                            class:scale-110={hoveredSpeaker === index}
                            class:brightness-125={hoveredSpeaker === index}
                        />
                    </div>
                    <div class="flex-1">
                        <p
                            class="font-semibold transition-all duration-300"
                            class:tracking-wide={hoveredSpeaker === index}
                        >
                            {speaker.name}
                        </p>
                        <p
                            class="text-sm transition-all duration-300"
                            class:translate-x-1={hoveredSpeaker === index}
                            class:opacity-80={hoveredSpeaker === index}
                        >
                            {speaker.role}
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    :global(html) {
        @apply scroll-smooth;
    }
</style>
