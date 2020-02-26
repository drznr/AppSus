import {utilService} from '../../../service/utils.js'
import {storageService} from '../../../service/storage-service.js'


export const emailService = {
    query,
    getEmailById
}

const EMAILS_KEY = 'emails';

var emailsDB = [
    {id: utilService.makeId(), from: 'Mamba', subject: 'Wassap?', body: utilService.makeLorem(30),
      isRead: true, isStared: true, sentAt : 1551133930594},
    {id: utilService.makeId(), from: 'Puki', subject: 'Chase bank', body: utilService.makeLorem(30),
      isRead: false, isStared: false, sentAt : 1551133930594},
    {id: utilService.makeId(), from: 'Muki', subject: 'About they thing?', body: utilService.makeLorem(30),
      isRead: false, isStared: false, sentAt : 1551133930594},
    {id: utilService.makeId(), from: 'Shuki', subject: 'Regarding the stuff?', body: utilService.makeLorem(30),
      isRead: false, isStared: false, sentAt : 1551133930594},
]

function query() {
    var emails = storageService.load(EMAILS_KEY);
    if (!emails) {
      emails = emailsDB
      storageService.store(EMAILS_KEY, emails)
    } else {
      emailsDB = emails
    }
    return Promise.resolve(emails);
}

function getEmailById(emailId) {
  var emails = storageService.load(EMAILS_KEY);
  if (!emails) emails = emailsDB
  var email = emails.find(email => {
    return email.id === emailId
  })
  return Promise.resolve(email)
}