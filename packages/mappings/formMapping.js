// form组件与view-deisng组件映射关系
export const componentsMap = {
  // 附件上传
  Upload: {
    component: "FormUploadItem"
  },
  // 输入框
  Input: {
    component: "FormInputItem",
    props: {
      readOnly: true,
      maxlength: 40
    }
  },
  // 级联
  Cascader: {
    component: "FormCascaderItem",
    props: {
      readOnly: true
    }
  },

  // 富文本编辑器
  Rich: {
    component: "FormRichEditor"
  },

  //日历
  Datepicker: {
    component: "FormDatepickerItem",
    props: {
      readOnly: true
    }
  },
  // 下拉框
  Select: {
    component: "FormSelectItem",
    props: {
      readOnly: true
    }
  },
  // 多选框
  Checkbox: {
    component: "FormCheckboxItem",
    props: {
      // readOnly: true,
    }
  },
  // 多选框
  Radio: {
    component: "FormRadioItem",
    props: {
      // readOnly: true,
    }
  },
  // Switch 滑块
  Switch: {
    component: "FormSwitchItem",
    props: {
      // readOnly: true,
    }
  },

  // 头像
  Avatar: {
    component: "FormAvatarItem",
    props: {}
  }
}
