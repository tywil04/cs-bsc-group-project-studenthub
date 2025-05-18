<script>
    import NewPostDialog from '$lib/dialogs/NewPostDialog.svelte';
    import Post from '$lib/components/Post.svelte'

    let { data } = $props() 

    let newPostDialogOpen = $state(false)
</script>

<svelte:head>
    <title>Home | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Your Feed</h1>

    <button onclick={() => newPostDialogOpen = !newPostDialogOpen} class="bg-blue-500 text-white button-small w-full !px-0">New Post</button>
    
    <div class="h-fit flex flex-col gap-7">
        {#each data.posts as post}
            {@const liked = post.reactions.map((r) => (
                r.userId === data.currentUser.id && 
                r.type === "liked"
            )).includes(true)}

            {@const disliked = post.reactions.map((r) => (
                r.userId === data.currentUser.id && 
                r.type === "disliked"
            )).includes(true)}

            <Post {post} {liked} {disliked}/>
        {/each}
    </div>
</div>

<NewPostDialog bind:open={newPostDialogOpen}/>