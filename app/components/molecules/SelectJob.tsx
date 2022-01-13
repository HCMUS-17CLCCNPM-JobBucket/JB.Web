import { jobAPI } from "app/api/modules/jobAPI";
import { useUserInfo } from "app/utils/hooks";
import React, { useEffect, useState } from "react";
import Selector from "../atoms/Select";

export default function SelectJob({ onChange }) {
  const user = useUserInfo();
  const [jobs, setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page === 1) {
      setLoading(true);
      jobAPI
        .getJobByOrganization(user.user.organizationId, 1)
        .then((res) => {
          if (res.status === 200)
            setJobs([{ id: -1, title: "All" }, ...res.data.data.jobs]);
          setLoading(false);
        })
        .catch((err) => console.log(err.response.status));
    } else if (page > 1) {
      jobAPI
        .getJobByOrganization(user.user.organizationId, page)
        .then((res) => {
          if (res.status === 200) setJobs([...jobs, ...res.data.data.jobs]);

          setHasMore(res.data.data.jobs.length > 0);
        });
    }
  }, [page]);
  return (
    <Selector
      placeholder={`Select job`}
      options={jobs.map((job) => ({
        value: job.id,
        label: job.title,
      }))}
      onChange={(e) => onChange(e.value)}
    />
  );
}
