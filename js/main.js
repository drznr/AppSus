import { router } from './router.js';
import mainHeaderCmp from './cmps/main-header.cmp.js';
import mainFooterCmp from './cmps/main-footer.cmp.js';
import userMsgCmp from './cmps/user-msg.cmp.js';


new Vue({
    template: `
        <section class="app">
            <user-msg></user-msg>
            <main-header></main-header>
            <main class="main-content">
            <transition name="slide-fade" mode="out-in">
                <router-view></router-view>
            </transition>
            </main>
            <main-footer></main-footer>
        </section>
    `,
    el: '#app',
    router,
    components: {
        'main-header': mainHeaderCmp,
        'main-footer': mainFooterCmp,
        'user-msg': userMsgCmp
    }
});