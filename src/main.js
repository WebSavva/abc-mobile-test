import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/pages/HomePage.vue";
import SurveyPage from "./components/pages/SurveyPage.vue";
import ResultPage from "./components/pages/ResultPage.vue";
import CharacterPage from "./components/pages/CharacterPage.vue";

const routes = [
  { path: "/", component: HomePage, name: 'home' },
  { path: "/survey/result", name: 'result', component: ResultPage },
  { path: "/character", name: 'character', component: CharacterPage  },
  { path: "/survey/:questionNumber", name: 'survey', component: SurveyPage, props: true },
  { path: '/:pathMatch(.*)*', redirect: {name: 'home'}}
];

const router = createRouter({
  history: createWebHistory('/abc-mobile-test'),
  routes,
});

router.beforeEach((to) => {
  if (to.fullPath.startsWith('/#/')) {
    return to.fullPath.slice(2);
  }
});

createApp(App)
  .use(router)
  .mount("body");
