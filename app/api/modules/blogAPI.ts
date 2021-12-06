import axiosClient from "../axiosClient";

export const blogAPI = {
  handleBlogByType: (blogId, blog, token, type) => {
    if (type === "post") {
      return blogAPI.add(blog, token);
    }
    return blogAPI.update({ ...blog, id: blogId }, token);
  },
  //
  getBlogTags: () =>
    axiosClient.post("/graphql", {
      query: `query listTag {
        blogTags (filter : {
          page : 1
          size : 20
        })
      }
    `,
    }),
  getMyBlogs: (userId, token) => {
    return axiosClient.post(
      "/graphql",
      {
        query: `
        query GetMyBlogs($filter: ListBlogRequestInput) {
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
              author{
                id
                name
              }
            }
        }
      `,
        variables: {
          // id,
          filter: { authorId: userId },
        },
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  getAll: (filter, token) =>
    axiosClient.post(
      "/graphql",
      {
        query: `
      query GetAllBlogs($filter: ListBlogRequestInput) {
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
            id
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
        query Blog($id: Int) {
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
        query Blog($id: Int) {
          blogs(id: $id) {
            id
            title
            description
            imageUrl
            content
            tags
            authorId
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
        query Blog($id: Int, $filter: ListBlogRequestInput) {
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
        mutation addBlog($blog: AddBlogRequestInput) {
          blog {
            add(
              blog: $blog
            ) {
              id
              title
              updatedDate
              createdDate
              imageUrl
              content
              tags
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
          mutation updateBlog($blog: UpdateBlogRequestInput) {
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
      mutation deleteBlog($id: Int!) {
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
      mutation addInterested($id: Int!) {
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
      mutation removeInterested($id: Int!) {
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
      mutation addComment($comment: AddBlogCommentRequestInput) {
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
      mutation updateComment($comment: UpdateBlogCommentRequestInput) {
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
  deleteComment: (id, token) =>
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
      mutation addComment($comment: AddBlogCommentRequestInput) {
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
