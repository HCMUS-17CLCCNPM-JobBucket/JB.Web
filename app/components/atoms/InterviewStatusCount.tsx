import interviewAPI from "app/api/modules/interviewAPI";
import ScheduleStatus from "app/enums/ScheduleStatus";
import { useUserInfo } from "app/utils/hooks";
import React, { useEffect, useState } from "react";

export default function InterviewStatusCount({ refresh, status }) {
  const user = useUserInfo();

  const [interviewStatusCount, setInterviewStatusCount] = useState([]);
  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await interviewAPI.interviewStatus(
        user.user.roleId === 1 ? -1 : user.user.id,
        status
      );

      setInterviewStatusCount(res.data.data.interviewCounts);
    };
    fetchApplicants();
  }, [refresh]);
  return (
    <div className="flex gap-6">
      {interviewStatusCount.map((item, index) => (
        <p key={index}>
          <span
            className={`${
              ScheduleStatus[status] === item.statusName && "text-blue-600"
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
