import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)

const constantRouterMap = [{
    path: '/',
    redirect: '/index'
},
    {
        path: '/index', name: 'index', component: () => import('@/views/Index/index'), children: [
            {path: '', name: '首页', component: () => import('@/views/Home/home.vue')},
            {path: '/notice-list', name: "公告列表", component: () => import('@/views/Notice/notice-list')},
            {path: '/notice-detail',name:'公告详情', component:()=> import('@/views/Notice/NoticeDetail/notice-detail')},
            {path: '/hot-search-list', name: "热门搜索列表", component: () => import('@/views/Search/hot-search-list')},
            {path: '/search-detail',name:'热门搜索详情',component:()=> import('@/views/Search/SearchDetail/search-detail')},
			{path: '/search-result', name: "搜索结果", component: () => import('@/views/Search/search-result')},
            {path: '/topic-detail', name:'专题详情', component:()=> import('@/views/Topic/TopicDetail/topic-detail')},
            {path: '/topic-list', name:'专题列表', component:()=> import('@/views/Topic/topic-list')},
			{path: '/activity-list', name:'活动列表', component:()=> import('@/views/Activity/activity-list')},
			{path: '/category-list', name:'分类图片列表', component:()=> import('@/views/Search/category-list')},
			{path: '/activity-detail', name:'活动详情', component:()=> import('@/views/Activity/activity-detail')},
			{path: '/group-pictures', name: '分组图片', component:()=> import('@/views/Search/SearchDetail/group-pictures')},
			{path: '/picture-detail', name: '图片详情', component:()=> import('@/views/Search/SearchDetail/picture-detail')},
            {path: '/master', name:'大师推荐',component:()=> import('@/views/Master/master')}
        ]
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/home.vue')
    },
]
const router = new Router({
    mode: 'hash',
    routes: constantRouterMap
});

export default router;
