<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { Draggable } from "gsap/Draggable";

    // Register the Draggable plugin
    gsap.registerPlugin(Draggable);

    let svgRef: SVGSVGElement;
    let containerRef: HTMLDivElement;

    onMount(() => {
        if (svgRef) {
            gsap.to(svgRef.querySelector(".circles-text"), {
                duration: 10,
                ease: "none",
                rotation: 360,
                transformOrigin: "center",
                repeat: -1,
            });
        }

        if (containerRef) {
            Draggable.create(containerRef, {
                type: "x,y",
                inertia: true,
                bounds: "body",
                cursor: "grab",
                activeCursor: "grabbing",
                edgeResistance: 0.65,
                throwProps: true,
                dragResistance: 0.1,
            });
        }
    });
</script>

<div bind:this={containerRef} class="circles-text-wrapper">
    <svg
        bind:this={svgRef}
        class="circles-text-container"
        width="100%"
        height="100%"
        viewBox="0 0 1400 1400"
    >
        <!-- Bigger white circle background -->
        <circle
            cx="700"
            cy="700"
            r="600"
            fill="white"
            stroke="#e5e7eb"
            stroke-width="2"
        />

        <!-- Smaller transparent circle -->
        <circle
            cx="700"
            cy="700"
            r="450"
            fill="transparent"
            stroke="#e5e7eb"
            stroke-width="1"
        />

        <!-- Path definition for text -->
        <defs>
            <path
                id="circle-1"
                d="M250,700.5A450.5,450.5 0 1 1 1151,700.5A450.5,450.5 0 1 1 250,700.5"
            />
        </defs>

        <!-- Rotating text -->
        <text class="circles-text circles-text-styling font-sans">
            <textPath
                class="circles-text-path"
                href="#circle-1"
                aria-label="Si mangia e si beve"
                textLength="2830"
            >
                — Si mangia e si beve — Si mangia e si beve — Si mangia e si
                beve —&nbsp;
            </textPath>
        </text>
    </svg>
</div>

<style>
    .circles-text-wrapper {
        position: fixed;
        left: 2rem;
        top: 50vh;
        transform: translateY(-50%);
        width: 180px;
        height: 180px;
        z-index: 20;
        cursor: grab;
        user-select: none;
        touch-action: manipulation;
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        border-radius: 50%;
    }

    .circles-text-wrapper:hover {
        transform: translateY(-50%) scale(1.05);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .circles-text-wrapper:active {
        cursor: grabbing;
        transform: translateY(-50%) scale(0.98);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .circles-text-container {
        pointer-events: none;
        width: 100%;
        height: 100%;
    }

    @media only screen and (max-width: 767px) {
        .circles-text-wrapper {
            width: 120px;
            height: 120px;
            left: 1rem;
        }
    }

    .circles-text {
        text-transform: none;
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .circles-text-styling {
        font-size: 110px;
        font-weight: 700;
        fill: #374151;
        letter-spacing: 0.05em;
    }

    .circles-text-path {
        text-anchor: start;
    }
</style>
