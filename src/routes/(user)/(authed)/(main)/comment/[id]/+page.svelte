<script>
    import { enhance } from "$app/forms";
    import FormInput from "$lib/components/FormInput.svelte"
    import Comment from "$lib/components/Comment.svelte"
    import Post from "$lib/components/Post.svelte"

    const { data, form } = $props();

    const liked = $derived(
        data.comment.reactions.map((r) => (
            r.userId === data.currentUser.id && 
            r.type === "liked"
        )).includes(true)
    )

    const disliked = $derived(
        data.comment.reactions.map((r) => (
            r.userId === data.currentUser.id && 
            r.type === "disliked"
        )).includes(true)
    )
</script>

<svelte:head>
    <title>Comment by {data.comment.author.firstName} {data.comment.author.lastName} ({data.comment.author.username}) | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Commment</h1>

    <Comment comment={data.comment} {liked} {disliked} showParent={true}/>

    <h1 class="font-semibold text-lg -mb-5">Reply To The Comment</h1>

    <form use:enhance method="POST" action="/comment?/create" class="h-fit gap-4 gap-y-5 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl p-5">
        <input type="hidden" name="commentId" value={data.comment.id}/>

        <FormInput label="Comment Content" id="content" name="content" type="textarea" description="Maximum number of characters is 256" error={form?.errors?.content} maxlength="256" required placeholder="What a great post!"/>

        <button class="bg-neutral-200 text-black button-small mt-3">Comment</button>
    </form>

    <h1 class="font-semibold text-lg -mb-5">Replies</h1>

    <div id="replies" class="flex flex-col gap-7">
        {#if data.comment.comments.length === 0}
            No replies
        {:else}
            {#each data.comment.comments as comment}
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