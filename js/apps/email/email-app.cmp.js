import {emailService} from './service/email.service.js'
import emailSideNav from './cmps/email-side-nav.cmp.js'
import emailFilter from './cmps/email-filter.cmp.js'
import composeBtn from './cmps/email-compose-btn.js'


export default {
    template: `
        <section class="email-container">
            <compose-btn @composeMail="routeToCompose"></compose-btn>
            <email-filter :emails="emails" @filtered="setFilter"></email-filter>
            <side-nav @showStared="showStarred" @showInbox="showingInbox" @showSent="ShowingSent"></side-nav>
            <router-view :fillteredEmails="emails" class="email-router-view"
                @deleteItGp="deletingEmail" @toggleStarGp="staringEmail"
                @toggleStatusGp="toggelingEmailStatus" @emailSent="updateList">
            </router-view>
        </section>
    `,
    data(){ 
        return {
            emails: [],
            filterBy: { byName: '', byStatus: 'all', },
            papaFilter:{
                showingStared: false,
                showingSent: false,
            },
            sortBy: 'date'
        }
    },
    watch:{
        $route(){
            this.updateList()         
        }
    },
    methods:{
        routeToCompose(){
            console.log('pushing');
            
            this.$router.push('/emails/compose')  
        },
        setFilter(filterBy, sortBy){                  
            var outgoingFilter = JSON.parse(JSON.stringify(this.papaFilter))            
            if(filterBy) this.filterBy = filterBy
            var copyFilterBy = JSON.parse(JSON.stringify(this.filterBy))
            if (sortBy) this.sortBy = sortBy
            var copySortBy = JSON.parse(JSON.stringify(this.sortBy))
            outgoingFilter.filterBy = copyFilterBy            
            outgoingFilter.sortBy = copySortBy            
            emailService.getEmailsForDispaly(outgoingFilter)
            .then(emails => this.emails = emails)
        },
        ShowingSent(){
            this.papaFilter.showingSent = !this.papaFilter.showingSent
            this.setFilter()
        },
        showStarred(){
            this.papaFilter.showingStared = !this.papaFilter.showingStared
            this.setFilter()
        },
        showingInbox(){
            this.papaFilter.showingStared = false
            this.papaFilter.showingSent = false
            this.setFilter()
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
        },
        getEmails(){
            return emailService.query()
        }
    },
    components:{
        'side-nav': emailSideNav,
        'email-filter': emailFilter,
        'compose-btn': composeBtn
    },
    created(){
        emailService.query()
        .then(emails => this.emails = JSON.parse(JSON.stringify(emails)))
    },
}

