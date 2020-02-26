

import emailPreview from '../cmps/email-preview.cmp.js'                  

export default {
    template: `
    <section class="emails-list-container">
            <email-preview v-for="email in emails" :email="emails" v-bind:key="book.id" @click.native="select(book.id)" ></email-preview>
    </section>
    `, 
    props: ['emails'],
    // methods:{
    //     select(bookId){
    //         this.$emit('selected', bookId)
    //     }
    // },
    components: {
        'email-preview': emailPreview
    }

};

 