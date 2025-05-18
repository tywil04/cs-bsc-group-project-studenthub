<script>
    import { enhance } from "$app/forms";
    import FormFileInput from "$lib/components/FormFileInput.svelte";
    import FormInput from "$lib/components/FormInput.svelte";
    import FormTagInput from "$lib/components/FormTagInput.svelte";

    let { action, open=$bindable(false), form } = $props();

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
    <form use:enhance method="POST" action="/post?/create" enctype="multipart/form-data" class="flex flex-col h-fit gap-4 gap-y-5 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl p-5">
        <h1 class="font-semibold text-lg -mb-5">New Post</h1>

        <FormInput label="Post Contents" id="content" name="content" type="textarea" description="Maximum number of characters is 256" maxlength="256" required placeholder="What are you wanting to post about?" error={form?.errors?.content} klass="[&>textarea]:h-30"/>
    
        <FormFileInput label="Pictures" id="images" name="images" max="4" description="Maximum number of pictures is 4" multiple accept="image/*" error={form?.errors?.images}/>

        <FormTagInput label="Tags" id="tags" name="tags" maxlength={5} description="Maximum number of tags is 5" error={form?.errors?.tags}/>

        <div class="flex flex-col mt-3 gap-3">
            <button class="bg-blue-500 text-white button-small">Post!</button>
            <button onclick={() => open = false} type="button" class="bg-neutral-200 text-black button-small">Cancel</button>
        </div>
    </form>
</dialog>