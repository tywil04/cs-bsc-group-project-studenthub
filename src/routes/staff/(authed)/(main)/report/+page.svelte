<script>
    import Post from '$lib/components/Post.svelte';
    import Paginate from '$lib/components/Paginate.svelte';
    import { enhance } from '$app/forms';

    let { data } = $props();
</script>

<svelte:head>
    <title>Reporting | Staff | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Reported Posts</h1>

    {#if data.posts.length === 0}
        Nothing to review at the moment
    {:else}
        {#each data.posts as post}
            <div class="p-3 gap-3 shadow-xs bg-neutral-100 border border-neutral-200/75 flex flex-col rounded-xl">
                <div class="flex flex-row gap-3">
                    <form use:enhance method="POST" action="?/allowPost" class="flex-grow">
                        <input type="hidden" name="postId" value="{post.id}"/>
                        <button class="bg-blue-500 text-white w-full !px-0">Allow Post</button>
                    </form>

                    <form use:enhance method="POST" action="?/blockPost" class="flex-grow">
                        <input type="hidden" name="postId" value="{post.id}"/>
                        <button class="bg-red-600 text-white w-full !px-0">Block Post</button>
                    </form>
                </div>

                <div class="[&>*]:!shadow-none [&>*]:!p-0 [&>*]:border-0">
                    <Post {post} showLikesDislikes={false} showTags={false} interactive={false}/>
                </div>
            </div>
        {/each}
    {/if}

    {#if data.numberOfPages > 1}
        <Paginate page={data.page} numberOfPages={data.numberOfPages}/>
    {/if}
</div>