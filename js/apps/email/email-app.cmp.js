import {emailService} from './service/email.service.js'
import emailSideNav from './cmps/email-side-nav.cmp.js'
import emailFilter from './cmps/email-filter.cmp.js'


export default {
    template: `
        <section class="email-container">
            <email-filter @filtered="setFilter"></email-filter>
            <side-nav></side-nav>
            <router-view class="email-router-view"></router-view>
        </section>
    `,
    data(){
        return {
            filterBy: { byName: '', byStatus: 'all' },
        }
    },
    methods:{
        setFilter(filterBy){
            this.filterBy = filterBy
        }
    },
    components:{
        'side-nav': emailSideNav,
        'email-filter': emailFilter
    },
}