import React, { FC } from "react";
import Button from "../buttons/Button";
import style from "@/app/style/style.module.css";
import classNames from "@/lib/util/classNames";

interface I_ConfirmationDialogProps {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: FC<I_ConfirmationDialogProps> = ({
  text,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 !opacity-75" />
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className={classNames(
            "inline-block align-bottom bg-rootBg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full",
            style.zoom
          )}
        >
          <div className="bg-rootBg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-base leading-6 font-semibold text-rootColor">
                  {text}
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-rootBg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              onClick={onConfirm}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              text="Confirm"
            />
            <Button
              onClick={onCancel}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-lightColor shadow-sm px-4 py-2 bg-rootBg text-base font-medium text-rootColor hover:bg-lightBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
              text="Cancel"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
