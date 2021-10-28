import axiosClient from "../axiosClient";

export const blogAPI = {
  getAll: (filter, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      query GetAllBlogs($filter: ListBlogType) {
        blogs(filter: $filter){
          id
          title
          description
          imageUrl
          content
          tags
          author{
            userName
            name
          }
          isInterested
          interestCount
          commentCount
          views
          createdDate
        }
      }
    `,
        variables: {
          // id,
          filter,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  getById: (id: number, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
        query Blog($id: ID!) {
          blogs(id: $id) {
            id
            title
            description
            imageUrl
            content
            tags
            author {
              userName
              name
            }
            isInterested
            interestCount
            commentCount
            views
            createdDate
            
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
  getByIdWithoutToken: (id: number) =>
    axiosClient.post("/graphql", {
      query: `
        query Blog($id: ID!) {
          blogs(id: $id) {
            id
            title
            description
            imageUrl
            content
            tags
            author {
              userName
              name
            }
            isInterested
            interestCount
            commentCount
            views
            createdDate
            
          }
        }
      `,
      variables: {
        id,
      },
    }),
  getCommentBlogById: (id: number, filter, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
        query Blog($id: ID!, $filter: ListBlogType) {
          blogs(id: $id, filter: $filter) {
            id
            comments{
              id
              parentId
              content
              user{
                id
                name
              }
              isInterested
              interestCount
              createdDate
              updatedDate
              children{
                id
                isInterested
                interestCount
                content
                user{
                  id
                  name
                }
                createdDate
                updatedDate
              }
            }
          }
        }
      `,
        variables: {
          id,
          filter,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  add: (blog, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation addBlog($blog: AddBlogType) {
        blog{
          add(blog: $blog){ 
            id
          }
        }
      }
    `,
        variables: {
          blog,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),

  update: (blog, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
          mutation updateBlog($blog: UpdateBlogType) {
            blog{
              update(blog: $blog){ 
                id
              }
            }
          }
        `,
        variables: {
          blog,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  delete: (id, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation deleteBlog($id: Int) {
        blog{
          deleteComment(id: $id){ 
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
  like: (id, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation addInterested($id: Int) {
        blog{
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
  unlike: (id, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation removeInterested($id: Int) {
        blog{
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

  //comment
  comment: (comment, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation addComment($comment: AddBlogCommentType) {
        blog{
          addComment(comment: $comment){ 
            id
          }
        }
      }
    `,
        variables: {
          comment,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  updateComment: (comment, id, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation updateComment($comment: UpdateBlogCommentType) {
        blog{
          updateComment(comment: $comment){ 
            id
          }
        }
      } 
    `,
        variables: {
          comment: {
            content: comment,
            id,
          },
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
  deleteComponent: (id, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation removeComment($id: Int) {
        blog{
          deleteComment(id: $id){ 
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
  likeComment: (id, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation addInterestedComment($id: Int) {
        blog{
          addInterestedComment(id: $id){ 
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
  unlikeComment: (id, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation removeInterestedComment($id: Int) {
        blog{
          removeInterestedComment(id: $id){ 
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
  addSubComment: (comment, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      mutation addComment($comment: AddBlogCommentType) {
        blog{
          addComment(comment: $comment){ 
            id
          }
        }
      }
    `,
        variables: {
          comment,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ),
};
