import {emailService} from '../service/email.service.js' 
import emailPreview from '../cmps/email-preview.cmp.js'

export default {
    template: `
    <section class="emails-list-container">
            <email-preview v-for="email in fillteredEmails" :email="email" 
                v-bind:key="email.id" @deleteEmail="deletingEmail" 
                @starEmail="staringEmail" @toggleEmailStatus="toggelingEmailStatus">
            </email-preview>
    </section>
    `, 
    props: ['fillteredEmails'],
    data(){
        return {
            emails: [],
        }
    },
    methods:{
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
        }
    },
    created(){       
        this.emails = JSON.parse(JSON.stringify(this.fillteredEmails))
    }, 
    components: {
        'email-preview': emailPreview,
    },

};

 