"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const RootPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/main");
    } else {
      router.push("/login");
    }
  }, [router, isAuthenticated]);

  return null;
};

export default RootPage;
