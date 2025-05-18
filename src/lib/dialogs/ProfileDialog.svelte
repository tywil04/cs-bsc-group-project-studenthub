<script>
    import { enhance } from "$app/forms";
    import FormFileInput from "$lib/components/FormFileInput.svelte";
    import FormInput from "$lib/components/FormInput.svelte";
    import FormSelect from "$lib/components/FormSelect.svelte";

    let { aboutMe, open=$bindable(false), form } = $props();

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
    <form use:enhance method="POST" action="/user?/profile" enctype="multipart/form-data" class="flex flex-col h-fit gap-4 gap-y-5 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl p-5">
        <h1 class="font-semibold text-lg -mb-5">Profile</h1>

        <FormFileInput label="Profile Picture" id="images" name="images" max="1" error={form?.errors?.images}/>

        <FormInput label="Profile About Me" id="aboutMe" name="aboutMe" value={aboutMe} description="Maximum number of characters is 128" required error={form?.errors?.aboutMe}/>

        <div class="flex flex-col mt-3 gap-3">
            <button onclick={() => open = false} class="bg-blue-500 text-white button-small">Save Profile</button>
            <button onclick={() => open = false} type="button" class="bg-neutral-200 text-black button-small">Cancel</button>
        </div>
    </form>
</dialog>