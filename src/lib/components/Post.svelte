<script>
    import { enhance } from '$app/forms';
    import NewReportDialog from '$lib/dialogs/NewReportDialog.svelte';
    import { formatDistanceToNow } from 'date-fns';

    let { post, liked=false, disliked=false, showLikesDislikes=true, showTags=true, small=false, interactive=true } = $props()

    let reportDialogOpen = $state(false)
</script>

<div class:pointer-events-none={!interactive} class:!gap-1.5={small} class="!text-black flex flex-row h-fit gap-3 p-3 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl">
    <div class="flex flex-row gap-3 w-full">
        <a href="/user/{post.author.id}">
            <div class:!size-10={small} class="rounded-full h-15 w-15 bg-gray-200 relative z-10 shadow-sm">
                {#if post.author.images.length > 0}
                    <img src="/image/{post.author.images[0].id}" alt="{post.author.firstName} {post.author.lastName} Profile Image" class:!size-10={small} class="rounded-full h-15 w-15"/>
                {/if}
            </div>
        </a>

        <div class="flex flex-col w-full">
            <div class="flex flex-row">
                <a href="/user/{post.author.id}" class="h-fit w-fit flex flex-col">
                    <p class="font-semibold !text-black">{post.author.firstName} {post.author.lastName}</p>
                    
                    <p class="text-sm !text-gray-500">{post.author.username}</p>
                </a>

                <p title={post.postedAt} class="w-fit ml-auto text-sm !text-gray-500">{formatDistanceToNow(post.postedAt, { addSuffix: true })}</p>
            </div>

            <a href="/post/{post.id}" class="bg-neutral-200/20 !text-black border border-neutral-200/50 rounded-md mt-3 p-3">
                {post.content}
            </a>

            {#if post.images.length > 0}
                <div class="flex flex-row gap-1.5 mt-1.5 overflow-x-auto">
                    {#each post.images as image}
                        <div class="aspect-square rounded-sm min-w-24 w-24 !px-0">
                            <img alt="Images" src="/image/{image.id}" class="size-full rounded-sm object-fill object-center duration-75"/>
                        </div>
                    {/each}
                </div>
            {/if}

            {#if showTags && post.tags.length > 0}
                <div class="flex flex-row flex-wrap gap-1.5 mt-3">
                    {#each post.tags as tag}
                        <a href="/tag/{tag.tag.name}" type="button" class="tag !text-xs">{tag.tag.name}</a>
                    {/each}
                </div>
            {/if}

            {#if showLikesDislikes}
                <div class="flex flex-row gap-5">
                    <a href="/post/{post.id}#comments" class="text-sm !text-gray-500 mt-3">{post.comments.length} Comments</a>

                    <form use:enhance method="POST" action="/post/{post.id}?/toggleLike">
                        <button type="submit" class:!text-blue-600={liked} class="text-sm text-gray-500 mt-3 !p-0">{post.reactions?.filter((r) => r.type == "liked").length} Likes</button>
                    </form>

                    <form use:enhance method="POST" action="/post/{post.id}?/toggleDislike">
                        <button type="submit" class:!text-red-600={disliked} class="text-sm text-gray-500 mt-3 !p-0">{post.reactions?.filter((r) => r.type == "disliked").length} Dislikes</button>
                    </form>

                    {#if post.status == "unreviewed"} 
                        <button onclick={() => reportDialogOpen = !reportDialogOpen} class="text-sm text-red-600 mt-3 !p-0">Report</button>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</div>

{#if showLikesDislikes && post.status == "unreviewed"}
    <NewReportDialog bind:open={reportDialogOpen} postId={post.id}/>
{/if}