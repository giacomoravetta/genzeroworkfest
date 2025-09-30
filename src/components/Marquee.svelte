<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";

    let marqueeRef: HTMLDivElement;

    onMount(() => {
        if (marqueeRef) {
            // Create seamless infinite marquee animation
            const marqueeContent = marqueeRef;
            const marqueeWidth = marqueeContent.scrollWidth / 2; // Half because we duplicate content

            // Set initial position to prevent any jump
            gsap.set(marqueeContent, { x: 0 });

            // Create smooth infinite loop
            gsap.to(marqueeContent, {
                x: -marqueeWidth,
                duration: 100, // Slower for smoother feel
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: function (x) {
                        return (
                            gsap.utils.wrap(-marqueeWidth, 0, parseFloat(x)) +
                            "px"
                        );
                    },
                },
            });
        }
    });
</script>

<div
    class="relative w-full h-15 sm:h-12 md:h-15 z-30 border-t-2 border-b-2 border-black overflow-hidden flex items-center shadow-md"
>
    <div
        bind:this={marqueeRef}
        class="flex whitespace-nowrap will-change-transform"
        style="transform: translate3d(0, 0, 0);"
    >
        <!-- First set of text for seamless loop -->
        <div class="flex">
            <span
                class="font-sans text-sm sm:text-base lg:text-xl font-bold text-black tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
                >Si mangia e si beve — Si fa anche se piove</span
            >
            <span
                class="font-sans text-sm sm:text-base lg:text-xl font-bold text-black tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
                >Si mangia e si beve — Si fa anche se piove</span
            >
            <span
                class="font-sans text-sm sm:text-base lg:text-xl font-bold text-black tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
                >Si mangia e si beve — Si fa anche se piove</span
            >
        </div>
        <!-- Duplicate set for seamless loop -->
        <div class="flex">
            <span
                class="font-sans text-sm sm:text-base lg:text-xl font-bold text-black tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
                >Si mangia e si beve — Si fa anche se piove</span
            >
            <span
                class="font-sans text-sm sm:text-base lg:text-xl font-bold text-black tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
                >Si mangia e si beve — Si fa anche se piove</span
            >
            <span
                class="font-sans text-sm sm:text-base lg:text-xl font-bold text-black tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
                >Si mangia e si beve — Si fa anche se piove</span
            >
        </div>
    </div>
</div>
