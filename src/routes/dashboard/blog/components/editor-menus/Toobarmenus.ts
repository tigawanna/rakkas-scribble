import Cherry from "cherry-markdown";

export const extraOptions = Cherry.createMenuHook("extra", {
  // Declare the icons used.Optional icons can be viewed at https://github.com/Tencent/cherry-markdown/src/main/src/sass/icons
  iconName: "image",
  _onClick: (
    event?: MouseEvent | KeyboardEvent | undefined,
    shortKey?: string | undefined,
  ) => {},

  // Declare the icon of the button.
  // If empty, it means that the icon will not be displayed and the text will be displayed directly.
  // @ts-expect-error
  onClick: (...args) => {
    console.log("======CUSTOM MENU ARGS ===== ", args);
    if (document) {
      console.log("my modal 11 ", document?.getElementById("my_modal_11"));
      // @ts-expect-error
      document?.getElementById("my_modal_11").showModal;
    }
  },
});
