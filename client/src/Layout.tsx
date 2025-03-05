import SideBar from "./components/SideBar";
import CreateLinkDialog from "./components/link/dialog/Create";
import EditLinkDialog from "./components/link/dialog/Edit";

const Layout = ({ children }: any) => {
    return (
        <div className='h-screen flex w-screen bg-[radial-gradient(145.05%_100%_at_50%_0%,#1D2B41_0%,#020509_57.38%,#0F1A29_88.16%)]'>
            {/* 메뉴바 */}
            <SideBar />

            {/* 페이지 컴포넌트 */}
            <div className='size-full'>{children}</div>

            {/* 생성/수정 dialog */}
            <EditLinkDialog />
            <CreateLinkDialog />
        </div>
    );
};

export default Layout;
