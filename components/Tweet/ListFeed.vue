<template>
  <div>
    <div
      class="pb-4 border-b hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300"
      :class="[twitterBorderColor, defaultTransition]"
      v-for="tweet in props.tweets"
      :key="tweet.id"
    >
      <TweetItem :tweet="tweet" />
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
</script>
