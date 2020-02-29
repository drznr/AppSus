
// buttons on mouse over and not active on mouse out
export default {
    template: `
    <section v-if="email" class="email-preview-card-wrap"  v-bind:class="openedStatus">
        <div class="email-preview-card">
                <span @click="toggleStared" v-bind:class="{starStatus: this.email.isStared}"
                    title="Mark/Unmark Favorate" class="email-preview-star">★</span>
            <router-link :to="'/emails/' + email.id">
                <div class="email-preview-card-txts">
                <span class="email-preview-card-info">
                    <p>{{email.from}}</p>
                    <p>{{email.subject}}</p>
                </span>
                <p class="email-preaview-body">{{email.body}}</p>
                </div>
            </router-link>   
            <img src="imgs/icons/trash.png" title="Delete Mail"
                class="email-preview-controls-delete-icon" @click="deleteThis">
            <img v-bind:src="'imgs/icons/' + emailStatus + '.png'" title="Mark Unread/Read"
                class="email-preview-controls-status-icon" @click="toggleStatus">
        </div>
    </section>
    `, 
    props: ['email'],
    data(){
        return {
            currEmail: null,
        }
    },
    watch:{
        eamil(){
            this.currEmail = JSON.parse(JSON.stringify(this.eamil))
            this.emailStatus()
        }
    },
    computed:{
        emailStatus(){
            return (this.email.isRead) ? 'open-mail' : 'mail'
        },
        openedStatus(){
            return {mailOpened: this.email.isRead, mailClosed: !this.email.isRead}
        }
    },
    methods:{
        deleteThis(){
            this.$emit('deleteEmail', this.copyEmailId())
        },
        toggleStared(){
            this.$emit('starEmail', this.copyEmailId())
        },
        toggleStatus(){
            this.$emit('toggleEmailStatus', this.copyEmailId())
            this.currEmail = JSON.parse(JSON.stringify(this.email))
        },
        copyEmailId(){
           return this.currEmail.id.slice(0, this.currEmail.id.length)
        }
    },
    created(){
        this.currEmail = JSON.parse(JSON.stringify(this.email))
    }
}
