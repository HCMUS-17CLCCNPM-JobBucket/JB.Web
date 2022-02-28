import axiosClient from "../axiosClient";

export const blogAPI = {
  handleBlogByType: (blogId, blog, type) => {
    if (type === "post") {
      return blogAPI.add(blog);
    }
    return blogAPI.update({ ...blog, id: blogId });
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
  getMyBlogs: (userId, page) => {
    return axiosClient.post("/graphql", {
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
              avatarUrl
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
        filter: { authorId: userId, page, size: 12 },
      },
    });
  },
  getAll: (filter) =>
    axiosClient.post("/graphql", {
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
            avatarUrl
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
    }),

  getById: (id: number) =>
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
            author {
              avatarUrl
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
  getCommentBlogById: (id: number, filter) =>
    axiosClient.post("/graphql", {
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
                avatarUrl
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
                  avatarUrl
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
    }),
  add: (blog) =>
    axiosClient.post("/graphql", {
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
    }),

  update: (blog) =>
    axiosClient.post("/graphql", {
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
    }),
  delete: (id) =>
    axiosClient.post("/graphql", {
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
    }),
  like: (id) =>
    axiosClient.post("/graphql", {
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
    }),
  unlike: (id) =>
    axiosClient.post("/graphql", {
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
    }),

  //comment
  comment: (comment) =>
    axiosClient.post("/graphql", {
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
    }),
  updateComment: (comment, id) =>
    axiosClient.post("/graphql", {
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
    }),
  deleteComment: (id) =>
    axiosClient.post("/graphql", {
      query: `
      mutation removeComment($id: Int!) {
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
        mutation addInterestedComment($id: Int!) {
          blog{
            addInterestedComment(id: $id){ 
              id
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
  unlikeComment: (id) =>
    axiosClient.post("/graphql", {
      query: `
      mutation removeInterestedComment($id: Int!) {
        blog{
          removeInterestedComment(id: $id){ 
            id
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
  addSubComment: (comment) =>
    axiosClient.post("/graphql", {
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
    }),
};
