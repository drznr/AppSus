export default {
    template: `
        <header class="main-header">
        <router-link to="/">
            <img src="/../../imgs/logo-white.png" alt="logo"/>
        </router-link>
            <input type="checkbox" id="mainBurger"/>
            <label for="mainBurger" class="main-hamburger">
            <span>|</span>
            </label>
            <ul class="main-nav">
                <li><router-link to="/" exact>Home</router-link></li>
                <li><router-link to="/books" exact>Miss Books</router-link></li>
                <li><router-link to="/keeper" exact>Mister Keeper</router-link></li>
                <li><router-link to="/emails" exact>Miss Emails</router-link></li>
                <li><router-link to="/about">About</router-link></li>
            </ul>
        </header>
    `
}