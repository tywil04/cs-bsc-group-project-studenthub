<script>
    let { label, id, name, required, error, description, klass, data, selectedValue, labelKey="label", valueKey="value", disabledKey="disabled", enableFilter=false, selectPrompt=null, showFilterLabel=true, ...other } = $props();

    let filterQuery = $state("");
    let filteredData = $derived(data.filter(dataItemFilter))

    function dataItemFilter(item) {
        const label = item[labelKey].trim().toLowerCase()
        const query = filterQuery.toLowerCase()
        return label.includes(query)
    }
</script>

<div class="{klass} grid grid-cols-2 w-full gap-4">
    {#if enableFilter} 
        <div class="flex flex-col">
            {#if showFilterLabel}
                <label for="{id}Filter" class="form-label" title="{label} Filter">{label} Filter</label>
            {/if}
            
            <input bind:value={filterQuery} type="text" class="form-input" placeholder="university"/>
        </div>
    {/if}

    <div class:col-span-2={!enableFilter} class="flex flex-col">
        {#if label}
            <label for={id} class="form-label" title={label}>{label}</label>
        {/if}

        <select {name} {id} {required} {...other} class="form-input h-6">
            {#if selectPrompt && !selectedValue}
                <option selected disabled>{selectPrompt}</option>
            {/if}

            {#each filteredData as item}
                <option selected={item[valueKey] === selectedValue} disabled={item[disabledKey]} value={item[valueKey]}>{item[labelKey]}</option>
            {/each}
        </select>

        {#if description}
            <span class="form-description">{description}</span>
        {/if}

        {#if error}
            <span class="form-warning">{error}</span>
        {/if}
    </div>
</div>