import JobAPI from "app/api/modules/jobAPI";
import CompanyLayout from "app/components/layouts/company-layout";
import UserCard from "app/components/molecules/user-card";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListEmpty from "app/components/atoms/list-empty";
import Loading from "app/components/atoms/loading";
import FoundUser from "app/components/molecules/found-user";
export const getServerSideProps = async ({ params }) => {
  const infoJob = await JobAPI.getJobById(params.id, "");

  return {
    props: infoJob.data.data,
  };
};
export default function index({ id }) {
  const [employees, setEmployees] = useState([]);
  const user = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await JobAPI.getUsersApplyPostedJob(id, user.token);
      if (res.status === 200) {
        setEmployees(res.data.data);
        setLoading(false);
      }
    };
    if (user.token !== "") fetchData();
  }, []);

  return (
    <CompanyLayout value={3}>
      <div className="flex items-center p-8">
        {loading ? (
          <Loading />
        ) : (
          <div
            className={`grid gap-6 ${
              employees.length === 0
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {employees.length === 0 ? (
              <ListEmpty />
            ) : (
              employees.map((item, index) => (
                // <UserCard key={index} info={item} jobId={id} />
                <FoundUser key={index} {...item} jobId={id} />
              ))
            )}
          </div>
        )}
      </div>
    </CompanyLayout>
  );
}
