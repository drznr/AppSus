import { keeperService } from './services/keeper-service.js';
import { utilService } from '../../service/utils.js';
import keeprAddCmp from './cmps/keepr-add.cmp.js';
import keeperListCmp from './cmps/keeper-list.cmp.js';
import keeperFilterCmp from './cmps/keeper-filter.cmp.js';
import { eventBus } from '../../service/event-bus.service.js';

export default {
    template: `
        <section class="keeper">
            <keeper-add @note-add="addNote"></keeper-add>
            <keeper-filter @set-filter="filter"></keeper-filter>
            <keeper-list 
            :notes="notesForDisplay" 
            @removed="removeNote" 
            @colored="editNote"
            @pinned="editNote"
            @todo-toggle="toggleTodos"
            @txt-change="changeTxt"
            @todo-added="addTodo"
            @todo-removed="removeTodo"
            ></keeper-list>
        </section>
    `,
    data() {
        return {
            notes: null,
            filterBy: {
                title: '',
                type: ''
            }
        }
    },
    computed: {
        notesForDisplay() {
            if (this.notes) {
                let pinnedNotes = this.notes.filter(note=> note.isPinned);
                let unPinnedNotes = this.notes.filter(note=> !note.isPinned);
                pinnedNotes.sort(utilService.dynamicSort('pinnedAt')).reverse();
                const notesForDisplay = [...pinnedNotes, ...unPinnedNotes];
                
                return notesForDisplay.filter(note=> {
                    return note.info.title.toLowerCase().includes(this.filterBy.title.toLowerCase()) &&
                    note.type.toLowerCase().includes(this.filterBy.type.toLowerCase())
                })
            }
        }
    },
    watch: {
        '$route.params'() {
            const noteData = {
                noteType: 'NoteText',
                txt: this.$route.params.txt,
                noteTitle: this.$route.params.title
            }
            this.addNote(noteData);
        }
    },
    created() {
            keeperService.getNotes().then(notes=> {
                this.notes = JSON.parse(JSON.stringify(notes));
            })
            .catch(() => {
                eventBus.$emit('show-msg', {type: 'error', txt: 'Something went wrong...'});
            });
    },
    methods: {
        addNote(noteData) {
            keeperService.addNewNote(noteData)
            .then(notes => {
                this.notes = JSON.parse(JSON.stringify(notes));
                eventBus.$emit('show-msg', {type: 'success', txt: 'Note was added successfully!'});
            })
            .catch(() => {
                eventBus.$emit('show-msg', {type: 'error', txt: 'Something went wrong...'});
            });
        },
        removeNote(noteId) {
            keeperService.removeNote(noteId)
            .then(notes => {
                this.notes = JSON.parse(JSON.stringify(notes));
                eventBus.$emit('show-msg', {type: 'success', txt: 'Note was removed successfully!'});
            })
            .catch(() => {
                eventBus.$emit('show-msg', {type: 'error', txt: 'Something went wrong...'});
            });
        },
        editNote(noteData) {
            keeperService.editNote(noteData)
            .then(notes => {
                this.notes = JSON.parse(JSON.stringify(notes));
                eventBus.$emit('show-msg', {type: 'success', txt: 'Note was editted successfully!'});
            })
            .catch(() => {
                eventBus.$emit('show-msg', {type: 'error', txt: 'Something went wrong...'});
            });
        },
        filter(filterBy) {
            this.filterBy = filterBy;
        },
        toggleTodos(todoData) {
            keeperService.toggleTodo(todoData)
            .then(notes=> {
                this.notes = JSON.parse(JSON.stringify(notes));
            })
            .catch(() => {
                eventBus.$emit('show-msg', {type: 'error', txt: 'Something went wrong...'});
            });
        },
        changeTxt(noteData) {
            keeperService.replaceTxt(noteData)
            .then(notes=> {
                this.notes = JSON.parse(JSON.stringify(notes));
                eventBus.$emit('show-msg', {type: 'success', txt: 'Note was editted successfully!'});
            })
            .catch(() => {
                eventBus.$emit('show-msg', {type: 'error', txt: 'Something went wrong...'});
            })
        },
        addTodo(noteData) {
            keeperService.addTodo(noteData)
            .then(notes => {
                this.notes = JSON.parse(JSON.stringify(notes));
            })
            .catch(() => {
                eventBus.$emit('show-msg', {type: 'error', txt: 'Something went wrong...'});
            })
        },
        removeTodo(noteData) {
            keeperService.removeTodo(noteData)
            .then(notes => {
                this.notes = JSON.parse(JSON.stringify(notes));
            })
            .catch(() => {
                eventBus.$emit('show-msg', {type: 'error', txt: 'Something went wrong...'});
            })
        }
    },
    components: {
        'keeper-add': keeprAddCmp,
        'keeper-list': keeperListCmp,
        'keeper-filter': keeperFilterCmp
    }
}