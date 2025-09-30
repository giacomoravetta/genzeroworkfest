<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";

    let marqueeRef: HTMLDivElement;

    onMount(() => {
        if (marqueeRef) {
            // Create infinite marquee animation with slower speed
            gsap.to(marqueeRef.children, {
                duration: 30, // Slower animation (was 15s, now 30s)
                ease: "none",
                x: "-50%",
                repeat: -1,
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
    >
        <span
            class="font-sans text-sm sm:text-base lg:text-xl font-bold text-gray-700 tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
            >Si mangia e si beve — Si fa anche se piove</span
        >
        <span
            class="font-sans text-sm sm:text-base lg:text-xl font-bold text-gray-700 tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
            >Si mangia e si beve — Si fa anche se piove</span
        >
        <span
            class="font-sans text-sm sm:text-base lg:text-xl font-bold text-gray-700 tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
            >Si mangia e si beve — Si fa anche se piove</span
        >
        <span
            class="font-sans text-sm sm:text-base lg:text-xl font-bold text-gray-700 tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
            >Si mangia e si beve — Si fa anche se piove</span
        >
        <span
            class="font-sans text-sm sm:text-base lg:text-xl font-bold text-gray-700 tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
            >Si mangia e si beve — Si fa anche se piove</span
        >
        <span
            class="font-sans text-sm sm:text-base lg:text-xl font-bold text-gray-700 tracking-wider pr-8 sm:pr-12 lg:pr-16 flex-shrink-0 uppercase"
            >Si mangia e si beve — Si fa anche se piove</span
        >
    </div>
</div>
