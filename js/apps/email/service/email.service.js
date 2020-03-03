import {utilService} from '../../../service/utils.js'
import {storageService} from '../../../service/storage-service.js'


export const emailService = {
    query,
    getEmailById,
    sendEmail,
    deleteSelectedEmail,
    toggleStarred,
    updateEmailStatus,
    getEmailsForDispaly
}

const EMAILS_KEY = 'emails';
 
var emailsDB = [
    {id: utilService.makeId(), from: 'Simba', to: 'jhon@doe.com', subject: 'Thanks Again!',
      body: utilService.makeLorem(130), isRead: true, isStared: true, sentAt : 1583186261458},
    {id: utilService.makeId(), from: 'Mamba', to: 'jhon@doe.com', subject: 'Wassap?',
      body: utilService.makeLorem(330), isRead: false, isStared: false, sentAt : 1543185206107},
    {id: utilService.makeId(), from: 'Yokinawa', to: 'jhon@doe.com', subject: 'Chase bank', 
      body: utilService.makeLorem(230), isRead: true, isStared: false, sentAt : 1551233930594},
    {id: utilService.makeId(), from: 'Jess', to: 'jhon@doe.com', subject: 'About they thing', 
      body: utilService.makeLorem(130), isRead: false, isStared: true, sentAt : 1558133930594},
    {id: utilService.makeId(), from: 'Bryan', to: 'jhon@doe.com', subject: 'Regarding the stuff',
      body: utilService.makeLorem(330), isRead: false, isStared: false, sentAt : 1554133930594},
]

function getEmailsForDispaly(papaFilter){
  
  var outgoingEmails = JSON.parse(JSON.stringify(emailsDB))

  outgoingEmails = sortEmails(outgoingEmails, papaFilter.sortBy)

  //  if starred
  if(papaFilter.showingStared === true) outgoingEmails = outgoingEmails.filter(email => email.isStared)
  if(papaFilter.showingSent) outgoingEmails = outgoingEmails.filter(email => email.isSent)
  // if filter by read/unread
  if (papaFilter.filterBy) { 
    if(papaFilter.filterBy.byStatus !== 'all'){
      var filterByStatus = papaFilter.filterBy.byStatus === 'read'
      outgoingEmails = outgoingEmails.filter(email => email.isRead === filterByStatus)
    } 
  }
  // if filter by input feild
  var filterByName = JSON.parse(JSON.stringify(papaFilter.filterBy.byName)).toLowerCase()
  outgoingEmails= outgoingEmails.filter(email => {                
    return email.from.toLowerCase().includes(filterByName) ||
          email.body.toLowerCase().includes(filterByName) ||
          email.subject.toLowerCase().includes(filterByName) || 
          email.to.toLowerCase().includes(filterByName)          
  })
  
  return Promise.resolve(outgoingEmails);   
}

function sortEmails(emails, sortBy){
  sortBy = sortBy.toLowerCase()
  if(sortBy === 'title'){
    emails.sort(function (a, b) {
      var txtA = a.subject
      var txtB = b.subject
      txtA = txtA.toLowerCase()
      txtB = txtB.toLowerCase()
      if (txtA < txtB) return -1 
      if (txtA > txtB) return 1 
      return 0;
    })
  } else {
    emails.sort(function (a, b) {
      return b.sentAt - a.sentAt
    })
  }
  return emails
}

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
  email.isSent = true
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
