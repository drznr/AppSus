import {emailService} from '../service/email.service.js' 
import emailPreview from '../cmps/email-preview.cmp.js'

export default {
    template: `
    <section class="emails-list-container">
            <email-preview v-for="email in emails" :email="email" 
                v-bind:key="email.id" @deleteEmail="deletingEmail" 
                @starEmail="staringEmail" @toggleEmailStatus="toggelingEmailStatus">
            </email-preview>
    </section>
    `, 
    props: ['fillteredEmails'],
    watch:{
        fillteredEmails: function(to){
            this.emails = JSON.parse(JSON.stringify(to))            
        }
    },
    data(){
        return {
            emails: [],
        }
    },
    methods:{
        deletingEmail(emailId){
            this.$emit('deleteItGp', emailId)
        },
        staringEmail(emailId){
            this.$emit('toggleStarGp', emailId)
        }, 
        toggelingEmailStatus(emailId){   
            this.$emit('toggleStatusGp', emailId)
        }
    },
    components: {
        'email-preview': emailPreview,
    },

};

 