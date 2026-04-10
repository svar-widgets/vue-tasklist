import { createApp } from 'vue'
import Demos from './common/Index.vue'

import { Globals, Button, Segmented, Locale, Willow, WillowDark } from '@svar-ui/vue-core';
import "@wx/vue-core/style.css";

import { router } from "./common/helpers.js";

const skins = [
  { id: 'willow', label: 'Willow', component: Willow },
  { id: 'willow-dark', label: 'Dark', component: WillowDark },
];

const app = createApp(Demos, {
  publicName: "Tasklist",
  skins,
  productTag: "tasklist",
  productLink: "core",
  Globals,
  Button,
  Segmented,
  Locale,
});
app.use(router);
app.mount('#app');
