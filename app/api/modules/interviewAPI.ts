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
          organization{
            name
            avatarUrl
          }
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
          organization{
            name
            avatarUrl
          }
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

  accept: (id) =>
    axiosClient.post("/graphql", {
      query: `mutation acceptInterview($id: Int!){
        interview{
          acceptInterview(interviewId: $id){
            id
      
          }
        }
      }
    `,
      variables: {
        id,
      },
    }),
  deny: (id) =>
    axiosClient.post("/graphql", {
      query: `mutation denyInterview($id: Int!){
        interview{
          denyInterview(interviewId: $id){
            id
          }
        }
      }
    `,
      variables: {
        id,
      },
    }),

  reschedule: (interviewId, newDate) =>
    axiosClient.post("/graphql", {
      query: `mutation reschedule($interviewId: Int!, $newDate: DateTime!){
        interview{
          reschedule(interviewId: $interviewId, newDateTime: $newDate){
            id
          }
        }
      }
    `,
      variables: {
        interviewId,
        newDate,
      },
    }),
  fail: (interviewId) =>
    axiosClient.post("/graphql", {
      query: `mutation failInterview($interviewId: Int!){
        interview{
          failAplication(interviewId: $interviewId){
            id
          }
        }
      }
    `,

      variables: {
        interviewId,
      },
    }),
  pass: (interviewId) =>
    axiosClient.post("/graphql", {
      query: `mutation passInterview($interviewId: Int!){
        interview{
          passAplication(interviewId: $interviewId){
            id
          }
        }
      }
    `,

      variables: {
        interviewId,
      },
    }),
  nextRound: (interviewId, newDate) =>
    axiosClient.post("/graphql", {
      query: `mutation nextRound($interviewId: Int!, $newDate:DateTime!){
        interview{
          nextInterview(interviewId:$interviewId, newDateTime:$newDate){
            id
          }
        }
      }
    `,

      variables: {
        interviewId,
        newDate,
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
            forms{
              title
              round
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

  interviewStatus: (interviewerId, status) =>
    axiosClient.post("/graphql", {
      query: `query interviewApplyCount($interviewerId: Int, $status: Int) {
        interviewCounts (filter : {
          interviewerId : $interviewerId
          status : $status
        })
        {
          status
          statusName
          count
        }
      }`,
      variables: {
        interviewerId,
        status,
      },
    }),
  applicationCount: (employerId, status) =>
    axiosClient.post("/graphql", {
      query: `query jobApplicationCounts(
        $employerId: Int
        $status: Int
        # $organizationId: Int
        # $jobId: Int
      ) {
        jobApplicationCounts(
          filter: {
            employerId: $employerId
            status: $status
            # organizationId: $organizationId
            # jobId: $jobId
          }
        ) {
          status
          statusName
          count
        }
      }
      `,
      variables: {
        employerId,
        status,
      },
    }),
};

export default interviewAPI;
