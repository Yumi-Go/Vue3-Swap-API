<script setup>
import Search from './components/Search.vue';
import Result from './components/Result.vue';
import Title from './components/Title.vue';

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    document.getElementById("topBtn").style.display = "block";
  } else {
    document.getElementById("topBtn").style.display = "none";
  }
});

function goToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

</script>

<template>

  <div class="">
    <Title/>
    <Search/>
    <Result/>
  </div>

  <button
  @click="goToTop()" id="topBtn"
  class="btn btn-active btn-circle btn-ghost fixed bottom-10 right-10">
    <div class="flex flex-col">
      <div><font-awesome-icon icon="fa-solid fa-angles-up"/></div>
      <div>Top</div>
    </div>
  </button>

</template>
