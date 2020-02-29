import { dynamicNotes } from './dynamic-cmps.js';

export default {
    template: `
        <section class="keeper-list">
            <div v-if="notes" v-for="note in notes">
                <component 
                :is="note.type" 
                :note="note"
                :onEdit="onEdit"
                @removed="passNoteId"
                @colored="passColor"
                @pinned="passIsPinned"
                @todo-toggle="passTodos"
                @editted="editText"
                @txt-change="changeText"
                @todo-added="passTodo"
                @remove-todo="passTodoIdx"
                ></component>
            </div>
        </section>
    `,
    data() {
        return {
            onEdit: false
        }
    },
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
        editText() {
            this.onEdit = !this.onEdit;
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
    components: dynamicNotes
}