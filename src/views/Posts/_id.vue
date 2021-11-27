<template>
  <main class="pt-50 pb-50">
    <div class="container">
      <div class="title-30 mb-20">
        <template v-if="id"> Edit </template>
        <template v-else> Create </template>
        Post
      </div>

      <div class="content-card">
        <!-- if i had more time, I would implement a wysiwyg text editor instead of textarea -->
        <ui-input
          v-for="input in formSchema"
          :key="input.value"
          v-model="formData[input.value]"
          :label="input.label"
          :type="input.type"
          class="mb-20"
        />

        <div class="row-wrap mt-40">
          <ui-button class="mr-10" :loading="loading" @click="savePost"
            >Save</ui-button
          >
          <ui-button color="grey" to="/posts">Return</ui-button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "PostsEdit",

  created() {
    if (this.id) {
      this.getPost();
    }
  },

  data: (vm) => ({
    id: isNaN(+vm.$route.params.id) ? "" : vm.$route.params.id,
    loading: false,

    formData: {
      title: "",
      body: "",
      userId: 1,
    },

    formSchema: [
      {
        value: "title",
        label: "Post title:",
        type: "text",
      },

      {
        value: "body",
        label: "Post content:",
        type: "textarea",
      },
    ],
  }),

  components: {
    UiInput: () => import("@src/components/Ui/UiInput"),
    UiButton: () => import("@src/components/Ui/UiButton"),
  },

  methods: {
    ...mapMutations({
      showAlert: "alert/showAlert",
    }),

    async getPost() {
      try {
        this.formData = await this.$api.getPost(this.id);
      } catch (e) {

        this.showAlert({
          type: "error",
          message: `Error: Unable to load post by id ${this.id}`,
          timer: 3000,
        });
      }
      
    },

    async savePost() {
      this.loading = true;

      try {
        if (this.id) {
          await this.$api.updatePost(this.id, this.formData);
        } else {
          await this.$api.createPost(this.id, this.formData);
        }

        this.showAlert({
          type: "success",
          message: "Saved successfully",
          timer: 3000,
        });
      } catch (e) {
        this.showAlert({
          type: "error",
          message: "Error: Unable to save posts",
          timer: 3000,
        });
      }

      this.loading = false;
    },
  },
};
</script>
