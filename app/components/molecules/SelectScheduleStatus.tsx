import ScheduleStatus from "app/enums/ScheduleStatus";
import React from "react";
import Selector from "../atoms/Select";

export default function SelectScheduleStatus({ onChange }) {
  return (
    <Selector
      placeholder={`Status`}
      options={ScheduleStatus.map((item, index) => ({
        value: index,
        label: item,
      }))}
      onChange={(e) => onChange(e.value)}
    />
  );
}
