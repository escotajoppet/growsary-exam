<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar
        color="info"
        light
        flat
      >
        <h2 v-if="topic">{{topic.subject}} Messages</h2>

        <v-spacer />

        <v-btn
          color="default"
          @click="$router.push('/topics')"
        >
          Back to list
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-list two-line>
          <v-list-item-group
            multiple
            active-class="info--text"
          >
            <template v-for="(item, index) in messages">
              <v-list-item :key="item.id">
                <v-list-item-content>
                  <v-list-item-title v-text="item.owner.name"></v-list-item-title>
                  <v-list-item-subtitle class="text--primary" v-text="item.message"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider
                v-if="index + 1 < messages.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>

        <v-pagination
          v-model="page"
          :length="pageCount"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
          total-visible="10"
          @input="pageChange"
        />
      </v-card-text>
    </v-card>

    <v-card class="elevation-12 mt-12" light>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Message"
            type="text"
            v-model="message"
            @keypress.enter.native.prevent="submit"
          />
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import {
    mapActions,
    mapMutations,
    mapState,
  } from 'vuex'
  import axios from 'axios';

  export default {
    middleware: 'isLoggedIn',
    data() {
      return {
        page: 1,
        pageSize: 10,
        message: ''
      };
    },
    methods: {
      ...mapActions([
        'setMessages',
        'setTopic',
        'createMessage',
      ]),
      ...mapMutations([
        'clearNotification',
      ]),
      async submit() {
        if (!this.message) {
          return;
        }

        await this.createMessage({
          message: this.message,
          topicId: this.topic.id,
        })

        await this.setMessages({
          id: this.$route.params.id,
          page: this.page,
          pageSize: this.pageSize,
        });

        this.message = '';
      },
      async pageChange(page) {
        await this.setMessages({
          id: this.$route.params.id,
          page: this.page,
          pageSize: this.pageSize,
        });
      },
    },
    computed: {
      ...mapState([
        'topic',
        'messages',
        'pageCount',
      ]),
    },
    async mounted() {
      this.clearNotification();

      const response = await this.setTopic(this.$route.params.id);

      if (!response.success) {
        this.setNotification({
          type: 'error',
          message: response.error || 'An error occured while retrieving topic data.',
        });

        this.$router.push('/topics');
      }

      await this.setMessages({
        id: this.$route.params.id,
        page: this.page,
        pageSize: this.pageSize,
      });
    },
  };
</script>
