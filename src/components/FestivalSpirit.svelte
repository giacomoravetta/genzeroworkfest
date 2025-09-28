<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { TextPlugin } from "gsap/TextPlugin";

    gsap.registerPlugin(TextPlugin);

    // Manifesto text - split into lines for better flow
    const manifestoLines = [
        "Non solo un festival,",
        "ma uno spazio di resistenza creativa.",
        "",
        "Dove il lavoro incontra i diritti,",
        "dove la legalità sfida il malaffare,",
        "dove giocare è rivoluzionario.",
    ];

    // Component state
    let manifestoContainer: HTMLElement;
    let isAnimating = $state(false);
    let currentLineIndex = $state(0);

    onMount(() => {
        initTypewriter();
    });

    function initTypewriter() {
        if (!manifestoContainer) return;

        isAnimating = true;
        currentLineIndex = 0;

        // Clear container
        manifestoContainer.innerHTML = "";

        // Create timeline
        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
            },
        });

        // Animate each line sequentially
        manifestoLines.forEach((line, index) => {
            // Create line element
            const lineElement = document.createElement("div");
            lineElement.className = "manifesto-line";
            manifestoContainer.appendChild(lineElement);

            // Animate this line's text
            tl.to(
                lineElement,
                {
                    duration: line.length * 0.05, // Dynamic duration based on line length
                    text: {
                        value: line,
                        delimiter: "",
                    },
                    ease: "none",
                },
                index === 0 ? 0 : "+=0.3",
            ); // Small delay between lines
        });
    }

    function handleManifestoClick() {
        if (isAnimating) return;

        // Reset and replay animation
        initTypewriter();
    }
</script>

<section
    class="festival-spirit w-full min-h-[80dvh] flex items-center justify-center px-4 sm:px-6 lg:px-8 flex-shrink-0"
>
    <div
        class="max-w-6xl mx-auto text-center border-black border-2 p-4 backdrop-blur-xl"
    >
        <div
            class="typewriter-container relative inline-block cursor-pointer"
            onclick={handleManifestoClick}
            role="button"
            tabindex="0"
            aria-label="Manifesto del festival - clicca per rivedere l'animazione"
        >
            <div
                bind:this={manifestoContainer}
                class="manifesto-text text-2xl sm:text-3xl lg:text-5xl font-sans font-medium text-black leading-relaxed tracking-tight"
            ></div>
        </div>
    </div>
</section>

<style>
    .festival-spirit {
        font-family: "Inter", "Courier New", monospace;
    }

    .typewriter-container {
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .manifesto-text {
        text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        text-align: center;
    }

    :global(.manifesto-line) {
        display: block;
        margin-bottom: 0.5rem;
        min-height: 1.2em;
    }

    :global(.manifesto-line:empty) {
        min-height: 0.6em;
    }

    /* Responsive typography */
    @media (max-width: 640px) {
        .manifesto-text {
            font-size: 1.25rem;
            line-height: 1.5;
        }

        .typewriter-container {
            min-height: 150px;
        }
    }

    @media (min-width: 641px) and (max-width: 1024px) {
        .manifesto-text {
            font-size: 1.875rem;
            line-height: 1.4;
        }

        .typewriter-container {
            min-height: 175px;
        }
    }

    @media (min-width: 1025px) {
        .typewriter-container {
            min-height: 250px;
        }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .manifesto-text {
            text-shadow: none;
            font-weight: 900;
        }
    }

    /* Reduced motion accessibility */
    @media (prefers-reduced-motion: reduce) {
        .manifesto-text {
            transition: none;
        }
    }

    /* Focus states for accessibility */
    .typewriter-container:focus {
        outline: 2px solid #000;
        outline-offset: 4px;
    }

    /* Print styles */
    @media print {
        .festival-spirit {
            background: white !important;
            color: black !important;
        }

        .manifesto-text {
            font-size: 16pt !important;
            text-shadow: none !important;
            transform: none !important;
        }
    }
</style>
