<script>
  import Flex from "./Flex.svelte";

  export let mainAxis = 'initial';
  export let crossAxis = 'initial';

  export let center = false;
  export let left = false;
  export let right = false;
  export let top = false;
  export let bottom = false;

  $: main = top ? 'start' : bottom ? 'end' : center ? 'center' : mainAxis;
  $: cross = left ? 'flex-start' : right ? 'flex-end' : center ? 'center' : crossAxis;
</script>

<Flex column {main} {cross}><slot></slot></Flex>