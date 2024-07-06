<script>
import pokeApi from "@/services/api/pokeApi";
import TagCard from "@/components/TagCard.vue";
import HiddenText from "@/components/HiddenText.vue";
import ButtonIcon from "@/components/ButtonIcon.vue";
import IconWeight from "@/components/icons/IconWeight.vue";
import IconHeight from "@/components/icons/IconHeight.vue";
import IconReturn from "@/components/icons/IconReturn.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";

const { getPokemonDetails } = pokeApi();
export default {
  data() {
    return {
      id: 0,
      name: this.$route.params["name"] || "",
      sprites: {},
      abilities: [],
      weight: 0,
      height: 0,
      types: [],
      stats: [],
    };
  },
  components: {
    TagCard,
    ButtonIcon,
    IconWeight,
    IconHeight,
    IconReturn,
    HiddenText,
    IconArrowRight,
    IconArrowLeft,
  },
  created: async function () {
    await this.populateData(this.name);
  },
  computed: {
    getWeight: function () {
      return (this.weight / 10).toFixed(2);
    },
    getHeight: function () {
      return (this.height / 10).toFixed(2);
    },
  },
  methods: {
    toCapitalize: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    statFormatter: function (stat) {
      return stat === "hp"
        ? stat.toUpperCase()
        : this.toCapitalize(stat.replace("-", " "));
    },
    getPercentage: function (stat) {
      return (stat * 100) / 200;
    },
    handleReturn: function () {
      this.$router.back(1);
    },
    populateData: async function (pokemonId) {
      const pokemon = await getPokemonDetails(pokemonId);
      this.id = pokemon.id;
      this.name = pokemon.name;
      this.weight = pokemon.weight;
      this.height = pokemon.height;
      this.sprites = { ...pokemon.sprites };
      this.types = pokemon.types.map((el) => el.type.name);
      this.stats = pokemon.stats.map((el) => ({
        value: el.base_stat,
        name: el.stat.name,
      }));
      this.abilities = pokemon.abilities.map((a) => a.ability);
    },
    handleNextPokemon: async function () {
      this.id = this.id + 1;

      try {
        const { name } = await getPokemonDetails(this.id);
        this.$router.push({
          name: "PokemonDetail",
          params: { name },
          replace: true,
        });
      } catch (error) {
        this.id = 1;
        const { name } = await getPokemonDetails(this.id);
        this.$router.replace({
          name: "PokemonDetail",
          params: { name },
        });
      }
    },
    handlePreviousPokemon: async function () {
      try {
        this.id = this.id - 1;
        const { name } = await getPokemonDetails(this.id);
        this.$router.replace({
          name: "PokemonDetail",
          params: { name },
        });
      } catch (error) {
        this.id = 1;
        const { name } = await getPokemonDetails(this.id);
        this.$router.replace({
          name: "PokemonDetail",
          params: { name },
        });
      }
    },
    touchStart(touchEvent) {
      if (touchEvent.changedTouches.length !== 1) {
        // We only care if one finger is used
        return;
      }
      const posXStart = touchEvent.changedTouches[0].clientX;
      addEventListener(
        "touchend",
        (touchEvent) => this.touchEnd(touchEvent, posXStart),
        { once: true }
      );
    },
    touchEnd(touchEvent, posXStart) {
      if (touchEvent.changedTouches.length !== 1) {
        return;
      }
      const posXEnd = touchEvent.changedTouches[0].clientX;
      const horizontalDifference = posXStart - posXEnd;

      if (horizontalDifference >= 100) {
        return this.handleNextPokemon();
      } else if (horizontalDifference <= -100) {
        return this.handlePreviousPokemon();
      }
    },
  },
  watch: {
    "$route.params.name": {
      handler: async function () {
        await this.populateData(this.id);
      },
    },
  },
};
</script>

<template>
  <header class="container">
    <ButtonIcon :label="'Return to listing'" @click="handleReturn">
      <IconReturn
    /></ButtonIcon>
  </header>
  <main class="container" @touchstart="touchStart">
    <h1 class="name">
      {{ toCapitalize(name) }}
    </h1>
    <ul class="types">
      <li v-for="type in types" :key="type">
        <TagCard
          :tag="type"
          :style="{ backgroundColor: `var(--${type}Type)` }"
        />
      </li>
    </ul>
    <div class="about">
      <img
        :src="sprites['front_default']"
        :alt="`${name} Illustration`"
        class="sprite"
      />

      <div class="about__container">
        <div class="about__specifications">
          <p><IconWeight /><span>Weight</span> {{ getWeight }}kg</p>
          <p><IconHeight /><span>Height</span>{{ getHeight }}m</p>
        </div>
        <div class="about__abilities">
          <h2>Abilities</h2>
          <ul>
            <li v-for="ability in abilities" :key="ability.name">
              <TagCard :tag="ability.name" />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <ul class="stats">
      <HiddenText :text="'Pokémon Stats'" />
      <li v-for="stat in stats" :key="stat.name">
        <span
          >{{ statFormatter(stat.name) }} {{ getPercentage(stat.value) }}%</span
        >
        <span class="stat-bar">
          <span
            class="stat-bar__line"
            :style="{ width: `${getPercentage(stat.value)}%` }"
          />
        </span>
      </li>
    </ul>

    <ButtonIcon
      :label="'Previous'"
      class="previous"
      :disabled="this.id === 1"
      type="click"
      @click="handlePreviousPokemon"
    >
      <IconArrowLeft />
    </ButtonIcon>
    <ButtonIcon
      :label="'Next'"
      class="next"
      type="click"
      @click="handleNextPokemon"
    >
      <IconArrowRight />
    </ButtonIcon>
  </main>
</template>

<style scoped>
.container {
  max-width: 40%;
}

header {
  padding: 20px 0 0;
}

main {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 40%;
  padding: 0px 0px 40px 0px;
}

@media (max-width: 1440px) {
  main,
  .container {
    max-width: 50%;
  }
}

@media (max-width: 1024px) {
  main,
  .container {
    max-width: 50%;
  }
}

@media (max-width: 768px) {
  main,
  .container {
    max-width: 80%;
  }
}

.about {
  display: flex;
  gap: 40px;
}

.about__container {
  width: 50%;
  display: flex;
  flex-direction: column;
  background-color: #5f2eea;
  border-radius: 12px;
}

@media (max-width: 1240px) {
  .about {
    flex-wrap: wrap;
    gap: 0;
  }
  .about__container {
    width: 100%;
    margin-bottom: 40px;
  }
}

.about__specifications {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 40px 40px 20px;
  color: #eff0f7;
  justify-content: space-between;
}

.about__specifications p {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  font-size: 2rem;
}

.about__specifications span {
  font-weight: bold;
}

.about__abilities {
  width: 100%;
  background-color: #5f2eea;
  padding: 20px 40px 40px;
  border-radius: 12px;
  color: #eff0f7;
}

.about__abilities ul {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.sprite {
  display: block;
  width: 100%;
  image-rendering: pixelated;
  object-fit: contain;
  object-position: center;
}

@media (max-width: 1240px) {
  .sprite {
    height: 60vh;
  }
}

.name {
  font-size: 4rem;
  display: inline;
}

.types {
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
}

.types li {
  text-transform: capitalize;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-weight: bold;
}

.stat-bar {
  padding: 4px;
  background: #fafafa;
  display: flex;
  align-items: center;
  border-radius: 16px;
  box-shadow: inset 0px 0px 2px 1px #dad9d9;
}

.stat-bar__line {
  display: block;
  background-color: #fd3939;
  height: 10px;
  border-radius: 16px;
}

.next,
.previous {
  height: 44px;
}

.previous {
  position: absolute;
  top: 40%;
  left: -10%;
}

.next {
  position: absolute;
  top: 40%;
  right: -10%;
}

.previous svg,
.next svg {
  height: 100%;
  width: 100%;
}

.next:disabled > svg,
.previous:disabled > svg {
  opacity: 0.2;
}
@media (max-width: 1240px) {
  .next,
  .previous {
    display: none;
  }
}
</style>
