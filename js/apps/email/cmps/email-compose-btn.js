


export default {
    template: `
        <section class="compose-btn-container">
            <button @click.prevent="emitCompose">+Compose</button>
        </section>
    `,
    methods:{
        emitCompose(){                   
                this.$emit('composeMail')
        }
    }
    
}  
