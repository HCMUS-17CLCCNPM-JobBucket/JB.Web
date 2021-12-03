import axiosClient from "../axiosClient";

export const jobAPI = {
  getJobProperties: () =>
    axiosClient.post("/graphql", {
      query: `query listCategory {
      jobProperties {
        skills {
          id
          name
        }
        positions {
          id
          name
        }
        types {
          id
          name
        }
        categories {
          id
          name
        }
      }
    }
    `,
    }),
  apply: (jobId: string, cVId: number, cVPDFUrl: string, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
        mutation applyJob($application: ApplyJobType) {
          job{
            apply(application: $application){ 
							jobId            
            }
          }
        }
  `,
        variables: {
          application: { jobId, cVId, cVPDFUrl },
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  unApply: (jobId: string, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
        mutation unApplyJob($id: Int) {
          job{
            unapply(id: $id){ 
              jobId
            }
          }
        }
  `,
        variables: {
          id: jobId,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  add: (job, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
          mutation addJob($job: AddJobType) {
            job{
              add(job: $job){ 
                id
              }
            }
          }
    `,
        variables: {
          job,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getAll: (filter, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      query GetAllJobs($filter: ListJobRequestInput ) {
        jobs(filter: $filter) {
          id
          title
          jobForm
          isJobApplied
    			isJobInterested
          description
          addresses
          imageUrls
          expireDate
          minSalary
          maxSalary
        }
      }
    `,
        variables: {
          filter,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getJobById: (id: number, token: string) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
        query Job($id: Int) {
          jobs(id: $id) {
            isJobApplied
    			  isJobInterested
          }
        }
      `,
        variables: {
          id,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getJobByIdWithoutToken: (id: number) =>
    axiosClient.post("/graphql", {
      query: `
        query Job($id: Int) {
          jobs(id: $id) {
            id
            title
            organization {
              name
            }
            types{
              name
            }
            addresses
            views
            jobForm
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
      variables: {
        id: id,
      },
    }),

  like: (id: number, token: string) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
        mutation LikeJob($id: Int!) {
        job{
          addInterested(id: $id){
            id
          }
        }
      }
    `,
        variables: {
          id,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),

  unlike: (id: number, token: string) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
          mutation unLikeJob($id: Int!) {
            job{
              removeInterested(id: $id){
                id
              }
            }
          }
        `,
        variables: {
          id,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
};
