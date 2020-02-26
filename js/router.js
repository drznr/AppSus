import homePageCmp from './cmps/home-page.cmp.js';
import keeperAppCmp from './apps/keeper/keeper-app.cmp.js';
import emailAppCmp from './apps/email/email-app.cmp.js';
import emailDetailsPage from './apps/email/pages/email-details-page.cmp.js';
import emailListPage from './apps/email/pages/email-list-page.cmp.js';
import emailComposePage from './apps/email/pages/email-compose-page.cmp.js';


const routes = [
    {path: '/', component: homePageCmp},
    {path: '/keeper', component: keeperAppCmp},
    {path: '/eamils', component: emailAppCmp,
    children:[
        {path:'/emails/details/:id', component: emailDetailsPage},
        {path:'/emails/inbox', component: emailListPage},
        {path:'/emails/compose', component: emailComposePage},

    ]}
];

export const router = new VueRouter({routes});