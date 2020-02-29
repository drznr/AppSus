import { emailService } from "../service/email.service.js"


export default {
    template: `
    <section v-if="email" class="email-details-container">
        <h2>{{email.subject}}</h2>
        <div class="emails-sender-info-wrap">
            <p>{{email.from}}</p>
        </div>
        <div class="email-details-controls-wrap">
            <span @click="toggleStared" v-bind:class="{starStatus: email.isStared}" 
                class="email-deatails-star"  title="Mark/Unmark Favorate">★</span>
            <img src="imgs/icons/trash.png" title="Delete Mail"
                class="email-details-controls-delete-icon" @click="deleteThis"/>
            <img v-bind:src="'imgs/icons/' + emailStatus + '.png'" title="Mark Unread/Read"
                class="email-details-controls-status-icon" @click="toggleStatus"/>
        </div>
        <p class="email-details-body">{{email.body}}
            <span v-if="email.replys" v-for="reply in email.replys">\n &nbsp; Re: {{reply}}</span>
        </p>
            
        <router-link :to="'compose/' + email.id" title="Reaply"> 
            <img src="imgs/icons/reply.png" class="email-details-reply-btn"/>
        </router-link>
        <router-link :to="'/keeper/' + email.subject + '/' + email.body" title="Reaply"> 
            <img src="imgs/icons/save.png" class="email-details-save-btn"/>
        </router-link>
    </section>
    `,
    data(){
        return{ 
            email: null
        }
    },
    computed:{
        emailStatus(){
            return (this.email.isRead) ? 'open-mail' : 'mail'
        },
    },
    methods: {
        getEmail(){
            const emailId = this.$route.params.id
            emailService.getEmailById(emailId)
            .then(email => {
                this.email = email
            }) 
        },
        toggleStared(){
            emailService.toggleStarred(this.copyEmailId())
        },
        toggleStatus(){
            emailService.updateEmailStatus(this.copyEmailId())
            this.$router.push('/emails')
        },
        deleteThis(){
            emailService.deleteSelectedEmail(this.copyEmailId())   
            this.$router.push('/emails')   
        },
        copyEmailId(){
            return this.email.id.slice(0, this.email.id.length)
        }
    },
    created(){
        this.getEmail()
    }
}



