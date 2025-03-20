<script>
    let { children } = $props();
</script>

<nav class="bg-neutral-100 border-b border-neutral-200/75 w-auto h-[64px] flex flex-row px-4">
    <div class="mr-auto">
        <!-- right -->

        <a href="/app" class="!text-black hover:!opacity-100 font-bold h-16 leading-16 text-lg">StudentHub</a>
    </div>

    <div>
        <!-- centre -->
    </div>

    <div class="ml-auto">
        <!-- left -->
    </div>
</nav>

<main class="h-[calc(100%_-_65px)] overflow-auto">
    {@render children()}
</main>