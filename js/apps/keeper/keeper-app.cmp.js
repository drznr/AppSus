import keeprAddCmp from './cmps/keepr-add.cmp.js';
import keeperListCmp from './cmps/keeper-list.cmp.js';

export default {
    template: `
        <section class="keeper">
            <keeper-add></keeper-add>
            <keeper-list></keeper-list>
        </section>
    `,
    components: {
        'keeper-add': keeprAddCmp,
        'keeper-list': keeperListCmp
    }
}