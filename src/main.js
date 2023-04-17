import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import { defineCustomElements as jeepSqlite, applyPolyfills} from 'jeep-sqlite/loader';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, } from '@capacitor-community/sqlite';
// import { useState } from '@/composables/state';

/* Theme variables */
import './theme/variables.css';
import './theme/core.css';

applyPolyfills().then(() => {
  jeepSqlite(window);
});

window.addEventListener('DOMContentLoaded', async () => {
  const platform = Capacitor.getPlatform();
  const sqlite = new SQLiteConnection(CapacitorSQLite);

  const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(store);
  
  /* SQLite Global Variables*/

  // const [jsonListeners, setJsonListeners] = useState(false);
  // const [isModal, setIsModal] = useState(false);
  // const [message, setMessage] = useState("");
  
  // app.config.globalProperties.$isModalOpen = {isModal: isModal, setIsModal: setIsModal};
  // app.config.globalProperties.$isJsonListeners = {jsonListeners: jsonListeners, setJsonListeners: setJsonListeners};
  // app.config.globalProperties.$messageContent = {message: message, setMessage: setMessage};
  
  // // Existing Connections Store
  // const [existConn, setExistConn] = useState(false);
  // app.config.globalProperties.$existingConn = {existConn: existConn, setExistConn: setExistConn};

  try {
    if (platform === "web") {
      // Create the 'jeep-sqlite' Stencil component
      const jeepSqlite = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      // Init the Web store
      await sqlite.initWebStore();
    }

    // here you can initialize some database schema if required

    // Database creation with standard SQLite statements 
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection('notes-app')).result;
    let db = new SQLiteConnection();
    
    if (ret.result && isConn) {
      db = await sqlite.retrieveConnection("notes-app");
    } else {
      db = await sqlite.createConnection("notes-app", false, "no-encryption", 1);
    }

    await db.open();

    const query = `
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        items VARCHAR(255) NOT NULL
      );
      `
    const res = await db.execute(query);
    
    if (res.changes && res.changes.changes && res.changes.changes < 0) {
      throw new Error(`Error: execute failed`);
    } else {
      console.log("Command executed successfully");
    }
    await sqlite.closeConnection("notes-app");

    router.isReady().then(() => {
      app.mount('#app');
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`)
  }

})

  
