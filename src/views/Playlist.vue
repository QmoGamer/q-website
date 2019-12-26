<template>
  <div>
    <h1>This is an playlist page</h1>
    <div v-for="(item, index) in playlist" :key="index">
      <h2 >{{item.title}}</h2>
      <iframe width="560" height="315" :src="item.url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Home extends Vue {
  playlist: Array<object> = [];

  mounted() {
    this.a();
  }

  a() {
    axios.get('/playlist').then((res: any) => this.playlist = res.data)
  }
}
</script>