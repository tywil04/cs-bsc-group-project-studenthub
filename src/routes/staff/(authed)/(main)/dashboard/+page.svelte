<script>
    let { data } = $props();
</script>

<svelte:head>
    <title>Dashboard | Staff | StudentHub</title>
</svelte:head>

<p>Welcome, {data.currentStaff.firstName} {data.currentStaff.firstName}! Use the navigation to the left to find where you need to be.</p>