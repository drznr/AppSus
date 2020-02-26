import { keeperService } from '../services/keeper-service.js';

var NoteText = {
    template: `
       <div class="note-card" :style="{backgroundColor: styles.backgroundColor}">
        <p>{{ info.txt }}</p>
        <div>
        
        </div>
       </div>
    `,
    props: ['info', 'styles']
}
var NoteImg = {
    template: `
    <div class="note-card" :style="{backgroundColor: styles.backgroundColor}">
        <img :src="info.url" :title="info.title" />
        <div>
        
        </div>
    </div>
    `,
    props: ['info', 'styles']
}
var NoteTodos = {
    template: `
    <div class="note-card" :style="{backgroundColor: styles.backgroundColor}">
        <h5>{{ info.title }}</h5>
        <ul>
            <li v-for="todo in info.todos"><input type="checkbox" :checked="todo.isDone" />{{ todo.txt }}</li>
        </ul>
        <div>
        
        </div>
    </div>
    `,
    props: ['info', 'styles']
}
var NoteVideo = {
    template: `
    <div class="note-card" :style="{backgroundColor: styles.backgroundColor}">
    <video controls>
        <source :src="info.url" type="video/mp4" :title="info.title">
        Your browser does not support HTML5 video.
    </video>
    <div>

    </div>
    </div>
    `,
    props: ['info', 'styles']
}
var NoteAudio = {
    template: `
    <div class="note-card" :style="{backgroundColor: styles.backgroundColor}">
    <audio controls>
        <source :src="info.url" type="audio/mp3">
        Your browser does not support the audio element.
    </audio>
    <div>
        
    </div>
    </div>
    `,
    props: ['info', 'styles']
}

export default {
    template: `
        <section class="keeper-list">
            <div v-if="notes" v-for="note in notes">
                <component :is="note.type" :info="note.info" :styles="note.styles"></component>
            </div>
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
    components: {
        NoteText,
        NoteImg,
        NoteTodos,
        NoteVideo,
        NoteAudio
    }
}