<script>
    import AccomodationPost from "$lib/components/AccomodationPost.svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>Accommodation Posts | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Accommodation Posts</h1>

    <div class="flex flex-col gap-7">
        {#if data.accomodationPosts.length === 0}
            No accommodation posts
        {:else}
            {#each data.accomodationPosts as accomodationPost}
                <AccomodationPost {accomodationPost}/>
            {/each}
        {/if}
    </div>
</div>