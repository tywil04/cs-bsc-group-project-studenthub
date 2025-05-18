<script>
    import { enhance } from "$app/forms";
    import AccomodationPost from "$lib/components/AccomodationPost.svelte";
    import FormInput from "$lib/components/FormInput.svelte";

    let { data, form } = $props();
</script>

<svelte:head>
    <title>Accomodation Posts | Staff | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Accomodation Posts</h1>

    <h1 class="font-semibold text-lg -mb-5">New Accomodation Post</h1>

    <form use:enhance method="POST" action="?/create" class="h-fit flex flex-col gap-7 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl p-5">
        <FormInput label="Accomodation Post Description" description="Maximum number of characters is 256" id="description" name="description" type="textarea" required error={form?.errors?.description}/>
    
        <FormInput label="Accomodation Post Location" id="location" name="location" description="Maximum number of characters is 64" type="text" required error={form?.errors?.location}/>

        <FormInput label="Accomodation Post Price" id="price" name="price" type="text" description="Maximum number of characters is 64" required error={form?.errors?.price}/>

        <FormInput label="Accomodation Post More Info URL" id="url" name="url" type="text" required error={form?.errors?.url}/>

        <button class="bg-neutral-200 text-black button-small mt-3">Post</button>
    </form>

    <h1 class="font-semibold text-lg -mb-5">Existing Accomodation Posts</h1>

    <div class="flex flex-col gap-7">
        {#if data.accomodationPosts.length === 0}
            No accomodation posts
        {:else}
            {#each data.accomodationPosts as accomodationPost}
                <AccomodationPost {accomodationPost}/>
            {/each}
        {/if}
    </div>
</div>