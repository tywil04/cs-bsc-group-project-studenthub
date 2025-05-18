<script>
    import { enhance } from "$app/forms";
    import DealPost from "$lib/components/DealPost.svelte";
    import FormInput from "$lib/components/FormInput.svelte";

    let { data, form } = $props();
</script>

<svelte:head>
    <title>Deal Posts | Staff | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Deal Posts</h1>

    <h1 class="font-semibold text-lg -mb-5">New Deal Post</h1>

    <form use:enhance method="POST" action="?/create" class="h-fit flex flex-col gap-7 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl p-5">
        <FormInput label="Deal Offer" id="offer" name="offer" type="text" description="Maximum number of characters is 128" required error={form?.errors?.offer}/>

        <FormInput label="Deal Post More Info URL" id="url" name="url" type="text" required error={form?.errors?.url}/>

        <button class="bg-neutral-200 text-black button-small mt-3">Post</button>
    </form>

    <h1 class="font-semibold text-lg -mb-5">Existing Deal Posts</h1>

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