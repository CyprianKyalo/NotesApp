<template>
  <ion-app>
    <div v-if="databaseInitialized">
      <ion-router-outlet />
    </div>
    <div v-else>
      Loading....
    </div>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';

// Import plugins
import { Plugins } from "@capacitor/core";
import "@capacitor-community/sqlite";
import { SQLiteConnection } from "@capacitor-community/sqlite";
import { onBeforeMount, ref, provide } from 'vue';


const { CapacitorSQLite } = Plugins;

export default {
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    const database = ref(null);
    const databaseInitialized = ref(false);

    provide("SQLITE", database);

    const addTestNote = async() => {
      try {
        const resp = await database.value?.run(
          "INSERT INTO notes (title, items) " + 
              "VALUES(?, ?);",
              ["Note 3", "Finish finishing"]
        );
        console.log("Test Note Created ", resp);
        return true;
      } catch (e) {
        alert("Error creating test note");
      }
    };

    // Initialize Database
    onBeforeMount(async () => {
      try {
        const sqlite = new SQLiteConnection(CapacitorSQLite);
        const db = await sqlite.createConnection("notes-app", false, "no-encryption", 1);
        await db?.open();

        database.value = db;
        await addTestNote();
        console.log("Database Opened ", db);

        const res = await db.execute(`SELECT * from notes;`)
        console.log("Trying to view table");
        console.log("Table data is ", res);
        databaseInitialized.value = true;
      } catch (e) {
        console.log("Error is ", e);
        alert("Error initializing the Database");
      }
    });

    return {
      databaseInitialized
    }
  }
}
</script>
