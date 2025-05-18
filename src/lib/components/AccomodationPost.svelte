<script>
    let { accomodationPost } = $props()
</script>

<div class="shadow-xs bg-neutral-100 border border-neutral-200/75 p-5 rounded-xl">
    <p class="mb-3 text-sm">
        <span>Price: {accomodationPost.price}</span>
        <span class="text-sm text-gray-400 mx-1">•</span> 
        <span>Location: {accomodationPost.location}</span>
        <span class="text-sm text-gray-400 mx-1">•</span> 
        <a href={accomodationPost.url}>Find out more here...</a>
    </p>
    
    <p>{accomodationPost.description}</p>
</div>