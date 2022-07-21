import {
  Button,
  Poptip,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "view-design"
// 处理table操作按钮
const tableAction = (h, array) => {
  const btnArray = []
  const btnMore = []
  array.map((item, index) => {
    let poptipFlag = item.deleteFlag || false
    if (index < 3) {
      let btn = null
      if (poptipFlag) {
        btn = h(
          Poptip,
          {
            props: {
              confirm: true,
              title: item.deleteTitle || "您确认删除这条内容吗？",
              transfer: true,
              placement: "top-end",
            },
            on: {
              "on-ok": item.action,
              "on-cancel": () => {
                console.log("点击取消")
              },
            },
          },
          [
            h(Button, {
              props: {
                type: item.type ? item.type : "primary",
              },
              style: {
                marginLeft: "5px",
              },
              domProps: {
                innerText: item.title,
              },
              attrs: {
                title: "",
              },
              directives: item.directives,
              // on: {
              //   click: item.action,
              // },
            }),
          ]
        )
      } else {
        btn = h(Button, {
          props: {
            type: item.type ? item.type : "primary",
          },
          style: {
            marginLeft: "5px",
          },
          domProps: {
            innerText: item.title,
          },
          attrs: {
            title: "",
          },
          directives: item.directives,
          on: {
            click: item.action,
          },
        })
      }
      btnArray.push(btn)
    } else {
      btnMore.push(
        h(
          DropdownItem,
          {
            nativeOn: {
              click: item.action,
            },
          },
          item.title
        )
      )
    }
  })
  const dropdown = h(
    Dropdown,
    {
      props: {
        transfer: true,
      },
    },
    [
      h(
        "a",
        {
          props: {
            type: "default",
            size: "small",
          },
          style: {
            marginLeft: "5px",
          },
        },
        [
          h("span", "更多"),
          h("Icon", {
            props: {
              type: "ios-arrow-down",
            },
          }),
        ]
      ),
      h(
        DropdownMenu,
        {
          slot: "list",
        },
        btnMore
      ),
    ]
  )
  if (array.length > 3) {
    btnArray.push(dropdown)
  }
  return btnArray
}
export default tableAction
