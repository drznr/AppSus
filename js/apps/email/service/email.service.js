import {utilService} from '../../service/utils.js'
import {storageService} from ''

export const emailService = {
    query,
}

const EMAILS_KEY = 'emails';

var emailsDB = [
    {subject: 'Wassap?', body: utilService.makeLorem(30), isRead: false, sentAt : 1551133930594},
    {subject: 'Chase bank', body: utilService.makeLorem(30), isRead: false, sentAt : 1551133930594},
    {subject: 'About they thing?', body: utilService.makeLorem(30), isRead: false, sentAt : 1551133930594},
    {subject: 'Regarding the stuff?', body: utilService.makeLorem(30), isRead: false, sentAt : 1551133930594},
]

function query() {
    var emails = storageService.load(EMAILS_KEY);
    if (!emails) {
      emails = emailsDB
      storageService.store(BOOKS_KEY, books)
    } else {
      emailsDB = emails
    }
    return Promise.resolve(emails);
}
