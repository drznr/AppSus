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
                    <textarea v-model.trim="newEmail.body" ref="bodyTextaria"></textarea>
                    <button class="my-btn" @click.prevent="sendEmail">Send</button>
                </div>
            </form>
        </section>
    `,
    data(){
        return {
            newEmail: null
        }
    },
    watch:{
        $route(){
            this.init()
        }
    },
    methods: {
        sendEmail(){
            emailService.sendEmail({...this.newEmail})
            this.cleanForm()
            this.$router.push('/emails')
            this.$emit('emailSent')
        },
        cleanForm(){
            this.newEmail.from = 'nadav'
            this.newEmail.to = ''
            this.newEmail.subject = ''
            this.newEmail.body = ''
        },
        init(){
            this.newEmail = { 
                from: 'nadav',
                to: '',
                subject: '',
                body:''
            }
            const emailId = this.$route.params.id
            const keeperTitle = this.$route.params.title
            const keeperBody = this.$route.params.txt
            if (!keeperTitle && emailId) {
                emailService.getEmailById(emailId)
                    .then(email => {
                        const copyEmail = JSON.parse(JSON.stringify(email))
                        copyEmail.subject = 'Re: ' + copyEmail.subject
                        copyEmail.body =  '\n'.repeat(12) + '_ '.repeat(30) + '\n \n' + 'From:' 
                            + copyEmail.from + '\n' + copyEmail.body
                        this.newEmail = copyEmail
                    })    
            } else if (keeperTitle){
                this.newEmail.subject = keeperTitle
                this.newEmail.body = keeperBody   
            }        
        }
    },
    created(){
        this.init()    
    },
    destroyed(){
        console.log('lala');
        
    }

}
