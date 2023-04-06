<template>
  <table>
    <tbody>
      <tr>
        <th style="margin-left: 6px; width: 173px; border-right: none">
          <label
            ><b>Value {{ index }}</b></label
          >
        </th>
        <td style="width: 308px">
          <input
            type="text"
            placeholder="New Attribute"
            v-model="insertedAttribute"
            :disabled="disableAttribute"
          />
          <button type="button" @click="insertAttribute(), control()">
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
      insertedAttribute: this.$props.attribute1,
      icon1: "check",
      disableAttribute: this.$props.disable1,
    };
  },
  props: ["index", "attribute1", "disable1"],

  methods: {
    control: function () {
      if (this.icon1 === "check") {
        this.icon1 = "trash";
        this.disableAttribute = true;
      } else {
        this.icon1 = "check";
        this.disableAttribute = false;
      }
    },
    insertAttribute() {
      if (this.icon1 === "check") {
        this.$emit(
          "insertAttribute",
          this.insertedAttribute,
          0,
          this.$props.index
        );
      } else {
        this.$emit(
          "insertAttribute",
          this.insertedoAttribute,
          1,
          this.$props.index
        );
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
  border: 1px solid RGB(109, 108, 108);
  line-height: 2.4;
  text-align: left;
  padding-left: 10px;
}

.poptable th {
  background-color: #f2f2f2;
  width: 40%;
}
.poptable td {
  /* background-color: #f2f2f2; */
  width: 60%;
}
</style>
