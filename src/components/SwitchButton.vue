<template>
  <button type="button" @click="switchMode()">
    <img
      :src="getSrc(imgsrc)"
      id="switch"
      class="switch"
      alt="switchimg image "
    />
  </button>
</template>

<script>
export default {
  name: "SwitchButton",
  data() {
    return {
      imgsrc: "switch-on",
    };
  },
  methods: {
    getSrc(name) {
      var images = require.context("@/assets/images/", false, /\.png$/);
      return images("./" + name + ".png");
    },
    switchMode: function (s) {
      if (s === "stay") {
        if (this.imgsrc === "switch-off") {
          this.imgsrc = "switch-off";
          document.getElementsByTagName("body")[0].style.backgroundColor =
            "white";
          document.getElementById("createBtn").style.backgroundColor =
            "rgba(0, 128, 0, 0.596)";
          document
            .getElementById("search")
            .addEventListener("focusin", function () {
              document.getElementById("search").style.border =
                "2px solid rgba(0, 128, 0, 0.596)";
            });
          document
            .getElementById("search")
            .addEventListener("focusout", function () {
              document.getElementById("search").style.border =
                "1px solid black";
            });
        } else if (this.imgsrc === "switch-on") {
          this.imgsrc = "switch-on";
          document.getElementsByTagName("body")[0].style.backgroundColor =
            "#768a968c";
          document.getElementById("createBtn").style.backgroundColor =
            "rgba(5, 226, 255, 0.445)";
          document
            .getElementById("search")
            .addEventListener("focusin", function () {
              document.getElementById("search").style.border =
                "2px solid rgba(5, 226, 255, 0.445)";
            });
          document
            .getElementById("search")
            .addEventListener("focusout", function () {
              document.getElementById("search").style.border =
                "1px solid black";
            });
        }
      } else {
        if (this.imgsrc === "switch-on") {
          this.imgsrc = "switch-off";
          document.getElementsByTagName("body")[0].style.backgroundColor =
            "white";
          document.getElementById("createBtn").style.backgroundColor =
            "rgba(0, 128, 0, 0.596)";
          document
            .getElementById("search")
            .addEventListener("focusin", function () {
              document.getElementById("search").style.border =
                "2px solid rgba(0, 128, 0, 0.596)";
            });
          document
            .getElementById("search")
            .addEventListener("focusout", function () {
              document.getElementById("search").style.border =
                "1px solid black";
            });
        } else if (this.imgsrc === "switch-off") {
          this.imgsrc = "switch-on";
          document.getElementsByTagName("body")[0].style.backgroundColor =
            "#768a968c";
          document.getElementById("createBtn").style.backgroundColor =
            "rgba(5, 226, 255, 0.445)";
          document
            .getElementById("search")
            .addEventListener("focusin", function () {
              document.getElementById("search").style.border =
                "2px solid rgba(5, 226, 255, 0.445)";
            });
          document
            .getElementById("search")
            .addEventListener("focusout", function () {
              document.getElementById("search").style.border =
                "1px solid black";
            });
        }
      }
    },
  },
  watch: {
    $route: function () {
      this.switchMode("stay");
    },
  },
};
</script>
