<template>
  <div>
    <h1 class="title">Forgot Password</h1>
    <form @submit.prevent="onSubmit">
      <div class="columns">
        <div class="column is-one-third">
          <div class="field">
            <label class="label">Email Address:</label>
            <input type="email" class="input" v-modal="username" required autofocus>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-primary">Submit</button>
            </p>
            <p class="control">
              <button class="button is-link">
                <router-link to="/login">Cancel</router-link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
  export default {
    mounted() {
      console.log('Component mounted.')
    },
    methods: {
      onSubmit() {
      }
    }
  }
</script>