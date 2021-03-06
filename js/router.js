import homePageCmp from './cmps/home-page.cmp.js';
import keeperAppCmp from './apps/keeper/keeper-app.cmp.js';
import emailAppCmp from './apps/email/email-app.cmp.js';
import emailDetailsPage from './apps/email/pages/email-details-page.cmp.js';
import emailListPage from './apps/email/pages/email-list-page.cmp.js';
import emailComposePage from './apps/email/pages/email-compose-page.cmp.js';
import aboutPageCmp from './cmps/about-page.cmp.js';


const routes = [
    {path: '/', component: homePageCmp},
    {path: '/keeper', component: keeperAppCmp},
    {path: '/keeper/:title?/:txt?', component: keeperAppCmp},
    {path: '/emails', component: emailAppCmp,
    children:[
        {path:'', component: emailListPage},
        {path:'compose/:id?/:title?/:txt?', component: emailComposePage},
        {path:':id', component: emailDetailsPage}
    ]},
    {path: '/about', component: aboutPageCmp}
];

export const router = new VueRouter({routes});