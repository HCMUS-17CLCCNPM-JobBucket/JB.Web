import axiosClient from "../axiosClient";

export const blogAPI = {
  getAll: (filter) =>
    axiosClient.post("/graphql", {
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
    }),
  getById: (id: number) =>
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
            }
            isInterested
            interestCount
            commentCount
            views
            createdDate
            comments{
              id
              parentId
              content
              user{
                id
                name
              }
              createdDate
              updatedDate
              children{
                id
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
      },
    }),
  add: (blog) =>
    axiosClient.post("/graphql", {
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
    }),

  update: (blog) =>
    axiosClient.post("/graphql", {
      query: `
    mutation updateBlog($blog: UpdateBlogType) {
      blog{
        update(blog: $blog){ 
          id
          title
          description
          imageUrl
          content
          tags
          
          isInterested
          interestCount
          commentCount
          views
        }
      }
    }
  `,
      variables: {
        blog: {
          id: 2,
          title: "reactjs tutorials",
          content: "123",
          description: "123",
          imageUrl: "",
          tags: [],
        },
      },
    }),
  delete: (id) =>
    axiosClient.post("/graphql", {
      query: `
      mutation deleteBlog($id: Int) {
        blog{
          delete(id: $id){ 
            id
          }
        }
      }
    `,
      variables: {
        id,
      },
    }),
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

  //comment
  comment: (blog) =>
    axiosClient.post("/graphql", {
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
        comment: {
          blogId: 2,
          content: "gut chop baby",
          parentId: 2,
        },
      },
    }),
  updateComment: (comment) =>
    axiosClient.post("/graphql", {
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
          content: "aaaaaa",
          id: 1,
        },
      },
    }),
  deleteComponent: (id) =>
    axiosClient.post("/graphql", {
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
    }),
  likeComment: (id) =>
    axiosClient.post("/graphql", {
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
    }),
  unlikeComment: (id) =>
    axiosClient.post("/graphql", {
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
    }),
};
