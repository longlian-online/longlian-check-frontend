<script lang="ts">
    let { children } = $props()
</script>
<div class="card bg-base-300 rounded-box grid grow place-items-center">
    {@render children()}
</div>
