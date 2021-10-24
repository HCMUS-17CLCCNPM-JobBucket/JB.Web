import React from "react";
import { useSelector } from "react-redux";
import Alert from "./alert";

const Alerts = () => {
  const { alerts } = useSelector((state: any) => state.notifications);

  return (
    <div className="z-40 flex flex-col gap-2 fixed top-20 right-2">
      {alerts.map((item, index) => (
        <Alert key={index} type="success" message={item.message} />
      ))}
    </div>
  );
};

export default Alerts;
