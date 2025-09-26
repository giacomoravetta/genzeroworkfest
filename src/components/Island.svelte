<script lang="ts">
    const {
        title = "Island Title",
        description = "Island Description",
        paragraph = "Island Paragraph",
    } = $props();
</script>

<div
    class="island flex flex-col justify-between backdrop-blur-xl p-10 h-full border-black border-2 border-solid"
>
    <div class="island-header">
        <h2 class="island-title text-4xl font-bold">{title}</h2>
    </div>
    <div class="island-content">
        <p class="island-description">{description}</p>
    </div>
    <div class="island-footer">
        <p class="island-paragraph">{paragraph}</p>
    </div>
</div>
