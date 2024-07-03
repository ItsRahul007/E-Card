import classNames from "@/lib/util/classNames";
import { sign } from "jsonwebtoken";
import Link from "next/link";
import React from "react";

interface I_Table {
  headers: string[];
  bodyData: any[];
  tableScreenName: string;
  isEditOption?: boolean;
}

const Table: React.FC<I_Table> = ({
  headers,
  tableScreenName,
  bodyData,
  isEditOption = false,
}) => {
  const getEncodedId = (id: string) => {
    const encodedId = sign(id, process.env.NEXT_PUBLIC_AUTH_TOKEN!);
    return encodedId;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-full h-auto">
      <div className="mt-3 flow-root overflow-y-hidden">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-lightColor h-auto">
              <thead>
                <tr className="uppercase font-semibold text-rootColor text-sm">
                  {headers.map((header, i) => (
                    <th
                      key={tableScreenName + header}
                      scope="col"
                      className={classNames(
                        i === 0
                          ? "py-3.5 pl-4 pr-3 text-left sm:pl-0"
                          : headers.length - 1 === i && !isEditOption
                          ? "py-3.5 pl-3 pr-4 sm:pr-0"
                          : "px-3 py-3.5 text-left"
                      )}
                    >
                      {header}
                    </th>
                  ))}
                  {isEditOption && (
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-lightColor">
                {bodyData.map((object) => {
                  const allKeys = Object.keys(object).filter((string) => {
                    const lowerString = string.toLowerCase();
                    if (lowerString === "id" || lowerString === "options")
                      return;
                    return string;
                  });

                  const encodedId = getEncodedId(JSON.stringify(object.id));

                  return (
                    <tr
                      key={object.id + tableScreenName}
                      className="text-sm font-medium text-lightColor"
                    >
                      {allKeys.map((key, i) => (
                        <td
                          key={i + key}
                          className={classNames(
                            "whitespace-nowrap py-4 max-w-[200px] truncate",
                            i === 0
                              ? " pl-4 pr-3 sm:pl-0"
                              : allKeys.length - 1 === i && !isEditOption
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
                      {isEditOption && (
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Link
                            href={`/seller/dashboard/add-products?id=${encodedId}`}
                            className="text-indigo-600 hover:text-indigo-700"
                          >
                            Edit
                          </Link>
                        </td>
                      )}
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
