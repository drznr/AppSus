
export default {
    template: `
    <section class="keeper-add">
    <div class="add-input">
        <input type="text"
        id="addMainInput" 
        :placeholder="compPlaceholder" 
        v-model="noteInfo.txt" 
        @keyup.enter="addNote"  
        class="info-inp" />
        <label for="addMainInput">{{ compPlaceholder }}</label>
        <input type="text" placeholder="Title" v-model="noteInfo.noteTitle" id="titleInput" @keyup.enter="addNote" v-show="noteInfo.txt" />
        <label for="titleInput">Title</label>
        <span>
            <input type="radio" name="note-type" id="txtNote" value="NoteText" v-model="noteInfo.noteType" />
            <label for="txtNote">
                <img src="imgs/icons/font.png" title="Add a text note" class="add-note-icon" />
            </label>
            <input type="radio" name="note-type" id="imgNote" value="NoteImg" v-model="noteInfo.noteType" />
            <label for="imgNote">
                <img src="imgs/icons/photo.png" title="Add an image note" class="add-note-icon" />
            </label>
            <input type="radio" name="note-type" id="todosNote" value="NoteTodos" v-model="noteInfo.noteType" />
            <label for="todosNote">
                <img src="imgs/icons/list.png" title="Add to do's note" class="add-note-icon" />
            </label>
            <input type="radio" name="note-type" id="videoNote" value="NoteVideo" v-model="noteInfo.noteType" />
            <label for="videoNote">
                <img src="imgs/icons/vid.png" title="Add a video note" class="add-note-icon" />
            </label>
            <input type="radio" name="note-type" id="audioNote" value="NoteAudio" v-model="noteInfo.noteType" />
            <label for="audioNote">
                <img src="imgs/icons/aud.png" title="Add an audio note" class="add-note-icon" />
            </label>
        </span>
    </div>
    <div class="placeholder" v-show="!noteInfo.txt"></div>
    </section>
    `,
    data() {
        return {
            noteInfo: {
                noteType: 'NoteText',
                txt: '',
                noteTitle: ''
            },
            inpPlaceholder: ''
        }
    },
    computed: {
        compPlaceholder() {
            switch (this.noteInfo.noteType) {
                case 'NoteText':
                    this.inpPlaceholder = 'Whats on your mind...';
                    break;
                case 'NoteImg':
                    this.inpPlaceholder = 'Enter Image URL...';
                    break;
                case 'NoteTodos':
                    this.inpPlaceholder = 'Enter commas seperated to do\'s...';
                    break;
                case 'NoteVideo':
                    this.inpPlaceholder = 'Enter Youtube URL...';
                    break;
                case 'NoteAudio':
                    this.inpPlaceholder = 'Enter Audio URL...';
                    break;
                default:
                    break;
            }
            return this.inpPlaceholder;
        }
    },
    methods: {
        addNote() {
            this.$emit('note-add', {...this.noteInfo});
            this.noteInfo.txt = '';
            this.noteInfo.noteTitle = '';
        }
    }
}