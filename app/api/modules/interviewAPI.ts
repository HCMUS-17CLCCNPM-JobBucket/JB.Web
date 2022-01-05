import axiosClient from "../axiosClient";

// axiosClient.post('/graphql', {query: ``})

const interviewAPI = {
  getListScheduleHr: (interviewerId) =>
    axiosClient.post("/graphql", {
      query: `query listInterview($filter: ListInterviewRequestInput) {
        interviews(filterRequest: $filter) {
          id
          jobId
          intervieweeCVId
          interviewerId
          intervieweeId
          description
          interviewTime
          status
          job{
            id
            title
          }
          interviewer{
            id
            name
            avatarUrl
          }
          interviewee{
            id
            name
            avatarUrl
          }
          form {
            overallRating
            result
            note
            sections {
              question
              answer
              note
              rating
            }
          }
        }
      }
      `,
      variables: {
        filter: {
          //   jobId: 100,
          //   interviewTime: [],
          interviewerId,
          //   intervieweeId: 0,
          //   status: 0,
        },
      },
    }),
  add: (addInterview) =>
    axiosClient.post("/graphql", {
      query: `mutation addInterview($addInterview: AddInterviewRequestInput!){
        interview{
          add(interview: $addInterview){
            id jobId intervieweeCVId interviewerId intervieweeId description interviewTime 
          }
        }
      }
      `,
      variables: {
        addInterview,
      },
    }),
  update: (updateInterview) =>
    axiosClient.post("/graphql", {
      query: `mutation updateInterview($updateInterview: UpdateInterviewRequestInput!){
        interview{
          update(interview: $updateInterview){
            id jobId intervieweeCVId interviewerId intervieweeId description interviewTime 
            status 
            form{
              overallRating
              result
              note
            sections{
              question
              answer
              note
              rating
            }
            }
          }
        }
      }
        `,
      variables: {
        updateInterview,
      },
    }),
};

export default interviewAPI;
