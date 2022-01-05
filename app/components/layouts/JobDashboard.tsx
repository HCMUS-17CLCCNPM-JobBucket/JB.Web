import router from "next/router";
import React from "react";
import TabGroup from "../atoms/TabGroup";

export default function JobDashboard(props) {
  return (
    <div className="px-16 ">
      <TabGroup
        tabs={[
          {
            name: "Saved",
            active: router.pathname === "/job/saved",
            callback: () => router.push("/job/saved"),
          },
          {
            name: "Applied",
            active: router.pathname === "/job/applied",
            callback: () => router.push("/job/applied"),
          },
        ]}
      />
      <div className="mt-8">{props.children}</div>
    </div>
  );
}
