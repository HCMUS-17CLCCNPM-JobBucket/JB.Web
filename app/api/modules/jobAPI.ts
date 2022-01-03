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
          skills {
            name
          }
          positions{
            name
          }
          types{
            name
          }
          categories{
            name
          }
          createdDate
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
            categories{
              name
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
          categories{
            name
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
          categories{
            name
          }
        }
      }
      `,
    }),

  jobCount: () =>
    axiosClient.post("/graphql", {
      query: `query jobCounts {
        jobCounts {
          totalCount
          byCategories {
            id
            name
            totalCount
          }
        }
      }`,
    }),
  jobRecommendation: (jobId) =>
    axiosClient.post("/graphql", {
      query: `query jobRecommendations($filter: ListJobRecommendationRequestInput ) {
        jobRecommendations(filter : $filter) 
        {
          id
          title
          imageUrls
          description
        }
      }`,
      variables: {
        filter: {
          jobId,
          page: 1,
          size: 5,
        },
      },
    }),
  getJobByOrganization: (organizationId: number, page) =>
    axiosClient.post("/graphql", {
      query: `query getJobById($filter: ListJobRequestInput ) {
        jobs (filter: $filter) {
          id
          title
          imageUrls
          description
          activeStatus
          priority
          addresses
          cities
          minSalary
          maxSalary
          salaryCurrency
          salaryDuration
          skills {
            id
            name
          }   
          positions {
            id
            name
          }
          applicationCount
          interestCount
          types {
            id
            name
          }
          categories {
            id
            name
          }
          isVisaSponsorship
          employerId
          employer {
            name
            avatarUrl
            organizationId
          }
          createdDate
          updatedDate
          expireDate
          benefits
          experiences
          responsibilities
          requirements
          optionalRequirements
          cultures
          whyJoinUs
          numberEmployeesToApplied
          jobForm
          gender
          views
          isJobInterested
          isJobApplied
          organizationId
          organization {
            name
            bio
            country
            phoneNumber
            email
          }
        }
      }`,
      variables: {
        filter: {
          organizationId: [organizationId],
          page,
          size: 10,
        },
      },
    }),
};
