import React from "react";
import style from "@/app/style/style.module.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ['600'],
  subsets: ['latin'],
  style: ["normal"]
});
// style={{borderRadius: "10% 40% 30% 40%"}}
const page: React.FC = () => {
  return (
    <div className={style.login_image}>
      <div className={style.parent_glass}>
        <div className="h-16 w-16 bg-[#30d0ab] absolute left-[37%] top-32" style={{borderRadius: "23% 47% 33% 60%"}}></div>
      </div>
      <div className={style.glass}>
        <div className="h-[20%] w-full flex flex-col gap-2 items-center justify-center text-[cyan]">
          <h4 className={"text-4xl " + poppins.className}>Login</h4>
          <p className="text-[#00ffffcf]">Login to continue shopping</p>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default page;