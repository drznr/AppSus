import { utilService } from '../../../service/utils.js';
import { storageService } from '../../../service/storage-service.js';

const NOTES_KEY = 'keepers';
var notesDB = [
    {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: true,
        info: {
            txt: 'Fullstack Me Baby!'
        },
        styles: {
            backgroundColor: '#ffffff'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Me playing Mi'
        },
        styles: {
            backgroundColor: '#ffffff'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get these done:',
            todos: [
                { txt: 'Do that', isDone: false },
                { txt: 'Do this', isDone: false }
            ]
        },
        styles: {
            backgroundColor: '#ffffff'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url: 'http://some-vid/me',
            title: 'Me playing Video'
        },
        styles: {
            backgroundColor: '#ffffff'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteAudio',
        isPinned: false,
        info: {
            url: 'http://some-audio/mp3',
            title: 'audio'
        },
        styles: {
            backgroundColor: '#ffffff'
        }
    }
];

export const keeperService = {
    getNotes
}

function getNotes() {
    var notes = storageService.load(NOTES_KEY);
    if (!notes) {
        storageService.store(NOTES_KEY, notesDB);
        return Promise.resolve(notesDB);
    }
    notesDB = notes;
    return Promise.resolve(notes);
}



