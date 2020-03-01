import longTxtCmp from '../../../cmps/long-txt.cmp.js';

export const dynamicNotes = {
    NoteText: {
        template: `
           <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}">
           <img v-if="note.isPinned" src="imgs/icons/color-pin.png" class="pin" />
            <h5>{{ note.info.title }}</h5>
            <p><long-txt :txt="note.info.txt" :chars="100"></long-txt></p>
            <input type="text" v-if="onEdit" v-model="newTxt" @keyup.enter="$emit('txt-change', {txt:newTxt, id: note.id});onEdit=false;newTxt=''" />
            <div class="controls">
                <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="imgs/icons/pin.png" title="Pin note" /></button>
                <button class="card-btn">
                <label>
                    <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
                    <img src="imgs/icons/color.png" title="Change color" />
                </label>
                </button>
                <button class="card-btn" @click="toggleEdit"><img src="imgs/icons/edit.png" title="Edit note"/></button>
                <router-link class="card-btn" :to="'emails/compose/' + note.id + '/' + title + '/' + txt"><img src="imgs/icons/send.png" title="Send note"/></router-link>
                <button class="card-btn" @click="$emit('removed', note.id)"><img src="imgs/icons/bin.png" title="Remove note" /></button>
            </div>
           </div>
        `,
        props: ['note'],
        data() {
            return {
                color: this.note.styles.backgroundColor,
                newTxt: '',
                onEdit: false
            }
        },
        computed:{
            title(){
                return (this.note.info.title) ? this.note.info.title : '-'
            },
            txt(){
                return (this.note.info.txt) ? this.note.info.txt : '-'
            }
        },
        methods: {
            toggleEdit() {
                this.onEdit = ! this.onEdit;
                this.newTxt = (this.onEdit) ? this.newTxt : '';
            }
        },
        components: {
            'long-txt': longTxtCmp
        }
    },
    NoteImg: {
        template: `
        <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}">
        <img v-if="note.isPinned" src="imgs/icons/color-pin.png" class="pin" />
        <h5>{{ note.info.title }}</h5>
            <img :src="note.info.url" :title="note.info.title" />
            <div class="controls">
                <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="imgs/icons/pin.png" title="Pin note" /></button>
                <button class="card-btn">
                <label>
                    <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
                    <img src="imgs/icons/color.png" title="Change color" />
                </label>
                </button>
                <button class="card-btn" @click="$emit('removed', note.id)"><img src="imgs/icons/bin.png" title="Remove note" /></button>
            </div>
        </div>
        `,
        props: ['note'],
        data() {
            return {
                color: this.note.styles.backgroundColor
            }
        }
    },
    NoteTodos: {
        template: `
        <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}">
        <img v-if="note.isPinned" src="imgs/icons/color-pin.png" class="pin" />
            <input type="text" placeholder="Add to do" v-if="onEdit" v-model="newTodo" @keyup.enter="$emit('todo-added', {txt:newTodo, id:note.id});onEdit=false;newTodo=''" />
            <h5>{{ note.info.title }}<span class="add-todo" @click="toggleEdit">&plus;</span></h5>
            <ul>
                <li v-for="(todo, idx) in note.info.todos">
                    <input type="checkbox" :checked="todo.isDone" @change="$emit('todo-toggle', {noteId: note.id, todoIdx: idx})" />
                    <span class="todo" :class="{done: todo.isDone}">{{ todo.txt }}</span>
                    <span class="remove-todo" @click="$emit('remove-todo', {id:note.id, todoIdx: idx})">&times</span>
                </li>
            </ul>
            <div class="controls">
                <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="imgs/icons/pin.png" title="Pin note" /></button>
                <button class="card-btn">
                <label>
                    <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
                    <img src="imgs/icons/color.png" title="Change color" />
                </label>
                </button>
                <button class="card-btn" @click="$emit('removed', note.id)"><img src="imgs/icons/bin.png" title="Remove note" /></button>
            </div>
        </div>
        `,
        props: ['note'],
        data() {
            return {
                color: this.note.styles.backgroundColor,
                onEdit: false,
                newTodo: ''
            }
        },
        methods: {
            toggleEdit() {
                this.onEdit = !this.onEdit;
                this.newTodo = (this.onEdit) ? this.newTodo : '';
            }
        }
    },
    NoteVideo: {
        template: `
        <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}">
        <img v-if="note.isPinned" src="imgs/icons/color-pin.png" class="pin" />
        <h5>{{ note.info.title }}</h5>
        <iframe :src="'https://www.youtube.com/embed/' + note.info.url"></iframe>
        <div class="controls">
            <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="imgs/icons/pin.png" title="Pin note" /></button>
            <button class="card-btn">
            <label>
                <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
                <img src="imgs/icons/color.png" title="Change color" />
            </label>
            </button>
            <button class="card-btn" @click="$emit('removed', note.id)"><img src="imgs/icons/bin.png" title="Remove note" /></button>
        </div>
        </div>
        `,
        props: ['note'],
        data() {
            return {
                color: this.note.styles.backgroundColor
            }
        }
    },
    NoteAudio: {
        template: `
        <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}">
        <img v-if="note.isPinned" src="imgs/icons/color-pin.png" class="pin" />
        <h5>{{ note.info.title }}</h5>
        <audio controls>
            <source :src="note.info.url" type="audio/mp3">
            Your browser does not support the audio element.
        </audio>
        <div class="controls">
            <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="imgs/icons/pin.png" title="Pin note" /></button>
            <button class="card-btn">
            <label>
                <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
                <img src="imgs/icons/color.png" title="Change color" />
            </label>
            </button>
            <button class="card-btn" @click="$emit('removed', note.id)"><img src="imgs/icons/bin.png" title="Remove note" /></button>
        </div>
        </div>
        `,
        props: ['note'],
        data() {
            return {
                color: this.note.styles.backgroundColor
            }
        }
    }
}