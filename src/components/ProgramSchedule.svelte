<script lang="ts">
    import { onMount } from "svelte";
    import Island from "./Island.svelte";

    // Props: initial data from Astro component (server-side fetched)
    let { programSections = [] }: { programSections?: ProgramSection[] } =
        $props();

    // Local state for loading and error
    let isLoading = $state(true);
    let error = $state<string | null>(null);

    let displayData = $state(programSections);

    // Update loading state when displayData changes
    $effect(() => {
        if (displayData && displayData.length > 0) {
            isLoading = false;
        }
    });
</script>

<div id="program" class="flex flex-col w-full h-full">
    <h1
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl backdrop-blur-xl w-fit border-2 border-black p-3 sm:p-4 lg:p-5 mb-8 sm:mb-10 lg:mb-5"
    >
        Programma
    </h1>

    {#if error}
        <div
            class="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8"
        >
            <p class="text-yellow-800">
                ⚠️ Impossibile caricare i dati aggiornati. Mostrando programma
                di base.
            </p>
        </div>
        <div class="flex flex-col gap-8 sm:gap-10 lg:gap-5">
            {#each displayData as section}
                <div class="flex w-full lg:basis-1/3 h-fit">
                    <Island
                        content={{
                            title: section.title,
                            description: section.description,
                            events: section.events,
                        }}
                    />
                </div>
            {/each}
        </div>
    {:else}
        <div class="flex flex-col gap-8 sm:gap-10 lg:gap-5">
            {#each displayData as section}
                <div class="flex w-full lg:basis-1/3 h-fit">
                    <Island
                        content={{
                            title: section.title,
                            description: section.description,
                            events: section.events,
                        }}
                    />
                </div>
            {/each}
        </div>
    {/if}
</div>
