<script lang="ts">
    import { onMount } from "svelte";
    import { getProgramData } from "../lib/notion";
    import Island from "./Island.svelte";

    let { env = import.meta.env } = $props();

    // Local state for loading and error
    let isLoading = $state(true);
    let error = $state<string | null>(null);
    let displayData = $state<ProgramSection[]>([]);

    // Fetch data from API on mount (client-side)
    onMount(async () => {
        try {
            // Add timestamp to bypass all caching layers
            const timestamp = new Date().getTime();
            const response = await getProgramData(env);

            if (!response.ok) {
                throw new Error("Failed to fetch program data");
            }

            const data = response;
            displayData = data;
            isLoading = false;

            // Notify that program data is loaded
            window.dispatchEvent(new CustomEvent("programDataLoaded"));
        } catch (err) {
            console.error("Error fetching program:", err);
            error = err instanceof Error ? err.message : "Unknown error";
            isLoading = false;

            // Still dispatch event even on error to not block loading screen
            window.dispatchEvent(new CustomEvent("programDataLoaded"));
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
                ⚠️ Impossibile caricare i dati aggiornati. Errore: {error}
            </p>
        </div>
    {:else if isLoading}
        <div class="flex justify-center items-center py-12">
            <div class="text-center">
                <div
                    class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black"
                ></div>
                <p class="mt-4 text-gray-600">Caricamento programma...</p>
            </div>
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
