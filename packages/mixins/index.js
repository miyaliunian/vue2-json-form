const datePickerRange = {
  data() {
    return {
      yesterdayMixin: ["", ""],
    };
  },
  created() {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const currentday = new Date(new Date().setDate(new Date().getDate()));
    this.yesterdayMixin = [yesterday, currentday];
  },
};

export default datePickerRange;
