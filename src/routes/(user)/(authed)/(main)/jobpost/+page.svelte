<script>
    import JobPost from "$lib/components/JobPost.svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>Job Posts | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Job Posts</h1>

    <div class="flex flex-col gap-7">
        {#if data.jobPosts.length === 0}
            No job posts
        {:else}
            {#each data.jobPosts as jobPost}
                <JobPost {jobPost}/>
            {/each}
        {/if}
    </div>
</div>