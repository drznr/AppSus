export default {
    template:`
    <section class="email-filter-container">
        <input type="text" class="email-search-input" v-model="filterBy.byName"
            placeholder="🔍 Search mail" @input="emitFilter"/>
        <input @change="emitFilter" v-model="filterBy.byStatus" 
            type="radio" name="readUnreadFilter" value="all" />
            <label for="all">All</label>
        <input @change="emitFilter" v-model="filterBy.byStatus" 
            type="radio" name="readUnreadFilter" value="read" />
            <label for="read">Read</label>
        <input @change="emitFilter" v-model="filterBy.byStatus"  
            type="radio" name="readUnreadFilter" value="unread" />
            <label for="unread">Unread</label>
    </section>
    `,
    data(){
        return {
            filterBy: { byName: '', byStatus: 'all', }
        }
    },
    methods: {
        emitFilter() {                        
            this.$emit('filtered', {...this.filterBy})
        }
    },
}
