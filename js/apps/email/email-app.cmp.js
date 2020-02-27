import {emailService} from './service/email.service.js'
import emailSideNav from './cmps/email-side-nav.cmp.js'
import emailFilter from './cmps/email-filter.cmp.js'


export default {
    template: `
        <section class="email-container">
            <email-filter @filtered="setFilter"></email-filter>
            <side-nav></side-nav>
            <router-view :emails="emailsForDispaly" class="email-router-view"></router-view>
        </section>
    `,
    data(){
        return {
            emails: null,
            filterBy: { byName: '', byStatus: 'all' },
        }
    },
    computed:{
        emailsForDispaly(){

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
    created(){
        emailService.query()
        .then(emails => this.emails = emails)
    }, 
}




// carsForDisplay() {
//     if (!this.filterBy) return this.cars;
//     return this.cars.filter(car => 
//          car.vendor.includes(this.filterBy.vendor) && 
//          car.speed > this.filterBy.minSpeed
//     );
// }
// },

// :cars="carsForDisplay"