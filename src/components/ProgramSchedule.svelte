<script lang="ts">
    import Island from "./Island.svelte";
</script>

<section
    class="flex flex-col lg:flex-row justify-between w-full h-auto lg:h-full lg:basis-1/2 px-4 sm:px-6 lg:px-10 gap-3 sm:gap-4 lg:gap-5"
>
    <div class="flex w-full lg:basis-1/3 h-64 sm:h-80 lg:h-full">
        <Island
            class="w-full h-full"
            title="Mattina"
            description="Vogliamo sfidare questa società che ci vuole solo produttori. Tra giochi, creatività e socializzazione, ci prendiamo il tempo di essere umani: non macchine, non numeri, non ingranaggi. Riprendiamoci il nostro tempo."
            text="06:00 - 12:00"
        />
    </div>
    <div class="flex w-full lg:basis-1/3 h-64 sm:h-80 lg:h-full">
        <Island
            class="w-full h-full"
            title="Pomeriggio"
            description="Il momento perfetto per workshops intensivi, sessioni collaborative e networking attivo. Energia e focus per portare avanti progetti concreti."
            text="12:00 - 18:00"
        />
    </div>
    <div class="flex w-full lg:basis-1/3 h-64 sm:h-80 lg:h-full">
        <Island
            class="w-full h-full"
            title="Sera"
            description="Finiamo la giornata come meglio sappiamo fare, mangiando e bevendo insieme. Musica dal vivo e Dj set, BeerPong e tanto altro!"
            text="18:00 - 24:00"
        />
    </div>
</section>
<section
    class="w-full h-auto lg:h-full flex flex-col lg:flex-row lg:basis-1/2 px-4 sm:px-6 lg:px-10 pb-4 sm:pb-6 lg:pb-10 gap-3 sm:gap-4 lg:gap-5"
>
    <div class="w-full h-64 sm:h-80 lg:h-full">
        <Island
            class="w-full h-full"
            title="Sera"
            description="Finiamo la giornata come meglio sappiamo fare, mangiando e bevendo insieme. Musica dal vivo e Dj set, BeerPong e tanto altro!"
            text="18:00 - 24:00"
        />
    </div>
    <div class="w-full h-64 sm:h-80 lg:h-full">
        <Island
            class="w-full h-full"
            title="Sera"
            description="Finiamo la giornata come meglio sappiamo fare, mangiando e bevendo insieme. Musica dal vivo e Dj set, BeerPong e tanto altro!"
            text="18:00 - 24:00"
        />
    </div>
</section>
