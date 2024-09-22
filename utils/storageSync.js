import { store } from "~/store";
export default function (type) {
  if (type == "toStore") {
    if (localStorage.getItem("data") !== null) {
      store.data = JSON.parse(localStorage.getItem("data"));
    }

    if (localStorage.getItem("unsupported") !== null) {
      store.unsupportedLinks = JSON.parse(localStorage.getItem("unsupported"));
    }
  } else if (type == "toLocalStorage") {
    localStorage.setItem("data", JSON.stringify(store.data));
    localStorage.setItem("unsupported", JSON.stringify(store.unsupportedLinks));
  }
}
