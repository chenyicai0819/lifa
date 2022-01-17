import { createStore } from 'vuex'
import trees from "./modules/trees";
import users from "./modules/users";
import selectItem from "./modules/selectItem";

export default createStore({
  modules: {
    trees,
    users,
    selectItem,
  }
})
