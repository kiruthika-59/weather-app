<script lang="ts">
  let { city = $bindable(), getWeather } = $props<{
    city: string;
    getWeather: () => void;
  }>();
</script>

<div class="search-box">
  <input
    type="text"
    bind:value={city}
    placeholder="Search city..."
    onkeydown={(e) => e.key === "Enter" && getWeather()}
  />

  <button onclick={getWeather}> Search </button>
</div>

<style>
  .search-box {
    display: flex;
    gap: 12px;
    margin-top: 28px;
  }
  input {
    flex: 1;
    padding: 16px;
    border: none;
    outline: none;
    border-radius: 18px;
  }
  button {
    padding: 16px 22px;
    border: none;
    border-radius: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s ease;
  }
</style>
