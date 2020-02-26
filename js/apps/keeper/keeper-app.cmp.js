import { keeperService } from './services/keeper-service.js';
import keeprAddCmp from './cmps/keepr-add.cmp.js';
import keeperListCmp from './cmps/keeper-list.cmp.js';

export default {
    template: `
        <section class="keeper">
            <keeper-add @note-add="addNote"></keeper-add>
            <keeper-list :notes="notes"></keeper-list>
        </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
            keeperService.getNotes().then(notes=> {
                this.notes = JSON.parse(JSON.stringify(notes));
            })
            .catch(() => {
              debugger
            });
    },
    methods: {
        addNote(noteData) {
            debugger
        }
    },
    components: {
        'keeper-add': keeprAddCmp,
        'keeper-list': keeperListCmp
    }
}