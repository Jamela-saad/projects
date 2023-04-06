<template>
  <h1>Category Management</h1>
  <div id="container">
    <input
      type="text"
      id="search"
      placeholder="Search"
      @focus="filterStr = ''"
      v-model="filterStr"
    />
    <button type="button" id="createBtn" @click="openCloseSaveForm()">
      Create New Category
    </button>
    <br />
    <br />
    <br />
    <table class="main-table">
      <tr>
        <th>Category Name</th>
        <th>Abbreviation</th>
        <th>Header Category</th>
        <th></th>
      </tr>
      <tr v-for="(save, index) in filterCategory" :key="index">
        <td>{{ save.ENCategoryName }}</td>
        <td>{{ save.Abbreviation }}</td>
        <td>{{ save.HeaderCategory }}</td>
        <td>
          <button type="button" @click="openCloseEditForm(index)">
            <img src="@/assets/images/pen.png" />
          </button>
          |
          <button type="button" @click="removeCategory(index)">
            <img src="@/assets/images/waste.png" />
          </button>
        </td>
      </tr>
    </table>
  </div>

  <!-- add popup  window -->
  <div class="form-popup" id="add-category">
    <button class="close" @click="openCloseSaveForm()">
      <img src="@/assets/images/colse.png" />
    </button>
    <form>
      <h3>Add Category Details</h3>
      <hr />
      <table class="pop-table">
        <tbody>
          <tr style="display: grid; width: 493%; height: 90px">
            <td>
              <div class="category-img" @dragover.prevent @drop="onDrop">
                <input
                  type="file"
                  id="fileInput"
                  @change="onChange"
                  ref="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  style="display: none"
                />
                <label for="fileInput" class="img-label" v-if="!image"
                  >Add Image</label
                >
                <img
                  :src="image"
                  onerror="this.style.display='none'"
                  id="addCatImg"
                />
                <button type="button" @click="image = ''">X</button>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <label><b>Category Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Name"
                id="enCategoryName"
                @click="enCategoryName = ''"
                v-model="enCategoryName"
                style="width: 98%"
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="الاسم"
                id="arCategoryName"
                @click="arCategoryName = ''"
                v-model="arCategoryName"
                style="width: 98%"
                required
              />
            </td>
          </tr>
          <tr>
            <th>
              <label><b>Abbreviation</b></label>
            </th>
            <td style="display: inline-block; width: 196%">
              <input
                placeholder="الاختصار"
                type="text"
                id="abbr"
                @click="abbreviation = ''"
                v-model="abbreviation"
              />
            </td>
          </tr>
          <tr>
            <th>
              <label><b>Category Type</b></label>
            </th>
            <td style="display: inline-block; width: 196%">
              <select
                name="attributeType"
                id="categoryType"
                v-model="categoryType"
                required
              >
                <option value="defualt" disabled>Choose Type</option>
                <option>Main Category</option>
                <option>Sub Category</option>
              </select>
            </td>
          </tr>
          <br /><br />
          <tr>
            <th>
              <label><b>Header Category</b></label>
            </th>
            <td style="display: inline-block; width: 196%">
              <select
                name="headerCat"
                id="headerCategory"
                v-model="headerCategory"
                :disabled="categoryType == 'Main Category'"
                required
              >
                <option value="defualt" disabled selected>Select</option>
                <option v-for="(save, index) in saves" :key="index">
                  {{ save.ENCategoryName }}
                </option>
              </select>
            </td>
          </tr>
          <br /><br />
          <div
            class="attributes-container"
            v-for="(n, index) in counter"
            :key="index"
          ></div>
          <button class="add-attribute-btn" type="button" @click="counter++">
            Add Attribute
          </button>
        </tbody>
      </table>
      <div class="btn">
        <button type="button" @click="addCategory()">Save</button>
        <button type="button" @click="openCloseSaveForm()">Cancel</button>
      </div>
    </form>
  </div>

  <!-- edit popup  window -->
  <div class="form-popup" id="edit-category">
    <button class="close" @click="openCloseEditForm()">
      <img src="@/assets/images/colse.png" />
    </button>
    <form>
      <h3>Update Category Details</h3>
      <hr />
      <table class="pop-table">
        <tbody>
          <tr style="display: grid; width: 493%; height: 90px">
            <td>
              <div class="category-img" @dragover.prevent @drop="onDrop">
                <input
                  type="file"
                  multiple
                  name="file"
                  id="fileInput"
                  class="hidden-input"
                  @change="onChange"
                  ref="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  style="display: none"
                />
                <label for="fileInput" class="img-label" v-if="!image"
                  >Add Image</label
                >
                <button type="button" @click="image = ''">X</button>
                <img
                  :src="image"
                  onerror="this.style.display='none'"
                  id="editcatimg"
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <label><b>Category Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Name"
                id="enCategoryName"
                @click="enCategoryName = ''"
                v-model="enCategoryName"
                required
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="الاسم"
                id="arCategoryName"
                @click="arCategoryName = ''"
                v-model="arCategoryName"
                required
              />
            </td>
          </tr>
          <tr>
            <th>
              <label><b>Abbreviation</b></label>
            </th>
            <td style="display: inline-block; width: 196%">
              <input
                type="text"
                id="abbr"
                @click="abbreviation = ''"
                v-model="abbreviation"
              />
            </td>
          </tr>
          <tr>
            <th>
              <label><b>Category Type</b></label>
            </th>
            <td style="display: inline-block; width: 196%">
              <select
                name="attributeType"
                id="categoryType"
                v-model="categoryType"
                :disabled="categoryType == 'Main Category'"
                required
              >
                <option value="defualt" disabled selected>Choose Type</option>
                <option>Main Category</option>
                <option>Sub Category</option>
              </select>
            </td>
          </tr>
          <br /><br />
          <tr>
            <th>
              <label><b>Header Category</b></label>
            </th>
            <td style="display: inline-block; width: 196%">
              <select
                name="headerCat"
                id="headerCategory"
                v-model="headerCategory"
                :disabled="categoryType == 'Main Category'"
                required
              >
                <option value="defualt" disabled selected>Select</option>
                <option
                  v-for="(save, index) in saves"
                  :key="index"
                  :value="save.ENCategoryName"
                >
                  {{ save.ENCategoryName }}
                </option>
              </select>
            </td>
          </tr>
          <br /><br />
          <div
            class="attributes-container"
            v-for="(n, index) in counter"
            :key="index"
          ></div>
          <button class="add-attribute-btn" type="button" @click="counter++">
            Add Attribute
          </button>
        </tbody>
      </table>
      <div class="btn">
        <button type="button" @click="editCategory()">Update</button>
        <button type="button" @click="openCloseEditForm()">Cancel</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filterStr: "",
      image: "",
      enCategoryName: "",
      arCategoryName: "",
      abbreviation: "",
      categoryType: "",
      headerCategory: "",
      currantIndex: -1,
      counter: 0,
      saves: [],
      data: {},
    };
  },
  methods: {
    openCloseSaveForm: function () {
      document.getElementById("add-category").style.display === "block"
        ? (document.getElementById("add-category").style.display = "none")
        : (document.getElementById("add-category").style.display = "block");
      (this.image = ""), (this.enCategoryName = "");
      this.arCategoryName = "";
      this.abbreviation = "";
      this.categoryType = "defualt";
      this.headerCategory = "defualt";
      this.counter = 0;
    },

    addCategory: function () {
      if (
        this.enCategoryName != "" &&
        this.arCategoryName != "" &&
        this.image != "" &&
        this.abbreviation != "" &&
        this.categoryType != "" &&
        this.headerCategory != ""
      ) {
        if (this.categoryType == "Main Category") {
          this.headerCategory = "";
        }
        this.data = {
          ImgSrc: this.image,
          ENCategoryName: this.enCategoryName,
          ARCategoryName: this.arCategoryName,
          Abbreviation: this.abbreviation,
          CategoryType: this.categoryType,
          HeaderCategory: this.headerCategory,
        };
        this.saves = JSON.parse(localStorage.category);
        this.saves.push(this.data);
        localStorage.category = JSON.stringify(this.saves);
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
      document.getElementById("edit-category").style.display === "block"
        ? (document.getElementById("edit-category").style.display = "none")
        : (document.getElementById("edit-category").style.display = "block");
      this.currantIndex = index;
      this.image = this.saves[this.currantIndex].ImgSrc;
      this.enCategoryName = this.saves[this.currantIndex].ENCategoryName;
      this.arCategoryName = this.saves[this.currantIndex].ARCategoryName;
      this.abbreviation = this.saves[this.currantIndex].Abbreviation;
      this.categoryType = this.saves[this.currantIndex].CategoryType;
      this.headerCategory = this.saves[this.currantIndex].HeaderCategory;
      document.getElementById("editcatimg").style.display = "inline";
    },

    editCategory: function () {
      this.saves[this.currantIndex].ImgSrc = this.image;
      this.saves[this.currantIndex].ENCategoryName = this.enCategoryName;
      this.saves[this.currantIndex].ARCategoryName = this.arCategoryName;
      this.saves[this.currantIndex].Abbreviation = this.abbreviation;
      this.saves[this.currantIndex].CategoryType = this.categoryType;
      this.saves[this.currantIndex].HeaderCategory = this.headerCategory;
      localStorage.setItem("category", JSON.stringify(this.saves));
      this.openCloseEditForm("x");
    },

    removeCategory: function (index) {
      this.saves.splice(index, 1);
      localStorage.setItem("category", JSON.stringify(this.saves));
      this.currantIndex = index;
    },

    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.createFile(files[0]);
      document.getElementById("addCatImg").style.display = "inline";
      document.getElementById("editcatimg").style.display = "inline";
    },
    onChange(e) {
      var files = e.target.files;
      this.createFile(files[0]);
      document.getElementById("addCatImg").style.display = "inline";
      document.getElementById("editcatimg").style.display = "inline";
    },
    createFile(file) {
      if (!file.type.match("image.*")) {
        alert("Select an image");
        return;
      }
      var reader = new FileReader();
      var vm = this;

      reader.onload = function (e) {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    mainCategory: function () {
      if (localStorage.category == undefined) {
        localStorage.category = JSON.stringify(this.saves);
      }
    },
  },

  computed: {
    filterCategory() {
      return this.saves.filter((save) => {
        return (
          save.ENCategoryName.toLowerCase().indexOf(
            this.filterStr.toLowerCase()
          ) > -1
        );
      });
    },
  },

  mounted() {
    this.mainCategory();
    this.saves = JSON.parse(localStorage.category);
  },
};
</script>

<style scoped>
.form-popup {
  width: 600px;
  position: relative;
  top: -117px;
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
  margin-top: 100px;
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
.attributes-container {
  width: fit-content;
  height: 240px;
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
.img-label {
  border: 1px darkgray solid;
  border-radius: 4px;
  color: darkgray;
  font-size: 23px;
  margin-left: 40%;
  margin-top: 50%;
  padding: 5px;
}
.category-img {
  width: auto;
  height: 87px;
  margin-left: -5px;
}
.category-img img {
  width: 339px;
  height: 87px;
  margin-left: 70px;
  margin-top: -4px;
}
.category-img button {
  position: absolute;
  top: 82px;
  right: 36px;
  width: 20px;
  font: menu;
  font-weight: bolder;
}
</style>
