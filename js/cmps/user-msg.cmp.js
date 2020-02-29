import {eventBus} from '../service/event-bus.service.js';

export default {
    template: `
    <transition name="fade">
        <aside class="msg" v-if="isShown" :class="{fail: didFail}">
            <span class="close" @click="unMount">&times;</span>
            <div v-if="msg">
                <h3>{{ msg.type }}</h3>
                <p>{{ msg.txt }}</p>
                <a v-if="msg.link" :href="msg.link">To Book's Page</a>
            </div>
        </aside>
    </transition>
    `,
    data() {
        return {
            msg: {
                type: 'success',
                txt: 'note was added successfully...!'
            },
            didFail: false,
            isShown: true,
            timeOut: null
        }
    },
    created() {
        eventBus.$on('show-msg', (msg) => {
            this.didFail = (msg.type === 'success') ? false : true;
            this.msg = msg;
            this.isShown = true;
            this.timeOut = setTimeout(() => {
                this.isShown = false;
            }, 3000);
        });
    },
    methods: {
        unMount() {
            this.isShown = false;
            clearTimeout(this.timeOut);
        }
    }
}