<template>
    <base-layout :title="title">
        <template v-slot:actions-end>
            <ion-button router-link='/notes/add'>
                <ion-icon slot="icon-only" :icon="add"></ion-icon>
            </ion-button>
        </template>
        <notes-list></notes-list>
    </base-layout>
</template>

<script>
import { IonButton, IonIcon } from '@ionic/vue';
import { add } from 'ionicons/icons';
import BaseLayout from '../components/base/BaseLayout.vue';
import NotesList from '../components/notes/NotesList.vue';

export default {
    data() {
        return {
            title: "Notes",
            add
        }
    },
    components: {
        IonButton,
        IonIcon,
        BaseLayout,
        NotesList
    }
}

</script>