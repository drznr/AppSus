import {emailService} from './service/email.service.js'
import emailSideNav from './cmps/email-side-nav.cmp.js'
import emailFilter from './cmps/email-filter.cmp.js'


export default {
    template: `
        <section class="email-container">
            <email-filter @filtered="setFilter"></email-filter>
            <side-nav @showStared="showStarred"></side-nav>
            <router-view :fillteredEmails="emailsForDispaly" class="email-router-view"
            @deleteItGp="deletingEmail" @toggleStarGp="staringEmail"
            @toggleStatusGp="toggelingEmailStatus" @emailSent="updateList">
        </router-view>
        </section>
    `,
    data(){
        return {
            emails: [],
            filterBy: null,
            showingStared: false
        }
    },
    computed:{
        emailsForDispaly(){ 
            if(this.showingStared === true) return this.getStared()
            if (!this.filterBy) return this.emails
            var filterByName = JSON.parse(JSON.stringify(this.filterBy.byName)).toLowerCase()
            var emails = JSON.parse(JSON.stringify(this.emails))
            if (this.filterBy.byStatus !== 'all') {
                var filterByStatus = this.filterBy.byStatus === 'read'
                emails = emails.filter(email => email.isRead === filterByStatus)
                
            }
            return emails.filter(email => {                
                return email.from.toLowerCase().includes(filterByName) ||
                    email.body.toLowerCase().includes(filterByName) ||
                    email.subject.toLowerCase().includes(filterByName) || 
                    email.to.toLowerCase().includes(filterByName)          
            })
        }
    },
    methods:{
        setFilter(filterBy){
            this.filterBy = filterBy
        },
        showStarred(){
            this.showingStared = !this.showingStared
        },
        getStared(){
            var emails = JSON.parse(JSON.stringify(this.emails))
                return emails.filter(email => email.isStared)
        },
        deletingEmail(emailId){
            emailService.deleteSelectedEmail(emailId)
            .then(emails => this.emails = JSON.parse(JSON.stringify(emails)))   
        },
        staringEmail(emailId){
            emailService.toggleStarred(emailId)
            .then(emails => this.emails = JSON.parse(JSON.stringify(emails)))   
        },
        toggelingEmailStatus(emailId){            
            emailService.updateEmailStatus(emailId)
            .then(emails => this.emails = JSON.parse(JSON.stringify(emails)))   
        },
        updateList(){
            emailService.query()
            .then(emails => this.emails = JSON.parse(JSON.stringify(emails)))
        }
    },
    components:{
        'side-nav': emailSideNav,
        'email-filter': emailFilter
    },
    created(){
        emailService.query()
        .then(emails => this.emails = JSON.parse(JSON.stringify(emails)))
    },
}

