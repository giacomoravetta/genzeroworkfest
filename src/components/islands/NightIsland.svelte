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
    class="night-island relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 p-8 h-full min-h-[400px] cursor-pointer transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/30"
    style="transform: scale({$scale}); filter: brightness({$brightness});"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:click={handleClick}
    role="button"
    tabindex="0"
>
    <!-- Decorative elements -->
    <div
        class="absolute top-8 right-8 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl"
    ></div>
    <div
        class="absolute bottom-16 left-16 w-12 h-12 bg-indigo-400/30 rounded-full blur-lg"
    ></div>
    <div
        class="absolute top-1/3 left-1/4 w-6 h-6 bg-purple-400/40 rounded-full blur-sm"
    ></div>

    <!-- Moon and stars -->
    <div class="absolute top-6 right-6">
        <div class="relative">
            <!-- Moon -->
            <div
                class="w-10 h-10 bg-blue-100 rounded-full relative overflow-hidden transition-transform duration-500"
                class:rotate-12={hovered}
            >
                <div
                    class="absolute top-1 right-1 w-2 h-2 bg-slate-300 rounded-full opacity-60"
                ></div>
                <div
                    class="absolute bottom-2 left-2 w-1 h-1 bg-slate-300 rounded-full opacity-40"
                ></div>
            </div>

            <!-- Stars around moon -->
            <div
                class="absolute -top-2 -left-3 w-1 h-1 bg-blue-200 rounded-full animate-twinkle"
            ></div>
            <div
                class="absolute -bottom-1 -right-4 w-1 h-1 bg-blue-200 rounded-full animate-twinkle"
                style="animation-delay: 0.5s;"
            ></div>
            <div
                class="absolute top-3 -left-6 w-0.5 h-0.5 bg-blue-200 rounded-full animate-twinkle"
                style="animation-delay: 1s;"
            ></div>
        </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col justify-between">
        <div>
            <h2 class="text-3xl font-bold text-blue-100 mb-4">Night</h2>
            <p class="text-blue-200 text-lg leading-relaxed mb-6">
                Embrace the quiet hours of deep work. Night sessions offer
                focused thinking, strategic planning, and the space for
                breakthrough innovations.
            </p>
        </div>

        <div class="space-y-4">
            <div class="flex items-center space-x-3">
                <div
                    class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                ></div>
                <span class="text-blue-200 font-medium">Deep Work Sessions</span
                >
            </div>
            <div class="flex items-center space-x-3">
                <div
                    class="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
                    style="animation-delay: 0.5s;"
                ></div>
                <span class="text-blue-200 font-medium">Strategy Planning</span>
            </div>
            <div class="flex items-center space-x-3">
                <div
                    class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                    style="animation-delay: 1s;"
                ></div>
                <span class="text-blue-200 font-medium">Innovation Labs</span>
            </div>
        </div>

        <!-- Time indicator -->
        <div class="flex justify-between items-end">
            <div class="text-blue-300 font-semibold text-sm">22:00 - 06:00</div>
            <div class="opacity-60 hover:opacity-100 transition-opacity">
                <svg
                    class="w-6 h-6 text-blue-300"
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

    <!-- Constellation effect -->
    {#if mounted}
        <div class="absolute inset-0 pointer-events-none">
            <!-- Stars -->
            {#each Array(12) as _, i}
                <div
                    class="absolute rounded-full animate-twinkle"
                    class:w-1={i % 3 === 0}
                    class:h-1={i % 3 === 0}
                    class:w-0.5={i % 3 === 1}
                    class:h-0.5={i % 3 === 1}
                    class:w-px={i % 3 === 2}
                    class:h-px={i % 3 === 2}
                    class:bg-blue-200={i % 4 === 0}
                    class:bg-indigo-200={i % 4 === 1}
                    class:bg-purple-200={i % 4 === 2}
                    class:bg-slate-200={i % 4 === 3}
                    style="
            left: {15 + i * 7}%;
            top: {20 + (i % 5) * 15}%;
            animation-delay: {i * 0.3}s;
            animation-duration: {2 + i * 0.2}s;
          "
                ></div>
            {/each}

            <!-- Shooting star -->
            <div
                class="absolute top-1/4 left-1/4 w-px h-px bg-blue-300 animate-shooting-star opacity-0"
            ></div>
        </div>
    {/if}

    <!-- Subtle vignette effect -->
    <div
        class="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-900/20 pointer-events-none"
    ></div>
</div>

<style>
    @keyframes twinkle {
        0%,
        100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
    }

    @keyframes shooting-star {
        0% {
            opacity: 0;
            transform: translateX(-100px) translateY(100px);
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateX(300px) translateY(-300px);
        }
    }

    .animate-twinkle {
        animation: twinkle 2s ease-in-out infinite;
    }

    .animate-shooting-star {
        animation: shooting-star 3s ease-out infinite;
        animation-delay: 2s;
    }

    .bg-radial-gradient {
        background: radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 70%,
            rgba(15, 23, 42, 0.2) 100%
        );
    }
</style>
