<script>
  export let value;
</script>

<input type="text" bind:value />

<style>
  input {
    font-family: inherit;
    font-size: inherit;
    padding: .5em 1em;
    color: #888;
    background-color: rgba(0, 255, 149, 0.3);
    border-radius: .75em;
    border: 2px solid rgba(0, 255, 149, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  input:focus {
    border: 2px solid rgba(0, 255, 149, 1);
  }
</style>
