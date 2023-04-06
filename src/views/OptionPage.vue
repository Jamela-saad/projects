<template>
  <h1>Options Template Management</h1>
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
      Create An Option Set Template
    </button>
    <br />
    <br />
    <br />
    <table class="main-table">
      <tr>
        <th>Option Template Name</th>
        <th>Options</th>
        <th></th>
      </tr>
      <tr v-for="(save, index) in filterOption" :key="index">
        <td>{{ save.TemplateName }}</td>
        <td>
          <span
            style="display: inline-block"
            v-for="(op, i) in save.Options"
            :key="i"
          >
            <span v-if="i < save.Options.length - 1">{{ op }},</span>
            <span v-else>{{ op }}</span>
          </span>
        </td>
        <td>
          <button type="button" @click="openCloseEditForm(index)">
            <img src="@/assets/images/pen.png" />
          </button>
          |
          <button type="button" @click="removeOption(index)">
            <img src="@/assets/images/waste.png" />
          </button>
        </td>
      </tr>
    </table>
  </div>

  <!-- add popup  window -->
  <div class="form-popup" id="add-option">
    <button class="close" @click="openCloseSaveForm()">
      <img src="@/assets/images/colse.png" />
    </button>
    <form>
      <h3>Add Option Template Details</h3>
      <hr />
      <table class="pop-table">
        <tbody>
          <tr>
            <th>
              <label><b>Template Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Template Name"
                id="templateName"
                @click="tempName = ''"
                v-model="tempName"
                required
              />
            </td>
          </tr>
          <tr>
            <th>
              <label><b>Display Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Display Name"
                id="displayName"
                @click="displayName = ''"
                v-model="displayName"
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Option Set Type</b></label>
            </th>
            <td>
              <select
                name=" optionType"
                id=" optionType"
                v-model="optionType"
                required
              >
                <option value="defualt" disabled selected>Choose Type</option>
                <option value="text">Text</option>
                <option value="color">Color</option>
              </select>
            </td>
          </tr>
          <br /><br />
          <div class="options-container">
            <add-option
              v-for="n in counter"
              :key="n"
              @insertOption="insertOption"
              :index="n"
              draggable="true"
              :disable1="false"
            ></add-option>
          </div>
          <button
            class="add-option-btn"
            type="button"
            @click="
              if (isEmpty) {
                counter++;
                isEmpty = false;
              }
            "
          >
            add option
          </button>
        </tbody>
      </table>
      <div class="btn">
        <button type="button" @click="addOption()">Save</button>
        <button type="button" @click="openCloseSaveForm()">Cancel</button>
      </div>
    </form>
  </div>

  <!-- edit popup  window -->
  <div class="form-popup" id="edit-option">
    <button class="close" @click="openCloseEditForm('')">
      <img src="@/assets/images/colse.png" />
    </button>
    <form>
      <h3>Update Option Template Details</h3>
      <hr />
      <table class="pop-table">
        <tbody>
          <tr>
            <th>
              <label><b>Template Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Template Name"
                id="templateName"
                @click="tempName = ''"
                v-model="tempName"
                required
              />
            </td>
          </tr>
          <tr>
            <th>
              <label><b>Display Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Display Name"
                id="displayName"
                @click="displayName = ''"
                v-model="displayName"
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Option Set Type</b></label>
            </th>
            <td>
              <select
                name=" optionType"
                id=" optionType"
                v-model="optionType"
                required
              >
                <option value="defualt" disabled selected>Choose Type</option>
                <option value="text">Text</option>
                <option value="color">Color</option>
              </select>
            </td>
          </tr>
          <br /><br />
          <div class="options-container">
            <draggable v-model="options" item-key="option">
              <add-option
                v-for="(option, i) in options"
                :key="option + i"
                @insertOption="editinsertedOption"
                :index="i + 1"
                :option="option"
                :disable="false"
              ></add-option>
            </draggable>
          </div>
          <button
            class="add-option-btn"
            type="button"
            @click="
              if (isEmpty) {
                options.length++;
                isEmpty = false;
              }
            "
          >
            add option
          </button>
        </tbody>
      </table>
      <div class="btn">
        <button type="button" @click="editOption()">Update</button>
        <button type="button" @click="openCloseEditForm('x')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import AddOption from "@/components/AddOption.vue";
import { VueDraggableNext } from "vue-draggable-next";
export default {
  data() {
    return {
      tempName: "",
      displayName: "",
      optionType: "defualt",
      counter: 0,
      options: [],
      isEmpty: true,
      currantIndex: -1,
      filterStr: "",
      saves: [],
      data: {},
      dragging: false,
    };
  },

  methods: {
    openCloseSaveForm: function () {
      document.getElementById("add-option").style.display === "block"
        ? (document.getElementById("add-option").style.display = "none")
        : (document.getElementById("add-option").style.display = "block");
      this.tempName = "";
      this.displayName = "";
      this.optionType = "defualt";
      this.counter = 0;
      this.options = [];
    },

    addOption: function () {
      if (
        this.tempName != "" &&
        this.displayName != "" &&
        this.optionType != "defualt" &&
        this.options.length != 0
      ) {
        this.data = {
          TemplateName: this.tempName,
          DisplayName: this.displayName,
          OptionType: this.optionType,
          Options: this.options,
        };
        this.saves = JSON.parse(localStorage.option);
        this.saves.push(this.data);
        localStorage.option = JSON.stringify(this.saves);
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

    insertOption(event, flag) {
      if (event === "") {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
      if (flag === 0) {
        this.options.push(event);
      } else if (flag === 1) {
        var index = this.options.indexOf(event);
        this.options.splice(index, 1);
        this.counter--;
      }
    },

    openCloseEditForm: function (index) {
      if (document.getElementById("edit-option").style.display === "block") {
        document.getElementById("edit-option").style.display = "none";
      } else {
        document.getElementById("edit-option").style.display = "block";
      }
      if (!isNaN(index)) {
        this.counter = this.saves[index].Options.length;
        this.options = this.saves[index].Options;
        this.tempName = this.saves[index].TemplateName;
        this.displayName = this.saves[index].DisplayName;
        this.optionType = this.saves[index].OptionType;
      }
      this.currantIndex = index;
    },

    editOption: function () {
      this.saves[this.currantIndex].TemplateName = this.tempName;
      this.saves[this.currantIndex].DisplayName = this.displayName;
      this.saves[this.currantIndex].OptionType = this.optionType;
      this.saves[this.currantIndex].Options = this.options;
      localStorage.setItem("option", JSON.stringify(this.saves));
      this.openCloseEditForm("x");
    },

    editinsertedOption(event, flag, i) {
      if (flag === 0) {
        this.options.splice(i - 1, 1, event);
      } else if (flag === 1) {
        var index = this.options.indexOf(event);
        this.options.splice(index, 1);
        this.counter--;
      }
    },

    removeOption: function (index) {
      this.saves.splice(index, 1);
      localStorage.setItem("option", JSON.stringify(this.saves));
    },

    storeOption: function () {
      if (localStorage.option == undefined) {
        localStorage.option = JSON.stringify(this.saves);
      }
    },
  },

  computed: {
    filterOption() {
      return this.saves.filter((save) => {
        return (
          save.TemplateName.toLowerCase().indexOf(
            this.filterStr.toLowerCase()
          ) > -1
        );
      });
    },
  },

  mounted() {
    this.storeOption();
    this.saves = JSON.parse(localStorage.option);
  },

  components: {
    AddOption,
    draggable: VueDraggableNext,
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
  top: -234px;
  right: -400px;
  padding: 2px 0px 5px;
}
.pop-table th {
  width: 40%;
}
.pop-table td {
  width: 60%;
}

/* save and cancel button */
.btn button {
  margin-top: 78px;
}

select {
  width: 104%;
  border: none;
  margin-left: -10px;
  text-align: left;
  padding-left: 20px;
  background: none;
  appearance: none;
  background-position: calc(100% - 15px) !important;
  background: url(@/assets/images/down-arrow.png);
  background-size: 18px 18px;
  background-repeat: no-repeat;
  font-weight: bold;
}

select:focus {
  outline: none;
  border-radius: 30px;
  appearance: none;
  background-position: calc(100% - 15px) !important;
  background: url(@/assets/images/up-arrow.png);
  background-size: 17px 17px;
  background-repeat: no-repeat;
}

select:not(:hover) {
  appearance: none;
  background-position: calc(100% - 15px);
  background: url(@/assets/images/down-arrow.png);
  background-size: 17px 17px;
  background-repeat: no-repeat;
}
.options-container {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  width: 558px;
  height: 194px;
}
.add-option-btn {
  background-color: rgb(42 45 88);
  color: white;
  width: 242px;
  height: 38px;
  margin: 19px 20px;
  position: absolute;
  right: 148px;
  font-size: 22px;
  border-radius: 5px;
}
</style>
