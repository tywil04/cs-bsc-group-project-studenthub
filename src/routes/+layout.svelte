<script>
    import "../app.css";

    let { children } = $props();
</script>

<svelte:head>
    <title>For Students by Students | StudentHub</title>
</svelte:head>

{@render children()}