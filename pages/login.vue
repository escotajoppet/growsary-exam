<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Login form</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          prepend-icon="person"
          type="text"
          v-model="user.email"
          @keyup.enter="signIn"
        />

        <v-text-field
          label="Password"
          prepend-icon="lock"
          type="password"
          v-model="user.password"
          @keyup.enter="signIn"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :outlined="true"
        @click="$router.push('/register')"
      >
        Register
      </v-btn>

      <v-spacer />

      <v-btn
        color="primary"
        @click="signIn"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import {
    mapActions,
    mapMutations,
    mapState,
  } from 'vuex';

  export default {
    layout: 'nonLoggedIn',
    middleware: 'authLoggedIn',
    data() {
      return {
        user: {
          email: '',
          password: '',
        },
      };
    },
    computed: {
      ...mapState([
        'authToken',
        'notification'
      ]),
    },
    methods: {
      ...mapMutations([
        'setAuthToken',
        'setUser',
        'setNotification',
        'clearNotification',
      ]),
      ...mapActions([
        'login',
      ]),
      async signIn() {
        const response = await this.login(this.user);

        if (!response.success) {
          this.setNotification({
            type: 'error',
            message: response.error,
          });
        } else {
          this.$cookies.set('authToken', response.data.token);
          this.$cookies.set('userId', response.data.user.id);

          this.setAuthToken(response.data.token);
          this.setUser(response.data.user);

          this.setNotification({
            type: 'success',
            message: 'Logged in successfully',
          });

          this.$router.push('/topics');
        }
      },
    },
    mounted() {
      this.clearNotification();
    }
  }
</script>
