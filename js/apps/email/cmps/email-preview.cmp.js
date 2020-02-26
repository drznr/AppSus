

export default {
    template: `
    <section v-if="email" class="email-preview-card-wrap">
        <router-link :to="'/emails/' + email.id">
            <div class="email-preview-card">
            <p>✩</p>
            <h2>{{email.from}}</h2>
            <h3>{{email.subject}}</h3>
            <p>{{email.body}}</p>
            </div>
        </router-link>   
    </section>
    `, 
    props: ['email'],
    data(){
        return {
            currEmail: null,
        }
    },
    // methods:{
    //     select(emailId){
    //         // console.log(emailId);
    //         this.$emit('selected', emailId)
    //     }
    // },
    created(){
        this.currEmail = this.email
    }
};

 