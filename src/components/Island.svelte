<script lang="ts">
    interface Event {
        time: string;
        title: string;
        description?: string;
    }

    interface Content {
        title: string;
        description: string;
        events: Event[];
    }

    interface Props {
        title?: string;
        description?: string;
        paragraph?: string;
        content?: Content;
    }

    let {
        title = "Island Title",
        description = "Island Description",
        paragraph = "Island Paragraph",
        content,
    }: Props = $props();

    let isFullscreen = $state(false);

    // Use content prop if provided, otherwise fallback to individual props
    const displayTitle = $derived(content?.title ?? title);
    const displayDescription = $derived(content?.description ?? description);
    const displayEvents = $derived(content?.events ?? []);

    function toggleFullscreen() {
        isFullscreen = true;
    }

    function closeFullscreen() {
        isFullscreen = false;
    }

    // Handle keyboard events for accessibility
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            closeFullscreen();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
    class="w-full h-fit island flex flex-col justify-between backdrop-blur-xl p-4 sm:p-6 lg:p-10 border-black border-2 border-solid transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl font-sans gap-10"
>
    <div class="island-header">
        <h2
            class="island-title text-xl sm:text-2xl lg:text-4xl font-sans font-bold transition-colors duration-300"
        >
            {displayTitle}
        </h2>
    </div>
    <div class="island-content">
        <p
            class="island-description text-sm sm:text-base md:text-2xl font-sans transition-all duration-300"
        >
            {displayDescription}
        </p>
    </div>

    <!-- Brutalist Transparent Button -->
    <div class="island-footer">
        <button
            onclick={toggleFullscreen}
            class="brutalist-btn bg-transparent border-4 border-black text-black font-black text-lg sm:text-xl px-6 py-3 uppercase tracking-wider transition-all duration-200 hover:bg-black hover:text-white active:scale-95 transform hover:scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
            SCOPRI
        </button>
    </div>
</div>

<!-- Fullscreen Modal -->
{#if isFullscreen}
    <div
        class="fixed inset-0 z-50 bg-white backdrop-blur-xl overflow-y-auto"
        onclick={closeFullscreen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabindex="-1"
    >
        <!-- Close Button -->
        <button
            onclick={closeFullscreen}
            class="absolute top-4 right-4 z-60 brutalist-close bg-transparent border-4 border-black text-black font-black text-2xl w-12 h-12 flex items-center justify-center uppercase transition-all duration-200 hover:bg-black hover:text-white active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Close modal"
        >
            ×
        </button>

        <!-- Fullscreen Content -->
        <div
            class="min-h-full py-16 px-8 sm:px-12 lg:px-20 flex flex-col justify-center items-center text-center"
            onclick={(e) => e.stopPropagation()}
        >
            <h1
                id="modal-title"
                class="w-full text-4xl sm:text-6xl lg:text-8xl font-black text-black mb-8 uppercase tracking-wider text-center w-full"
            >
                {displayTitle}
            </h1>

            <p
                class="text-xl sm:text-2xl lg:text-4xl font-bold text-black mb-12 max-w-4xl leading-tight text-center w-full"
            >
                {displayDescription}
            </p>

            {#if displayEvents.length > 0}
                <div class="w-full max-w-6xl mx-auto">
                    <h2
                        class="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-8 uppercase tracking-wider"
                    >
                        Programma
                    </h2>
                    <div class="space-y-6">
                        {#each displayEvents as event}
                            <div
                                class="border-l-4 border-black pl-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div
                                    class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2"
                                >
                                    <span
                                        class="text-lg sm:text-xl font-black text-black bg-yellow-200 px-3 py-1 border-2 border-black uppercase tracking-wider"
                                    >
                                        {event.time}
                                    </span>
                                    <h3
                                        class="text-xl sm:text-2xl lg:text-3xl font-bold text-black"
                                    >
                                        {event.title}
                                    </h3>
                                </div>
                                {#if event.description}
                                    <p
                                        class="text-base sm:text-lg lg:text-xl text-black leading-relaxed"
                                    >
                                        {event.description}
                                    </p>
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>
            {:else}
                <div
                    class="text-lg sm:text-xl lg:text-2xl text-black max-w-6xl leading-relaxed text-center w-full"
                >
                    {paragraph}
                </div>
            {/if}
        </div>
    </div>
{/if}
