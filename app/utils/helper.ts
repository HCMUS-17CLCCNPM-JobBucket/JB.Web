const helper = {
  classNames: (...classes) => {
    return classes.filter(Boolean).join(" ");
  },
  scrollToRef: (ref) =>
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" }),
  scrollToTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),
};

export default helper;
