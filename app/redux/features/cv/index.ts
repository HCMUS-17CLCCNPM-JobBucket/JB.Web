import { createSlice } from "@reduxjs/toolkit";

const initialCvState = {
  name: "",
  email: "",
  phonenumber: "",
  address: "",
  website: "",
  github: "",
  reference: "",
  gender: "",
  introduction: "",
  birthDate: "",
  experience: [],
  skill: [],
  education: [],
  activity: [],
  certification: [],
  award: [],
};

const cvSlice = createSlice({
  name: "cv",
  initialState: initialCvState,
  reducers: {
    changeBirthdate(state, actions) {
      state.birthDate = actions.payload;
    },
    changeName(state, actions) {
      state.name = actions.payload;
    },
    changeEmail(state, actions) {
      state.email = actions.payload;
    },
    changePhonenumber(state, actions) {
      state.phonenumber = actions.payload;
    },
    changeAddress(state, actions) {
      state.address = actions.payload;
    },
    changeWebsite(state, actions) {
      state.website = actions.payload;
    },
    changeGithub(state, actions) {
      state.github = actions.payload;
    },
    changeReference(state, actions) {
      state.reference = actions.payload;
    },
    changeGender(state, actions) {
      state.gender = actions.payload;
    },
    changeIntroduction(state, actions) {
      state.introduction = actions.payload;
    },
    addexperience(state, actions) {
      state.experience.push(actions.payload);
    },
    deleteexperience(state, actions) {
      state.experience.splice(actions.payload, 1);
    },
    addSkill(state, actions) {
      state.skill.push(actions.payload);
    },
    deleteSkill(state, actions) {
      state.skill.splice(actions.payload, 1);
    },
    addEducation(state, actions) {
      state.education.push(actions.payload);
    },
    deleteEducation(state, actions) {
      state.education.splice(actions.payload, 1);
    },
    addActivity(state, actions) {
      state.activity.push(actions.payload);
    },
    deleteActivity(state, actions) {
      state.activity.splice(actions.payload, 1);
    },
    addCertification(state, actions) {
      state.certification.push(actions.payload);
    },
    deleteCertification(state, actions) {
      state.certification.splice(actions.payload, 1);
    },
    addAward(state, actions) {
      state.award.push(actions.payload);
    },
    deleteAward(state, actions) {
      state.award.splice(actions.payload, 1);
    },
  },
});

export const cvActions = cvSlice.actions;

export default cvSlice.reducer;
