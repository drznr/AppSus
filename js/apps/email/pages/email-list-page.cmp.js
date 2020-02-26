

import emailPreview from '../cmps/email-preview.cmp'                  

export default {
    template: `
    <section class="book-list-container">
            <book-prev v-for="book in books" :book="book" v-bind:key="book.id" @click.native="select(book.id)" ></book-prev>
    </section>
    `, 
    props: ['emails'],
    // methods:{
    //     select(bookId){
    //         this.$emit('selected', bookId)
    //     }
    // },
    components: {
        'email-prev': emailPreview
    }

};

 