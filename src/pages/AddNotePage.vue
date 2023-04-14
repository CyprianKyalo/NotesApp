<template>
    <base-layout title="Add Note">
        <add-note @save-note="saveNote"></add-note>
    </base-layout>
</template>

<script>
import BaseLayout from '../components/base/BaseLayout.vue';
import AddNote from '../components/notes/AddNote.vue';

export default {
    components: {
        BaseLayout,
        AddNote
    },
    methods: {
        saveNote(newNote) {
            this.$store.dispatch('addNote', newNote);
            this.$router.replace('/notes');
        }
    }
}
</script>