import VueRouter from 'vue-router';
import store from './store';

let routes = [
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      if(store.state.auth.user.role === 'buyer') next('/buyer');
      else if(store.state.auth.user.role === 'store') next('/store');
    }
  },
  {
    path: '/store',
    component: {
      template: '<router-view></router-view>'
    },
    children: [
      {
        path: '',
        component: require('./views/store/Dashboard.vue')
      },
      {
        path: 'tickets',
        component: require('./views/store/Tickets.vue')
      },
      {
        path: 'products',
        component: require('./views/store/Products.vue')
      }
    ]
  },
  {
    path: '/buyer',
    component: {
      template: '<router-view></router-view>'
    },
    children: [
      {
        path: '',
        component: require('./views/store/Dashboard.vue')
      },
      {
        path: 'products',
        component: require('./views/buyer/Products.vue')
      },
      {
        path: 'groups',
        component: require('./views/buyer/Groups.vue')
      },
      {
        path: 'sales',
        component: require('./views/buyer/Sales.vue')
      }
    ]
  },
  {
    path: '/login',
    component: require('./views/auth/Login.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.auth.isLoggedIn) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/logout',
    beforeEnter: (to, from, next) => {

      let action = () => {
        store.commit('logout');
        next('/login');
      };

      axios.post('/logout')
        .then(action)
        .catch(action);

    }
  },
  {
    path: '/forgot-password',
    component: require('./views/auth/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    component: require('./views/auth/ResetPassword.vue')
  },

  {
    path: '/user',
    component: require('./views/user/Profile.vue')
  },

  {
    path: '/docs',
    component: require('./views/Docs.vue')
  },

  {
    path: '/unauthorized',
    component: require('./views/Unauthorized.vue')
  },

  {
    path: '*',
    component: require('./views/NotFound.vue')
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'is-active',
  mode: 'history'
});

router.beforeEach((to, from, next) => {

  let nextRoute;
  let publicRoutes = ['/login', '/reset-password', '/forgot-password'];
  let user = store.state.auth.user;

  // Enforce authorization and redirect to previous path
  if(
    publicRoutes.indexOf(to.path) === -1 &&
    !store.state.auth.isLoggedIn
  ) {
    nextRoute = '/login?path=' + to.fullPath;
  }

  // Make sure users can't spoof their role
  else if(
    to.path.indexOf('buyer') > -1 && user.role !== 'buyer' ||
    to.path.indexOf('store') > -1 && user.role !== 'store'
  ) {
    nextRoute = '/unauthorized';
  }

  next(nextRoute);

});

// Reset the notification
// router.afterEach((to, from, next) => {
//   store.state.notification = null;
//   next();
// });


export default router;