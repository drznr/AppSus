import { emailService } from "../service/email.service.js"


export default {
    template: `
    <section v-if="this.email" class="email-details-container">
        <h2>{{email.subject}}</h2>
        <div class="emails-sender-info-wrap">
            <p>{{email.from}}</p>
        </div>
        <div class="email-controls-wrap">
            <span @click="toggleStared" v-bind:class="{starStatus: email.isStared}">✩</span>
            <img src="../../../imgs/icons/trash.png" 
                class="email-details-controls-delete-icon" @click="deleteThis"/>
            <img v-bind:src="'../../../imgs/icons/' + emailStatus + '.png'"
                class="email-details-controls-status-icon" @click="toggleStatus"/>
        </div>
        <p>{{email.body}}</p>
        <img src="../../../imgs/icons/reply.png" class="email-details-reply-btn"/>
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
        }
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
            console.log('opened/unopened');
            emailService.updateEmailStatus(this.copyEmailId())
            this.$router.push('/emails')
        },
        deleteThis(){
            console.log('deleting');
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





// methods: {
//     getBook(){
//         const bookId = this.$route.params.id
//         bookService.getBookById(bookId)
//         .then(book => {
//             this.book = book
//             this.nextPrevBookIds = bookService.getNextPrevBookIds(book.id)
//         })
//     },
// },
// watch: {
//     '$route.params.id'(){
//         this.getBook()
//     }
// },
// components:{
//     'long-txt': longTxt,
//     'review-add': reviewAdd,
// },
// created(){
//     this.getBook()  
// }
// };
