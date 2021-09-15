import gql from "graphql-tag";

export const JobAPI = {
  GET_JOB_BY_ID: gql`
    query Job($id: ID!) {
      jobs(id: $id) {
        title
        organization {
          name
        }
        address
        views
        expireDate
        createdDate
        benefits
        description
        experiences
        requirements
        minSalary
        maxSalary
        skills {
          id
          name
        }
        imageUrls
        positions {
          id
        }
      }
    }
  `,
};
