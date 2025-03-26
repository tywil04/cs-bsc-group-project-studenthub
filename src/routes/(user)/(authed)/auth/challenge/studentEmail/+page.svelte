<script>
    import { enhance } from '$app/forms';

    let { data, form } = $props();
</script>

<div class="bg-gradient flex h-full flex-row justify-center px-5">
    <form use:enhance method="POST" class="max-w-full w-full md:max-w-[75%] md:w-[75%] lg:max-w-[55%] lg:w-[55%] xl:max-w-[35%] xl:w-[35%] 2xl:max-w-[25%] 2xl:w-[25%] mb-auto grid grid-cols-2 m-auto p-8 gap-4 shadow bg-neutral-100 border border-neutral-200 rounded-xl">
        <input name="challengeType" value="personal" type="hidden"/>
        
        <h1 class="col-span-2 mb-6 text-2xl font-bold">
            Student Email Challenge
        </h1>

        <p class="col-span-2 mb-6">A code has been emailed to your student email address ({data.currentUser.studentEmail}). To verify you're a student and that you have access to the student email address provided, please enter the code we have sent you. The code expires in 15 minutes.</p>

        <div class="col-span-2 flex flex-col">
            <label for="code" class="form-label">Code</label>
            <input name="code" id="code" type="text" required placeholder="123456" class="form-input"/>
            <span class:hidden={!form?.errors?.code} class="form-warning">
                {form?.errors?.code}
            </span>
        </div>

        <button class="col-span-2 bg-blue-500 text-white mt-6">Verify student email address</button>
    </form>
</div>