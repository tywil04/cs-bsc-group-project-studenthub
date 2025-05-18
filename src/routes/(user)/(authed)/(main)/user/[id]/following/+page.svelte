<script>
    import User from "$lib/components/User.svelte";

    const { data } = $props();
</script>

<svelte:head>
    <title>{data.user.firstName} {data.user.lastName} ({data.user.username}) Following | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">{data.user.firstName} {data.user.lastName} ({data.user.username}) Following</h1>

    <h1 class="font-semibold text-lg -mb-5">Users</h1>

    {#each data.user.relations as relation}
        <User user={relation.user2}/>
    {/each}
</div>