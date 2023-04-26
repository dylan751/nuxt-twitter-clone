<template>
  <div>
    <TweetFormInput :user="props.user" @onSubmit="handleFormSubmit" />
  </div>
</template>
<script setup>
const { postTweet } = useTweets();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

async function handleFormSubmit(data) {
  try {
    const response = await postTweet(data, {
      text: data.text,
      mediaFiles: data.mediaFiles,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
</script>
