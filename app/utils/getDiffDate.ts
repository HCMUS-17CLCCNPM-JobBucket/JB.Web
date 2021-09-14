import moment from "moment";

export default function getDiffDate(date1, date2) {
  var moment1 = moment(date1);
  var moment2 = moment(date2);

  return moment2.diff(moment1, "days");
}
