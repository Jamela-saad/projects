<template>
  <SideMenu></SideMenu>
  <SwitchButton></SwitchButton>
</template>

<script>
import SideMenu from "./components/SideMenu.vue";
import SwitchButton from "./components/SwitchButton.vue";
export default {
  name: "App",
  components: {
    SideMenu,
    SwitchButton,
  },
};
</script>
