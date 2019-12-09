<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar
        color="info"
        light
        flat
      >
        <h2>Edit Topic</h2>

        <v-spacer />

        <v-btn
          color="default"
          @click="$router.push('/topics')"
        >
          Back to list
        </v-btn>
      </v-toolbar>
      <v-card-text v-if="topic">
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
          Edit Topic
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import {
    mapMutations,
    mapActions,
    mapState,
  } from 'vuex';

  export default {
    middleware: 'isLoggedIn',
    data() {
      return {

      };
    },
    computed: {
      ...mapState([
        'notification',
        'topic'
      ])
    },
    methods: {
      ...mapActions([
        'updateTopic',
      ]),
      ...mapMutations([
        'setNotification',
        'clearNotification',
      ]),
      ...mapActions([
        'setTopic',
      ]),
      async submit() {
        const response = await this.updateTopic({
          id: this.topic.id,
          data: {
            subject: this.topic.subject,
            description: this.topic.description,
          },
        });

        if (!response.success) {
          this.setNotification({
            type: 'error',
            message: response.error,
          });
        } else {
          this.setNotification({
            type: 'success',
            message: 'Successfully edited topic.',
          });

          this.$router.push('/topics');
        }
      },
    },
    async mounted() {
      this.clearNotification();

      const response = await this.setTopic(this.$route.params.id);

      if (!response.success) {end
        this.setNotification({
          type: 'error',
          message: response.error || 'An error occured while retrieving topic data.',
        });

        this.$router.push('/topics');
      }
    }
  };
</script>
