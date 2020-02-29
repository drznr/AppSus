import {utilService} from '../../../service/utils.js'
import {storageService} from '../../../service/storage-service.js'


export const emailService = {
    query,
    getEmailById,
    sendEmail,
    deleteSelectedEmail,
    toggleStarred,
    updateEmailStatus
}

const EMAILS_KEY = 'emails';

var emailsDB = [
    {id: utilService.makeId(), from: 'Mamba', to: 'jhon@doe.com', subject: 'Wassap?',
      body: utilService.makeLorem(30), isRead: true, isStared: true, sentAt : 1551133930594},
    {id: utilService.makeId(), from: 'Puki', to: 'jhon@doe.com', subject: 'Chase bank', 
      body: utilService.makeLorem(30), isRead: false, isStared: false, sentAt : 1551133930594},
    {id: utilService.makeId(), from: 'Muki', to: 'jhon@doe.com', subject: 'About they thing?', 
      body: utilService.makeLorem(30), isRead: false, isStared: false, sentAt : 1551133930594},
    {id: utilService.makeId(), from: 'Shuki', to: 'jhon@doe.com', subject: 'Regarding the stuff?',
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
  (!emails) ?  emails = emailsDB : emailsDB = emails
  var email = emails.find(email => {
    return email.id === emailId
  })
  email.isRead = true
  storageService.store(EMAILS_KEY, emailsDB)
  return Promise.resolve(email)
}

function sendEmail(email){
  email.isRead = false
  email.isStared =false
  if(email.id) {
  return _sendReplay(email)
  } else {
    email.id = utilService.makeId()
    email.sentAt = Date.now()
    emailsDB.unshift(email)
    storageService.store(EMAILS_KEY, emailsDB)
    return Promise.resolve(email)
  }
}

function _sendReplay(email){
    if(!email.replys) email.replys = []
    const idx = emailsDB.findIndex(emailFromDB => emailFromDB.id === email.id)
    if (idx === -1) return Promise.reject('Did Not Send Email')  
    email.replys.unshift(emailsDB[idx].body)
    email.id = utilService.makeId()
    email.sentAt = Date.now()
    emailsDB.unshift(email)
    storageService.store(EMAILS_KEY, emailsDB)
    return Promise.resolve(email)
}

function deleteSelectedEmail(emailId){
const idx = emailsDB.findIndex(email => email.id === emailId)
if (idx === -1) return Promise.reject('Did Not Remove Email')  
 emailsDB.splice(idx, 1)
 storageService.store(EMAILS_KEY, emailsDB)
  return Promise.resolve(emailsDB)
}

function toggleStarred(emailId){  
  const idx = emailsDB.findIndex(email => email.id === emailId)
  if (idx === -1) return Promise.reject('Couldnt LocateEmail')  
    emailsDB[idx].isStared = !emailsDB[idx].isStared
    storageService.store(EMAILS_KEY, emailsDB)
    return Promise.resolve(emailsDB)
}

function updateEmailStatus(emailId){
  const idx = emailsDB.findIndex(email => email.id === emailId)
  if (idx === -1) return Promise.reject('Couldnt LocateEmail')  
    emailsDB[idx].isRead = !emailsDB[idx].isRead
    storageService.store(EMAILS_KEY, emailsDB)
    return Promise.resolve(emailsDB)
}
