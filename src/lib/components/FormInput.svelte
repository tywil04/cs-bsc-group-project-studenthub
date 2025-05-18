<script>
    let { label, id, name, type, required, placeholder, error, description, klass, ...other } = $props();
</script>

<div class="{klass} flex flex-col">
    {#if label}
        <label for={id} class="form-label" title={label}>{label}</label>
    {/if}

    {#if type === "textarea"}
        <textarea {name} {id} {required} {placeholder} {...other} class="form-input"></textarea>
    {:else}
        <input {name} {id} {type} {required} {placeholder} {...other} class="form-input"/>
    {/if}

    {#if description}
        <span class="form-description">{description}</span>
    {/if}

    {#if error}
        <span class="form-warning">{error}</span>
    {/if}
</div>