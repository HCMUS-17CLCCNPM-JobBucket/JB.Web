import axiosClient from "../axiosClient";

export const orgAPI = {
  getAll: (filter) =>
    axiosClient.post("/graphql", {
      query: `
        query GetAll { #($filter: ListOrganizationType )
            organizations{ #(filter: $filter)
                id
                name
                bio
                country
                phoneNumber
                email
                address
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
          query GetOrg($id: ID ) {
              organizations(id: $id){
                  id
                  name
                  bio
                  country
                  phoneNumber
                  email
                  address
                  imageUrls
                  avatarUrl
                  
              }
          }
      `,
    }),
};
