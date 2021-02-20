<template>
  <div class="container">
    <div>
      <p v-if="isLoadingUser">Loading...</p>

      <div v-else class="user-wrapper">
        <img :src="user.picture" width="300" height="300" alt="" />

        <div>
          <p>
            Name: <span>{{ user.firstName }}</span>
          </p>
          <p>
            Last name: <span>{{ user.lastName }}</span>
          </p>
          <p>
            id: <span>{{ user.id }}</span>
          </p>
          <p>
            Gender: <span>{{ user.gender }}</span>
          </p>
          <p>
            Email: <span>{{ user.email }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "User",
  mounted() {
    this.$store.dispatch({
      type: "loadUser",
      id: this.$route.params.id,
    })
  },
  computed: mapState(["user", "isLoadingUser"]),
}
</script>

<style lang="scss" scoped></style>
