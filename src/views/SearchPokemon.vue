<script>
import AppHeader from "@/components/AppHeader.vue";
import PokemonCard from "@/components/PokemonCard.vue";
import pokeApi from "@/services/api/pokeApi";

const { getPokemonDetails } = pokeApi();

export default {
  data() {
    return {
      name: "",
    };
  },
  components: {
    AppHeader,
    PokemonCard,
  },
  created: async function () {
    this.search();
  },

  methods: {
    search: async function () {
      const q = this.$route.query["q"];

      try {
        const pokemon = await getPokemonDetails(q);
        if (pokemon) {
          this.name = pokemon.name;
        }
      } catch (error) {
        this.name = "";
      }
    },
  },
  watch: {
    "$route.query": {
      handler: async function () {
        this.search();
      },
    },
  },
};
</script>

<template>
  <AppHeader />
  <main>
    <PokemonCard :name="name" v-if="name" />
    <h2 role="alert" v-else>Pokemon Not Found...</h2>
  </main>
</template>

<style scoped>
h2 {
  text-align: center;
  margin: 60px;
}

main {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}

a {
  width: 270px;
}
</style>
