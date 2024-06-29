<script>
import pokeApi from "@/services/api/pokeApi";

const { getPokemonDetails } = pokeApi();

export default {
  name: "PokemonCard",
  data() {
    return {
      imageUrl: "",
    };
  },
  props: {
    name: String,
  },
  created: async function () {
    this.fetchImage();
  },
  methods: {
    fetchImage: async function () {
      const response = await getPokemonDetails(this.name);
      this.imageUrl = response.sprites.front_default;
    },
  },
  computed: {
    capitalize: function () {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    },
  },
};
</script>

<template>
  <router-link :to="{ name: 'PokemonDetail', params: { name } }">
    <article>
      <img :src="imageUrl" :alt="`${name} Illustration`" aria-hidden="true" />
      <h2>{{ capitalize }}</h2>
    </article>
  </router-link>
</template>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #ebebeb;
  border-radius: 12px;
  height: 240px;
  padding: 20px;
  text-align: center;
}

a:hover,
a:focus {
  outline: none;
}

a:hover article,
a:focus article {
  box-shadow: 0px 0px 20px 0px #e7e7e7e7;
}

a {
  text-decoration: none;
  color: black;
}

h2 {
  font-size: 20px;
}
</style>
