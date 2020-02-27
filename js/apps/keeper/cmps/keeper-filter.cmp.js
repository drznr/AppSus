export default {
    template: `
        <section class="keeper-filter">
            <input type="text" placeholder="Search..." v-model="filterBy.title" />
            <select v-model="filterBy.type">
                <option value="">All</option>
                <option value="NoteText">Text</option>
                <option value="NoteImg">Images</option>
                <option value="NoteTodos">To do's</option>
                <option value="NoteVideo">Videos</option>
                <option value="NoteAudio">Audios</option>
            </select>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                type: ''
            }
        }
    },
    watch: {
        filterBy: {
            handler() {
                this.$emit('set-filter', this.filterBy);
            },
            deep: true
        }
    }
}