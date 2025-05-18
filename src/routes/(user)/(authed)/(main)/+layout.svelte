<script>
    import { page } from '$app/stores';  

    let { children, data } = $props();
</script>

<nav class="bg-neutral-100 border-b border-neutral-200/75 w-auto h-[64px] flex flex-row px-4">
    <div class="mr-auto">
        <a href="/home" class="!text-black hover:!opacity-100 font-bold h-16 leading-16 text-lg">StudentHub</a>
    </div>

    <div></div>

    <div class="ml-auto flex flex-row gap-3">
        <a href="/auth/signout" class="h-fit my-auto button bg-gray-200 !text-red-600">Sign out</a>
    </div>
</nav>

<div class="flex flex-row !h-[calc(100%_-_65px)] ">
    <aside class="gap-2 ml-auto !max-h-[calc(100%_-_56px)] flex flex-col max-w-full w-45 h-full border-r border-neutral-200/75 p-7 bg-gray-50">
        <a href="/home" class:nav-link-selected={$page.url.pathname.startsWith(`/home`)} class="nav-link">Home</a>

        <a href="/user/search" class:nav-link-selected={$page.url.pathname.startsWith(`/user/search`)} class="nav-link">User Search</a>

        <a href="/announcement" class:nav-link-selected={$page.url.pathname.startsWith(`/announcement`)} class="nav-link">Announcements</a>

        <a href="/accomodationpost" class:nav-link-selected={$page.url.pathname.startsWith(`/accomodationpost`)} class="nav-link">Accommodation Posts</a>

        <a href="/jobpost" class:nav-link-selected={$page.url.pathname.startsWith(`/jobpost`)} class="nav-link">Job Posts</a>

        <a href="/dealpost" class:nav-link-selected={$page.url.pathname.startsWith(`/dealpost`)} class="nav-link">Deal Posts</a>

        <a href="/user/{data.currentUser.id}" class:nav-link-selected={$page.url.pathname.startsWith(`/user/${data.currentUser.id}`)} class="nav-link">My Profile</a>
    </aside>
    
    <main class="!h-full !max-h-[calc(100%_-_56px)] !overflow-auto mr-auto max-w-full w-full md:max-w-[85%] bg-gray-50 md:w-[85%] lg:max-w-[65%] lg:w-[65%] xl:max-w-[55%] xl:w-[55%] p-7">
        {@render children()}
    </main>
</div>