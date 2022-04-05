const ApplicationStatus = [
  "All",
  "Applied",
  "Cancelled",
  "Processing",
  "Passed",
  "Failed",
];
//lowercase and uppercase first letter
let temp;
const arr = ApplicationStatus.map((item) => {
  temp = item.toLowerCase();
  temp = temp.charAt(0).toUpperCase() + temp.slice(1);

  return temp;
});

console.log(arr);

export default ApplicationStatus;
