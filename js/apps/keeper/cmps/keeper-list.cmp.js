import notePreviewCmp from './note-preview.cmp.js';

export default {
    template: `
        <section class="keeper-list">
            <div v-if="notes" v-for="note in notes">
                <note-preview 
                :note="note"
                @removed="passNoteId"
                @colored="passColor"
                @pinned="passIsPinned"
                @txt-change="changeText"
                @todo-toggle="passTodos"
                @todo-added="passTodo"
                @todo-removed="passTodoIdx"
                ></note-preview>
            </div>
        </section>
    `,
    props: ['notes'],
    methods: {
        passNoteId(id) {
            this.$emit('removed', id);
        },
        passColor(id, color) {
            this.$emit('colored', {id: id, color: color});
        },
        passIsPinned(id, isPinned) {
            this.$emit('pinned', {id: id, isPinned: isPinned});
        },
        passTodos(todoData) {
            this.$emit('todo-toggle', todoData);
        },
        changeText(noteData) {
            this.$emit('txt-change', {...noteData})
        },
        passTodo(noteData) {
            this.$emit('todo-added', {...noteData})
        },
        passTodoIdx(noteData) {
            this.$emit('todo-removed', {...noteData})
        }
    },
    components: {
        'note-preview': notePreviewCmp
    }
}