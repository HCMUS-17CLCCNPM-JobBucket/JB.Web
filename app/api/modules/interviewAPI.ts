import axiosClient from "../axiosClient";

// axiosClient.post('/graphql', {query: ``})

const interviewAPI = {
  getListScheduleHr: (interviewerId, filters) =>
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
          totalInterviewRound
          currentInterviewRound
          job {
            id
            title
          }
          interviewer {
            id
            name
            avatarUrl
          }
          interviewee {
            id
            name
            avatarUrl
          }
          forms {
            
            round
            title
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
          ...filters,
          size: 10,
          interviewerId,
          //   intervieweeId: 0,
          //   status: 0,
        },
      },
    }),
  getListScheduleEmployee: (intervieweeId, filters) =>
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
          totalInterviewRound
          currentInterviewRound
          job {
            id
            title
          }
          interviewer {
            id
            name
            avatarUrl
          }
          interviewee {
            id
            name
            avatarUrl
          }
          forms {
            
            round
            title
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
          ...filters,
          size: 10,
          // interviewerId,
          intervieweeId,
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
            totalInterviewRound
            currentInterviewRound
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
