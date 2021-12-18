import axiosClient from "../axiosClient";

const reviewAPI = {
  getReviewById: (id) =>
    axiosClient.post("/graphql", {
      query: `query getReviewById{
            reviews(id:4){
              id 
              rating
              ratingBenefit
              ratingLearning
              ratingCulture
              ratingWorkspace
              content
              interestCount
            }
          }`,
      variables: {
        id,
      },
    }),
  getReviewByCompany: (companyId, page) =>
    axiosClient.post("/graphql", {
      query: `query listReview($filterRequest: ListReviewRequestInput) {
        reviews(filterRequest: $filterRequest) {
          id
          rating
          ratingBenefit
          ratingLearning
          ratingCulture
          ratingWorkspace
          content
          interestCount
          user {
            id
            name
            avatarUrl
            userName
            email
          }
          userId
          createdDate
          updatedDate
          isInterested
          organizationId
          organization {
            id
            name
            bio
            avatarUrl
          }
          interests {
            userId
          }
        }
      }
            `,
      variables: {
        filter: {
          isDescending: true,
          organizationId: companyId,
          page,
          size: 10,
        },
      },
    }),
  addReview: (review) =>
    axiosClient.post("/graphql", {
      query: `mutation addReview ($addReview: AddReviewRequestInput) {
            review {
              add (review : $addReview)
              {
                id
              rating
              ratingBenefit
              ratingLearning
              ratingCulture
              ratingWorkspace
              content
              interestCount
              userId
              createdDate
              updatedDate
              isInterested
              organizationId
              }
            }
          }`,
      variables: {
        addReview: review,
      },
    }),
  updateReview: (review) =>
    axiosClient.post("/graphql", {
      query: `mutation updateReview ($updateReview: UpdateReviewRequestInput) {
                review {
                  update (review : $updateReview)
                  {
                  id
                  rating
                  ratingBenefit
                  ratingLearning
                  ratingCulture
                  ratingWorkspace
                  content
                  interestCount
                  user{
                    id name avatarUrl userName email
                  }
                  userId
                  createdDate
                  updatedDate
                  isInterested
                  organizationId
                  organization{
                    id name bio avatarUrl
                  }
                  interests{
                    userId
                  }
                }
              }
              }
            `,
      variables: {
        updateReview: review,
      },
    }),
  deleteReview: (id) =>
    axiosClient.post("/graphql", {
      query: `mutation deleteReview($id: Int!) {
                review {
                  delete(id: $id) {
                    id
                    
                  }
                }
              }
            `,
      variables: {
        id,
      },
    }),
  likeReview: (id) =>
    axiosClient.post("/graphql", {
      query: `mutation interestReview($id: Int!) {
        review {
          interest(id: $id) {
            isInterested
            interestCount
          }
        }
      }
      `,
      variables: {
        id,
      },
    }),
};

export default reviewAPI;
