import emailStatus from './email-status.cmp.js'

export default {
    template: `
    <section class="email-filter-container">
        <section class="email-filter-search-sort-wrap">
            <input type="text" class="email-search-input" v-model="filterBy.byName"
                placeholder="🔍 Search mail" @input="emitFilter"/>
            <select title="Sort Mail" @change="emitFilter" v-model="sortBy" class="email-filter-sort-by">
                    <option>Date</option>
                    <option>Title</option>
            </select>
        </section>
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
    data() {
        return {
            filterBy: { byName: '', byStatus: 'all', },
            sortBy: 'date',
            passingEmails: []
        }
    },
    methods: {
        emitFilter() {
            var sort = this.sortBy.slice(0)
            this.$emit('filtered', { ...this.filterBy }, sort)
        }
    },
    components: {
        'email-status': emailStatus
    },
    watch: {
        emails() {
            this.passingEmails = JSON.parse(JSON.stringify(this.emails))
        }
    }
}
