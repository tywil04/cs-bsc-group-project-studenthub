<script>
    let { dealPost } = $props()
</script>

<div class="shadow-xs bg-neutral-100 border border-neutral-200/75 p-5 rounded-xl">
    <p class="mb-3">{dealPost.offer}</p>

    <a href={dealPost.url}>Find out more here...</a>
</div>