

export default {
    template: `
        <section class="side-nav-container">
        <ul class="email-main-nav">
                <li><router-link to="/emails" exact>Inbox</router-link></li>
                <li @click.prevent="emitStared">Starred</li>
                <li>Sent Mail</li>
                <li>Drafts</li>
            </ul>
        </section>
    `,
    methods:{
        emitStared(){                   
                this.$emit('showStared')
        }
    }
    
} 