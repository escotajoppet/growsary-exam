import Vuex from 'vuex';
import axios from 'axios';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  let parts = value.split(`; ${name}=`);

  if (parts.length == 2) {
    return parts.pop().split(';').shift();
  }
}

const createStore = function() {
  return new Vuex.Store({
    strict: false,
    state: {
      user: null,
      authToken: null,
      topic: null,
      topics: [],
      pageCount: 0,
      notification: {
        type: '',
        message: '',
      },
      messages: [],
    },
    actions: {
      register: (_context, user) => {
        return axios
          .post('http://localhost:3001/user/register', user)
          .then(response => response.data)
          .catch(err => err.response.data);
      },
      login: (_context, user) => {
        return axios
          .post('http://localhost:3001/user/login', user)
          .then(response => response.data)
          .catch(err => err.response.data);
      },
      setTopics: async({ commit }, { page, pageSize }) => {
        const response = await axios.get('http://localhost:3001/topics', {
          headers: {
            'X-Access-Token': getCookie('authToken'),
          },
          params: {
            page,
            pageSize,
          },
        });

        commit('setTopics', response.data.data);
        commit('setPageCount', response.data.pageCount);
      },
      setTopic: async({ commit }, id) => {
        return axios
          .get(`http://localhost:3001/topic/${id}`, {
            headers: {
              'X-Access-Token': getCookie('authToken'),
            },
          })
          .then(response => {
            commit('setTopic', response.data.data);

            return response.data;
          })
          .catch(err => err.response.data);
      },
      createTopic: (_context, data) => {
        return axios
          .post('http://localhost:3001/topic', data, {
            headers: {
              'X-Access-Token': getCookie('authToken'),
            },
          })
          .then(response => response.data)
          .catch(err => err.response.data);
      },
      updateTopic: (_context, { id, data }) => {
        return axios
          .patch(`http://localhost:3001/topic/${id}`, data, {
            headers: {
              'X-Access-Token': getCookie('authToken'),
            },
          })
          .then(response => response.data)
          .catch(err => err.response.data);
      },
      deleteTopic: (_context, id) => {
        axios.delete(`http://localhost:3001/topic/${id}`);
      },
      setNotification: ({ commit }, data) => {
        commit('setNotification', data);
      },
      setMessages: async({ commit }, { id, page, pageSize }) => {
        console.log({page, pageSize, id})

        const response = await axios.get(`http://localhost:3001/topic/${id}/messages`, {
            headers: {
              'X-Access-Token': getCookie('authToken'),
            },
            params: {
              page,
              pageSize,
            },
          });

        commit('setMessages', response.data.data);
        commit('setPageCount', response.data.pageCount);
      },
      createMessage: (_context, { topicId, message }) => {
        axios.post(`http://localhost:3001/topic/${topicId}/message`, {
            message,
          }, {
          headers: {
            'X-Access-Token': getCookie('authToken'),
          },
        })
      }
    },
    mutations: {
      setUser: (state, payload) => {
        state.user = payload;
      },
      setAuthToken: (state, payload) => {
        state.authToken = payload;
      },
      setTopics: (state, payload) => {
        state.topics = payload;
      },
      setTopic: (state, payload) => {
        state.topic = payload;
      },
      setNotification: (state, payload) => {
        state.notification = payload;
      },
      setPageCount: (state, payload) => {
        state.pageCount = payload;
      },
      clearNotification: (state) => {
        setTimeout(() => {
          state.notification = {
            type: '',
            message: '',
          };
        }, 3000);
      },
      setMessages: (state, payload) => {
        state.messages = payload;
      }
    },
    getters: {
      getUser: (state) => {
        return state.user;
      },
      getAuthToken: (state) => {
        return state.authToken;
      },
      getTopics: (state) => {
        return state.topics;
      },
      getTopic: (state) => {
        return state.topic;
      },
      getNotification: (state) => {
        return state.notification;
      },
      getPageCount: (state) => {
        return state.pageCount;
      },
      getMessages: (state) => {
        return state.messages;
      }
    },
  })
}

export default createStore;
