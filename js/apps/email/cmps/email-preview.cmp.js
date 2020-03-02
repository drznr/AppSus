
// buttons on mouse over and not active on mouse out
export default {
    template: `
    <section v-if="email" class="email-preview-card-wrap"  v-bind:class="openedStatus">
        <div class="email-preview-card">
            <router-link :to="'/emails/' + email.id">
                <div v-bind:class="setFirstLetterClass" 
                    class="email-preview-card-first-letter" 
                    v-if="firstLetter">{{firstLetter}}</div>
                <div class="email-preview-card-txts">
                    <span class="email-preview-card-info">
                        <p>{{email.from}}- </p>
                        <p class="email-preview-subject">{{email.subject}}</p>
                    </span>
                    <p class="email-preaview-body">{{email.body}}</p>
                </div>
            </router-link>
            <section class="email-preview-controls-wrap">
                <span @click="toggleStared" v-bind:class="{starStatus: this.email.isStared}"
                    title="Mark/Unmark Favorate" class="email-preview-star">★</span>
                <img src="imgs/icons/trash.png" title="Delete Mail"
                    class="email-preview-controls-delete-icon" @click="deleteThis">
                <img v-bind:src="'imgs/icons/' + emailStatus + '.png'" title="Mark Unread/Read"
                    class="email-preview-controls-status-icon" @click="toggleStatus">
                <section class="email-preview-sent-at">{{setDate}}</section>
            </section>
        </div>
    </section>
    `, 
    props: ['email'],
    data(){
        return {
            currEmail: null,
            firstLetter: null
        }
    },
    watch:{
        eamil(){
            this.currEmail = JSON.parse(JSON.stringify(this.eamil))
            this.emailStatus()
        }
    },
    computed:{
        setDate(){
            // debugger
            if(this.email.sentAt > (Date.now() - 1000000)) return 'Recent'

            const milliseconds = JSON.parse(JSON.stringify(this.email.sentAt)) * 1000 // 1575909015000
            const dateObject = new Date(milliseconds)
            
            var day = dateObject.toLocaleString("en-US", {day: "numeric"})
            var month = dateObject.toLocaleString("en-US", {month: "numeric"})
            var year = dateObject.toLocaleString("en-US", {year: "numeric"})

            return `sent: ${day} / ${month}`
        },
        setFirstLetterClass(){
            var letter = this.firstLetter.toLowerCase().charCodeAt(0)
            return {
                blue: letter < 102,
                green: letter < 108 && letter > 102,
                pink: letter < 113 && letter > 108,
                orange: letter < 118 && letter > 113,
                purple: letter < 122 && letter > 118,
            }
        },
        senderFirstLetter(){
            return currEmail.from.slice
        },
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
        this.firstLetter = this.currEmail.from.slice(0, 1).toUpperCase()
    }
}
