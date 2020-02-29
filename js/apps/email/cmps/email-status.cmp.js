

export default {
    template:`
    <section class="email-status-container">
        <p v-if="myEmails">{{allEmails}}</p>
        <p v-if="myEmails">{{readEmails}}</p>
        <p v-if="myEmails">{{unreadEmails}}</p>
    </section>
    `,
    props: ['emails'],
    data(){ 
        return {
            myEmails: null
        }
    },
    computed: {
        allEmails(){
            return this.myEmails.length
        },
        readEmails(){
            var counter = 0 
           var readEmails = JSON.parse(JSON.stringify(this.myEmails))
           readEmails.forEach(email => {
               if(email.isRead) counter++
            })
            return counter
        },
        unreadEmails(){
            var counter = 0 
            var unreadEmails = JSON.parse(JSON.stringify(this.myEmails))
            unreadEmails.forEach(email => {
                if(!email.isRead) counter++
                
            })
            return counter
        },
    },
    watch:{
        emails(){
            this.myEmails = JSON.parse(JSON.stringify(this.emails))
        }
        
    }
}
