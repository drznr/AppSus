import mainHeaderCmp from './cmps/main-header.cmp.js';
import mainFooterCmp from './cmps/main-footer.cmp.js';


new Vue({
    template: `
        <section>
            <main-header></main-header>

            <main-footer></main-footer>
        </section>
    `,
    el: '#app',
    components: {
        'main-header': mainHeaderCmp,
        'main-footer': mainFooterCmp
    }
});