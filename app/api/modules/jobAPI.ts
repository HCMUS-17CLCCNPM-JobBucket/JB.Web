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
  apply: (jobId: string, cVId: number, cVPDFUrl: string) =>
    axiosClient.post("/graphql", {
      query: `
        mutation applyJob($data: ApplicationRequestInput) {
          job {
            apply(application: $data) {
              userId
              job {
                id
                title
              }
            }
          }
        }
      `,
      variables: {
        data: { jobId, cVId, cVPDFUrl },
      },
    }),
  unApply: (jobId: string) =>
    axiosClient.post("/graphql", {
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
    }),
  add: (job) =>
    axiosClient.post("/graphql", {
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
    }),
  getAll: (filter) =>
    axiosClient.post("/graphql", {
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
    }),
  getJobById: (id: number) =>
    axiosClient.post("/graphql", {
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
    }),
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

  like: (id: number) =>
    axiosClient.post("/graphql", {
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
    }),

  unlike: (id: number) =>
    axiosClient.post("/graphql", {
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
    }),
  getInterestedJobs: (page) =>
    axiosClient.post("/graphql", {
      query: `query listJob($filter: ListJobRequestInput ) {
        jobs(filter: $filter) {
          id
          title
          organization {
            name
          }
          types {
            name
          }
          isJobInterested
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
        filter: { page, size: 10, isInterested: true },
      },
    }),
  getAppliedJobs: (page) =>
    axiosClient.post("/graphql", {
      query: `query listAppliedUserOfJob($filter: ListJobApplicationRequestInput ) {
        jobApplications(filter: $filter) {
          id
          title
          organization {
            name
          }
          types {
            name
          }
          isJobApplied
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
    }),
};
