<template>
  <table>
    <tbody>
      <tr style="display: inline-flex" draggable="true">
        <button type="button" style="margin-left: -30px">
          <img src="@/assets/images/reorder.png" />
        </button>

        <th style="width: 173px; border-right: none">
          <label
            ><b>Option {{ index }}</b></label
          >
        </th>
        <td style="width: 308px">
          <input
            type="text"
            placeholder="New Option"
            v-model="insertedoption"
            :disabled="disableoption"
          />
          <button type="button" @click="insertOption(), control()">
            <fa :icon="icon1" style="margin-left: 54px" />
          </button>
        </td>
      </tr>
      <br />
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      insertedoption: this.$props.option,
      icon1: "check",
      disableoption: this.$props.disable,
    };
  },
  props: ["index", "option", "disable"],

  methods: {
    control: function () {
      if (this.icon1 === "check") {
        this.icon1 = "trash";
        this.disableoption = true;
      } else {
        this.icon1 = "check";
        this.disableoption = false;
      }
    },
    insertOption() {
      if (this.icon1 === "check") {
        this.$emit("insertOption", this.insertedoption, 0, this.$props.index);
      } else {
        this.$emit("insertOption", this.insertedoption, 1, this.$props.index);
      }
    },
  },
};
</script>

<style scoped>
br {
  content: "A";
  display: block;
  margin-bottom: 1.4px;
}

.poptable td,
.poptable th {
  line-height: 2.4;
}

.poptable th {
  width: 173px;
  border-right: none;
  text-align: left;
}
img {
  width: 24px;
  height: 20px;
}
</style>
