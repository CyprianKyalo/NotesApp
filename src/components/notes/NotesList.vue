<template>
    <ion-list v-if="notes.length">
        <note-item v-show="notes.length" v-for="note in notes" :key="note.id" :note="note"></note-item>
        <div>
            {{ queryResults }}
        </div>
    </ion-list>
    <ion-label v-else>Add New Notes</ion-label>
</template>

<script>
import { IonList, IonLabel } from '@ionic/vue';
import NoteItem from './NoteItem.vue';
import { ref } from 'vue';

const queryResults = ref(null);

export default {
    inject: ["SQLITE"],
    components: {
        IonList,
        IonLabel,
        NoteItem
    },
    data() {
        return {
            queryResults
        }
    },
    computed: {
        notes() {
            return this.$store.getters.notes;
        },
        
    },
    methods: {
        async loadData() {
            try {
                const resp = await this.SQLITE?.value?.query("SELECT * FROM notes;");
                queryResults.value = resp.values;
                console.log("Query Results are ", queryResults.value);
                return true;
            } catch (e) {
                alert("Error Loading Notes");
            }
        }
    },
    mounted() {
        this.loadData();
        console.log("In Home ", this.SQLITE?.value);
    }
}
</script>