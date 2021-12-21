<script type="ts">
  export let column = false;

  type FallbackString = string & { _?: any };

  export let main: 'center' | 'start' | 'end' | 'space-around' | 'space-between' | 'space-evenly' | FallbackString = 'start';
  export let cross: 'baseline' | 'center' | 'start' | 'end' | 'stretch' | FallbackString = 'baseline';
</script>

<div class="flex-container" class:column style="justify-content: {main}; align-items: {cross};">
  <slot></slot>
</div>

<style>
  .flex-container {
    display: flex;
  }
  .column {
    flex-direction: column;
  }

  .flex-container :global([flex-grow]) {
    flex-grow: 1;
  }
  .flex-container :global([flex-no-shrink]) {
    flex-shrink: 0;
  }
</style>