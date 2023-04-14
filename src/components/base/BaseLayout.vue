<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot='start'>
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>{{ title }}</ion-title>
                <ion-buttons slot="end">
                    <slot name="actions-end"/>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <slot />
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonContent, IonToolbar, IonButtons, IonBackButton } from '@ionic/vue'

export default {
    name: 'BaseLayout',
    props: ['title'],
    components: {
        IonPage,
        IonHeader,
        IonContent,
        IonToolbar,
        IonButtons,
        IonBackButton
    }
}
</script>