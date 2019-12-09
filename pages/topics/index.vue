<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="info"
      light
      flat
    >
      <h2>Topics</h2>

      <v-spacer />

      <v-btn
        color="success"
        @click="$router.push('/topics/new')"
      >
        Add new topic
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-simple-table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in topics" :key="item.id">
            <td><n-link :to="`/topics/${item.id}`">{{ item.subject }}</n-link></td>
            <td>{{ item.description }}</td>
            <td>
              <nuxt-link :to="`/topics/${item.id}`"><v-icon>mdi-square-edit-outline</v-icon></nuxt-link>
              <nuxt-link :to="`/topics/${item.id}/messages`"><v-icon>mdi-gmail</v-icon></nuxt-link>
            </td>
          </tr>
        </tbody>
      </v-simple-table>

      <v-pagination
        v-model="page"
        :length="pageCount"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        total-visible="10"
        @input="pageChange"
      />

      <!-- <v-data-table
        class="elevation-1"
        :headers="table.headers"
        :items="topics"
        :items-per-page="10"
      >
        <template v-slot:item.actions="{ item }">
          <n-link :to="`/topics/${item.id}`">Edit</n-link>
        </template>
      </v-data-table> -->
    </v-card-text>
  </v-card>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations,
  } from 'vuex'
  import axios from 'axios';

  export default {
    middleware: 'isLoggedIn',
    data() {
      return {
        page: 1,
        pageSize: 10,
        table: {
          headers: [
            {
              text: 'Subject',
              align: 'left',
              value: 'subject'
            },
            {
              text: 'Description',
              sortable: false,
              value: 'description',
            },
            {
              text: 'Actions',
              sortable: false,
              value: 'actions'
            },
          ],
        },
      };
    },
    methods: {
      ...mapActions([
        'setTopics',
      ]),
      ...mapMutations([
        'setNotification',
        'clearNotification',
      ]),
      async pageChange(page) {
        await this.setTopics({
          page: this.page,
          pageSize: this.pageSize,
        })
      },
    },
    computed: {
      ...mapState([
        'notification',
        'pageCount',
        'topics'
      ]),
    },
    async mounted() {
      await this.setTopics({
        page: this.page,
        pageSize: this.pageSize,
      });

      this.clearNotification();
    },
  };
</script>

<style lang="scss" scoped="">
  td {
    a {
      text-decoration: none;
    }
  }
</style>
