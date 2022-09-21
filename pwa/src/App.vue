<template>
  <app-header></app-header>
  <router-view></router-view>
</template>

<script lang="ts">
import useFirebase from './composables/useFirebase'
import AppHeader from './components/generic/AppHeader.vue';

export default {
    setup() {
        const { app } = useFirebase();
        return {};
    },
    components: { AppHeader }
}
</script>
