// TODO display amount of emails that are read or unread


export default {
    template:`
    <section class="email-status-container">
        <p v-if="myEmails">{{allEmails}}</p>
        <p v-if="myEmails">2</p>
        <p v-if="myEmails">4</p>
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
        // readEmails(){
        //    var readEmails = JSON.parse(JSON.stringify(this.myEmails))
        //    var counter = 0
        //    counter = readEmails.forEach(function(email, idx) {
        //        var b = 0
        //        console.log(email.isRead);
               
        //        if(!email.isRead) b++
        //        return b

        //     })
            
        //     return counter
        // },
        // unreadEmails(){
        //     var unreadEmails = JSON.parse(JSON.stringify(this.myEmails))
        //     unreadEmails.forEach(function(email, idx) {
        //         if(!email.isRead) unreadEmails.splice(idx, 1)
        //     })
        //     return unreadEmails.length
        // },
    },
    watch:{
        emails(){
            this.myEmails = JSON.parse(JSON.stringify(this.emails))
        }
        
    }
}
