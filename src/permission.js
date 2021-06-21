import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './routes'
import store from "@/store";

NProgress.configure({showSpinner: false})

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(store);
    store.commit("setMenuByRoute", to);
    NProgress.start();
    if (to.path === from.path) {
        return;
    }
    next();
})

router.afterEach(() => {
    NProgress.done()
})
