<template>
  <Intro/>
  <MissionVission/>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Intro from '@/components/about/intro.vue';
import MissionVission from '@/components/about/missionvission.vue';

onMounted(() => document.title = "JRF | About")
</script>
