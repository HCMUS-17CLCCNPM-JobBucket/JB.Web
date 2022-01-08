import React, { useEffect, useState } from "react";
import SalaryRange from "app/components/atoms/SalaryRange";
import Moment from "react-moment";
import { jobAPI } from "app/api/modules/jobAPI";
import { useSelector } from "react-redux";
import Post from "pages/job/post";

export default function RecuitJob() {
  const [isEditor, setEditor] = useState(false);
  const [jobs, setJobs] = useState([]);
  const user = useSelector((state: any) => state.user);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await jobAPI.getlistbyemployer(
        { employerId: user.user.id },
        user.token
      );
      console.log(response);
      setJobs(response.data.data.jobs);
    };
    fetchData();
  }, []);

  const handleEditJob = async (id) => {
    setEditor(true);
    // const res = await jobAPI.getJobById(108, user.token);
    // if (res.status === 200) {
    //   setInit(res.data.data.jobs[0].title);
    // }
  };
  return (
    <div>
      {!isEditor ? (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setEditor(true)}
              type="button"
              className="bg-blue-600 text-white inline-flex px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-2 h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Create</p>
            </button>
          </div>
          {jobs.map((item, index) => (
            <div className="job-horizon-card hover:shadow-lg mb-4" key={index}>
              <div className="job-horizon-card__header">
                <div className="job-horizon-card__company">
                  <img src={item.imageUrls[0]} alt="Google" />
                  <div className="flex justify-between w-full">
                    <div>
                      <p>{item.title}</p>
                      <span className="text-gray-600">
                        {item.addresses == null
                          ? "No addresses"
                          : item.addresses[0]}
                      </span>
                    </div>
                    <SalaryRange
                      minSalary={item.minSalary}
                      maxSalary={item.maxSalary}
                    />
                  </div>
                </div>
                <div
                  className="job-horizon-card__desc line-clamp"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
              </div>
              <div className="flex justify-between items-center px-6 py-2 border-t">
                <p>
                  Expires in{" "}
                  <Moment format="DD/MM/YYYY" date={item.expireDate} />
                </p>
                <div>
                  <button
                    onClick={() => handleEditJob(item.id)}
                    type="button"
                    className="mr-4 bg-blue-600 text-white inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="-ml-1 mr-2 h-5 w-5 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <p>Edit</p>
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 text-white inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="-ml-1 mr-2 h-5 w-5 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <p>Delete</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setEditor(false)}
              type="button"
              className="bg-blue-600 text-white inline-flex px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-1 mr-2 h-5 w-5 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <p>Back</p>
            </button>
          </div>
          <Post title = {"Test Add Job"}></Post>
        </div>
      )}
    </div>
  );
}
