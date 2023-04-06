<template>
  <h1>Units Management</h1>
  <div id="container">
    <input
      type="text"
      id="search"
      placeholder="Search"
      @focus="filterStr = ''"
      v-model="filterStr"
    />
    <button
      ref="addbutton"
      type="button"
      id="createBtn"
      @click="openCloseSaveForm()"
    >
      Create New Unit
    </button>
    <br />
    <br />
    <br />
    <table class="main-table">
      <tr>
        <th>Unit name</th>
        <th>Abbreviation</th>
        <th></th>
      </tr>
      <tr v-for="(save, index) in filterUnit" :key="index">
        <td>{{ save.Name }}</td>
        <td>( {{ save.abbreviation }} )</td>
        <td>
          <button type="button" @click="openCloseEditForm(index)">
            <img src="@/assets/images/pen.png" />
          </button>
          |
          <button type="button" @click="removeUnit(index)">
            <img src="@/assets/images/waste.png" />
          </button>
        </td>
      </tr>
    </table>

    <!-- add popup  window -->
    <div class="form-popup" id="add-unit">
      <button class="close" @click="openCloseSaveForm()">
        <img src="@/assets/images/colse.png" />
      </button>
      <form>
        <h3>Add Unit Details</h3>
        <hr />
        <br /><br />
        <table class="pop-table">
          <tbody>
            <tr>
              <th>
                <label><b>Unit Name</b></label>
              </th>
              <td>
                <input
                  type="text"
                  placeholder="Enter Unit Name"
                  id="addunit"
                  @click="unitName = ''"
                  v-model="unitName"
                  required
                />
              </td>
            </tr>
            <tr>
              <th>
                <label><b>Abbreviation</b></label>
              </th>
              <td>
                <input
                  type="text"
                  placeholder="Enter Abbreviation"
                  id="addabbr"
                  @click="Abbreviation = ''"
                  v-model="unitAbbreviation"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btn">
          <button type="button" @click="addUnit()">Save</button>
          <button type="button" @click="openCloseSaveForm()">Cancel</button>
        </div>
      </form>
    </div>

    <!-- edit popup  window -->
    <div class="form-popup" id="edit-unit">
      <button class="close" @click="openCloseEditForm('x')">
        <img src="@/assets/images/colse.png" />
      </button>
      <form>
        <h3>Update Unit Details</h3>
        <hr />
        <br /><br />
        <table class="pop-table">
          <tbody>
            <tr>
              <th>
                <label><b>Unit Name</b></label>
              </th>
              <td>
                <input
                  type="text"
                  placeholder="Enter Unit Name"
                  id="editunit"
                  v-model="unitName"
                  required
                />
              </td>
            </tr>

            <tr>
              <th>
                <label><b>Abbreviation</b></label>
              </th>
              <td>
                <input
                  type="text"
                  placeholder="Enter Abbreviation"
                  id="editabbr"
                  v-model="unitAbbreviation"
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btn">
          <button type="button" @click="editUnit()">Update</button>
          <button type="button" @click="openCloseEditForm('x')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitPage",

  data() {
    return {
      unitName: "",
      unitAbbreviation: "",
      filterStr: "",
      saves: [],
      data: {},
      currantIndex: -1,
    };
  },

  methods: {
    openCloseSaveForm: function () {
      document.getElementById("add-unit").style.display === "block"
        ? (document.getElementById("add-unit").style.display = "none")
        : (document.getElementById("add-unit").style.display = "block");
      this.unitName = "";
      this.unitAbbreviation = "";
    },

    addUnit: function () {
      if (this.unitName != "" && this.unitAbbreviation != "") {
        this.data = {
          Name: this.unitName,
          abbreviation: this.unitAbbreviation,
        };
        this.saves = JSON.parse(localStorage.unit);
        this.saves.push(this.data);
        localStorage.unit = JSON.stringify(this.saves);
        this.openCloseSaveForm();
      } else {
        const swal = require("sweetalert");
        swal({
          title: "Oops...",
          text: "Please Fill All the Fields!",
          icon: "error",
        });
      }
    },

    openCloseEditForm: function (index) {
      document.getElementById("edit-unit").style.display === "block"
        ? (document.getElementById("edit-unit").style.display = "none")
        : (document.getElementById("edit-unit").style.display = "block");
      if (!isNaN(index)) {
        this.unitName = this.saves[index].Name;
        this.unitAbbreviation = this.saves[index].abbreviation;
        this.currantIndex = index;
      }
    },

    editUnit: function () {
      this.saves[this.currantIndex].Name = this.unitName;
      this.saves[this.currantIndex].abbreviation = this.unitAbbreviation;

      localStorage.setItem("unit", JSON.stringify(this.saves));
      this.openCloseEditForm("x");
    },

    removeUnit: function (index) {
      this.saves.splice(index, 1);
      localStorage.setItem("unit", JSON.stringify(this.saves));
    },

    storeUnit: function () {
      if (localStorage.unit == undefined) {
        localStorage.unit = JSON.stringify(this.saves);
      }
    },
  },

  computed: {
    filterUnit() {
      return this.saves.filter((save) => {
        return (
          save.Name.toLowerCase().indexOf(this.filterStr.toLowerCase()) > -1
        );
      });
    },
  },

  mounted() {
    this.storeUnit();
    this.saves = JSON.parse(localStorage.unit);
  },
};
</script>

<style scoped>
.main-table td:last-child {
  padding-left: 23%;
}
.form-popup {
  width: 600px;
  position: relative;
  bottom: 216px;
  right: -246px;
  padding: 2px 0px 5px;
}

.pop-table th {
  width: 132px;
}

/* save and cancel button */
.btn button {
  margin-top: 55px;
}
</style>
