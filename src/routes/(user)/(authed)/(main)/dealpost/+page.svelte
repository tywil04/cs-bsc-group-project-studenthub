<script>
    import DealPost from "$lib/components/DealPost.svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>Deal Posts | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Deal Posts</h1>

    <div class="flex flex-col gap-7">
        {#if data.dealPosts.length === 0}
            No deal posts
        {:else}
            {#each data.dealPosts as dealPost}
                <DealPost {dealPost}/>
            {/each}
        {/if}
    </div>
</div>