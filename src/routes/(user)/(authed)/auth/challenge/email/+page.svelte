<script>
    import { enhance } from '$app/forms';

    let { data, form } = $props();
</script>

<svelte:head>
    <title>Email Verification | StudentHub</title>
</svelte:head>

<div class="bg-gradient flex h-full flex-row justify-center px-5">
    <div class="flex flex-col max-w-full w-full md:max-w-[75%] md:w-[75%] lg:max-w-[55%] lg:w-[55%] xl:max-w-[35%] xl:w-[35%] 2xl:max-w-[25%] 2xl:w-[25%] mb-auto m-auto p-8 gap-4 shadow bg-neutral-100 border border-neutral-200 rounded-xl">
        <form use:enhance method="POST" action="?/verify" class="grid grid-cols-2">
            <h1 class="col-span-2 mb-6 text-2xl font-bold">
                Personal Email Challenge
            </h1>

            <p class="col-span-2 mb-6">A code has been emailed to your personal email address ({data.currentUser.email}). To verify you have access to the email address provided, please enter the code we have sent you. The code expires in 15 minutes.</p>

            <div class="col-span-2 flex flex-col">
                <label for="code" class="form-label">Code</label>
                <input name="code" id="code" type="text" required placeholder="123456" class="form-input"/>
                <span class:hidden={!form?.errors?.code} class="form-warning">
                    {form?.errors?.code}
                </span>
            </div>

            <button class="col-span-2 bg-blue-500 text-white mt-6">Verify personal email address</button>
        </form>

        <form use:enhance method="POST" action="?/resendEmail" class="mt-6">
            <button type="submit" class="!p-0 !m-0">Can't find the verification email? Request a new email</button>
        </form>
    </div>
</div>