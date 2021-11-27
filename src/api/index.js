const apiUrl = "https://jsonplaceholder.typicode.com";

// if i had more time, i would put it into a separate lib inside it's own repo, and maybe added Sentry
// Also If api were more complex, I would probably use Axios. For example, if it needs authorization Axios interceptors would be helpful

const api = {
  async getPostsList() {
    const res = await fetch(`${apiUrl}/posts`);

    if (!res.ok) {
      throw new Error();
    }

    return await res.json();
  },

  async getPost(id) {
    const res = await fetch(`${apiUrl}/posts/${id}`);

    if (!res.ok) {
      throw new Error();
    }

    return await res.json();
  },

  async createPost(id, payload) {
    const res = await fetch(`${apiUrl}/posts/${id}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!res.ok) {
      throw new Error();
    }

    return await res.json();
  },

  async updatePost(id, payload) {
    const res = await fetch(`${apiUrl}/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!res.ok) {
      throw new Error();
    }

    return await res.json();
  },

  async deletePost(id) {
    const res = await fetch(`${apiUrl}/posts/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error();
    }

    return await res.json();
  },
};

export default api;
