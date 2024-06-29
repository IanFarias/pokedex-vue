<script>
import PokemonList from "@/components/PokemonList.vue";
import AppHeader from "@/components/AppHeader.vue";
import pokeApi from "@/services/api/pokeApi";

const { getPokemons } = pokeApi();

export default {
  data() {
    return {
      offset: 0,
      limit: 0,
      count: 0,
      lastPage: 0,
      hasPreviousPage: false,
      hasNextPage: false,
      pokemons: [],
      ariaMessage: "",
    };
  },
  created: async function () {
    this.initializeParams();

    await this.getPage();

    this.lastPage = Math.floor(this.count / this.limit + 1);
    this.updateAriaMessage();
  },
  components: {
    AppHeader,
    PokemonList,
  },
  methods: {
    initializeParams: function () {
      this.offset = parseInt(this.$route.query["offset"]) || 0;
      this.limit = parseInt(this.$route.query["limit"]) || 10;
    },
    getPage: async function () {
      const response = await getPokemons(this.offset, this.limit);
      this.hasPreviousPage = !!response.previous;
      this.hasNextPage = !!response.next;
      this.pokemons = response.results;
      this.count = response.count;
      this.updateAriaMessage();
    },
    handleNextPage: async function () {
      if (this.hasNextPage) {
        this.offset = this.offset + 10;

        this.$router.push({
          path: "/pokemons",
          query: { offset: this.offset, limit: this.limit },
          replace: true,
        });
      }
    },
    handlePreviousPage: async function () {
      this.offset = this.offset - 10;

      if (this.offset === 0) {
        this.$router.push({
          path: "/",
        });
        return;
      }

      this.$router.replace({
        path: "/pokemons",
        query: { offset: this.offset, limit: this.limit },
        replace: true,
      });
    },
    updateAriaMessage: function () {
      this.ariaMessage = `List of pokemons has been updated. Page ${this.currentPage} of ${this.lastPage}.`;
    },
  },
  computed: {
    currentPage: function () {
      return Math.floor(this.offset / this.limit + 1);
    },
  },
  watch: {
    "$route.query": {
      handler: async function () {
        this.initializeParams();
        await this.getPage();
      },
    },
  },
};
</script>

<template>
  <AppHeader />
  <main class="container">
    <h1>Pokémons</h1>
    <span class="hide" aria-live="polite" v-text="ariaMessage" />

    <PokemonList
      :count="count"
      :pokemons="pokemons"
      :currentPage="currentPage"
      :handleNextPage="handleNextPage"
      :handlePreviousPage="handlePreviousPage"
      :lastPage="lastPage"
      :hasNextPage="hasNextPage"
      :hasPreviousPage="hasPreviousPage"
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

.hide {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}
</style>
