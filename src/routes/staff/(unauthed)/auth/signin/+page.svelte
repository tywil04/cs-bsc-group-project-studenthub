<script>
    import { enhance } from '$app/forms';

    let { form } = $props();
</script>

<svelte:head>
    <title>Sign In | Staff | StudentHub</title>
</svelte:head>

<div class="bg-gradient-alt flex min-h-full flex-row justify-center">
    <form use:enhance method="POST" class="max-w-full w-full md:max-w-[55%] md:w-[55%] lg:max-w-[35%] lg:w-[35%] grid grid-cols-2 m-5 md:m-auto p-5 md:p-8 h-fit gap-4 gap-y-5 shadow bg-neutral-100 border border-neutral-200 rounded-xl">
        <h1 class="col-span-2 mb-6 text-2xl font-bold">Staff Sign In</h1>

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

        <p class="mt-6 col-span-2">Are you a user and have gotten lost? <a href="/auth/signin">User sign in here!</a></p>

        <button class="col-span-2 bg-blue-500 text-white mt-6">Sign in</button>
    </form>
</div>