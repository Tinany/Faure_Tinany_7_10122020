<template>
	<div id="app">
			<Navigation/>
	</div>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
	name: 'App',
	components: {
    Navigation
	}
}
</script>

<style scoped>
#app {
  background-color: #fff;
  box-sizing: border-box;
}
</style>