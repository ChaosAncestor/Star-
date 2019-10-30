import Vue from 'vue'
import VueRouter from 'vue-router'
import Leaderboard from '../views/Leaderboard.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'leaderboard',
		component: Leaderboard,
		props: true
	},
	{
		path: '/details',
		name: 'details',
		props: true,
		component: () => import('../views/Details.vue'),
		children: [{
				path: 'news',
				name: 'news',
				props: true,
				component: () => import('../views/News.vue'),

			},
			{
				path: 'stroke',
				name: 'stroke',
				props: true,
				component: () => import('../views/Stroke.vue'),
			},
			{
				path: 'communication',
				name: 'communication',
				props: true,
				component: () => import('../views/Communication.vue'),
			},
			{
				path: 'newsview',
				name: 'newsview',
				props: true,
				component: () => import('../views/Newsview.vue'),
			}
		],
		redirect: {
			name: 'news'
		}
	},
	{
		path: '/preson',
		name: 'preson',
		props: true,
		component: () => import('../views/Preson.vue')
	}
]

const router = new VueRouter({
	routes,
	linkActiveClass: "active"
})

export default router
