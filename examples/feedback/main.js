/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// import { createApp } from 'vue'
import * as Vue from 'vue' // in Vue 3
import Example from './Example.vue'

import axios from 'axios';
import GAuth from 'vue3-google-oauth2'

var app = Vue.createApp(Example);

const gauthOption = {
  clientId: '429676433523-ecbabhc35luvti8n6su35pt6rcf380kb.apps.googleusercontent.com',
  // scope: 'profile email',
  audiences: 'https://db.fauna.com/db/y1raujcjgynr1',
  prompt: 'consent',
  fetch_basic_profile: true,
  hosted_domain: "captainfresh.in"
}
app.use(GAuth, gauthOption);

app.mount('#app');