import longTxtCmp from '../../../cmps/long-txt.cmp.js';

export const dynamicNotes = {
    NoteText: {
        template: `
           <div>
                <h5>{{ note.info.title }}</h5>
                <p><long-txt :txt="note.info.txt" :chars="100"></long-txt></p>
           </div>
        `,
        props: ['note'],
        components: {
            'long-txt': longTxtCmp
        }
    },
    NoteImg: {
        template: `
        <div>
            <h5>{{ note.info.title }}</h5>
            <img :src="note.info.url" :title="note.info.title" />
        </div>
        `,
        props: ['note']
    },
    NoteTodos: {
        template: `
        <div>
            <input type="text" placeholder="Add to do" v-if="onEdit" v-model="newTodo" @keyup.enter="$emit('todo-added', {txt:newTodo, id:note.id});onEdit=false;newTodo=''" />
            <h5>{{ note.info.title }}<span class="add-todo" @click="toggleEdit">&plus;</span></h5>
            <ul>
                <li v-for="(todo, idx) in note.info.todos">
                <label class="todo" :class="{done: todo.isDone}">
                <input type="checkbox" :checked="todo.isDone" @change="$emit('todo-toggle', {noteId: note.id, todoIdx: idx})" />
                    {{ todo.txt }}</label>
                    <span class="remove-todo" @click="$emit('remove-todo', {id:note.id, todoIdx: idx})">&times</span>
                </li>
            </ul>
        </div>
        `,
        props: ['note'],
        data() {
            return {
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
        <div>
            <h5>{{ note.info.title }}</h5>
            <iframe :src="'https://www.youtube.com/embed/' + note.info.url"></iframe>
        </div>
        `,
        props: ['note']
    },
    NoteAudio: {
        template: `
        <div>
            <h5>{{ note.info.title }}</h5>
            <audio controls>
                <source :src="note.info.url" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>
        </div>
        `,
        props: ['note']
    }
}
