import { useLoadUserQuery } from "@/features/api/authapi";

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Custom;
