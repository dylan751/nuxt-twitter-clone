<template>
  <div>
    <TweetItemActionsIcon color="blue">
      <template v-slot:icon="{ classes }">
        <ChatIcon :class="classes" />
      </template>

      <template v-slot:default> 5 </template>
    </TweetItemActionsIcon>
  </div>
</template>

<script setup>
import { ChatIcon } from "@heroicons/vue/solid";
</script>
