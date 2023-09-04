<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <!-- Loader -->
      <LoadingPage v-if="isAuthLoading" />

      <!-- App -->
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- Left sidebar -->
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft @on-tweet="handleOpenTweetModal" />
            </div>
          </div>

          <!-- Main content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>

          <!-- Right sidebar -->
          <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>

      <AuthPage v-else />

      <UIModal :isOpen="postTweetModal" @on-close="handleModalClost">
        <TweetForm :user="user" @on-success="handleFormSuccess" />
      </UIModal>
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false);
const { useAuthUser, initAuth, useAuthLoading } = useAuth();
const isAuthLoading = useAuthLoading();
const { closePostTweetModal, usePostTweetModal, openPostTweetModal } =
  useTweets();
const user = useAuthUser();

const postTweetModal = usePostTweetModal();

onBeforeMount(() => {
  initAuth();
});

function handleFormSuccess(tweet) {
  closePostTweetModal();
}

function handleModalClost() {
  closePostTweetModal();
}

function handleOpenTweetModal() {
  openPostTweetModal();
}
</script>
