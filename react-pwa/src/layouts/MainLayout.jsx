import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex min-h-screen w-full justify-center bg-primary/5 font-Poppins">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
