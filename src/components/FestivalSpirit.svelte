<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { SplitText } from "gsap/SplitText";

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Manifesto lines - each element becomes a separate animated line
    const manifestoLines = [
        "Non solo un festival",
        "ma uno spazio di resistenza creativa.",
        "Dove il lavoro",
        "incontra i diritti,",
        "dove la legalità",
        "sfida il malaffare,",
        "dove giocare",
        "è rivoluzionario.",
    ];

    let manifestoElement: HTMLElement;
    let sectionElement: HTMLElement;

    onMount(() => {
        initScrollAnimation();

        // Cleanup on component destroy
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    });

    function initScrollAnimation() {
        if (!manifestoElement || !sectionElement) return;

        // Clear existing content and create line elements
        manifestoElement.innerHTML = "";

        // Create individual line elements
        const lineElements = manifestoLines.map((lineText, index) => {
            const lineElement = document.createElement("div");
            lineElement.textContent = lineText;
            lineElement.classList.add("line");
            manifestoElement.appendChild(lineElement);
            return lineElement;
        });

        const lines = lineElements;

        // Set initial state - lines start below and invisible
        gsap.set(lines, {
            y: 80,
            opacity: 0,
            transformOrigin: "center bottom",
        });

        // Create scroll-triggered animation with parent scroller
        gsap.to(lines, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            stagger: {
                amount: 1.5,
                from: "start",
                ease: "power2.inOut",
            },
            scrollTrigger: {
                trigger: sectionElement,
                scroller: sectionElement.closest("main"), // Use parent main as scroller
                start: "top 25%",
                end: "bottom 40%",
                scrub: 1.5,
                toggleActions: "play none none reverse",
                refreshPriority: 1,
            },
        });
    }
</script>

<section
    bind:this={sectionElement}
    class="w-full min-h-[300vh] relative flex items-start justify-center p-4 pt-8 box-border md:p-8"
>
    <div class="sticky top-24 w-fit mx-auto">
        <div class="p-6 md:p-12">
            <p
                bind:this={manifestoElement}
                class="font-sans font-bold text-center text-black m-0"
                style="font-size: clamp(1.5rem, 4vw, 4rem); line-height: 1.2; letter-spacing: -0.02em;"
            ></p>
        </div>
    </div>
</section>

<style>
    :global(.line) {
        display: block;
        will-change: transform, opacity;
        overflow: hidden;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        section {
            min-height: 250vh !important;
        }

        section > div > div {
            border-width: 2px !important;
        }
    }

    @media (max-width: 480px) {
        section {
            min-height: 200vh !important;
            padding: 0.5rem !important;
        }

        section > div > div {
            padding: 1rem !important;
        }

        section p {
            line-height: 1.3 !important;
        }
    }

    /* High contrast mode */
    @media (prefers-contrast: high) {
        section > div > div {
            background: white !important;
            border-width: 4px !important;
        }

        section p {
            font-weight: 900 !important;
        }
    }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
        :global(.line) {
            will-change: auto;
        }
    }
</style>
