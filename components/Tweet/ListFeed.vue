<template>
  <div>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">No tweets 🥲</p>
    </div>
    <div
      v-else
      class="pb-4 border-b hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300"
      :class="[twitterBorderColor, defaultTransition]"
      v-for="tweet in props.tweets"
      :key="tweet.id"
    >
      <TweetItem :tweet="tweet" compact />
    </div>
  </div>
</template>
<script setup>
const { twitterBorderColor, defaultTransition } = useTailwindConfig();

const props = defineProps({
  tweets: {
    type: Array,
    required: true,
  },
});

const isEmptyArray = computed(() => props.tweets.length === 0);
</script>
