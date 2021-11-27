<template>
  <main class="pt-50 pb-50">
    <div class="container">
      <div class="title-30 mb-20">Posts</div>

      <div class="content-card mb-20">
        <ui-button to="/posts/create">
          <mdicon name="plus" size="16" class="mr-5" /> Add post</ui-button
        >
      </div>

      <div class="content-card">
        <ui-table
          :list="posts"
          :headers="headers"
          @select="goToEdit"
          @delete="deletePost"
        />
      </div>
    </div>

    <ui-loader cover v-if="loading" />
  </main>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Posts",

  components: {
    UiTable: () => import("@src/components/Ui/UiTable"),
    UiButton: () => import("@src/components/Ui/UiButton"),
    UiLoader: () => import("@src/components/Ui/UiLoader"),
  },

  data: () => ({
    loading: false,
    posts: [],
    headers: [
      {
        text: "Id",
        value: "id",
      },
      {
        text: "Post Title",
        value: "title",
      },
    ],
  }),

  async created() {
    this.getPosts();
  },

  methods: {
    ...mapMutations({
      showAlert: "alert/showAlert",
    }),

    async getPosts() {
      this.loading = true;

      try {
        this.posts = await this.$api.getPostsList();
      } catch (e) {
        this.showAlert({
          type: "error",
          message: "Error: Unable to load posts",
          timer: 3000,
        });
      }

      this.loading = false;
    },

    async deletePost(id) {
      if (this.loading) {
        return;
      }

      this.loading = true;

      try {
        await this.$api.deletePost(id);

        this.showAlert({
          type: "success",
          message: "Post was successfully deleted",
          timer: 2000,
        });
      } catch (e) {
        this.showAlert({
          type: "error",
          message: "Error: Unable to delete  post",
          timer: 3000,
        });
      }

      this.getPosts();
    },

    goToEdit(id) {
      this.$router.push(`/posts/${id}`);
    },
  },
};
</script>
