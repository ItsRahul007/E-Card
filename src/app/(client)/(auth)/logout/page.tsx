"use client";
import PageLoading from "@/components/common/loading/PageLoading";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  const router = useRouter();

  async function logout() {
    const res = await axios.delete("/api/auth/login");
    if (res.data.success) {
      router.push("/login");
    }
  }
  logout();

  return <PageLoading />;
};

export default Logout;
