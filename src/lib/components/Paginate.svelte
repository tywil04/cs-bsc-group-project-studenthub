<script>
    let { page, numberOfPages, formData={} } = $props();

    let form = $state();

    function submitDelayed() {
        setTimeout(() => form.submit(), 300)
    }

    function previousPage() {
        if (page <= 1) {
            return
        }
        page--
        submitDelayed()
    }

    function nextPage() {
        if (page >= numberOfPages) {
            return
        }
        page++
        submitDelayed()
    }
</script>

<div class="flex flex-row h-fit gap-3 justify-center">
    <form bind:this={form} method="GET" aria-hidden="true" class="hidden">
        {#each Object.entries(formData) as [key, value]}
            <input name={key} type="hidden" value={value}/>
        {/each}
        <input name="page" type="hidden" bind:value={page}/>
    </form>
    
    <button disabled={page <= 1} onclick={previousPage} class="bg-neutral-100 border border-neutral-200/75 rounded-md w-fit h-fit !py-1 !px-2">Previous Page</button>

    <div class="flex flex-row">
        <p class="!m-0 !py-1 px-2 text-sm">Page</p>
        <input type="number" bind:value={page} oninput={submitDelayed} class="text-sm !h-5 !w-11 bg-neutral-100 border border-neutral-200/75 rounded-md !py-1 !px-2" min={1} max={numberOfPages} minlength="1" maxlength={String(numberOfPages).length}/>
        <p class="!m-0 !py-1 px-2 text-sm">out of {numberOfPages}</p>
    </div>

    <button disabled={page >= numberOfPages} onclick={nextPage} class="bg-neutral-100 border border-neutral-200/75 rounded-md w-fit h-fit !py-1 !px-2">Next Page</button>
</div>