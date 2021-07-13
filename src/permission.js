import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './routes'
import store from "@/store";

NProgress.configure({showSpinner: false})

const needLoginPaths = ['/upload-picture']

router.beforeEach(async(to, from, next) => {
    // store.commit("setMenuByRoute", to);
    NProgress.start();
    if (to.path === from.path) {
        return;
    }
    next()
	NProgress.done();
	
	//不属于需要登录的页面
	if (needLoginPaths.indexOf(to.path) === -1) {
	  // in the free login whitelist, go directly
	  next()
	  return
	}
	
	const hasToken = store.getters.token
	if (hasToken) {
	  if (to.path === '/login') {
	    // if is logged in, redirect to the home page
	    next({ path: '/' })
	    NProgress.done()
	  } else {
	    const hasGetUserInfo = store.getters.name
	    if (hasGetUserInfo) {
	      next()
	    } else {
	      try {
	        // get user info
	        await store.dispatch('getInfo')
	
	        next()
	      } catch (error) {
	        // remove token and go to login page to re-login
	        await store.dispatch('resetToken')
	        Message.error(error || 'Has Error')
	        next(`/login?redirect=${to.path}`)
	        NProgress.done()
	      }
	    }
	  }
	} else {
	  /* has no token*/
	  // other pages that do not have permission to access are redirected to the login page.
	  next(`/login?redirect=${to.path}`)
	  NProgress.done()
	}
})

router.afterEach(() => {
    NProgress.done()
})
