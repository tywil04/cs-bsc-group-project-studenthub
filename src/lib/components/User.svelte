<script>
    let { user } = $props()
</script>

<a href="/user/{user.id}" class="!text-black p-3 flex flex-row gap-3 h-fit shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl">
    {#if user.images.length > 0}
        <img src="/image/{user.images[0].id}" alt="{user.firstName} {user.lastName} Profile Image" class="h-15 w-15 rounded-full"/>
    {:else}
        <div class="h-15 w-15 rounded-full bg-gray-200"></div>
    {/if}

    <div class="flex flex-col my-auto">
        <p><span class="font-semibold">{user.firstName} {user.lastName}</span></p>
        
        <p class="text-sm text-gray-500 mt-2">{user.username}</p>
    </div>
</a>