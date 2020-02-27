

export default {
    template: `
    <section v-if="email" class="email-preview-card-wrap"  v-bind:class="openedStatus">
        <div class="email-preview-card">
                <span @click="toggleStared" v-bind:class="{starStatus: isStared}">✩</span>
            <router-link :to="'/emails/' + email.id">
                <div class="email-preview-card-txts">
                <span class="email-preview-card-info">
                    <p>{{email.from}}</p>
                    <p>{{email.subject}}</p>
                </span>
                <p class="email-preaview-body">{{email.body}}</p>
                </div>
            </router-link>   
            <img src="../../../imgs/icons/trash.png" 
                class="email-preview-controls-delete-icon" @click="deleteThis">
            <img v-bind:src="'../../../imgs/icons/' + emailStatus + '.png'"
                class="email-preview-controls-status-icon" @click="toggleStatus">
        </div>
    </section>
    `, 
    props: ['email'],
    data(){
        return {
            currEmail: null,
            isStared: null
        }
    },
    computed:{
        emailStatus(){
            return (this.currEmail.isRead) ? 'open-mail' : 'mail'
        },
        openedStatus(){
            return {mailOpened: this.email.isRead, mailClosed: !this.email.isRead}
        }
    },
    methods:{
        deleteThis(){
            // var emailIdCopy = this.currEmail.id.slice(0, this.currEmail.id.length)
            this.$emit('deleteEmail', this.copyEmailId())
        },
        toggleStared(){
            this.$emit('starEmail', this.copyEmailId())
            this.isStared = this.email.isStared
        },
        toggleStatus(){
            this.$emit('toggleEmailStatus', this.copyEmailId())
            this.currEmail = this.email
        },
        copyEmailId(){
           return this.currEmail.id.slice(0, this.currEmail.id.length)
        }
    },
    created(){
        this.currEmail = this.email
        this.isStared = this.email.isStared
    }
};

 