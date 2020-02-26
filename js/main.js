import { router } from './router.js';
import mainHeaderCmp from './cmps/main-header.cmp.js';
import mainFooterCmp from './cmps/main-footer.cmp.js';


new Vue({
    template: `
        <section>
            <main-header></main-header>
            <main class="main-content">
                <router-view></router-view>
            </main>
            <main-footer></main-footer>
        </section>
    `,
    el: '#app',
    router,
    components: {
        'main-header': mainHeaderCmp,
        'main-footer': mainFooterCmp
    }
});