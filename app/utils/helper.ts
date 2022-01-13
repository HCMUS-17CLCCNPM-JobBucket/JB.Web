import ApplicationStatus from "app/enums/ApplicationStatus";
const helper = {
  classNames: (...classes) => {
    return classes.filter(Boolean).join(" ");
  },
  scrollToRef: (ref) =>
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" }),
  scrollToTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),
};
// Object.defineProperty(String.prototype, "capitalize", {
//   value: function () {
//     return this.charAt(0).toUpperCase() + this.slice(1);
//   },
//   enumerable: false,
// });

export default helper;
