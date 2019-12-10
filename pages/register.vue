<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Register form</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Name"
          prepend-icon="person"
          type="text"
          v-model="user.name"
          @keyup.enter="signUp"
        />
        <v-text-field
          label="Email Address"
          prepend-icon="person"
          type="text"
          v-model="user.email"
          @keyup.enter="signUp"
        />
        <v-text-field
          label="Password"
          prepend-icon="lock"
          type="password"
          v-model="user.password"
          @keyup.enter="signUp"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :outlined="true"
        @click="goToLogin"
      >Back to Login</v-btn>
      <v-spacer />
      <v-btn
        color="primary"
        @click="signUp"
      >Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations,
  } from 'vuex';
  import axios from 'axios';

  export default {
    layout: 'nonLoggedIn',
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: '',
        },
      };
    },
    computed: {
      ...mapState([
        'notification',
      ]),
    },
    methods: {
      ...mapMutations([
        'setNotification',
        'clearNotification',
      ]),
      ...mapActions([
        'register',
      ]),
      goToLogin() {
        this.setNotification({
          type: '',
          message: '',
        });

        this.$router.push('login');
      },
      async signUp() {
        const response = await this.register(this.user);

        if (!response.success) {
          this.setNotification({
            type: 'error',
            message: response.error,
          });
        } else {
          this.user = {
            name: '',
            email: '',
            password: '',
          }

          this.setNotification({
            type: 'success',
            message: 'Successfully registered user.',
          });
        }
      }
    },
    mounted() {
      this.clearNotification();
    },
  }
</script>
