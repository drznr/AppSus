import { emailService } from "../service/email.service.js"


export default {
    template: `
        <section class="email-compose-container">
            <form @submit.prevent="sendEmail">
                <div class="emial-compose-main">
                    <input type="text" placeholder="To:" v-model.trim="newEmail.to"/>
                    <hr class="email-compose-hr"/>
                    <input type="text" placeholder="Subject" v-model.trim="newEmail.subject"/>
                    <hr class="email-compose-hr"/>
                    <textarea v-model.trim="newEmail.body"></textarea>
                    <button class="my-btn" @click.prevent="sendEmail">Send</button>
                </div>
            </form>
        </section>
    `,
    data(){
        return {
            newEmail: {
                from: 'nadav',
                to: '',
                subject: '',
                body:''
            },
        }
    },
    methods: {
        sendEmail(){
            emailService.sendEmail({...this.newEmail})
            this.cleanForm()
            this.$router.push('/emails')
        },
        cleanForm(){
            this.newEmail.from = 'nadav'
            this.newEmail.to = ''
            this.newEmail.subject = ''
            this.newEmail.body = ''
        }
    }
}
