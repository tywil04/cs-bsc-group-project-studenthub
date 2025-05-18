<script>
    import { enhance } from "$app/forms";
    import Announcement from "$lib/components/Announcement.svelte";
    import FormInput from "$lib/components/FormInput.svelte";

    let { data, form } = $props();
</script>

<svelte:head>
    <title>Announcements | Staff | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Announcements</h1>

    <h1 class="font-semibold text-lg -mb-5">New Announcement</h1>

    <form use:enhance method="POST" action="?/create" class="h-fit flex flex-col gap-7 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl p-5">
        <FormInput label="Announcement Title" description="Maximum number of characters is 128" id="title" name="title" type="text" required error={form?.errors?.title}/>

        <FormInput label="Announcement Content" description="Maximum number of characters is 1024" id="content" name="content" type="textarea" required error={form?.errors?.content}/>
    
        <button class="bg-neutral-200 text-black button-small mt-3">Announce</button>
    </form>

    <h1 class="font-semibold text-lg -mb-5">Existing Announcements</h1>

    <div class="flex flex-col gap-7">
        {#if data.announcements.length === 0}
            No announcements
        {:else}
            {#each data.announcements as announcement}
                <Announcement {announcement}/>
            {/each}
        {/if}
    </div>
</div>