"use client";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/navigation";
import { User } from "../../../../packages/shared/entities/user";
import {
  clearUserData,
  setLoading,
  setLoadingLoadMore,
} from "../../store/userSlice";
import { fetchUsers } from "../../api/api";
import MainLayout from "../../components/MainLayout";
import { toTitleCase } from "../../../../packages/shared/utils/toTitleCase";

const MainPage = () => {
  const router = useRouter();
  const { email, isAuthenticated, token, loading, loadingLoadMore } =
    useSelector((state: RootState) => state.user);
  const currentUser = toTitleCase(email?.split("@")[0] || "");

  const [users, setUsers] = useState<User[]>([]);
  const [lastDoc, setLastDoc] = useState<User | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const initialLoadComplete = useRef(false);
  const isFetching = useRef(false);

  const loadUsers = async (lastDoc?: User | null) => {
    if (isFetching.current) return;

    if (lastDoc) {
      dispatch(setLoadingLoadMore(true));
    } else {
      dispatch(setLoading(true));
    }

    try {
      isFetching.current = true;
      const response = await fetchUsers(token || "", lastDoc);
      setUsers((prev) => {
        const existingIds = new Set(prev.map((user) => user.id));
        const newUsers = response.data.users.filter(
          (user: User) => !existingIds.has(user.id)
        );
        return lastDoc ? [...prev, ...newUsers] : response.data.users;
      });
      setLastDoc(response.data.lastDoc);
      setHasMore(response.data.hasMore);
    } catch (err: any) {
      if (
        err.status === 401 ||
        err.message?.includes("Failed to authenticate token") ||
        err.message?.includes("token has expired")
      ) {
        dispatch(clearUserData());
        router.push("/login");
        return;
      }
      setError(err.message);
    } finally {
      dispatch(setLoading(false));
      dispatch(setLoadingLoadMore(false));
      isFetching.current = false;
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      if (!initialLoadComplete.current && users.length === 0) {
        loadUsers();
        initialLoadComplete.current = true;
      }
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop - clientHeight < 100) {
        if (hasMore && !loading && !loadingLoadMore && !isFetching.current) {
          loadUsers(lastDoc);
        }
      }
    };

    if (hasMore) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [hasMore, loading, loadingLoadMore, lastDoc]);

  const handleSignOut = () => {
    dispatch(clearUserData());
  };

  return (
    <MainLayout
      currentUser={currentUser}
      users={users}
      loading={loading}
      error={error}
      hasMore={hasMore}
      loadingLoadMore={loadingLoadMore}
      onSignOut={handleSignOut}
    />
  );
};

export default MainPage;
