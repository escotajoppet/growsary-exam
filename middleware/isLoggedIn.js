export default function ({ app, redirect }) {
  if (!app.$cookies.get('authToken')) {
    app.store.dispatch('setNotification', {
      type: 'error',
      message: 'Please log in to continue',
    });

    redirect('/login');
  }
}
