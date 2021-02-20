<template>
  <div class="container">
    <p v-if="isLoadingUsers">Loading...</p>

    <div v-else>
      <div class="users-wrapper">
        <div v-for="{ id, firstName, lastName, picture } in users" :key="id" class="user">
          <router-link :to="`/user/${id}`">
            <div class="user-inner">
              <img :src="`${picture}`" alt="avatar" />
              <div>
                <span>{{ firstName }}</span>
                <span>{{ lastName }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="pagination">
        <button @click="currentPage = currentPage - 1" :disabled="currentPage == 0">
          &lt;&lt;Back
        </button>
        <span>{{ currentPage + 1 }}</span>
        <button @click="currentPage = currentPage + 1" :disabled="currentPage == 999">
          Next&gt;&gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "Home",
  data() {
    return {
      currentPage: 0,
      pageCount: 999,
    }
  },
  mounted() {
    this.$store.dispatch({
      type: "loadUsers",
      page: this.currentPage,
    })
  },
  computed: mapState(["users", "isLoadingUsers", "usersError"]),
  watch: {
    currentPage() {
      console.log(this.currentPage)
      this.$store.dispatch({
        type: "loadUsers",
        page: this.currentPage,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.users-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 320px);
  }

  @media (max-width: 480px) {
    display: block;
    width: 280px;
  }
}

.user-inner {
  border: 1px solid transparent;
  border-radius: 10px;
  box-shadow: 0px 3px 17px -3px rgba(0, 0, 0, 0.75);

  img {
    width: 100%;
    height: 250px;
    border-radius: 10px 10px 0 0;
  }

  > div {
    padding: 1rem 0.3rem;

    span {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
}

.pagination {
  text-align: center;
  margin: 3rem 0;

  > button {
    width: 100px;
    padding: 0.8rem 0.5rem;
    background: transparent;
    color: #000;
    border: 1px solid orangered;
    border-radius: 3px;
    transition: 1s ease-in-out;
    // outline: none;

    &:hover {
      background: orangered;
      color: #fff;
      border: 1px solid transparent;
    }
  }

  span {
    font-family: "Akaya Kanadaka", cursive;
    font-size: 2rem;
    display: inline-block;
    padding: 0 0.5rem;
  }
}
</style>
