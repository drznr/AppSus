import emailStatus from './email-status.cmp.js'

export default {
    template:`
    <section class="email-filter-container">
        <input type="text" class="email-search-input" v-model="filterBy.byName"
            placeholder="🔍 Search mail" @input="emitFilter"/>
        <section class="email-filter-bystatus-wrap">
        <section class="email-filter-bystatus-controls">
            <input @change="emitFilter" v-model="filterBy.byStatus" id="all"
                type="radio" name="readUnreadFilter" value="all" class="email-filter-radio"/>
                <label  title="See All" for="all" class="email-filter-radio-lable">All</label>
            <input @change="emitFilter" v-model="filterBy.byStatus" id="read"
                type="radio" name="readUnreadFilter" value="read" class="email-filter-radio"/>
                <label title="See Read" for="read" class="email-filter-radio-lable">Read</label>
            <input @change="emitFilter" v-model="filterBy.byStatus"  id="unread"
                type="radio" name="readUnreadFilter" value="unread" class="email-filter-radio"/>
                <label for="unread" title="See Unread" class="email-filter-radio-lable">Unread</label>
        </section>
            <email-status v-if="passingEmails" :emails="passingEmails" class="email-filter-bystatus-results"></email-status>
        </section>
    </section>
    `,
    props: ['emails'],
    data(){ 
        return {
            filterBy: { byName: '', byStatus: 'all', },
            passingEmails: []
        }
    },
    methods: {
        emitFilter() {                        
            this.$emit('filtered', {...this.filterBy})
        }
    },
    components:{
        'email-status': emailStatus
    },
    watch:{
        emails(){
            this.passingEmails = JSON.parse(JSON.stringify(this.emails))
        }
    }
}
