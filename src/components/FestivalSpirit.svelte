<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { SplitText } from "gsap/SplitText";

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Manifesto lines - each element becomes a separate animated line
    const manifestoLines = [
        "Non solo un festival",
        "ma uno spazio di",
        "resistenza creativa",
        "Dove il lavoro",
        "incontra i diritti",
        "e la legalità,",
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
            y: 100,
            opacity: 0,
            transformOrigin: "center bottom",
        });

        // Create timeline for sequential animation
        const tl = gsap.timeline({
            paused: true,
        });

        // Add staggered animation to timeline
        tl.to(lines, {
            y: 0,
            opacity: 1,
            duration: 5,
            ease: "power3.out",
            stagger: {
                amount: 1.5,
                from: "start",
            },
        });

        // Create scroll trigger that plays the timeline when section is in view
        ScrollTrigger.create({
            trigger: sectionElement,
            scroller: sectionElement.closest("main"),
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => tl.play(),
            onLeave: () => tl.reverse(),
            onEnterBack: () => tl.play(),
            onLeaveBack: () => tl.reverse(),
            refreshPriority: 1,
        });
    }
</script>

<section
    bind:this={sectionElement}
    class="w-full relative flex items-start justify-center px-4 py-8 sm:px-6 lg:px-8"
>
    <div class="sticky top-4 sm:top-8 lg:top-12 w-full max-w-5xl mx-auto">
        <div class=" backdrop-blur-md p-6 sm:p-10 lg:p-16 border mx-2 sm:mx-4">
            <p
                bind:this={manifestoElement}
                class="font-sans font-bold text-center text-gray-900 m-0 leading-tight"
                style="font-size: clamp(1.5rem, 6vw, 3rem); line-height: clamp(1.2, 1.3 - 0.01vw, 1.1); letter-spacing: clamp(-0.01em, -0.02em, -0.04em);"
            ></p>
        </div>
    </div>
</section>
