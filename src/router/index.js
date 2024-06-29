import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import PokemonDetail from "@/views/PokemonDetail.vue";
import Pokemons from "@/views/Pokemons.vue";
import SearchPokemon from "@/views/SearchPokemon.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pokemons",
    name: "Pokemons",
    component: Pokemons,
  },
  {
    path: "/pokemons/:name",
    name: "PokemonDetail",
    component: PokemonDetail,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchPokemon,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "PokemonDetail")
    document.title =
      to.params.name.charAt(0).toUpperCase() + to.params.name.slice(1);
  else document.title = "Pokedex | " + (to.name || "");
  next();
});
export default router;
