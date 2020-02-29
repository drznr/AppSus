

export default {
    template: `
    <div class="long-text-container">
        <p title="Click To Read More" @click="readMore" class="long-text" :class="{long: isLongTxt}">{{txtToDisplay}}</p>
    </div>
    `,
    props: ['txt', 'chars'],
    data() {
        return {
            toggleReadMore: false,
            isLongTxt: false,
        }
    },
    computed: {
        txtToDisplay() {
            if (!this.toggleReadMore && !this.isLongTxt) {
                return this.txt;
            } else if(!this.toggleReadMore && this.isLongTxt) {
                return this.txt.substring(0, this.chars) + '...';
            } else {
                return this.txt;
            }
        },
    }, 
    methods: {
        readMore() {
            this.toggleReadMore = !this.toggleReadMore;
        },
        
    },
    mounted(){
        this.$watch('$route.params.id', () => {
                this.toggleReadMore = false;
                this.isLongTxt = (this.txt.length > this.chars);
            })
        },
        created() {
            this.toggleReadMore = false;
            this.isLongTxt = (this.txt.length > this.chars);          
    }
};
