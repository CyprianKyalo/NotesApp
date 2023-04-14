<template>
    <base-layout :title="title">
        <template v-slot:actions-end>
            <ion-button @click="deleteNote(note.id)">
                <ion-icon slot="icon-only" :icon="trash"></ion-icon>
            </ion-button>
        </template>
        <note-details :note="note"></note-details>
    </base-layout>
</template>

<script>
import NoteDetails from '@/components/notes/NoteDetails.vue';
import BaseLayout from '../components/base/BaseLayout.vue';
import { trash } from 'ionicons/icons';
import { IonButton, IonIcon } from '@ionic/vue';

export default {
    components: {
        IonButton,
        IonIcon,
        BaseLayout,
        NoteDetails
    },
    data() {
        return {
            title: "Notes",
            noteID: this.$route.params.id,
            trash
        }
    },
    computed: {
        note() {
            console.log("All notes are ", this.$store.getters.note(this.noteID));
            return this.$store.getters.note(this.noteID);
        }
    },
    methods: {
        deleteNote(id) {
            this.$store.dispatch('deleteNote', id);
            this.$router.replace('/notes');
        }
    }
}
</script>
