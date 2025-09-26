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
    class="evening-island relative p-8 h-full min-h-[400px] cursor-pointer"
    style="transform: scale({$scale});"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:click={handleClick}
    role="button"
    tabindex="0"
>
    <!-- Content -->
    <div class="h-full flex flex-col justify-between">
        <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Evening</h2>
            <p class="text-gray-800 text-lg leading-relaxed mb-6">
                Wind down with meaningful connections. Evening hours bring
                collaboration, reflection, and building lasting professional
                relationships.
            </p>
        </div>

        <div class="space-y-3">
            <div class="text-gray-800 text-base font-medium">
                Panel Discussions
            </div>
            <div class="text-gray-800 text-base font-medium">
                Networking Dinner
            </div>
            <div class="text-gray-800 text-base font-medium">
                Workshop Wrap-ups
            </div>
        </div>

        <!-- Time indicator -->
        <div class="text-gray-900 font-bold text-lg">17:00 - 22:00</div>
    </div>
</div>
