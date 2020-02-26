export default {
    template: `
        <header class="main-header">
            <img src="../../imgs/logo-white.png" alt="logo"/>
            <ul class="main-nav">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/books">Miss Books</router-link></li>
                <li><router-link to="/keeper">Mister Keeper</router-link></li>
                <li><router-link to="/emails">Miss Emails</router-link></li>
                <li><router-link to="/about">About</router-link></li>
            </ul>
        </header>
    `
}