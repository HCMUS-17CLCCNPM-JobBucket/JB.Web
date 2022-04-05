import interviewAPI from "app/api/modules/interviewAPI";
import ApplicationStatus from "app/enums/ApplicationStatus";
import { useUserInfo } from "app/utils/hooks";
import React, { useEffect, useState } from "react";

export default function ApplicationStatusCount({ refresh, status }) {
  const user = useUserInfo();

  const [interviewStatusCount, setInterviewStatusCount] = useState([]);
  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await interviewAPI.applicationCount(
        user.user.roleId === 1 ? -1 : user.user.id,
        status
      );

      setInterviewStatusCount(res.data.data.jobApplicationCounts);
    };
    fetchApplicants();
  }, [refresh]);
  return (
    <div className="flex gap-6">
      {interviewStatusCount.map((item, index) => (
        <p key={index}>
          <span
            className={`${
              ApplicationStatus[status] === item.statusName && "text-blue-600"
            }  font-semibold`}
          >
            {item.statusName}
          </span>
          : {item.count}
        </p>
      ))}
    </div>
  );
}
