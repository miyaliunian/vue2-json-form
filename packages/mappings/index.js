// form组件与view-deisng组件映射关系
export const componentsMap = {
  // 输入框
  Input: {
    component: "InputItem",
    props: {
      clearable: true,
    },
  },
  // 级联
  Cascader: {
    component: "CascaderItem",
    props: {
      clearable: true,
    },
  },
  //日历
  Datepicker: {
    component: "DatePickerItem",
    props: {
      clearable: true,
    },
  },
  // 下拉框
  Select: {
    component: "SelectItem",
    props: {
      clearable: true,
    },
  },
};
