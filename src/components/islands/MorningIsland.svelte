<script>
    import { onMount } from "svelte";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    let mounted = false;
    let hovered = false;

    const scale = tweened(1, {
        duration: 300,
        easing: cubicOut,
    });

    const brightness = tweened(1, {
        duration: 400,
        easing: cubicOut,
    });

    onMount(() => {
        mounted = true;
    });

    function handleMouseEnter() {
        hovered = true;
        scale.set(1.02);
        brightness.set(1.1);
    }

    function handleMouseLeave() {
        hovered = false;
        scale.set(1);
        brightness.set(1);
    }

    function handleClick() {
        // Add click animation
        scale.set(0.98);
        setTimeout(() => scale.set(hovered ? 1.02 : 1), 150);
    }
</script>

<div
    class="morning-island relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-200 p-8 h-full min-h-[400px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl hover:shadow-orange-200/50"
    style="transform: scale({$scale}); filter: brightness({$brightness});"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:click={handleClick}
    role="button"
    tabindex="0"
>
    <!-- Decorative elements -->
    <div
        class="absolute top-4 right-4 w-16 h-16 bg-yellow-300/30 rounded-full blur-xl"
    ></div>
    <div
        class="absolute bottom-8 left-8 w-12 h-12 bg-orange-300/40 rounded-full blur-lg"
    ></div>

    <!-- Sun icon -->
    <div class="absolute top-6 right-6">
        <svg
            class="w-8 h-8 text-yellow-500 transition-transform duration-500"
            class:rotate-180={hovered}
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
            />
        </svg>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col justify-between">
        <div>
            <h2 class="text-3xl font-bold text-amber-900 mb-4">Morning</h2>
            <p class="text-amber-800 text-lg leading-relaxed mb-6">
                Start your day with inspiration. Morning sessions focus on
                creativity, fresh perspectives, and setting the tone for
                productive work.
            </p>
        </div>

        <div class="space-y-4">
            <div class="flex items-center space-x-3">
                <div
                    class="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
                ></div>
                <span class="text-amber-700 font-medium">Creative Workshop</span
                >
            </div>
            <div class="flex items-center space-x-3">
                <div
                    class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                    style="animation-delay: 0.5s;"
                ></div>
                <span class="text-amber-700 font-medium">Networking Coffee</span
                >
            </div>
            <div class="flex items-center space-x-3">
                <div
                    class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"
                    style="animation-delay: 1s;"
                ></div>
                <span class="text-amber-700 font-medium">Keynote Talks</span>
            </div>
        </div>

        <!-- Time indicator -->
        <div class="flex justify-between items-end">
            <div class="text-amber-600 font-semibold text-sm">
                06:00 - 12:00
            </div>
            <div class="opacity-60 hover:opacity-100 transition-opacity">
                <svg
                    class="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </div>
        </div>
    </div>

    <!-- Floating particles effect -->
    {#if mounted}
        <div class="absolute inset-0 pointer-events-none">
            {#each Array(6) as _, i}
                <div
                    class="absolute w-1 h-1 bg-yellow-400/60 rounded-full animate-float"
                    style="
            left: {20 + i * 15}%;
            top: {30 + (i % 3) * 20}%;
            animation-delay: {i * 0.8}s;
            animation-duration: {3 + i * 0.5}s;
          "
                ></div>
            {/each}
        </div>
    {/if}
</div>

<style>
    @keyframes float {
        0%,
        100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-10px) rotate(180deg);
            opacity: 1;
        }
    }

    .animate-float {
        animation: float 3s ease-in-out infinite;
    }
</style>
