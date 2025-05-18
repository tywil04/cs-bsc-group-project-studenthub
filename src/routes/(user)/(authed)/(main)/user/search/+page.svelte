<script>
    import { enhance } from '$app/forms';
    import FormInput from '$lib/components/FormInput.svelte';
    import Paginate from '$lib/components/Paginate.svelte';
    import User from '$lib/components/User.svelte';

    let { data } = $props();

    let form
    let timeout
    function submitForm() {
        if (timeout) {
            clearTimeout(timeout)
        }

        if (form.value.trim() === "") {
            return
        }

        timeout = setTimeout(() => {
            form.submit()
        }, 200)
    }
</script>

<svelte:head>
    <title>User Search | StudentHub</title>
</svelte:head>

<div class="flex flex-col gap-7">
    <h1 class="font-bold text-2xl -mb-5">Users Search</h1>

    <form bind:this={form} method="GET" class="h-fit gap-4 gap-y-5 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl p-5">
        <FormInput label="User Search Query" id="query" name="query" type="text" required placeholder="stevejobs1955" oninput={submitForm} value={data.query}/>
    
        <button class="bg-neutral-200 text-black button-small mt-3">Search</button>
    </form>

    <h1 class="font-semibold text-lg -mb-5">Search Results</h1>

    {#if !data.users || data.users.length === 0}
        {#if data.query == undefined}
            <p>Enter a query to search users</p>
        {:else}
            <p>No users found for query <span class="font-semibold">{data.query}</span></p>
        {/if}
    {:else}
        <div class="flex-grow flex flex-col gap-7">
            {#each data.users as user}
                <User {user}/>
            {/each}
        </div>

        {#if data.numberOfPages > 1}
            <Paginate page={data.page} numberOfPages={data.numberOfPages} formData={{query: data.query}}/>
        {/if}
    {/if}
</div>