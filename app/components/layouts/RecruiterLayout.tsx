import TabGroup from "app/components/atoms/TabGroup";
import router from "next/router";
import React from "react";

export default function RecruiterLayout(props) {
  return (
    <div className="w-full px-2 xs:px-4 md:px-16">
      <div className="w-full">
        <TabGroup
          styles={" mx-auto"}
          tabs={[
            {
              name: "Jobs",
              active: router.pathname.indexOf("/recruiter/jobs") !== -1,
              callback: () => router.push("/recruiter/jobs"),
              // number: "1",
            },
            {
              name: "Applications",
              active: router.pathname === "/recruiter/applications",
              callback: () => router.push("/recruiter/applications"),
            },
            {
              name: "Schedules",
              active: router.pathname === "/recruiter/schedules",
              callback: () => router.push("/recruiter/schedules"),
            },
          ]}
        />
      </div>

      {props.children}
    </div>
  );
}
