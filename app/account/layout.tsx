import SideMenu from "@/components/layout/Profile/SideMenu"


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex px-10 py-10 gap-10 w-full bg-slate-100 h-[100vh]">
        <SideMenu />
        {children}
    </div>
  )
}

export default Layout