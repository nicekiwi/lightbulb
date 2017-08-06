<template>
  <div>
    <primary-nav></primary-nav>

    <div class="container">
      <breadcrumb></breadcrumb>
      <router-view></router-view>
    </div>

    <primary-footer></primary-footer>
  </div>
</template>

<script>

  import { mapState } from 'vuex';
  import PrimaryNav from '../components/PrimaryNav.vue';
  import PrimaryFooter from '../components/PrimaryFooter.vue';
  import Notification from '../components/Notification.vue';

  export default {

    components: {
      PrimaryNav, PrimaryFooter, Notification
    },

    data() {
      return {
        loaded: false
      }
    },

    mounted() {
      this.refreshAuth();
    },

    computed: mapState({
      tokenExpires: state => state.auth.tokenExpires,
      isLoggedIn: state => state.auth.isLoggedIn
    }),

    methods: {

      refreshAuth() {

        if(this.isLoggedIn) {

          let now = new Date().getTime();
          let check = this.tokenExpires - 60000;

          if(now >= check) {

            axios.post('/token-refresh').then(response => {
              this.$store.commit('updateTokenExpires', response.data.tokenExpires);
            }).catch(err => {
              this.$router.push('/logout')
            });
          }
        }

        setTimeout(this.refreshAuth, 15000);
      }
    }
  }

</script>

<style lang="scss">

  .search-clear {
    p:first-child {
      width: 75%;
    }
    p:last-child {
      width: 25%;
      .button {
        width: 100%;
      }
    }
  }

  .button-extended {
    width: 100%;
  }

  .select-extended {
    width: 100%;

    select {
      width: 100%;
    }
  }

  .table td, .table th {
    vertical-align: middle;
  }

</style>