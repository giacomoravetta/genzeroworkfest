<script lang="ts">
    import Island from "./Island.svelte";
</script>

<section
    id="program"
    class="relative flex flex-col lg:flex-row justify-between w-full h-auto px-4 sm:px-6 lg:px-40 pb-16"
>
    <div class="flex flex-col gap-6 sm:gap-8 lg:gap-5 w-full h-full">
        <h1 class="text-5xl backdrop-blur-xl w-fit border-2 border-black p-5">
            Programma
        </h1>
        <div
            class="flex w-full lg:basis-1/3 h-64 sm:h-80 lg:h-auto lg:min-h-[300px]"
        >
            <Island
                title="Mattina"
                description="Vogliamo sfidare questa società che ci vuole solo produttori. Tra giochi, creatività e socializzazione, ci prendiamo il tempo di essere umani: non macchine, non numeri, non ingranaggi. Riprendiamoci il nostro tempo."
            />
        </div>
        <div
            class="flex w-full lg:basis-1/3 h-64 sm:h-80 lg:h-auto lg:min-h-[300px]"
        >
            <Island
                title="Pomeriggio"
                description="Il momento perfetto per workshops intensivi, sessioni collaborative e networking attivo. Energia e focus per portare avanti progetti concreti."
            />
        </div>
        <div
            class="flex w-full lg:basis-1/3 h-64 sm:h-80 lg:h-auto lg:min-h-[300px]"
        >
            <Island
                title="Sera"
                description="Finiamo la giornata come meglio sappiamo fare, mangiando e bevendo insieme. Musica dal vivo e Dj set, BeerPong e tanto altro!"
            />
        </div>
    </div>
</section>
