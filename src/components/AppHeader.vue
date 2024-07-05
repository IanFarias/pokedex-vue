<script>
import ButtonIcon from "./ButtonIcon.vue";
import IconSearch from "./icons/IconSearch.vue";
export default {
  data() {
    return {
      search: "",
    };
  },
  components: { ButtonIcon, IconSearch },
  name: "AppHeader",
  methods: {
    handleSearch: function () {
      if (this.search !== "") {
        this.$router.push({
          path: "search",
          query: { q: this.search.toLowerCase() },
        });
      }
    },
  },
};
</script>

<template>
  <header class="container">
    <router-link to="/" class="logo__wrapper">
      <img src="@/assets/img/pikachu.png" alt="Pikachu Illustration" />
      <span>Pokedex</span>
    </router-link>

    <form class="search__container" @submit.prevent="handleSearch">
      <input
        type="text"
        id="search"
        placeholder="Search for Pokemon"
        v-model="search"
      />
      <ButtonIcon :label="'Search Pokemon'" type="submit">
        <IconSearch />
      </ButtonIcon>
    </form>
  </header>
</template>

<style scoped>
header {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.logo__wrapper {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  text-transform: uppercase;
  font-size: 3.2rem;
  color: currentColor;
  text-decoration: none;

  font-weight: bold;
}

.search__container input {
  width: calc(100% - 44px);
  height: 100%;
  padding-left: 10px;
  border: none;
  background: transparent;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.search__container {
  position: relative;
  width: 25%;
  height: 40px;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
}

@media (max-width: 1024px) {
  .search__container {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .logo__wrapper span {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
  .search__container {
    width: 100%;
  }
}

.search__container button {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0px;
  top: 0;
  height: 100%;
  border-left: 1px solid #949494;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
