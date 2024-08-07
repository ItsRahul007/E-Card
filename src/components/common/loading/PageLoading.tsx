import React, { FC } from "react";

const PageLoading: FC = () => {
  return (
    <div className="h-full w-full flex justify-center items-center bg-rootBg">
      <span className="h-10 w-10 block border-4 border-transparent rounded-full border-r-rootColor border-t-rootColor animate-spin" />
    </div>
  );
};

export default PageLoading;
