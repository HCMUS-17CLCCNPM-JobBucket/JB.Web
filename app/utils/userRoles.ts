const userRoles = {
  GUEST: 1,
  EMPLOYEE: 2,
  EMPLOYER: 3,
};
export const getGender = (value) => {
  if (value === 0) return "Any";
  else if (value === 1) return "Male";
  else if (value === 2) return "Female";
};
export const getUserRole = (array) => Math.max.apply(null, array);
export const isEmployee = (array) => getUserRole(array) === userRoles.EMPLOYEE;
export default userRoles;
