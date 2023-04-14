<template>
    <ion-list v-if="notes.length">
        <note-item v-show="notes.length" v-for="note in notes" :key="note.id" :note="note"></note-item>
    </ion-list>
    <ion-label v-else>Add New Notes</ion-label>
</template>

<script>
import { IonList, IonLabel } from '@ionic/vue';
import NoteItem from './NoteItem.vue';

export default {
    components: {
        IonList,
        IonLabel,
        NoteItem
    },
    data() {
        return {
            
        }
    },
    computed: {
        notes() {
            return this.$store.getters.notes;
        }
    }
}
</script>