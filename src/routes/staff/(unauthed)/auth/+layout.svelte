<script>
    let { children } = $props();
</script>

<nav class="bg-neutral-100 border-b border-neutral-200/75 w-auto h-[64px] flex flex-row px-4">
    <div class="mr-auto">
        <a href="/staff/dashboard" class="!text-black hover:!opacity-100 font-bold h-16 leading-16 text-lg">StudentHub | Staff</a>
    </div>

    <div></div>

    <div class="ml-auto flex flex-row gap-3">
        <a href="/auth/signin" class="h-fit my-auto button bg-gray-200 !text-black">User Sign in</a>

        <a href="/auth/signup" class="h-fit my-auto button bg-gray-200 !text-black">User Sign up</a>
    </div>
</nav>

<main class="h-[calc(100%_-_65px)] overflow-auto">
    {@render children()}
</main>