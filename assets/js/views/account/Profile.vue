<template>
  <div>
    <div class="columns">
      <div class="column">
        <h1 class="title">User</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column">

        <h2 class="subtitle">Details</h2>

        <p>
          <b>Role:</b><br>{{ user.role | capitalize }}<br>
          <b>Name:</b><br>{{ user.name }}<br>
          <b>Email Address:</b><br>{{ user.username }}<br>
        </p>

      </div>
      <div class="column">

        <h2 class="subtitle">Change Password</h2>

        <notification :content="feedbackContent" :type="feedbackType" :bump="feedbackBump"></notification>

        <form @submit.prevent="changePassword">
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">New Password:</label>
                <p class="control">
                  <input class="input" type="password" placeholder="" v-model="passwordNew" required>
                </p>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Confirm New Password:</label>
                <p class="control">
                  <input class="input" type="password" placeholder="" v-model="passwordNewConfirm" required>
                </p>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column is-half">
              <div class="field">
                <label class="label">Current Password:</label>
                <p class="control">
                  <input class="input" type="password" placeholder="" v-model="passwordCurrent" required>
                </p>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field">
                <p class="control">
                  <button class="button is-primary" v-if="!working">Change</button>
                  <button class="button is-primary is-loading" v-else disabled>Change</button>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  import { mapState } from 'vuex';
  import filters from '../../filters';
  import Notification from '../../components/Notification.vue';

  export default {

    components: {
      Notification
    },

    data() {
      return {
        working: false,
        passwordNew: '',
        passwordNewConfirm: '',
        passwordCurrent: '',
        feedbackContent: '',
        feedbackType: '',
        feedbackBump: Date.now()
      }
    },

    methods: {

      changePassword() {
        this.working = true;
        let done = () => {
          this.feedbackBump = Date.now();
          this.working = false;
        };

        axios.post('/user/change-password', {
          id: this.user.id,
          passwordNew: this.passwordNew,
          passwordNewConfirm: this.passwordNewConfirm,
          passwordCurrent: this.passwordCurrent
        }).then(response => {
          console.log(response);
          this.passwordNew = '';
          this.passwordNewConfirm = '';
          this.passwordCurrent = '';

          this.feedbackType = 'is-success';
          this.feedbackContent = response.data.message;
          done();
        }).catch(err => {
          this.feedbackType = 'is-danger';
          this.feedbackContent = err.response.data.message;
          done();
        });
      }

    },

    computed: mapState({
      user: state => state.auth.user
    }),

    filters
  }

</script>