<script></script>

<template>
  <router-view />
</template>

<style>
:root {
  --normalType: #aa9;
  --darkType: #754;
  --fightingType: #bb5544;
  --flyingType: #89f;
  --poisonType: #a59;
  --groundType: #db5;
  --rockType: #ba6;
  --bugType: #ab2;
  --ghostType: #66b;
  --steelType: #aab;
  --fireType: #f42;
  --waterType: #39f;
  --grassType: #7c5;
  --electricType: #fc3;
  --psychiType: #f59;
  --iceType: #6cf;
  --fairyType: #e9e;
  --stellarType: #fa00fa;
  --unknownType: white;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

button {
  cursor: pointer;
}

.container {
  margin: 0 auto;
  max-width: 80%;
}
</style>
