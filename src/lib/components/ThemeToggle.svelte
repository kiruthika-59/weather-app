<script lang="ts">

    import { SunDim, Moon } from "lucide-svelte";
    let {
        darkMode,toggleTheme
    } = $props<{
        darkMode: boolean;
        toggleTheme: () => void;
    }>();

</script>

<button class="theme-toggle" onclick={toggleTheme}>

    {#if darkMode}
        <SunDim size={18} />
        <span>Light</span>

    {:else}
        <Moon size={18} />
        <span>Dark</span>
    {/if}

</button>

<style>

    .theme-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px 20px;
        border: none;
        border-radius: 18px;
        cursor: pointer;
        font-weight: 600;
    }

</style>