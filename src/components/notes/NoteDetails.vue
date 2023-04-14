<template>
    <div >
        <ion-item-divider >
            
                <h3 class="ion-text-center">{{ note.title }} </h3>
            
        </ion-item-divider>
    </div>
    <to-do-items :id="note.id" :items="note.items"></to-do-items>

</template>

<script>
import { IonItemDivider } from '@ionic/vue';
import ToDoItems from './ToDoItems.vue';

export default {
    name: "NoteDetails",
    props: ['note'],
    components: {
        IonItemDivider,
        ToDoItems
    }
}
</script>