<script>
    import { enhance } from "$app/forms";
    import FormSelect from "$lib/components/FormSelect.svelte";

    let { postId, open=$bindable(false), form } = $props();

    const reportTypes = [
        {label: "Spam", value: "spam"}, 
        {label: "Harassment", value: "harassment"}, 
        {label: "Impersonation", value: "impersonation"}, 
        {label: "Inappropriate Content", value: "inappropriateContent"}, 
        {label: "Misinformation", value: "misinformation"}
    ]

    let dialog = $state();

    $effect(() => {
        if (open) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    })
</script>
 
<dialog onclose={() => open = false} bind:this={dialog} class="flex flex-col gap-5 m-auto rounded-xl shadow-sm backdrop:bg-[rgba(0,0,0,0.5)] backdrop:backdrop-blur-xs">
    <form use:enhance method="POST" action="/post/{postId}?/report" class="flex flex-col h-fit gap-4 gap-y-5 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl p-5">
        <h1 class="font-semibold text-lg -mb-5">New Report</h1>

        <FormSelect label="Report Type" id="type" name="type" selectPrompt="Select a report type" data={reportTypes} required error={form?.errors?.type}/>

        <div class="flex flex-col mt-3 gap-3">
            <button onclick={() => open = false} class="bg-red-600 text-white button-small">Report</button>
            <button onclick={() => open = false} type="button" class="bg-neutral-200 text-black button-small">Cancel</button>
        </div>
    </form>
</dialog>