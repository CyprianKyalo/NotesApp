import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            notes: [
                {   
                    id: '1',
                    title: "Note 1",
                    items: [
                        {
                            item: "Finish cooking",
                            checked: false
                        },
                        {
                            item: "Finish Cleaning the House",
                            checked: false
                        }
                    ]
                },
                {
                    id: '2',
                    title: "Note 2",
                    items: [
                        {
                            item: "Finish cooking",
                            checked: false
                        },
                        {
                            item: "Finish Eating",
                            checked: false
                        }
                    ]
                }
            ]
        }
    },
    mutations: {
        addNote(state, newNote) {
            const addNote = {
                id: new Date().toISOString(),
                title: newNote.title,
                items: newNote.items
            };
            state.notes.unshift(addNote);
        },
        updateChecked(state, payload) {
            const note = state.notes.find((note) => note.id === payload.id);
            const itemIndex = note['items'].findIndex(it => it.item === payload.item);
            
            const st = state.notes.map(note => {
                if (note.id === payload.id) {
                    const items = note.items.map((item, index) => {
                        if (index === itemIndex) {
                            item.checked = payload.checked;                            
                        }
                    });
                    console.log(items);
                }
            });

            console.log(st);
        },
        deleteNote(state, id) {
            state.notes = state.notes.filter(note => note.id !== id);
        }
    },
    actions: {
        addNote(context, newNote) {
            context.commit('addNote', newNote);
        },
        updateChecked(context, payload) {
            context.commit('updateChecked', payload);
        },
        deleteNote(context, id) {
            context.commit('deleteNote', id);
        }
    },
    getters: {
        notes(state) {
            return state.notes;
        },
        note(state) {
            return (noteID) => {
                return state.notes.find((note) => note.id === noteID);
            }
        }
    },  
});

export default store;