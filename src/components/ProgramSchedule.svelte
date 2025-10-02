<script lang="ts">
    import { onMount } from "svelte";
    import { getProgramData } from "../lib/notion";
    import Island from "./Island.svelte";

    let { data } = $props();

    // Local state for loading and error
    let isLoading = $state(true);
    let error = $state<string | null>(null);
    let displayData = $state<ProgramSection[]>([]);

    $effect(() => {
        console.log("🔍 ProgramSchedule - data received:", data);
        console.log("🔍 Data type:", typeof data);
        console.log("🔍 Is array:", Array.isArray(data));
        console.log("🔍 Data length:", data?.length);

        if (data && Array.isArray(data) && data.length > 0) {
            displayData = data;
            isLoading = false;
            console.log("✅ Display data set:", displayData);

            // Notify that program data is loaded with a small delay
            // to ensure LoadingScreen is ready to listen
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent("programDataLoaded"));
            }, 100);
        } else if (data !== undefined) {
            // Data exists but is empty
            console.warn("⚠️ Data is empty or not an array");
            displayData = [];
            isLoading = false;
            error = "Nessun dato disponibile";

            // Still dispatch event to not block loading screen
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent("programDataLoaded"));
            }, 100);
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
                ⚠️ {error}
            </p>
            <p class="text-sm text-yellow-600 mt-2">
                Data: {JSON.stringify(data)}
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
            {#if displayData.length === 0}
                <div class="text-center py-12">
                    <p class="text-gray-600 text-lg">
                        Nessuna sezione programma disponibile
                    </p>
                </div>
            {:else}
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
            {/if}
        </div>
    {/if}
</div>
