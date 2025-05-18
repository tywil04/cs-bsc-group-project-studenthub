<script>
    import { page } from '$app/stores';  

    let { children, data } = $props();
</script>

<svelte:head>
    <title>Staff | StudentHub</title>
</svelte:head>

<nav class="bg-neutral-100 border-b border-neutral-200/75 w-auto h-[64px] flex flex-row px-4">
    <div class="mr-auto">
        <a href="/staff/dashboard" class="!text-black hover:!opacity-100 font-bold h-16 leading-16 text-lg">StudentHub | Staff</a>
    </div>

    <div></div>

    <div class="ml-auto">
        <a href="/staff/auth/signout" class="leading-16">Sign out</a>
    </div>
</nav>

<div class="flex flex-row !h-[calc(100%_-_65px)] ">
    <aside class="gap-2 ml-auto !max-h-[calc(100%_-_56px)] flex flex-col max-w-full w-45 h-full border-r border-neutral-200/75 p-7 bg-gray-50">
        <a href="/staff/dashboard" class:nav-link-selected={$page.url.pathname.startsWith(`/staff/dashboard`)} class="nav-link">Dashboard</a>

        <a href="/staff/report" class:nav-link-selected={$page.url.pathname.startsWith(`/staff/report`)} class="nav-link">Reporting</a>

        <a href="/staff/announcement" class:nav-link-selected={$page.url.pathname.startsWith(`/staff/announcement`)} class="nav-link">Announcements</a>

        <a href="/staff/accomodationpost" class:nav-link-selected={$page.url.pathname.startsWith(`/staff/accomodationpost`)} class="nav-link">Accommodation Posts</a>

        <a href="/staff/jobpost" class:nav-link-selected={$page.url.pathname.startsWith(`/staff/jobpost`)} class="nav-link">Job Posts</a>

        <a href="/staff/dealpost" class:nav-link-selected={$page.url.pathname.startsWith(`/staff/dealpost`)} class="nav-link">Deal Posts</a>
    </aside>
    
    <main class="!h-full !max-h-[calc(100%_-_56px)] !overflow-auto mr-auto max-w-full w-full md:max-w-[85%] bg-gray-50 md:w-[85%] lg:max-w-[65%] lg:w-[65%] xl:max-w-[55%] xl:w-[55%] p-7">
        {@render children()}
    </main>
</div>