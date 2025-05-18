<script>
    import { enhance } from "$app/forms";
    import FormInput from "$lib/components/FormInput.svelte"
    import Post from "$lib/components/Post.svelte"
    import Comment from "$lib/components/Comment.svelte"

    const { data, form } = $props();

    const liked = $derived(
        data.post.reactions.map((r) => (
            r.userId === data.currentUser.id && 
            r.type === "liked"
        )).includes(true)
    )

    const disliked = $derived(
        data.post.reactions.map((r) => (
            r.userId === data.currentUser.id && 
            r.type === "disliked"
        )).includes(true)
    )

    $inspect(data.post)
</script>

<svelte:head>
    <title>Post by {data.post.author.firstName} {data.post.author.lastName} ({data.post.author.username}) | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Post</h1>

    <Post post={data.post} {liked} {disliked}/>

    <h1 class="font-semibold text-lg -mb-5">Comment On The Post</h1>

    <form use:enhance method="POST" action="/comment?/create" class="h-fit gap-4 gap-y-5 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl p-5">
        <input type="hidden" name="postId" value={data.post.id}/>

        <FormInput label="Comment Content" id="content" name="content" type="textarea" description="Maximum number of characters is 128" error={form?.errors?.content} maxlength="128" required placeholder="What a great post!"/>

        <button class="bg-neutral-200 text-black button-small mt-3">Comment</button>
    </form>

    <h1 class="font-semibold text-lg -mb-5">Comments</h1>

    <div id="replies" class="flex flex-col gap-7">
        {#if data.post.comments.length === 0}
            No comments
        {:else}
            {#each data.post.comments as comment}
                {@const liked = comment.reactions.map((r) => (
                    r.userId === data.currentUser.id && 
                    r.type === "liked"
                )).includes(true)}

                {@const disliked = comment.reactions.map((r) => (
                    r.userId === data.currentUser.id && 
                    r.type === "disliked"
                )).includes(true)}

                <Comment {comment} {liked} {disliked}/>
            {/each}
        {/if}
    </div>
</div>