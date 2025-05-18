<script>
    let { announcement } = $props()
</script>

<div class="shadow-xs bg-neutral-100 border border-neutral-200/75 p-5 rounded-xl">
    <p class="font-semibold text-lg mb-3">{announcement.title}</p>
    
    <p>{announcement.content}</p>
</div>