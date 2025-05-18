<script>
    import Post from "$lib/components/Post.svelte"

    const { data } = $props();
</script>

<svelte:head>
    <title>Tag "{data.tag.name}" | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Tag "{data.tag.name}"</h1>

    <h1 class="font-semibold text-lg -mb-5">Posts</h1>

    {#each data.tag.posts as post}
        {@const liked = post.post.reactions.map((r) => (
            r.userId === data.currentUser.id && 
            r.type === "liked"
        )).includes(true)}

        {@const disliked = post.post.reactions.map((r) => (
            r.userId === data.currentUser.id && 
            r.type === "disliked"
        )).includes(true)}

        <Post post={post.post} {liked} {disliked}/>
    {/each}
</div>