<script lang="ts">
    const {
        title = "Island Title",
        description = "Island Description",
        paragraph = "Island Paragraph",
    } = $props();

    let isFullscreen = $state(false);

    function toggleFullscreen() {
        isFullscreen = !isFullscreen;
    }

    function closeFullscreen() {
        isFullscreen = false;
    }
</script>

<div
    class="w-full h-full island flex flex-col justify-between backdrop-blur-xl p-4 sm:p-6 lg:p-10 border-black border-2 border-solid transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl font-sans gap-10"
>
    <div class="island-header">
        <h2
            class="island-title text-xl sm:text-2xl lg:text-4xl font-sans font-bold transition-colors duration-300"
        >
            {title}
        </h2>
    </div>
    <div class="island-content">
        <p
            class="island-description text-sm sm:text-base md:text-2xl font-sans transition-all duration-300"
        >
            {description}
        </p>
    </div>

    <!-- Brutalist Transparent Button -->
    <div class="island-footer">
        <button
            on:click={toggleFullscreen}
            class="brutalist-btn bg-transparent border-4 border-black text-black font-black text-lg sm:text-xl px-6 py-3 uppercase tracking-wider transition-all duration-200 hover:bg-black hover:text-white active:scale-95 transform hover:scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
            SCOPRI
        </button>
    </div>
</div>

<!-- Fullscreen Modal -->
{#if isFullscreen}
    <div
        class="fixed inset-0 z-50 bg-white backdrop-blur-xl flex flex-col"
        on:click={closeFullscreen}
        on:keydown={(e) => e.key === "Escape" && closeFullscreen()}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
    >
        <!-- Close Button -->
        <button
            on:click={closeFullscreen}
            class="absolute top-4 right-4 z-60 brutalist-close bg-transparent border-4 border-black text-black font-black text-2xl w-12 h-12 flex items-center justify-center uppercase transition-all duration-200 hover:bg-black hover:text-white active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
            ×
        </button>

        <!-- Fullscreen Content -->
        <div
            class="flex-1 p-8 sm:p-12 lg:p-20 flex flex-col justify-center items-center text-center"
            on:click|stopPropagation
        >
            <h1
                class="text-4xl sm:text-6xl lg:text-8xl font-black text-black mb-8 uppercase tracking-wider"
            >
                {title}
            </h1>

            <p
                class="text-xl sm:text-2xl lg:text-4xl font-bold text-black mb-12 max-w-4xl leading-tight"
            >
                {description}
            </p>

            <div
                class="text-lg sm:text-xl lg:text-2xl text-black max-w-6xl leading-relaxed"
            >
                {paragraph}
            </div>
        </div>
    </div>
{/if}
