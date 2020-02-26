import { utilService } from '../../../service/utils.js';

export default {
    template: `
    <section class="keeper-add">
    <div class="add-input">
        <input type="text" 
        :placeholder="compPlaceholder" 
        v-model="userInp" 
        @keyup.enter="addNote" 
        class="info-inp" />
        <input type="text" placeholder="Title" v-model="noteTitle" @keyup.enter="addNote" v-show="userInp" />
        <span>
            <input type="radio" name="note-type" id="txtNote" value="NoteText" v-model="noteType" />
            <label for="txtNote">
                <img src="../../../../imgs/icons/font.png" title="Add a text note" class="add-note-icon" />
            </label>
            <input type="radio" name="note-type" id="imgNote" value="NoteImg" v-model="noteType" />
            <label for="imgNote">
                <img src="../../../../imgs/icons/photo.png" title="Add an image note" class="add-note-icon" />
            </label>
            <input type="radio" name="note-type" id="todosNote" value="NoteTodos" v-model="noteType" />
            <label for="todosNote">
                <img src="../../../../imgs/icons/list.png" title="Add to do's note" class="add-note-icon" />
            </label>
            <input type="radio" name="note-type" id="videoNote" value="NoteVideo" v-model="noteType" />
            <label for="videoNote">
                <img src="../../../../imgs/icons/vid.png" title="Add a video note" class="add-note-icon" />
            </label>
            <input type="radio" name="note-type" id="audioNote" value="NoteAudio" v-model="noteType" />
            <label for="audioNote">
                <img src="../../../../imgs/icons/aud.png" title="Add an audio note" class="add-note-icon" />
            </label>
        </span>
    </div>
    </section>
    `,
    data() {
        return {
            noteType: 'NoteText',
            inpPlaceholder: '',
            userInp: '',
            noteTitle: ''
        }
    },
    computed: {
        compPlaceholder() {
            switch (this.noteType) {
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
            this.userInp = (this.noteType === 'NoteVideo') ? utilService.getYoutubeVidId(this.userInp) : this.userInp;
            this.$emit('note-add', {input: this.userInp, type: this.noteType, title: this.noteTitle})
        }
    }
}