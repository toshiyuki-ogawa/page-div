import {
  createRouter,
  createMemoryHistory,
  createWebHistory
} from 'vue-router'
import type { Router } from 'vue-router'
import { getAppRoot } from './app-root'
import PageDiv from './PageDiv.vue'
import Index from './Index.vue'

/**
 * initialize router
 */
export async function initRouter(): Promise<Router> {
  let root = await getAppRoot()

  if (!root) {
    root = '/'
  }
  return createRouter({

    history: createWebHistory(),
    routes: [
      {
        path: root,
        redirect: `${root}index.html`
      },
      {
        path: `${root}page-div.html`,
        component: PageDiv
      },
      {
        path: `${root}index.html`,
        component: Index
      }
    ]
  })
}


// vi: se ts=2 sw=2 et:
