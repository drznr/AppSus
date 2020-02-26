import { utilService } from '../../../service/utils.js';
import { storageService } from '../../../service/storage-service.js';

const NOTES_KEY = 'keepers';
var notes = [
    {
        type: 'NoteText',
        isPinned: true,
        info: {
            txt: 'Fullstack Me Baby!'
        },
        style: {
            backgroundColor: '#ffffff'
        }
    },
    {
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Me playing Mi'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        type: 'NoteTodos',
        isPinned: false,
        info: {
            label: 'How was it:',
            todos: [
                { txt: 'Do that', doneAt: null },
                { txt: 'Do this', doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: '#ffffff'
        }
    }

];

export const keeperService = {
    
}



