import router from "next/router";
import React from "react";
import TabGroup from "../atoms/TabGroup";

export default function JobDashboard(props) {
  return (
    <div className="w-full px-2 xs:px-4 md:px-16">
      <TabGroup
        styles={" mx-auto"}
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
          {
            name: "Schedule",
            active: router.pathname === "/job/schedule",
            callback: () => router.push("/job/schedule"),
          },
        ]}
      />
      <div className="mt-8 w-full">{props.children}</div>
    </div>
  );
}
