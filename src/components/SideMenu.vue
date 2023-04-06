<template>
  <div id="side" class="side-menu">
    <button
      type="button"
      style="float: right; padding-top: 10px"
      @click="openCloseMenu()"
    >
      <img src="@/assets/images/colse.png" />
    </button>
    <p>
      <img src="@/assets/images/inventory-icon.png" class="icon" />
      Inventory
    </p>
    <nav>
      <!-- <router-link to="/Item">Items</router-link> -->
      <router-link to="/" exact
        >Items <img src="@/assets/images/item-icon.png" class="icons"
      /></router-link>
      <router-link to="/Option"
        >Options <img src="@/assets/images/option-icon.png" class="icons"
      /></router-link>
      <router-link to="/CustomAttribute"
        >Custom Attributes
        <img src="@/assets/images/custom-icon.png" class="icons"
      /></router-link>
      <router-link to="/Categorie" style="display: inline-flex"
        >Categories <img src="@/assets/images/category-icon.png" class="icons"
      /></router-link>
      <router-link to="/Unit"
        >Units <img src="@/assets/images/unit-icon.png" class="icons"
      /></router-link>
      <router-link to="/User"
        >Users <img src="@/assets/images/user-icon.png" class="icons"
      /></router-link>
    </nav>
  </div>
  <button type="button" @click="openCloseMenu()">
    <img
      src="@/assets/images/menu.png"
      id="menu"
      class="menu"
      alt="side-menu"
    />
  </button>
  <router-view></router-view>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    pageName: String,
  },
  methods: {
    //open side menu and hide the side menu button
    openCloseMenu: function () {
      if (document.getElementById("side").style.display === "block") {
        document.getElementById("side").style.display = "none";
        document.getElementById("menu").style.display = "block";
      } else {
        document.getElementById("side").style.display = "block";
        document.getElementById("menu").style.display = "none";
      }
    },
  },
};
</script>

<style scoped lang="scss">
/* side menu */
.side-menu a {
  width: 215px;
  margin: 0px 8px;
  margin-left: 5px;
  text-align: left;
}
.side-menu a,
.side-menu a:hover {
  border: none;
  border-bottom: 1.5px solid rgb(121, 120, 120);
  padding: 10px 15px 10px;
  text-decoration: none;
  display: block;
  color: rgb(100, 99, 99);
  font-weight: bold;
  font-size: 19px;
}
.side-menu a:hover {
  width: 200px;
  margin-left: 10px;
  background-color: rgba(128, 128, 128, 0.137);
}

.side-menu p {
  border: none;
  border-bottom: 2px solid black;
  width: 225px;
  padding: 10px 0px 10px 20px;
  margin-bottom: 2px;
  margin-left: 5px;
  font-size: 20px;
  font-weight: bolder;
  text-align: left;
}
.side-menu p img {
  width: 20px;
  margin-right: 10px;
}

div.side-menu {
  border: none;
  z-index: 2;
  position: fixed;
  top: 0px;
  left: 1px;
  display: none;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  float: left;
  box-shadow: 5px 0px 10px -6px grey;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

#menu {
  position: fixed;
  top: 20px;
  left: 30px;
  width: 40px;
}
button {
  background: none;
  border: none;
}

.icons {
  width: 15px;
  height: 16px;
  background-color: #555555;
  padding: 4px;
  position: fixed;
  left: 227px;
  border-radius: 4px;
}

.icon {
  width: 19px;
  margin-right: 13px;
  margin-left: -7px;
}
</style>
