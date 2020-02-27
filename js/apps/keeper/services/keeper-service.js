import { utilService } from '../../../service/utils.js';
import { storageService } from '../../../service/storage-service.js';

const NOTES_KEY = 'keepers';
var notesDB = [
    {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: true,
        pinnedAt: null,
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
        pinnedAt: null,
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
        pinnedAt: null,
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
        pinnedAt: null,
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
        pinnedAt: null,
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
    addNewNote,
    removeNote,
    editNote
}

function editNote(noteData) {
    const idx = notesDB.findIndex(note => note.id === noteData.id);
    if (idx === -1) return Promise.reject();
    
    if (noteData.color) notesDB[idx].styles.backgroundColor = noteData.color;
    else {
        notesDB[idx].isPinned = !notesDB[idx].isPinned;
        notesDB[idx].pinnedAt = Date.now();
    }

    storageService.store(NOTES_KEY, notesDB);
    return Promise.resolve(notesDB);
}

function removeNote(id) {
    const idx = notesDB.findIndex(note => note.id === id);
    if (idx === -1) return Promise.reject();
    notesDB.splice(idx, 1);
    storageService.store(NOTES_KEY, notesDB);
    return Promise.resolve(notesDB);
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
        noteData.txt = (noteData.noteType === 'NoteVideo') ? utilService.getYoutubeVidId(noteData.txt) : 
                       (noteData.noteType === 'NoteTodos') ? noteData.txt.split(',') : noteData.txt;

        const newNote = {
            id: utilService.makeId(),
            type: noteData.noteType,
            isPinned: false,
            pinnedAt: null,
            info: {
                title: noteData.noteTitle
            },
            styles: {
                backgroundColor: '#ffffff'
            }
        }
        if (noteData.noteType === 'NoteText') newNote.info.txt = noteData.txt;
        else if (noteData.noteType === 'NoteTodos') {
            newNote.info.todos =  noteData.txt.map(todo=> {
                return { txt: todo, isDone: false }
            });

        } else newNote.info.url = noteData.txt;
        
        notesDB.unshift(newNote);
        storageService.store(NOTES_KEY, notesDB);
        return Promise.resolve(notesDB);
}

