import { dynamicNotes } from './dynamic-cmps.js';

export default {
    template: `
    <span>
        <div class="cover" :class="{viewed: onView}" @click="onView = !onView"></div>
            <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}" :class="{viewed: onView}">
            <img v-if="note.isPinned" src="imgs/icons/color-pin.png" class="pin" />
            <component :is="note.type"
                   :note="note"
                    @todo-toggle="passTodos"
                    @todo-added="passTodo"
                    @remove-todo="passTodoIdx"
            ></component>

            <input 
                type="text" 
                v-if="onEdit" 
                v-model="newTxt" 
                @keyup.enter="$emit('txt-change', {txt:newTxt, id: note.id, type: note.type});onEdit=false;newTxt=''"
                :placeholder="'Enter ' + noteTypePlaceholder"
                />
            <div class="controls">
                <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="imgs/icons/pin.png" title="Pin note" /></button>
                <button class="card-btn">
                <label>
                    <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
                    <img src="imgs/icons/color.png" title="Change color" />
                </label>
                </button>
                <button class="card-btn" @click="onView = !onView"><img :src="onView ? 'imgs/icons/hide.png' : 'imgs/icons/eye.png'" :title="onView ? 'Hide note' : 'View note'" /></button>
                <button v-if="note.type!=='NoteTodos'" class="card-btn" @click="toggleEdit"><img src="imgs/icons/edit.png" title="Edit note"/></button>
                <router-link v-if="note.type === 'NoteText'" class="card-btn" :to="'emails/compose/' + note.id + '/' + title + '/' + txt"><img src="imgs/icons/send.png" title="Send note"/></router-link>
                <button class="card-btn" @click="$emit('removed', note.id)"><img src="imgs/icons/bin.png" title="Remove note" /></button>
            </div>
        </div>
    </span>
    `,
    props: ['note'],
    data() {
        return {
            color: this.note.styles.backgroundColor,
            newTxt: '',
            onEdit: false,
            onView: false
        }
    },
    methods: {
        toggleEdit() {
            this.onEdit = !this.onEdit;
            this.newTxt = (this.onEdit) ? this.note.info.txt : '';
        },
        passTodos(todoData) {
            this.$emit('todo-toggle', todoData);
        },
        passTodo(noteData) {
            this.$emit('todo-added', {...noteData})
        },
        passTodoIdx(noteData) {
            this.$emit('todo-removed', {...noteData})
        }
    },
    computed:{
        title(){
            return this.note.info.title ||  '-';
        },
        txt(){
            return this.note.info.txt ||  '-';
        },
        noteTypePlaceholder() { 
            let placeholder = this.note.type.split('Note')[1];
            if (placeholder === 'Img') placeholder = 'Image';
            
            if (placeholder !== 'Text') placeholder += ' URL...';
            return placeholder;
        }
    },
    components: dynamicNotes
}