import ApplicationStatus from "app/enums/ApplicationStatus";
const helper = {
  classNames: (...classes) => {
    return classes.filter(Boolean).join(" ");
  },
  scrollToRef: (ref) =>
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" }),
  scrollToTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),

  validURL: (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  },
};
// Object.defineProperty(String.prototype, "capitalize", {
//   value: function () {
//     return this.charAt(0).toUpperCase() + this.slice(1);
//   },
//   enumerable: false,
// });

export default helper;
