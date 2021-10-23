import axiosClient from "../axiosClient";

export const CvAPI = {
  getCvById: (id: number) =>
    axiosClient.post("/graphql", {
      query: `
        query cv($id: ID!) {
  cv (id : $id) {
    id
    cVName
    name
    title
    avatarUrl
    gender
    birthdate
    email
    phone
    address
    introduction
    website
    github
    reference
    skills {
			level
      skillName
    }
    userId
    cVTemplate
    createdDate
    updatedDate
    educations {
			school
      major
      status
      profession
    }
    experiences {
			company
      duration
      position
    }
    activities
    certifications
    awards
  }
}
      `,
      variables: {
        id,
      },
    }),
};
