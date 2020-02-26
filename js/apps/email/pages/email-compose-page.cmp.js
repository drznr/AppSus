import { emailService } from "../service/email.service.js"


export default {
    template: `
        <section class="email-compose-container">
            <form @submit.prevent="submitReview">
                <div class="emial-compose-main">
                    <input type="text" placeholder="To:"/>
                    <hr class="email-compose-hr"/>
                    <input type="text" placeholder="Subject"/>
                    <hr class="email-compose-hr"/>
                    <textarea></textarea>
                    <button class="my-btn">Send</button>
                </div>
            </form>
        </section>
    `,
    data(){
        return {

        }
    }
}
