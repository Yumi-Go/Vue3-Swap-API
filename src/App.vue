<script setup>
import Search from './components/Search.vue';
import Result from './components/Result.vue';

window.onscroll = () => fromWhereTopBtnVisibile();

function fromWhereTopBtnVisibile() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

function goToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

</script>

<template>
  <div class="">
    <h1>Star Wars Application</h1>
    <Search/>
    <Result/>
    <button @click="goToTop()" id="topBtn">Top</button>
  </div>
</template>
