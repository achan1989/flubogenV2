import { createApp, ref } from "vue";
import TabBar from "/components/TabBar.js"
import TabContentHolder from "/components/TabContentHolder.js"

createApp({
  components: {
    TabBar,
    TabContentHolder,
  },

  template: /*html*/ `
  <header>
    <TabBar />
  </header>

  <div>
    <TabContentHolder />
  </div>
  `
}).mount("#appRoot");
