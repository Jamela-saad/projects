<template>
  <div>
    <p>Welcome to Inventory Management</p>
    <img src="@/assets/images/inventory-management.png" alt="inventory" />
  </div>
</template>

<script>
export default {
  name: "WelcomeComponent",
};
</script>

<style scoped>
img {
  width: 500px;
  height: 500px;
  float: right;
  position: relative;
  top: 60px;
  right: 65px;
  box-shadow: 10px 10px 10px 10px black;
}
p {
  font-size: 50px;
  font-weight: bolder;
  padding: 40px;
  width: 550px;
  height: 50px;
  margin: 50px;
  float: left;
  position: absolute;
  top: 70px;
  right: 600px;
  text-align: center;
  background-color: aliceblue;
  border-radius: 10px;
}
</style>
