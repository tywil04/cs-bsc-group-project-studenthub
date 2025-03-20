<script>
    let { children } = $props();
</script>

<nav>
    <div class="mr-auto">
        <!-- right -->

        <a href="/staff/app" class="!text-black hover:!opacity-100 font-bold h-16 leading-16 text-lg">StudentHub</a>
    </div>

    <div>
        <!-- centre -->
    </div>

    <div class="ml-auto">
        <!-- left -->
    </div>
</nav>

<main>
    {@render children()}
</main>