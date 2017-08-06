<template>
  <div>
    <form class="login-form" role="form" v-on:submit.prevent="onSubmit">
      <h1 class="title">Login</h1>
      <notification :content="feedbackContent" :type="feedbackType" :bump="feedbackBump"></notification>
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">Email Address</label>
            <p class="control">
              <input class="input" type="text" placeholder="swag@hipster.apple" required="required" v-model="username" />
            </p>
          </div>
        </div>
        <div class="column is-half">
          <div class="field">
            <label class="label">Password</label>
            <p class="control">
              <input class="input" type="password" required="required" v-model="password" />
            </p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <p class="control">
              <label class="checkbox">
                <input type="checkbox" v-model="rememberMe" />
                Remember me
              </label>
            </p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field is-grouped">
            <p class="control">
              <button class="button is-primary is-loading" disabled v-if="isWorking">Submit</button>
              <button class="button is-primary" v-else>Submit</button>
            </p>
            <p class="control">
              <button type="button" class="button is-link">
                <router-link to="/forgot-password">Forgotten Password?</router-link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>

  import Notification from '../../components/Notification.vue';

  export default {

    components: {
      Notification
    },
    data() {
      return {
        isWorking: false,
        username: 'buying@no1fitness.co.nz',
        password: '7D*FPonM9L',
        rememberMe: false,
        feedbackContent: '',
        feedbackType: '',
        feedbackBump: Date.now()
      }
    },
    mounted() {

    },

    methods: {

      resetForm() {
        this.username = '';
        this.password = '';
        this.rememberMe = false;
      },

      onAuthenticated(response) {

        this.$store.commit('login', response.data);

        let fromPath = this.$store.state.route.query.path;

        if(fromPath) {
          this.$router.replace(fromPath);
        } else {
          this.$router.replace('/');
        }

        this.resetForm();
        this.isWorking = false;
      },

      onSubmit() {

        this.isWorking = true;

        // todo add timeout to this request
        axios.post('/login', {
          username: this.username,
          password: this.password,
          rememberMe: this.rememberMe
        }).then(this.onAuthenticated)
          .catch(err => {
            this.feedbackType = 'is-danger';
            this.feedbackContent = err.response.data.message;
            this.feedbackBump = Date.now();
            this.isWorking = false;
          });
      }
    }
  }
</script>

<style lang="scss">
  .login-form {
    margin: 0 auto;
    max-width: 800px;
  }
</style>