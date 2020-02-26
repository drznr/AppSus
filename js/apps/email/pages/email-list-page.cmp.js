import {emailService} from '../service/email.service.js' 
import emailPreview from '../cmps/email-preview.cmp.js'

export default {
    template: `
    <section class="emails-list-container">
            <email-preview v-for="email in emails" :email="email" 
                v-bind:key="email.id">
            </email-preview>
    </section>
    `,
    data(){
        return {
            emails: [],
        }
    },
    created(){
        emailService.query()
        .then(emails => this.emails = emails)
    }, 
    components: {
        'email-preview': emailPreview,
    },

};

 