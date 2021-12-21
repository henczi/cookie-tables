<script lang="ts">
  import logo from "$assets/logo.svg";
  import TextInput from "$lib/controls/TextInput.svelte";
  import Row from "$lib/flex/Row.svelte";

  let val;
</script>

<div class="filter">
  <Row>
    <div flex-grow>
      <TextInput bind:value={val} />
      <TextInput bind:value={val} />
    </div>
    <img src={logo} alt="cookie-tables Logo" />
  </Row>
</div>

<main>

</main>


<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :global(html, body) {
    margin: 0;
    padding: 0;
  }
  .filter {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 5rem;
    padding: .5rem;
    border-bottom: 2px solid #888;
  }
  img {
    width: 5rem;
    height: 5rem;
  }
</style>