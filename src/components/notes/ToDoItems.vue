<template>
    <li v-for="item in items" :key="item" class="ion-padding">
        <ion-checkbox :checked="item.checked" @ionChange="onIonChange(item)" label-placement="end">
          <ion-label :style="{ textDecoration: item.checked ? 'line-through' : 'none' }">
            {{ item.item }}
          </ion-label>
        </ion-checkbox>
    </li>
</template>

<script>
import { IonCheckbox, IonLabel } from '@ionic/vue';
import { useStore } from 'vuex'; 

export default {
  props: ['id', 'items'],
  components: {
    IonCheckbox,
    IonLabel,
  },
  setup(props) {
    const store = useStore();

    function checkItem(item) {
      const payload = { id: props.id, item: item.item, checked: !item.checked };
      store.dispatch('updateChecked', payload);
    }

    function onIonChange(item) {
        checkItem(item);
    }

    return {
      checkItem,
      onIonChange,
    };
  },
};
</script>

<style scoped>

</style>