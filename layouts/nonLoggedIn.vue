<template>
  <v-app dark>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-alert
              border="right"
              :color="notification.type"
              elevation="10"
              v-if="notification.message"
            >
              <span v-html="notification.message"></span>
            </v-alert>
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState([
        'notification',
      ]),
    },
  };
</script>
