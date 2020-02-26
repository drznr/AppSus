import { emailService } from "../service/email.service.js"


export default {
    template: `
    <section v-if="this.email" class="email-details-container">
        <h2>{{email.subject}}</h2>
    </section>
    `,
    data(){
        return{
            email: null
        }
    },
    methods: {
        getEmail(){
            const emailId = this.$route.params.id
            emailService.getEmailById(emailId)
            .then(email => {
                this.email = email
            })
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
