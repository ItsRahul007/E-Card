import React from "react";

interface I_NonEditableField {
  label: string;
  value: string;
}

const NonEditableField: React.FC<I_NonEditableField> = ({ label, value }) => {
  return (
    <div className="col-span-1 row-span-1 text-sm truncate">
      <label className="font-medium capitalize text-rootColor">{label}</label>
      <div className="text-lightColor">{value}</div>
    </div>
  );
};

export default NonEditableField;
