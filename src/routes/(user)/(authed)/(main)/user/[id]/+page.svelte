<script>
    import { enhance } from '$app/forms';
    import Post from "$lib/components/Post.svelte"
    import ProfileDialog from '$lib/dialogs/ProfileDialog.svelte';

    const { data } = $props();

    let profileDialogOpen = $state(false)
</script>

<svelte:head>
    <title>{data.user.firstName} {data.user.lastName} ({data.user.username}) | StudentHub</title>
</svelte:head>

<div class="!w-full bg-neutral-50 flex min-h-full flex-col *:last:mb-auto justify-center gap-7">
    <h1 class="font-bold text-2xl -mb-5">{data.user.id == data.currentUser.id ? "My": "User"} Profile</h1>

    {#if data.currentUserRelationToUser == "blocked"}
        <div class="h-fit gap-4 gap-y-5 shadow-xs bg-red-100 border border-red-200/75 rounded-xl">
            <p class="px-5 py-3 text-red-900">You blocked this user. You won't be able to see / interact with anything they do.</p>
        </div>
    {/if}

    {#if data.currentUser.id === data.user.id}
        <button onclick={() => profileDialogOpen = !profileDialogOpen} class="bg-gray-200">Update Profile Information</button>
    {/if}

    <div class="h-fit gap-4 gap-y-5 shadow-xs bg-neutral-100 border border-neutral-200/75 rounded-xl">
        <div class="h-40 border-b border-neutral-200/75">
            <div class:bg-gray-300={data.user.images.length === 0} class="h-40 rounded-t-xl relative z-10 backdrop-blur-3xl"></div>
            {#if data.user.images.length > 0}
                <img src="/image/{data.user.images[0].id}" alt="{data.user.firstName} {data.user.lastName} Profile Banner Image" class="object-fill w-full h-40 bg-gray-400 rounded-t-xl bg-center relative z-0 -top-40"/>
            {/if}
        </div>

        <div class="flex flex-row mx-5">
            <div class="w-fit justify-center py-5 md:py-8 z-50">
                <div class="rounded-full h-30 w-30 bg-gray-200 -mt-28 relative z-10 shadow-sm">
                    {#if data.user.images.length > 0}
                        <img src="/image/{data.user.images[0].id}" alt="{data.user.firstName} {data.user.lastName} Profile Image" class="rounded-full h-30 w-30"/>
                    {/if}
                </div>
    
                <p class="mt-2">
                    <span class="font-semibold">{data.user.firstName} {data.user.lastName}</span> 
                    <span class="text-sm text-gray-400 mx-1">•</span> 
                    <a href="/user/{data.user.id}/following" class="text-sm !text-black">Following {data.userFollowing}</a>
                    <span class="text-sm text-gray-400 mx-1">•</span>  
                    <a href="/user/{data.user.id}/followers" class="text-sm !text-black">Followers {data.userFollowers}</a>
                </p>
                
                <p class="text-sm text-gray-500 mt-2">{data.user.username}</p>
    
                {#if data.user.profileAboutMe && data.currentUserRelationToUser != "blocked"}
                    <p class="text-smtext-center mt-5">"{data.user.profileAboutMe}"</p>
                {/if}
            </div>

            {#if data.user.id != data.currentUser.id}
                <div class="ml-auto w-fit mt-5 gap-3 flex flex-row h-fit">
                    <form use:enhance method="POST" action="?/toggleFollow">
                        <button type="submit" disabled={data.currentUserRelationToUser == "blocked"} class="bg-neutral-200 text-black w-fit button-small">
                            {data.currentUserRelationToUser == "followed" ? "Unfollow" : "Follow"}
                        </button>
                    </form>

                    <form use:enhance method="POST" action="?/toggleBlock">
                        <button type="submit" class="bg-red-500 text-white w-fit button-small">{data.currentUserRelationToUser == "blocked" ? "Unblock" : "Block"}</button>
                    </form>
                </div>
            {/if}
        </div>
    </div>

    <div class="h-fit flex flex-col gap-7">
        <h1 class="font-semibold text-lg -mb-5">Posts</h1>

        {#if data.user.posts.length === 0}
            No posts
        {:else if data.currentUserRelationToUser == "blocked"}
            You cannot view a blocked users posts
        {:else}
            {#each data.user.posts as post}
                {@const liked = post.reactions.map((r) => (
                    r.userId === data.user.id && 
                    r.type === "liked"
                )).includes(true)}

                {@const disliked = post.reactions.map((r) => (
                    r.userId === data.user.id && 
                    r.type === "disliked"
                )).includes(true)}

                <Post {post} {liked} {disliked}/>
            {/each}
        {/if}
    </div>
</div>

<ProfileDialog bind:open={profileDialogOpen} userId={data.user.id} aboutMe={data.user.profileAboutMe}/> 