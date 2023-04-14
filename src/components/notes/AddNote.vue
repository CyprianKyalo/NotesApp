<template>
    <form class="ion-padding" @submit.prevent="submitForm">
        <ion-list>
            <ion-item>
                <ion-label position="floating">Title</ion-label>
                <ion-input type="text" required v-model="enteredTitle"/>
            </ion-item>
            <br />
            <ion-item v-for="(input, index) in enteredItems" :key="`itemInput-${index}`">
                <ion-input type="text" placeholder="Add Item" v-model="input.item"/>
                <ion-button @click="addField(input, enteredItems)">
                    <ion-icon size="medium" :icon="add"></ion-icon>
                </ion-button>
                <ion-button v-show="enteredItems.length > 1" @click="removeField(index, enteredItems)">
                    <ion-icon size="medium" :icon="close"></ion-icon>
                </ion-button>
            </ion-item>
        </ion-list>
        <br />
        <ion-button type="submit" expand="full">Save</ion-button>
    </form>
</template>

<script>
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon } from '@ionic/vue';
import { add, close } from 'ionicons/icons';

export default {
    emits: ['save-note'],
    components: {
        IonList,
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        IonIcon
    },
    data() {
        return {
            add,
            close,
            enteredTitle: '',
            // enteredItems: [''],
            enteredItems: [
                { 
                    item: ''
                }
            ]
        }
    },
    methods: {
        submitForm() {
            const newNote = {
                title: this.enteredTitle,
                items: this.enteredItems
            }
            console.log("Entered deets are ", this.enteredTitle);
            this.$emit('save-note', newNote);
        },
        addField(value, fieldType) {
            fieldType.push({ value: "" });
        },
        removeField(index, fieldType) {
            fieldType.splice(index, 1)
        }
    }
}
</script>