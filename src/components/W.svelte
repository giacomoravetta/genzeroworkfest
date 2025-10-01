<script lang="ts">
    import { onMount } from "svelte";

    let isMobile = false;

    function checkScreenSize() {
        isMobile = window.innerWidth < 768;
    }

    onMount(() => {
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        };
    });
</script>

{#if isMobile}
    <svg
        class="w-full h-full"
        viewBox="0 0 1000 1840"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M819.223 1840H439.756L482.538 580.912L496.168 291.768H489.654L469.528 580.912L374.706 1840H0V0H299.637L217.046 1511.43H223.56L247.456 1193.36L349.5 0H666.077L639.897 1193.36L629.029 1511.43H635.543L718.134 0H1000.02L819.241 1840H819.223Z"
            fill="#CD73F7"
        />
    </svg>
{:else}
    <svg
        class="w-full h-full"
        viewBox="0 0 1840 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1507.37 1000H809.151L887.87 315.713L912.949 158.57H900.963L863.932 315.713L689.459 1000H0V0H551.332L399.364 821.429H411.35L455.318 648.563L643.08 0H1225.58L1177.41 648.563L1157.41 821.429H1169.4L1321.37 0H1840.03L1507.4 1000H1507.37Z"
            fill="#CD73F7"
        />
    </svg>
{/if}
