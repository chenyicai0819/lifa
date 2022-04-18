import { createStore } from 'vuex'
import trees from "./modules/trees";
import users from "./modules/users";
import selectItem from "./modules/selectItem";
import workerStore from "./modules/workerStore";
import paysItem from "./modules/paysItem";

export default createStore({
  modules: {
    trees,
    users,
    selectItem,
    workerStore,
    paysItem,
  }
})
