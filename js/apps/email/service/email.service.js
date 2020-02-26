import {utilService} from '../../../service/utils.js'
import {storageService} from '../../../service/storage-service.js'


export const emailService = {
    query,
    getEmailById
}

const EMAILS_KEY = 'emails';

var emailsDB = [
    {id: utilService.makeId(), from: 'Mamba', to: 'Miss Email', subject: 'Wassap?', 
      body: utilService.makeLorem(30), isRead: true, isStared: true, sentAt : 1551133930594},
    {id: utilService.makeId(), from: 'Puki', to: 'Miss Email', subject: 'Chase bank', 
      body: utilService.makeLorem(30), isRead: false, isStared: false, sentAt : 1551133930594},
    {id: utilService.makeId(), from: 'Muki', to: 'Miss Email', subject: 'About they thing?', 
      body: utilService.makeLorem(30), isRead: false, isStared: false, sentAt : 1551133930594},
    {id: utilService.makeId(), from: 'Shuki', to: 'Miss Email', subject: 'Regarding the stuff?',
      body: utilService.makeLorem(30), isRead: false, isStared: false, sentAt : 1551133930594},
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