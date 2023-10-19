import { setUser } from "@reducers/authSlice";
import { useUser } from "@redux/hooks/useUser";
import { useAppDispatch } from "@redux/store";
import { useEffect } from "react";

export const TestRedux = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setUser({
          id: 1,
          name: "test",
          email: "example@gmail.com",
          password: "123456",
          role: "admin",
          type: "user",
          createdAt: "2021-08-10T00:00:00.000Z",
          updatedAt: "2021-08-10T00:00:00.000Z",
        }),
      );
    }, 1000);
  }, [dispatch]);

  const user = useUser();

  return (
    <div className='flex text-gray-200'>
      <div className='text-2xl'>{user?.email}</div>
    </div>
  );
};
