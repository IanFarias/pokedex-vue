<script>
import ButtonIcon from "./ButtonIcon.vue";
import IconArrowLeft from "./icons/IconArrowLeft.vue";
import IconArrowRight from "./icons/IconArrowRight.vue";
import PokemonCard from "./PokemonCard.vue";

export default {
  name: "PokemonList",
  components: {
    PokemonCard,
    ButtonIcon,
    IconArrowLeft,
    IconArrowRight,
  },
  props: {
    count: Number,
    pokemons: Array,
    lastPage: Number,
    currentPage: Number,
    hasNextPage: Boolean,
    hasPreviousPage: Boolean,
    handleNextPage: Function,
    handlePreviousPage: Function,
  },
};
</script>

<template>
  <div>
    <span v-if="count" class="total">Total found: {{ count }} Pokémons</span>
    <ul v-if="pokemons">
      <li v-for="pokemon in pokemons" :key="pokemon.url">
        <PokemonCard :name="pokemon.name" />
      </li>
    </ul>
    <div class="pagination">
      <ButtonIcon
        :label="'Previous page'"
        :disabled="!hasPreviousPage"
        type="button"
        @click.prevent="handlePreviousPage"
      >
        <IconArrowLeft aria-hidden="true" />
      </ButtonIcon>
      <div>
        <span class="current-page">{{ currentPage }}</span>
        of
        <span>{{ lastPage }}</span>
      </div>

      <ButtonIcon
        :label="'Next page'"
        :disabled="!hasNextPage"
        type="button"
        @click.prevent="handleNextPage"
      >
        <IconArrowRight aria-hidden="true" />
      </ButtonIcon>
    </div>
  </div>
</template>

<style scoped>
ul {
  display: grid;
  justify-content: space-between;
  gap: 40px;
  grid-template-columns: repeat(auto-fill, 270px);
  min-height: 50vh;
}

.total {
  display: inline-block;
  margin-bottom: 40px;
}

.pagination {
  width: 100%;
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.current-page {
  font-weight: 800;
}

button {
  height: 40px;
  width: 44px;
  background: transparent;
  border: none;
}

button:disabled > svg {
  opacity: 0.2;
}

svg {
  width: 100%;
  height: 100%;
}
</style>
