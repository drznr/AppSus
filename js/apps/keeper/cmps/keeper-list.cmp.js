
var NoteText = {
    template: `
       <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}">
       <img v-if="note.isPinned" src="../../../../imgs/icons/color-pin.png" class="pin" />
        <h5>{{ note.info.title }}</h5>
        <p>{{ note.info.txt }}</p>
        <div class="controls">
            <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="../../../../imgs/icons/pin.png" title="Pin note" /></button>
            <button class="card-btn">
            <label>
                <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
                <img src="../../../../imgs/icons/color.png" title="Change color" />
            </label>
            </button>
            <button class="card-btn" @click="$emit('removed', note.id)"><img src="../../../../imgs/icons/bin.png" title="Remove note" /></button>
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
var NoteImg = {
    template: `
    <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}">
    <img v-if="note.isPinned" src="../../../../imgs/icons/color-pin.png" class="pin" />
    <h5>{{ note.info.title }}</h5>
        <img :src="note.info.url" :title="note.info.title" />
        <div class="controls">
            <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="../../../../imgs/icons/pin.png" title="Pin note" /></button>
            <button class="card-btn">
            <label>
                <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
                <img src="../../../../imgs/icons/color.png" title="Change color" />
            </label>
            </button>
            <button class="card-btn" @click="$emit('removed', note.id)"><img src="../../../../imgs/icons/bin.png" title="Remove note" /></button>
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
var NoteTodos = {
    template: `
    <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}">
    <img v-if="note.isPinned" src="../../../../imgs/icons/color-pin.png" class="pin" />
        <h5>{{ note.info.title }}</h5>
        <ul>
            <li v-for="todo in note.info.todos"><input type="checkbox" :checked="todo.isDone" />{{ todo.txt }}</li>
        </ul>
        <div class="controls">
            <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="../../../../imgs/icons/pin.png" title="Pin note" /></button>
            <button class="card-btn">
            <label>
                <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
                <img src="../../../../imgs/icons/color.png" title="Change color" />
            </label>
            </button>
            <button class="card-btn" @click="$emit('removed', note.id)"><img src="../../../../imgs/icons/bin.png" title="Remove note" /></button>
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
var NoteVideo = {
    template: `
    <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}">
    <img v-if="note.isPinned" src="../../../../imgs/icons/color-pin.png" class="pin" />
    <h5>{{ note.info.title }}</h5>
    <iframe :src="'https://www.youtube.com/embed/' + note.info.url"></iframe>
    <div class="controls">
        <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="../../../../imgs/icons/pin.png" title="Pin note" /></button>
        <button class="card-btn">
        <label>
            <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
            <img src="../../../../imgs/icons/color.png" title="Change color" />
        </label>
        </button>
        <button class="card-btn" @click="$emit('removed', note.id)"><img src="../../../../imgs/icons/bin.png" title="Remove note" /></button>
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
var NoteAudio = {
    template: `
    <div class="note-card" :style="{backgroundColor: note.styles.backgroundColor}">
    <img v-if="note.isPinned" src="../../../../imgs/icons/color-pin.png" class="pin" />
    <h5>{{ note.info.title }}</h5>
    <audio controls>
        <source :src="note.info.url" type="audio/mp3">
        Your browser does not support the audio element.
    </audio>
    <div class="controls">
        <button class="card-btn" @click="$emit('pinned', note.id, note.isPinned)"><img src="../../../../imgs/icons/pin.png" title="Pin note" /></button>
        <button class="card-btn">
        <label>
            <input type="color" @change="$emit('colored', note.id, color)" v-model="color" />
            <img src="../../../../imgs/icons/color.png" title="Change color" />
        </label>
        </button>
        <button class="card-btn" @click="$emit('removed', note.id)"><img src="../../../../imgs/icons/bin.png" title="Remove note" /></button>
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

export default {
    template: `
        <section class="keeper-list">
            <div v-if="notes" v-for="note in notes">
                <component 
                :is="note.type" 
                :note="note"
                @removed="passNoteId"
                @colored="passColor"
                @pinned="passIsPinned"
                ></component>
            </div>
        </section>
    `,
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
        }
    },
    components: {
        NoteText,
        NoteImg,
        NoteTodos,
        NoteVideo,
        NoteAudio
    }
}