<script lang="ts">
    const {
        title = "Island Title",
        description = "Island Description",
        paragraph = "Island Paragraph",
    } = $props();
</script>

<div
    class="island flex flex-col justify-between backdrop-blur-xl p-4 sm:p-6 lg:p-10 h-full border-black border-2 border-solid transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer"
>
    <div class="island-header">
        <h2
            class="island-title text-xl sm:text-2xl lg:text-4xl font-bold transition-colors duration-300 hover:text-blue-400"
        >
            {title}
        </h2>
    </div>
    <div class="island-content">
        <p
            class="island-description text-sm sm:text-base transition-all duration-300 hover:text-gray-300"
        >
            {description}
        </p>
    </div>
    <div class="island-footer">
        <p
            class="island-paragraph text-sm sm:text-base transition-all duration-300 hover:text-gray-300"
        >
            {paragraph}
        </p>
    </div>
</div>
