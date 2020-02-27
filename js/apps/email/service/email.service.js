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
  (!emails) ?  emails = emailsDB : emailsDB = emails
  storageService.store(EMAILS_KEY, emailsDB)
  var email = emails.find(email => {
    return email.id === emailId
  })
  return Promise.resolve(email)
}

function sendEmail(email){
  email.isRead = false
  email.isStared =false
  if(email.id) {
    sendReply()
  } else {
    email.id = utilService.makeId()
    email.sentAt = Date.now()
    emailsDB.unshift(email)
    storageService.store(EMAILS_KEY, emailsDB)
  }
}

function sendReplay(){
    console.log('replying');
}

function deleteSelectedEmail(emailId){
const idx = emailsDB.findIndex(email => email.id === emailId)
if (idx === -1) return Promise.reject('Did Not Remove Email')  
 emailsDB.splice(idx, 1)
 storageService.store(EMAILS_KEY, emailsDB)
  return Promise.resolve('Email Deleted')
}

function toggleStarred(emailId){  
  const idx = emailsDB.findIndex(email => email.id === emailId)
  if (idx === -1) return Promise.reject('Couldnt LocateEmail')  
    emailsDB[idx].isStared = !emailsDB[idx].isStared
    storageService.store(EMAILS_KEY, emailsDB)
    return Promise.resolve('Email Marked As Favorate')
}

function updateEmailStatus(emailId){
  const idx = emailsDB.findIndex(email => email.id === emailId)
  if (idx === -1) return Promise.reject('Couldnt LocateEmail')  
    emailsDB[idx].isRead = !emailsDB[idx].isRead
    storageService.store(EMAILS_KEY, emailsDB)
    return Promise.resolve('Email Marked As Favorate')
}
