import classNames from "@/lib/util/classNames";
import Link from "next/link";
import React from "react";

interface I_Table {
  headers: string[];
  bodyData: any[];
  tableScreenName: string;
}

const Table: React.FC<I_Table> = ({ headers, tableScreenName, bodyData }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-full h-auto">
      <div className="md:mt-8 mt-3 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 h-auto">
              <thead>
                <tr className="uppercase font-semibold text-gray-900 text-sm">
                  {headers.map((header, i) => (
                    <th
                      key={tableScreenName + header}
                      scope="col"
                      className={classNames(
                        i === 0
                          ? "py-3.5 pl-4 pr-3 text-left sm:pl-0"
                          : headers.length - 1 === i
                          ? "py-3.5 pl-3 pr-4 sm:pr-0"
                          : "px-3 py-3.5 text-left"
                      )}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bodyData.map((object) => {
                  const allKeys = Object.keys(object).filter((string) => {
                    const lowerString = string.toLowerCase();
                    if (lowerString === "id" || lowerString === "options")
                      return;
                    return string;
                  });

                  return (
                    <tr
                      key={object.id + tableScreenName}
                      className="text-sm font-medium text-gray-500"
                    >
                      {allKeys.map((key, i) => (
                        <td
                          key={i + key}
                          className={classNames(
                            "whitespace-nowrap py-4",
                            i === 0
                              ? " pl-4 pr-3 sm:pl-0"
                              : allKeys.length - 1 === i
                              ? " pl-3 pr-4 sm:pr-0 text-center"
                              : "px-3"
                          )}
                        >
                          {key.includes("price") && (
                            <span className="font-rubik">$</span>
                          )}
                          {object[key]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
