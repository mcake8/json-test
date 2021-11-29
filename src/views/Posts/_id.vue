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
          :key="input.field"
          v-model="formData[input.field]"
          :label="input.label"
          :type="input.type"
          :error="input.error"
          class="mb-20"
          @blur="checkField(input)"
          @input="input.error = false"
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
        field: "title",
        label: "Post title:",
        type: "text",
        required: true,
        error: false,
      },

      {
        field: "body",
        label: "Post content:",
        type: "textarea",
        required: true,
        error: false,
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

    checkField(input) {
      if (input.required && !this.formData[input.field]) {
        input.error = true;
      }
    },

    // if i had more time, i would build more complex validation with scroll to error if needed, masked inputs, probably some validation module in store. 
    isValidForm() {
      let isValid = true;

      this.formSchema.forEach((i) => {
        if (!this.formData[i.field] && i.required) {
          i.error = true;
          isValid = false;
        }
      });

      return isValid;
    },

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

      if (!this.isValidForm()) {
        this.showAlert({
          type: "error",
          message: "Fields can't be empty",
          timer: 3000,
        });

        this.loading = false;
        return;
      }

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
