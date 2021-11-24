import { createStore } from 'vuex'
import trees from "./modules/trees";
import users from "./modules/users";

export default createStore({
  modules: {
    trees,
    users,
  }
})
