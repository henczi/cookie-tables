<script>
  import Flex from "./Flex.svelte";

  export let mainAxis = 'initial';
  export let crossAxis = 'initial';

  export let center = false;
  export let left = false;
  export let right = false;
  export let top = false;
  export let bottom = false;

  $: main = left ? 'start' : right ? 'end' : center ? 'center' : mainAxis;
  $: cross = top ? 'flex-start' : bottom ? 'flex-end' : center ? 'center' : crossAxis;
</script>

<Flex {main} {cross}><slot></slot></Flex>