<template>
  <li v-if="node" >
    <div class="node">{{ node.data }}</div>
    <ul>
      <Node v-if="node.left" :node="node.left" class="left"></Node>
      <li v-else class="left"><div class="node is-null">{{ 'null' }}</div></li>
      <Node v-if="node.right" :node="node.right" class="right"></Node>
      <li v-else class="right"><div class="node is-null">{{ 'null' }}</div></li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'Node',
  props: ['node']
}
</script>

<style lang="scss">
ul {
  display: flex;
  li {
    flex: 1;
  }
}
</style>