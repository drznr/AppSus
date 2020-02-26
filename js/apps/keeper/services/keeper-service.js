import { utilService } from '../../../service/utils.js';
import { storageService } from '../../../service/storage-service.js';

const NOTES_KEY = 'keepers';
var notesDB = [
    {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: true,
        info: {
            txt: 'Fullstack Me Baby!',
            title: ''
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
            url: 'https://i.redd.it/qczy9rxos8321.jpg',
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
            url: 'cadvn16N188',
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
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            title: 'audio'
        },
        styles: {
            backgroundColor: '#ffffff'
        }
    }
];

export const keeperService = {
    getNotes,
    addNewNote
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

function addNewNote(noteData) {
    debugger
}

