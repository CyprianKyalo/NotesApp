<template>
    <ion-item :router-link="`/notes/${note.id}`">
        <ion-label>{{ note.title }}</ion-label>
    </ion-item>
</template>

<script>
import { IonItem, IonLabel } from '@ionic/vue';

export default {
    name: "NoteItem",
    props: ['note'],
    components: {
        IonItem,
        IonLabel
    },
    
}
</script>