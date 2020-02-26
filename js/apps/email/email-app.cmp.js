import {emailService} from './service/email.service.js'
import sideNav from './cmps/email-side-nav.cmp.js'


export default {
    template: `
        <section class="email-container">
            <side-nav></side-nav>
            <router-view></router-view>
        </section>
    `,
    components:{
        'side-nav': sideNav,
    }
}