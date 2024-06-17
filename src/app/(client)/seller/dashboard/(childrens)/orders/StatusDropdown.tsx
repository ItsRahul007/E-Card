"use client";

import { statusOptions } from "@/lib/util/SomeStaticDatas";
import React, { useState } from "react";

interface I_StatusDropdown {
  status: string;
}

const StatusDropdown: React.FC<I_StatusDropdown> = ({ status }) => {
  const [selectValue, setSelectValue] = useState(status);
  //! use server side to change the status (form action)

  return (
    <div>
      <select
        className="text-gray-700 rounded-md cursor-pointer"
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
        defaultValue={status}
      >
        <option className="py-2" disabled>
          Select a status
        </option>
        {statusOptions.map((option, i) => (
          <option className="py-2" value={option} key={option + i}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusDropdown;
