<template>
  <h1>Users Management</h1>
  <div id="container">
    <input
      type="text"
      id="search"
      placeholder="Search"
      @focus="filterStr = ''"
      v-model="filterStr"
    />
    <button type="button" id="createBtn" @click="openCloseSaveForm()">
      Create New User
    </button>
    <br />
    <br />
    <br />
    <table class="main-table">
      <tr>
        <th>Photo</th>
        <th>Full Name</th>
        <th>E-Mail</th>
        <th></th>
      </tr>

      <tr v-for="(save, index) in filterUser" :key="index">
        <td><img :src="save.ImgSrc" style="width: 100px; height: 70px" /></td>
        <td>{{ save.FullName }}</td>
        <td>{{ save.Email }}</td>
        <td>
          <button type="button" @click="openCloseEditForm(index)">
            <img src="@/assets/images/pen.png" />
          </button>
          |
          <button type="button" @click="removeUser(index)">
            <img src="@/assets/images/waste.png" />
          </button>
        </td>
      </tr>
    </table>

    <!-- add user popup  -->

    <div class="form-popup" id="add-user">
      <button type="button" class="close" @click="openCloseSaveForm()">
        <img src="@/assets/images/colse.png" />
      </button>
      <form>
        <h3>Add User Details</h3>
        <hr />
        <table class="pop-table">
          <div id="imported-photo">
            <button type="button" @click="imgSrc = ''">
              <img src="@/assets/images/waste2.png" />
            </button>
            <img
              id="loaded"
              class="loaded"
              :src="imgSrc"
              onerror="this.style.display='none'"
            />
          </div>
          <br />
          <tr>
            <th>
              <label><b>Photo</b></label>
            </th>
            <td>
              <input
                type="file"
                id="photo"
                accept="image/*"
                class="inputfile"
                style="width: 140px"
                @change="onFilePicked('photo', 'loaded')"
              />
              <label id="file-lable" for="photo"
                ><img src="@/assets/images/upload.png" />Import photo</label
              >
            </td>
          </tr>
          <br />

          <tr>
            <th>
              <label><b>Full Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                id="full-name"
                v-model="fullName"
                @click="fullName = ''"
                required
              />
            </td>
          </tr>

          <tr>
            <th>
              <label><b>User Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter a UserName"
                id="user-name"
                v-model="userName"
                @click="userName = ''"
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Password</b></label>
            </th>
            <td style="display: block; white-space: nowrap">
              <input
                :type="fieldType"
                placeholder="Enter a Password"
                id="password"
                v-model="password"
                @click="password = ''"
              />
              <button type="button" @click="showPassword()">
                <img src="@/assets/images/eye.png" style="margin-left: -55px" />
              </button>
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>E-Mail</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Your Email"
                id="email"
                v-model="email"
                @click="email = ''"
              />
            </td>
          </tr>

          <tr>
            <th>
              <label><b>Phone Number</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Your Phone Number"
                id="phone-number"
                v-model="phoneNo"
                @click="phoneNo = ''"
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Role</b></label>
            </th>
            <td>
              <select
                class="select-role"
                name="role"
                id="role"
                v-model="role"
                :value="role"
              >
                <option value="default" selected disabled>
                  Choose User Role
                </option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Active</b></label>
            </th>
            <td>
              <button type="button" id="active" @click="active()">
                <img
                  :src="getSrc(activeBtn)"
                  id="imgActive"
                  class="img-active"
                />
              </button>
            </td>
          </tr>
        </table>

        <div class="btn">
          <button type="button" @click="addUser()">Save</button>
          <button type="button" @click="openCloseSaveForm()">Cancel</button>
        </div>
      </form>
    </div>

    <!-- edit popup  window -->
    <div class="form-popup" id="edit-user">
      <button type="button" class="close" @click="openCloseEditForm('')">
        <img src="@/assets/images/colse.png" />
      </button>
      <h3>Update User Details</h3>
      <hr />
      <form>
        <table class="pop-table">
          <div id="imported-photo">
            <button type="button" @click="imgSrc = ''">
              <img src="@/assets/images/waste2.png" />
            </button>
            <img
              id="editLoaded"
              :src="imgSrc"
              class="loaded"
              onerror="this.style.display='none'"
            />
          </div>
          <br />
          <tr>
            <th>
              <label><b>Photo</b></label>
            </th>
            <td>
              <input
                type="file"
                id="editPhoto"
                accept="image/*"
                class="inputfile"
                style="width: 140px"
                @change="onFilePicked('editPhoto', 'editLoaded')"
              />
              <label id="edit-file-lable" for="editPhoto"
                ><img src="@/assets/images/upload.png" />Import photo</label
              >
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Full Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                id="editFull-Name"
                v-model="fullName"
                required
              />
            </td>
          </tr>

          <tr>
            <th>
              <label><b>User Name</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter a UserName"
                id="editUser-Name"
                v-model="userName"
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Password</b></label>
            </th>
            <td style="display: block; white-space: nowrap">
              <input
                type="password"
                placeholder="Enter a Password"
                id="editPassword"
                v-model="password"
              />
              <button type="button" @click="showPassword()">
                <img src="@/assets/images/eye.png" style="margin-left: -55px" />
              </button>
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>E-Mail</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Your Email"
                id="editEmail"
                v-model="email"
              />
            </td>
          </tr>

          <tr>
            <th>
              <label><b>Phone Number</b></label>
            </th>
            <td>
              <input
                type="text"
                placeholder="Enter Your Phone Number"
                id="editPhone-Number"
                v-model="phoneNo"
              />
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Role</b></label>
            </th>
            <td>
              <select
                class="select-role"
                name="role"
                id="editRole"
                v-model="role"
              >
                <option value="default" selected disabled>
                  Choose User Role
                </option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </td>
          </tr>
          <br />
          <tr>
            <th>
              <label><b>Active</b></label>
            </th>
            <td>
              <button type="button" id="editactive" @click="active()">
                <img
                  :src="getSrc(activeBtn)"
                  id="editImgActive"
                  class="img-active"
                />
              </button>
            </td>
          </tr>
        </table>

        <div class="btn">
          <button type="button" @click="editUser()">Update</button>
          <button type="button" @click="openCloseEditForm()">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userFullName: "",
      userPassword: "",
      userEmail: "",
      userPhoneNo: 0,
      userRole: "",
      isActive: true,
      imgSrc: "",
      saves: [],
      data: {},
      currentIndex: -1,
      fieldType: "password",
      activeBtn: "on",
      filterStr: "",
    };
  },

  methods: {
    openCloseSaveForm: function () {
      document.getElementById("add-user").style.display === "block"
        ? (document.getElementById("add-user").style.display = "none")
        : (document.getElementById("add-user").style.display = "block");
      this.userFullName = "";
      this.userName = "";
      this.userPassword = "";
      this.userEmail = "";
      this.userRole = "default";
      this.userPhoneNo = "";
      this.imgSrc = "";
      this.isActive = true;
    },

    addUser: function () {
      if (
        this.userFullName != "" &&
        this.userName != "" &&
        this.userPassword != "" &&
        this.userEmail != "" &&
        this.userRole != "default" &&
        this.userPhoneNo != "" &&
        this.imgSrc != ""
      ) {
        this.data = {
          FullName: this.userFullName,
          UserName: this.userName,
          Password: this.userPassword,
          Email: this.userEmail,
          Role: this.userRole,
          Active: this.isActive,
          Phone: this.userPhoneNo,
          ImgSrc: this.imgSrc,
        };
        this.saves = JSON.parse(localStorage.user);
        this.saves.push(this.data);
        localStorage.user = JSON.stringify(this.saves);
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

    getSrc(name) {
      var images = require.context("@/assets/images/", false, /\.png$/);
      return images("./" + name + ".png");
    },

    openCloseEditForm: function (index) {
      document.getElementById("edit-user").style.display === "block"
        ? (document.getElementById("edit-user").style.display = "none")
        : (document.getElementById("edit-user").style.display = "block");
      if (!isNaN(index)) {
        this.fullName = this.saves[index].FullName;
        this.userName = this.saves[index].UserName;
        this.password = this.saves[index].Password;
        this.email = this.saves[index].Email;
        this.role = this.saves[index].Role;
        this.phoneNo = this.saves[index].Phone;
        this.imgSrc = this.saves[index].ImgSrc;
        this.isActive = this.saves[index].Active;
        this.isActive ? (this.activeBtn = "on") : (this.activeBtn = "off");
        this.index = index;
        document.getElementById("editLoaded").style.display = "block";
      }
    },

    editUser: function () {
      this.saves[this.index].UserName = this.userName;
      this.saves[this.index].Password = this.password;
      this.saves[this.index].Email = this.email;
      this.saves[this.index].Role = this.role;
      this.saves[this.index].Phone = this.phoneNo;
      this.saves[this.index].ImgSrc = this.imgSrc;
      this.saves[this.index].Active = this.isActive;
      this.saves[this.index].FullName = this.fullName;
      localStorage.setItem("user", JSON.stringify(this.saves));
      this.openCloseEditForm("x");
    },

    removeUser: function (index) {
      this.saves.splice(index, 1);
      localStorage.setItem("user", JSON.stringify(this.saves));
    },

    showPassword: function () {
      this.fieldType === "password"
        ? (this.fieldType = "text")
        : (this.fieldType = "password");
    },

    active: function () {
      this.isActive ? (this.activeBtn = "off") : (this.activeBtn = "on");
      this.isActive = !this.isActive;
    },

    onFilePicked: function (id, id2) {
      var photo = document.getElementById(id);
      const files = photo.files;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imgSrc = fileReader.result;
        document.getElementById(id2).style.display = "block";
      });
      fileReader.readAsDataURL(files[0]);
    },

    storeUser: function () {
      if (localStorage.user == undefined) {
        localStorage.user = JSON.stringify(this.saves);
      }
    },
  },

  computed: {
    filterUser() {
      return this.saves.filter((save) => {
        return (
          save.FullName.toLowerCase().indexOf(this.filterStr.toLowerCase()) > -1
        );
      });
    },
  },

  mounted() {
    this.storeUser();
    this.saves = JSON.parse(localStorage.user);
  },
};
</script>

<style scoped>
.main-table td:last-child {
  padding-left: 15%;
}
.form-popup {
  width: 550px;
  position: relative;
  top: -300px;
  right: -16.7%;
  padding: 3px 0px 5px;
}

.pop-table td,
.pop-table th {
  line-height: 1.7;
}

.pop-table th {
  width: 100px;
}

table.pop-table {
  margin-top: 80px;
}

table.pop-table tr:last-child td {
  border: none;
}

select {
  width: 250px;
  border: none;
  margin-left: -16px;
  text-align: left;
  padding-left: 20px;
}

select:focus {
  outline: none;
  border-radius: 30px;
}

.select-role {
  appearance: none;
  background-position: calc(100% - 15px) !important;
  background: url(@/assets/images/down-arrow.png);
  background-size: 18px 18px;
  background-repeat: no-repeat;
  font-weight: bold;
}

.select-role:focus {
  appearance: none;
  background-position: calc(100% - 15px) !important;
  background: url(@/assets/images/up-arrow.png);
  background-size: 17px 17px;
  background-repeat: no-repeat;
}
.select-role:not(:hover) {
  appearance: none;
  background-position: calc(100% - 15px);
  background: url(@/assets/images/down-arrow.png);
  background-size: 17px 17px;
  background-repeat: no-repeat;
}

input[type="file"] {
  display: none;
}

#file-lable,
#edit-file-lable {
  position: relative;
  text-align: center;
  padding: 5px 60px;
  width: 170px;
  height: 18px;
  border-radius: 5px;
  border: 1px solid gray;
  color: rgb(87, 85, 85);
  background-color: gainsboro;
  font-size: 15px;
  font-weight: bolder;
  font-family: "Rounded MpLUS  1c";
}

.btn button {
  margin-top: 41px;
}
#imported-photo {
  width: 120px;
  height: 70px;
  position: absolute;
  top: 77px;
  right: 32px;
  border: rgb(109, 108, 108) solid 1px;
  background-image: url("@/assets/images/upload.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 30px;
  border-left: none;
  border-radius: 4px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 1px;
}

#imported-photo::after {
  content: "";
  /* hight  */
  width: 53px;
  /* width */
  height: 1.2px;
  background-color: rgb(109, 108, 108);
  position: absolute;
  right: 94px;
  top: 44px;
  transform: rotate(90deg);
  /* rotate the line to become vertical */
  border-radius: 250px;
}
#imported-photo button img {
  width: 17px;
  height: 13px;
  position: absolute;
  padding: 2px;
  top: -1px;
  right: 120px;
  border: rgb(109, 108, 108) solid 1px;
  border-right: none;
  border-radius: 4px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.loaded {
  width: 120px;
  height: 70px;
  position: relative;
  top: -23px;
  right: 0px;
  z-index: 2;
  border-radius: 3px;
  border-bottom-left-radius: 1px;
  /* border-bottom-ri-radius: 1px; */
}

.img-active {
  width: 60px;
  height: 23px;
  position: relative;
}
</style>
