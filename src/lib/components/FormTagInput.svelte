<script>
    let { label, id, name, required, placeholder, error, description, klass, max=10, minlength=3, maxlength=16, ...other } = $props();

    let tags = $state([])
    let value = $state("")
    let resultValue = $state("")

    function handleInput() {
        if (tags.length >= max) {
            error = `You cannot have more than ${max} tags`
            value = ""
        } else {
            error = ""
        }

        const trimmed = value.trim()
        if (value.endsWith(" ") && trimmed !== "") {
            if (tags.includes(trimmed)) {
                error = "Tags have to be unique"
            } else if (trimmed.length > maxlength) {
                error = `Tag length cannot be more than ${maxlength}`
            } else if (trimmed.length < minlength) {
                error = `Tag length cannot be less than ${minlength}`
            } else if (!(/^[a-zA-Z0-9\_]*$/.test(trimmed))) {
                error = `Tags can only contain letters, numbers and '_'`
            } else {
                addTag(trimmed)
            }
            value = ""
        }
    }

    function addTag(tag) {
        tags.push(tag)
        resultValue = JSON.stringify(tags)
    }

    function removeTag(tag) {
        tags.splice(tags.indexOf(tag), 1)
    }
</script>

<div class="{klass} flex flex-col">
    {#if label}
        <label for={id} class="form-label" title={label}>{label}</label>
    {/if}

    <input bind:value={value} oninput={handleInput} name="{name}Internal" id="{id}Internal" type="text" {required} {placeholder} {...other} class:!rounded-b-none={tags?.length > 0} class="form-input"/>

    <input bind:value={resultValue} {name} {id} type="text" hidden/>

    {#if tags.length > 0}
        <div class="form-input !p-1.5 !rounded-t-none !border-t-0">
            <p class="form-label mb-1.5">
                Selected Tag{tags.length > 1 ? "s" : ""}
                (<span class="form-description mt-1.5">Click tag to remove</span>)
            </p>

            <div class="flex flex-row flex-wrap gap-1.5">
                {#each tags as tag}
                    <button type="button" onclick={() => removeTag(tag)} class="tag tag-removeable">{tag}</button>
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