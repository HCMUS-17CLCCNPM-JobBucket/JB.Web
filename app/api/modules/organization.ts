import axiosClient from "../axiosClient";

export const orgAPI = {
  getAll: (filter) =>
    axiosClient.post("/graphql", {
      query: `
      query GetAll ($filter: ListOrganizationRequestInput ){ 
        organizations(filterRequest: $filter){ 
            id
            name
            bio
            country
            phoneNumber
            addresses
            email
            imageUrls
            avatarUrl
            
        }
    }
    `,
      variables: {
        filter,
      },
    }),
  getById: (id: number) =>
    axiosClient.post("/graphql", {
      query: `
        query getOrganizationById($id: Int!){
          organizations(id: $id){
            id 
            name 
            bio 
            country 
            phoneNumber 
            email 
            addresses
            imageUrls 
            avatarUrl 
          }
        }
      `,
      variables: {
        id,
      },
    }),
  add: (org, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `mutation addOrganization ($addOrg: AddOrganizationRequestInput!) {
        organization {
          add (organization : $addOrg)
          {
            id
            name
            bio
            country
            phoneNumber
            email
            addresses
            imageUrls
            avatarUrl
          }
        }
      }
      `,
        variables: {
          addOrg: {
            name: "",
            address: [],
            avatarUrl: "",
            bio: "",
            country: "",
            email: "",
            imageUrls: [],
            phoneNumber: "",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  update: (updateOrg, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `mutation updateOrganization ($updateOrg: UpdateOrganizationRequestInput!) {
          organization {
            update (organization : $updateOrg)
            {
              id
              name
              bio
              country
              phoneNumber
              email
              addresses
              imageUrls
              avatarUrl
            }
          }
        }
    `,
        variables: {
          updateOrg,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  delete: (id, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `mutation deleteOrg($id: Int!) {
          organization {
            delete(id: $id) {
              id
              name
              bio
              country
              phoneNumber
              email
              addresses
              imageUrls
              avatarUrl
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
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  addNewOrgRecruiter: (orgId, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `mutation AddEmployer ($empInfo :AddEmployerRequestInput) {
        organization{
          addEmployer(
            organizationEmployer : $empInfo
          )
          {
            id
            name
            userName
            passwordPlain
            createdDate
            updatedDate
            roleId
            avatarUrl
          }
        }
      }
      `,
        variables: {
          empInfo: {
            name: "",
            userName: "",
            passwordPlain: "",
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteOrgRecruiterById: (orgId, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `mutation deleteEmployer{
          organization{
            deleteEmployer(id:12){
              id
              name
              organizationId
              createdDate
              updatedDate
              roleId
              avatarUrl  
            }
          }
        }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  // reset organization recruiter(employer) password by id
  resetOrgRecruiterPasswordById: (orgId, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `mutation resetPassEmployer{
          organization{
            resetPassEmployer(id:12){
              passwordPlain
            }
          }
        }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  // promote organization recruiter(employer) to manager by id
  promoteOrgRecruiterToManagerById: (orgId, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `mutation promoteEmployer{
          organization{
            promoteEmployer(id:12){
              id
              name
              organizationId
              createdDate
              updatedDate
              roleId
              avatarUrl  
            }
          }
        }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  //demote organization manager to recruiter(employer) by id
  demoteOrgManagerToRecruiterById: (orgId, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `mutation demoteEmployer{
          organization{
            demoteEmployer(id:12){
              id
              name
              organizationId
              createdDate
              updatedDate
              roleId
              avatarUrl  
            }
          }
        }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  getOrganizationDetailById: (orgId, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `query getOrganizationDetailById($id: Int){
          organizationEmployersDetail(orgId: $id)
          {
            id 
            name 
            bio 
            country 
            phoneNumber 
            email 
            addresses
            imageUrls 
            avatarUrl 
            managers
            {
              id
              name
              avatarUrl
              roleId
            }
            employers
            {
              id
              name
              avatarUrl
              roleId
            }
          }
        }
        `,
        variables: {
          id: orgId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
};
