

export default {
    template: `
    <section v-if="email" class="email-preview-card-wrap">
        <router-link :to="'/emails/' + email.id">
            <div class="email-preview-card">
                <span class="email-preview-card-info">
                    <span>✩</span>
                    <p>{{email.from}}</p>
                    <p>{{email.subject}}</p>
                </span>
                <p class="email-preaview-body">{{email.body}}</p>
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
    created(){
        this.currEmail = this.email
    }
};

 