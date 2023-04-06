<template>
  <h1>Custom Attributes Management</h1>

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
      Create Custom Attributes Template
    </button>
    <br />
    <br />
    <br />
    <table class="main-table">
      <tr>
        <th>Custom Attributes Template</th>
        <th>Type</th>
        <th></th>
      </tr>
      <tr v-for="(save, index) in filterAttribute" :key="index">
        <td>{{ save.AttributeName }}</td>
        <td>{{ save.AttributeType }}</td>
        <td>
          <button type="button" @click="openCloseEditForm(index)">
            <img src="@/assets/images/pen.png" />
          </button>
          |
          <button type="button" @click="removeAttribute(index)">
            <img src="@/assets/images/waste.png" />
          </button>
        </td>
      </tr>
    </table>
  </div>
  <!-- add popup  window -->
  <div class="form-popup" id="add-attribute">
    <button class="close" @click="openCloseSaveForm()">
      <img src="@/assets/images/colse.png" />
    </button>
    <form>
      <h3>Add Custom Attributes Template Details</h3>
      <hr />
      <table class="pop-table">
        <tbody>
          <tr>
            <th>
              <label><b>Attribute Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Template Name"
                id="templateName"
                @click="attributeName = ''"
                v-model="attributeName"
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Attribute Type</b></label>
            </th>
            <td>
              <select
                name=" attributeType"
                id=" attributeType"
                v-model="attributeType"
                required
              >
                <option value="defualt" disabled selected>Choose Type</option>
                <option value="Text">Text</option>
                <option value="Multiple">Multiple</option>
                <option value="Single">Single</option>
              </select>
            </td>
          </tr>
          <br /><br />
          <div
            class="not-text"
            :class="[
              attributeType == 'Multiple' || attributeType == 'Single'
                ? visible
                : 'invisible',
            ]"
          >
            <div class="attributes-container">
              <add-attribute
                v-for="n in counter"
                :key="n"
                @insertAttribute="insertAttribute"
                :index="n"
                draggable="true"
                :disable1="false"
              ></add-attribute>
            </div>

            <button
              class="add-attribute-btn"
              type="button"
              @click="
                if (isEmpty) {
                  counter++;
                  isEmpty = false;
                }
              "
            >
              add Attribute
            </button>
          </div>
        </tbody>
      </table>
      <div class="btn">
        <button type="button" @click="addAttribute()">Save</button>
        <button type="button" @click="openCloseSaveForm()">Cancel</button>
      </div>
    </form>
  </div>

  <!-- edit popup  window -->
  <div class="form-popup" id="edit-attribute">
    <button class="close" @click="openCloseEditForm()">
      <img src="@/assets/images/colse.png" />
    </button>
    <form>
      <h3>Update Custom Attributes Template Details</h3>
      <hr />
      <table class="pop-table">
        <tbody>
          <tr>
            <th>
              <label><b>Attribute Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Template Name"
                id="templateName"
                @click="attributeName = ''"
                v-model="attributeName"
                required
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Attribute Type</b></label>
            </th>
            <td>
              <select
                name="attributeType"
                id="editAttributeType"
                v-model="attributeType"
                disabled="true"
                required
              >
                <option value="defualt" disabled selected>Choose Type</option>
                <option value="Text">Text</option>
                <option value="Multiple">Multiple</option>
                <option value="Single">Single</option>
              </select>
            </td>
          </tr>
          <br /><br />
          <div
            class="not-text"
            :class="[
              attributeType == 'Multiple' || attributeType == 'Single'
                ? visible
                : 'invisible',
            ]"
          >
            <div class="attributes-container">
              <add-attribute
                v-for="(attribute, n) in attributes"
                :key="attribute + n"
                :attribute1="attribute"
                @insertAttribute="editinsertedAttribute"
                :index="n + 1"
                draggable="true"
                :disable1="false"
              ></add-attribute>
            </div>
            <button
              class="add-attribute-btn"
              type="button"
              @click="
                if (isEmpty) {
                  attributes.length++;
                  isEmpty = false;
                }
              "
            >
              add Attribute
            </button>
          </div>
        </tbody>
      </table>
      <div class="btn">
        <button type="button" @click="editAttribute()">Update</button>
        <button type="button" @click="openCloseEditForm()">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import AddAttribute from "@/components/AddAttribute.vue";
export default {
  data() {
    return {
      attributeName: "",
      attributeType: "",
      attributes: [],
      counter: 0,
      isEmpty: true,
      currantIndex: -1,
      filterStr: "",
      saves: [],
      data: {},
    };
  },

  methods: {
    openCloseSaveForm: function () {
      document.getElementById("add-attribute").style.display === "block"
        ? (document.getElementById("add-attribute").style.display = "none")
        : (document.getElementById("add-attribute").style.display = "block");
      this.attributeName = "";
      this.attributeType = "defualt";
      this.counter = 0;
      this.attributes = [];
      this.isEmpty = true;
    },

    addAttribute: function () {
      if (this.attributeType === "Text") {
        if (this.attributeName != "" && this.attributeType != "defualt") {
          this.data = {
            AttributeName: this.attributeName,
            AttributeType: this.attributeType,
          };
          this.saves = JSON.parse(localStorage.attribute);
          this.saves.push(this.data);
          localStorage.attribute = JSON.stringify(this.saves);
          this.openCloseSaveForm();
        } else {
          const swal = require("sweetalert");
          swal({
            title: "Oops...",
            text: "Please Fill All the Fields!",
            icon: "error",
          });
        }
      } else {
        if (
          this.attributeName != "" &&
          this.attributeType != "defualt" &&
          this.attributes.length != 0
        ) {
          this.data = {
            AttributeName: this.attributeName,
            AttributeType: this.attributeType,
            Attributes: this.attributes,
          };
          this.saves = JSON.parse(localStorage.attribute);
          this.saves.push(this.data);
          localStorage.attribute = JSON.stringify(this.saves);
          this.openCloseSaveForm();
        } else {
          const swal = require("sweetalert");
          swal({
            title: "Oops...",
            text: "Please Fill All the Fields!",
            icon: "error",
          });
        }
      }
    },

    insertAttribute(attribute, flag) {
      if (attribute === "") {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
        if (flag === 0) {
          this.attributes.push(attribute);
        } else if (flag === 1) {
          let i = this.attributes.indexOf(attribute);
          this.attributes.splice(i, 1);
          this.counter--;
        }
      }
    },

    openCloseEditForm: function (index) {
      if (document.getElementById("edit-attribute").style.display === "block") {
        document.getElementById("edit-attribute").style.display = "none";
      } else {
        document.getElementById("edit-attribute").style.display = "block";
      }
      if (!isNaN(index)) {
        this.attributeName = this.saves[index].AttributeName;
        this.attributeType = this.saves[index].AttributeType;
        if (
          this.attributeType == "Multiple" ||
          this.attributeType == "Single"
        ) {
          this.attributes = this.saves[index].Attributes;
        }
        this.currantIndex = index;
      }
      this.isEmpty = true;
    },

    editAttribute: function () {
      this.saves[this.currantIndex].AttributeName = this.attributeName;
      this.saves[this.currantIndex].AttributeType = this.attributeType;
      if (this.attributeType == "Multiple" || this.attributeType == "Single") {
        this.saves[this.currantIndex].Attributes = this.attributes;
      }
      localStorage.setItem("attribute", JSON.stringify(this.saves));
      this.openCloseEditForm("x");
    },

    editinsertedAttribute(attribute, flag, index) {
      if (flag === 0) {
        this.attributes.splice(index - 1, 1, attribute);
      } else if (flag === 1) {
        let i = this.attributes.indexOf(attribute);
        this.attributes.splice(i, 1);
        this.counter--;
      }
    },

    removeAttribute: function (index) {
      this.saves.splice(index, 1);
      localStorage.setItem("attribute", JSON.stringify(this.saves));
    },

    mainAttribute: function () {
      if (localStorage.attribute == undefined) {
        localStorage.attribute = JSON.stringify(this.saves);
      }
    },
  },

  computed: {
    filterAttribute() {
      return this.saves.filter((save) => {
        return (
          save.AttributeName.toLowerCase().indexOf(
            this.filterStr.toLowerCase()
          ) > -1
        );
      });
    },
  },

  mounted() {
    this.mainAttribute();
    this.saves = JSON.parse(localStorage.attribute);
  },

  components: {
    AddAttribute,
  },
};
</script>

<style scoped>
.form-popup {
  width: 600px;
  position: relative;
  top: -264px;
  right: -485px;
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
  padding: 10px 28px;
  margin-top: 40px;
}

select {
  appearance: none;
  width: 104%;
  margin-left: -10px;
  padding-left: 20px;
  background-position: calc(100% - 15px) !important;
  background: url(@/assets/images/down-arrow.png);
  background-size: 18px 18px;
  border: none;
  text-align: left;
  font-weight: bold;
  background-repeat: no-repeat;
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
.attributes-container {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  width: 558px;
  height: 194px;
}

.add-attribute-btn {
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

.not-text {
  width: fit-content;
  height: 240px;
}
.visible {
  display: block;
}
.invisible {
  display: none;
}
#editAttributeType {
  cursor: no-drop;
}
</style>
