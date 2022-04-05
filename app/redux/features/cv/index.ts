import { createSlice } from "@reduxjs/toolkit";

const initialCvState = {
  templateId: "1",
  listID: [],
  cVName: "",
  file: null,
  name: "",
  avatar: "",
  email: "",
  phonenumber: "",
  address: "",
  website: "",
  github: "",
  reference: "",
  gender: "",
  introduction: "",
  birthDate: null,
  experience: [],
  skill: [],
  education: [],
  activity: [],
  certification: [],
  award: [],
  isUpdate: false,
  id: 0,
};

const cvSlice = createSlice({
  name: "cv",
  initialState: initialCvState,
  reducers: {
    setTemplateId(state, actions) {
      state.templateId = actions.payload;
    },
    setListID(state, actions) {
      state.listID = actions.payload;
    },
    setFile(state, actions) {
      state.file = actions.payload;
    },
    setAvatarURL(state, actions) {
      state.avatar = actions.payload;
    },
    changeID(state, actions) {
      state.id = actions.payload;
    },
    changeUpdateState(state, actions) {
      state.isUpdate = actions.payload;
    },
    initData(state, actions) {
      state.templateId = actions.payload.cVTemplate;
      state.cVName = actions.payload.cVName;
      state.file = null;
      state.name = actions.payload.name;
      state.avatar = actions.payload.avatarUrl;
      state.email = actions.payload.email;
      state.phonenumber = actions.payload.phone;
      state.address = actions.payload.address;
      state.website = actions.payload.website;
      state.github = actions.payload.github;
      state.reference = actions.payload.reference;
      state.gender = actions.payload.gender;
      state.introduction = actions.payload.introduction;
      state.birthDate = actions.payload.birthdate;
      state.experience = actions.payload.experiences;
      state.skill = actions.payload.skills;
      state.education = actions.payload.educations;
      state.award = actions.payload.awards;
      state.activity = actions.payload.activities;
      state.certification = actions.payload.certifications;
    },
    resetState() {
      return initialCvState;
    },
    changeCVname(state, actions) {
      state.cVName = actions.payload;
    },
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
    editexperience(state, actions) {
      state.experience.splice(actions.payload.index, 0, actions.payload.data);
    },
    addSkill(state, actions) {
      state.skill.push(actions.payload);
    },
    deleteSkill(state, actions) {
      state.skill.splice(actions.payload, 1);
    },
    editSkill(state, actions) {
      state.skill.splice(actions.payload.index, 0, actions.payload.data);
    },
    addEducation(state, actions) {
      state.education.push(actions.payload);
    },
    deleteEducation(state, actions) {
      state.education.splice(actions.payload, 1);
    },
    editEducation(state, actions) {
      state.education.splice(actions.payload.index, 0, actions.payload.data);
    },
    addActivity(state, actions) {
      state.activity.push(actions.payload);
    },
    deleteActivity(state, actions) {
      state.activity.splice(actions.payload, 1);
    },
    editActivity(state, actions) {
      state.activity.splice(actions.payload.index, 0, actions.payload.data);
    },
    addCertification(state, actions) {
      state.certification.push(actions.payload);
    },
    deleteCertification(state, actions) {
      state.certification.splice(actions.payload, 1);
    },
    editCertification(state, actions) {
      state.certification.splice(
        actions.payload.index,
        0,
        actions.payload.data
      );
    },
    addAward(state, actions) {
      state.award.push(actions.payload);
    },
    deleteAward(state, actions) {
      state.award.splice(actions.payload, 1);
    },
    editAward(state, actions) {
      state.award.splice(actions.payload.index, 0, actions.payload.data);
    },
  },
});

export const cvActions = cvSlice.actions;

export default cvSlice.reducer;
