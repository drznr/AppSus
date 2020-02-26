import homePageCmp from './cmps/home-page.cmp.js';


const routes = [
    {path: '/', component: homePageCmp}
];

export const router = new VueRouter({routes});