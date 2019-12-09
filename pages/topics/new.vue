<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="info"
      light
      flat
    >
      <h2>New Topic</h2>

      <v-spacer />

      <v-btn
        color="default"
        @click="$router.push('/topics')"
      >
        Back to list
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Subject"
          type="text"
          v-model="topic.subject"
          @keyup.enter="submit"
        />
        <v-text-field
          label="Description"
          type="textarea"
          v-model="topic.description"
          @keyup.enter="submit"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        @click.prevent="submit"
      >
        Add Topic
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations,
  } from 'vuex'

  export default {
    middleware: 'isLoggedIn',
    data() {
      return {
        topic: {
          subject: '',
          description: '',
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
        'createTopic'
      ]),
      async submit() {
        const response = await this.createTopic(this.topic);

        if (!response.success) {
          this.setNotification({
            type: 'error',
            message: response.error,
          });
        } else {
          this.setNotification({
            type: 'success',
            message: 'Successfully created topic.',
          });

          this.$router.push('/topics');
        }
      },
    },
    mounted() {
      this.clearNotification();
    },
  };
</script>
