import SideMenu from "@/components/layout/Profile/SideMenu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:flex px-3 md:px-10 md:py-5 gap-10 w-full min-h-screen bg-slate-100 h-auto">
      <SideMenu />
      {children}
    </div>
  );
};

export default Layout;
