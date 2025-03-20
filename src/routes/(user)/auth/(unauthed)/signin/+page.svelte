<script>
    import { enhance } from '$app/forms';

    let { form } = $props();
</script>

<div class="flex flex-row justify-center py-10 px-5">
    <div class="flex flex-col justify-center w-full">
        <form use:enhance method="POST" class="max-w-full w-full md:max-w-[75%] md:w-[75%] lg:max-w-[55%] lg:w-[55%] xl:max-w-[35%] xl:w-[35%] mb-auto mx-auto mt-6 grid grid-cols-2 p-8 gap-4 bg-neutral-100/75 border border-neutral-200/75 rounded-xl">
            <h1 class="col-span-2 mb-6 text-2xl font-bold">Sign In</h1>

            <div class="col-span-2 flex flex-col">
                <label for="username" class="form-label">Username</label>
                <input name="username" id="username" type="text" required placeholder="stevejobs1955" class="form-input"/>
                <span class:hidden={!form?.errors?.username} class="form-warning">
                    {form?.errors?.username}
                </span>
            </div>

            <div class="col-span-2 flex flex-col">
                <label for="password" class="form-label">Password</label>
                <input name="password" id="password" type="password" required placeholder="Password123!" class="form-input"/>
                <span class:hidden={!form?.errors?.password} class="form-warning">
                    {form?.errors?.password}
                </span>
            </div>
    
            <p class="mt-6 col-span-2">Don't already have an account? <a href="/auth/signup">Sign up here!</a></p>

            <button class="col-span-2 bg-blue-500 text-white mt-6">Sign in</button>
        </form>
    </div>
</div>