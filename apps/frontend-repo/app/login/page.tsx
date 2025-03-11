"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/userSlice";
import { useRouter } from "next/navigation";
import { RootState } from "../../store/store";
import { login } from "../../api/api";
import LoginLayout from "../../components/LoginLayout";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/main");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    try {
      const { email: userEmail, token: userToken } = await login(
        email,
        password
      );

      dispatch(
        setUserData({
          email: userEmail,
          token: userToken,
        })
      );

      router.push("/main");
    } catch (error: any) {
      setError(
        error.message || "An error occurred during login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginLayout onSubmit={handleLogin} isLoading={isLoading} error={error} />
  );
};

export default LoginPage;
