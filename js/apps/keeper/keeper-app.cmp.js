import { keeperService } from './services/keeper-service.js';
import { utilService } from '../../service/utils.js';
import keeprAddCmp from './cmps/keepr-add.cmp.js';
import keeperListCmp from './cmps/keeper-list.cmp.js';
import keeperFilterCmp from './cmps/keeper-filter.cmp.js';

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
    created() {
            keeperService.getNotes().then(notes=> {
                this.notes = JSON.parse(JSON.stringify(notes));
            })
            .catch(() => {
              debugger  //// call user-msg through event bus
            });
    },
    methods: {
        addNote(noteData) {
            keeperService.addNewNote(noteData)
            .then(notes => {
                this.notes = JSON.parse(JSON.stringify(notes));
            })
            .catch(() => {
                debugger //// call user-msg through event bus
            });
        },
        removeNote(noteId) {
            keeperService.removeNote(noteId)
            .then(notes => {
                this.notes = JSON.parse(JSON.stringify(notes));
            })
            .catch(() => {
                debugger //// call user-msg through event bus
            });
        },
        editNote(noteData) {
            keeperService.editNote(noteData)
            .then(notes => {
                this.notes = JSON.parse(JSON.stringify(notes));
            })
            .catch(() => {
                debugger //// call user-msg through event bus
            });
        },
        filter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    components: {
        'keeper-add': keeprAddCmp,
        'keeper-list': keeperListCmp,
        'keeper-filter': keeperFilterCmp
    }
}