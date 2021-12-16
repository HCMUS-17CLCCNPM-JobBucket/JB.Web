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
  getReviewByCompany: (companyId) =>
    axiosClient.post("/graphql", {
      query: `query listReview {
                reviews (filterRequest : {
                  page : 1
                  size : 20
                  organizationId : 1
                })
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
            `,
      variables: {
        companyId,
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
      query: `mutation deleteReview {
                review {
                  delete(id: 2) {
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
      query: `mutation interestReview {
            review {
                interest(id: 5) {
                id
                interests{
                    userId
                }
                }
            }
        }`,
    }),
};

export default reviewAPI;
