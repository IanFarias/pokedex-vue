<script>
import PokemonList from "../components/PokemonList.vue";
import AppHeader from "../components/AppHeader.vue";
import pokeApi from "../services/api/pokeApi";

const { getPokemons } = pokeApi();

export default {
  data() {
    return {
      limit: 10,
      count: 0,
      lastPage: 0,
      offset: 0,
      hasNextPage: false,
      pokemons: [],
    };
  },
  created: async function () {
    await this.getPage();
    this.lastPage = Math.floor(this.count / this.limit + 1);
  },
  components: {
    AppHeader,
    PokemonList,
  },
  methods: {
    getPage: async function () {
      const response = await getPokemons(this.offset, this.limit);
      this.hasNextPage = !!response.next;
      this.pokemons = response.results;
      this.count = response.count;
    },
    handleNextPage: async function () {
      if (this.hasNextPage) {
        this.offset = this.offset + 10;

        this.$router.push({
          path: "/pokemons",
          query: { offset: this.offset, limit: this.limit },
        });
      }
    },
    handlePreviousPage: async function () {},
  },
  computed: {
    currentPage: function () {
      return this.offset / this.limit + 1;
    },
  },
};
</script>

<template>
  <AppHeader />
  <main class="container">
    <h1>Pokedex</h1>
    <PokemonList
      :count="count"
      :pokemons="pokemons"
      :currentPage="currentPage"
      :handleNextPage="handleNextPage"
      :handlePreviousPage="handlePreviousPage"
      :lastPage="lastPage"
      :hasNextPage="hasNextPage"
      :hasPreviousPage="false"
    />
  </main>
</template>

<style scoped>
main {
  padding: 20px 0;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}
</style>
