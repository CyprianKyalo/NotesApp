import { createRouter, createWebHistory } from '@ionic/vue-router';
import NotesPage from '../pages/NotesPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/notes'
  },
  {
    path: '/notes',
    component: NotesPage
  },
  {
    path: '/notes/:id',
    component: () => import('../pages/NoteDetailsPage.vue')
  },
  {
    path: '/notes/add',
    component: () => import('../pages/AddNotePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
