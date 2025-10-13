<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";

    interface EveningEvent {
        title: string;
        subtitle: string;
        description: string;
        program: string[];
    }

    let eveningEvent = $state<EveningEvent>({
        title: "LA FESTA È SERVITA",
        subtitle: "Chiudiamo come meglio sappiamo fare",
        description: "Mangiando, bevendo e ballando insieme.",
        program: [
            "Musica dal vivo",
            "DJ set",
            "Beer Pong",
            "E tante sorprese!",
        ],
    });

    let mainCardEl: HTMLElement | null = $state(null);
    let hoveredItemIndex: number | null = $state(null);

    onMount(() => {
        // Initial animations on page load
        const tl = gsap.timeline();

        // Fade in and scale the main card
        tl.fromTo(
            mainCardEl,
            { opacity: 0, scale: 0.95, y: 30 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
            },
        );

        // Badge slide and rotate
        tl.fromTo(
            ".sera-badge",
            { opacity: 0, x: -30, rotate: -10 },
            { opacity: 1, x: 0, rotate: 0, duration: 0.5, ease: "back.out" },
            0.2,
        );

        // Emoji bounce
        tl.fromTo(
            ".emoji-icon",
            { opacity: 0, scale: 0, rotate: 180 },
            {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 0.6,
                ease: "bounce.out",
            },
            0.3,
        );

        // Title
        tl.fromTo(
            ".main-title",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.4,
        );

        // Subtitle and description fade
        tl.fromTo(
            ".subtitle, .description",
            { opacity: 0, y: 15 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
            },
            0.5,
        );

        // Program title
        tl.fromTo(
            ".program-title",
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
            0.7,
        );

        // Program items staggered
        tl.fromTo(
            ".program-item",
            { opacity: 0, x: -30, y: 10 },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
            },
            0.8,
        );

        // Footer fade and scale
        tl.fromTo(
            ".footer-text",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, ease: "back.out" },
            1.2,
        );

        // Continuous emoji float animation
        gsap.to(".emoji-icon", {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        // Pulse animation for footer
        gsap.to(".footer-text", {
            opacity: 0.8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    });

    function handleCardEnter() {
        gsap.to(mainCardEl, {
            borderOpacity: 0.6,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            scale: 1.01,
            duration: 0.3,
            ease: "power2.out",
        });

        gsap.to(".main-title", {
            letterSpacing: "0.1em",
            duration: 0.3,
            ease: "power2.out",
        });

        gsap.to(".program-item", {
            x: 8,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
        });

        gsap.to(".footer-text", {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out",
        });
    }

    function handleCardLeave() {
        gsap.to(mainCardEl, {
            borderOpacity: 1,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
        });

        gsap.to(".main-title", {
            letterSpacing: "normal",
            duration: 0.3,
            ease: "power2.out",
        });

        gsap.to(".program-item", {
            x: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
        });

        gsap.to(".footer-text", {
            scale: 1,
            duration: 0.3,
            ease: "back.out",
        });
    }

    function handleItemEnter(index: number) {
        hoveredItemIndex = index;
        const item = document.querySelector(`[data-index="${index}"]`);
        if (item) {
            gsap.to(item, {
                x: 15,
                backgroundColor: "rgba(0,0,0,0.05)",
                duration: 0.3,
                ease: "power2.out",
            });

            gsap.to(item.querySelector("span"), {
                fontWeight: "bold",
                duration: 0.3,
            });
        }
    }

    function handleItemLeave(index: number) {
        hoveredItemIndex = null;
        const item = document.querySelector(`[data-index="${index}"]`);
        if (item) {
            gsap.to(item, {
                x: 0,
                backgroundColor: "transparent",
                duration: 0.3,
                ease: "power2.out",
            });

            gsap.to(item.querySelector("span"), {
                fontWeight: "600",
                duration: 0.3,
            });
        }
    }
</script>

<section class="w-full px-4 py-8 md:px-6 md:py-12 lg:px-8">
    <div class="w-full mx-auto max-w-2xl">
        <div
            bind:this={mainCardEl}
            class="border border-black backdrop-blur-2xl p-8 md:p-12 transition-all duration-300 ease-out"
            onmouseenter={handleCardEnter}
            onmouseleave={handleCardLeave}
        >
            <div class="mb-8">
                <div class="flex items-center gap-3 mb-4">
                    <span
                        class="sera-badge inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 border border-black transition-all duration-300"
                    >
                        Sera
                    </span>
                    <div class="emoji-icon text-2xl inline-block">🎉</div>
                </div>
                <h2
                    class="main-title text-4xl md:text-5xl font-bold mb-2 transition-all duration-300"
                >
                    {eveningEvent.title}
                </h2>
                <p
                    class="subtitle text-lg md:text-xl transition-all duration-300 opacity-80"
                >
                    {eveningEvent.subtitle}
                </p>
                <p
                    class="description text-base mt-2 transition-all duration-300 opacity-70"
                >
                    {eveningEvent.description}
                </p>
            </div>
            <div class="border-t border-black/20 pt-8">
                <h3
                    class="program-title text-sm font-semibold uppercase tracking-widest mb-6 transition-all duration-300 opacity-80"
                >
                    Programma
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {#each eveningEvent.program as item, index}
                        <div
                            class="program-item flex items-center gap-3 transition-all duration-300 p-3"
                            data-index={index}
                            onmouseenter={() => handleItemEnter(index)}
                            onmouseleave={() => handleItemLeave(index)}
                        >
                            <span class="text-sm md:text-base font-semibold">
                                {item}
                            </span>
                        </div>
                    {/each}
                </div>
            </div>
            <div
                class="footer-text mt-8 text-center text-sm font-semibold opacity-60 transition-all duration-300"
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

    .program-item {
        position: relative;
    }

    .program-item::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 100%;
        background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.05) 0%,
            transparent 100%
        );
        pointer-events: none;
    }
</style>
