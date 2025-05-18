<script>
    import { enhance } from '$app/forms';
    import { formatDistanceToNow } from 'date-fns';
    import Post from './Post.svelte';

    let { comment, liked=false, disliked=false, showParent=false, showLikesDislikes=true } = $props()
</script>

{#snippet renderComment(innerComment, innerShowParent=false, showLikesDislikes=true)}
    <div class="!text-black flex flex-row h-fit gap-1.5 p-3 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl">
        <div class="flex flex-row gap-3 w-full">
            <a href="/user/{innerComment.author.id}">
                <div class="rounded-full h-10 w-10 bg-gray-200 relative z-10 shadow-sm">
                    {#if innerComment.author.images.length > 0}
                        <img src="/image/{innerComment.author.images[0].id}" alt="{innerComment.author.firstName} {innerComment.author.lastName} Profile Image" class="rounded-full h-10 w-10"/>
                    {/if}
                </div>
            </a>

            <div class="flex flex-col w-full">
                <div class="flex flex-row">
                    <a href="/user/{innerComment.author.id}" class="h-fit w-fit flex flex-row gap-2">
                        <p class="font-semibold !text-black">{innerComment.author.firstName} {innerComment.author.lastName}</p>
                        
                        <p class="text-sm !text-gray-500 leading-6">({innerComment.author.username})</p>
                    </a>

                    <p title={innerComment.commentedAt} class="w-fit ml-auto text-sm !text-gray-500">{formatDistanceToNow(innerComment.commentedAt, { addSuffix: true })}</p>
                </div>

                <a href="/comment/{innerComment.id}" class="bg-neutral-200/20 !text-black border border-neutral-200/50 rounded-md mt-3 py-1.5 px-3">
                    {innerComment.content}
                </a>

                {#if innerShowParent && innerComment.parentCommentId != null}
                    <p class="text-sm mt-3 text-gray-500">Wrote In Reply To This Comment</p>

                    <div class="[&>*]:!shadow-none [&>*]:bg-neutral-200/20 mt-3">
                        {@render renderComment(comment.parentComment, false, false)}
                    </div>
                {/if}

                {#if innerShowParent && innerComment.postId != null}
                    <p class="text-sm mt-3 text-gray-500">Wrote In Reply To This Post</p>

                    <div class="[&>*]:!shadow-none [&>*]:bg-neutral-200/20 mt-3">
                        <Post post={innerComment.post} showLikesDislikes={false} small={true} showTags={false}/>
                    </div>
                {/if}

                {#if showLikesDislikes}
                    <div class="flex flex-row gap-5 mt-3">
                        <a href="/comment/{innerComment.id}#replies" class="text-sm !text-gray-500">{innerComment.comments.length} Replies</a>

                        <form use:enhance method="POST" action="/comment/{innerComment.id}?/toggleLike">
                            <button type="submit" class:!text-blue-600={liked} class="text-sm text-gray-500 !p-0">{innerComment.reactions.filter((r) => r.type == "liked").length} Likes</button>
                        </form>

                        <form use:enhance method="POST" action="/comment/{innerComment.id}?/toggleDislike">
                            <button type="submit" class:!text-red-600={disliked} class="text-sm text-gray-500 !p-0">{innerComment.reactions.filter((r) => r.type == "disliked").length} Dislikes</button>
                        </form>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/snippet}

{@render renderComment(comment, showParent, showLikesDislikes)}