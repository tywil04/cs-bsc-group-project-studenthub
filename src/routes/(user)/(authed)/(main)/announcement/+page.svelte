<script>
    import Announcement from "$lib/components/Announcement.svelte";

    let { data } = $props();
</script>

<svelte:head>
    <title>Announcements | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Announcements</h1>

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