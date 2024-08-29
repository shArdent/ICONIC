import Footer from "@/components/layout/landingpage/Footer";
import SideMenu from "@/components/layout/Profile/SideMenu";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:flex px-10 py-5 gap-10 w-full bg-slate-100 min-h-screen">
      <SideMenu />
      {children}
    </div>
  );
};

export default Layout;
