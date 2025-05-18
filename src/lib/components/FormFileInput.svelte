<script>
    let { label, id, name, required, placeholder, error, description, klass, multiple, accept, max=5, ...other } = $props();

    let files = $state()
    
    function fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.addEventListener("load", (event) => {
                resolve(event.target.result);
            })

            reader.addEventListener("error", (event) => {
                reject("Error reading file")
            })

            reader.readAsDataURL(file)
        });
    }

    function removeFileByName(fileName) {
        const transfer = new DataTransfer()

        for (const file of files) {
            if (file.name === fileName) {
                continue
            }
            transfer.items.add(file)
        }

        files = transfer.files
    }

    function limitNumberOfFiles() {
        if (files.length > max) {
            files = (new DataTransfer()).files
            error = `You cannot have more than ${max} files`
        } else {
            error = ""
        }
    }
</script>

<div class="{klass} flex flex-col">
    {#if label}
        <label for={id} class="form-label" title={label}>{label}</label>
    {/if}

    <input bind:files={files} onchange={limitNumberOfFiles} {name} {id} type="file" {required} {placeholder} {multiple} {accept} {...other} class:!rounded-b-none={files?.length > 0} class="form-input"/>

    {#if files?.length > 0}
        <div class="form-input !p-1.5 !rounded-t-none !border-t-0">
            <p class="form-label mb-1.5">
                File Preview{files.length > 1 ? "s" : ""}
                (<span class="form-description mt-1.5">Click file to remove</span>)
            </p>

            <div class="flex flex-row gap-1.5 overflow-x-auto">
                {#each Array.from(files) as file}
                    {#if file.type.startsWith("image/")}
                        {#await fileToDataUrl(file) then dataUrl}
                            <button type="button" onclick={() => removeFileByName(file.name)} class="aspect-square rounded-sm min-w-24 w-24 !p-0">
                                <img src={dataUrl} title={file.name} alt="Uploaded File ({file.name})" class="size-full rounded-sm object-fill object-center duration-75"/>
                            </button>
                        {/await} 
                    {:else}
                        <button type="button" onclick={() => removeFileByName(file.name)} class="aspect-square rounded-sm bg-neutral-200 min-w-24 w-24 !p-0 break-all">
                            <p title={file.name} class="text-sm truncate p-1.5">{file.name}</p>
                        </button>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}

    {#if description}
        <span class="form-description">{description}</span>
    {/if}

    {#if error}
        <span class="form-warning">{error}</span>
    {/if}
</div>