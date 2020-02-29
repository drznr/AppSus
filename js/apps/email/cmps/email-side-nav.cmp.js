

export default {
    template: `
        <section class="side-nav-container">
            <input type="checkbox" id="sideNavBurger"/>
            <label for="sideNavBurger" class="side-nav-hamburger">
            <span></span>
            </label>
            <ul class="email-main-nav">
                <li @click.prevent="emitInbox"><router-link to="/emails" exact>Inbox</router-link></li>
                <li @click.prevent="emitStared"><router-link to="/emails" exact>Starred</router-link></li>
                <li title="$5 one time upgrade to Premium for this feture">Sent Mail</li>
                <li title="$5 one time upgrade to Premium for this feture">Drafts</li>
            </ul>
        </section>
    `,
    methods:{
        emitInbox(){
            this.$emit('showInbox')
        },
        emitStared(){                   
            this.$emit('showStared')
        }
    }
     
} 