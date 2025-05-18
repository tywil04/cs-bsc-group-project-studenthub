<script>
    let { jobPost } = $props()
</script>

<div class="shadow-xs bg-neutral-100 border border-neutral-200/75 p-5 rounded-xl">
    <p class="mb-3 text-sm">
        <span>Pay: {jobPost.pay}</span>
        <span class="text-sm text-gray-400 mx-1">•</span> 
        <span>Location: {jobPost.location}</span>
        <span class="text-sm text-gray-400 mx-1">•</span> 
        <a href={jobPost.url}>Find out more here...</a>
    </p>
    
    <p>{jobPost.description}</p>
</div>