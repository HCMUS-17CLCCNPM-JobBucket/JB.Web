const helper = {
  classNames: (...classes) => {
    return classes.filter(Boolean).join(" ");
  },
};
export default helper;
