import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import dynamic from "next/dynamic";


const MainLayout = async ({
    children
}: {children: React.ReactNode}) => {

    const Editor = dynamic(
        async () => import('@/components/board/board'),
        { ssr: false }
    );
    
    return (
        <div className="h-full">
          <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
            <NavigationSidebar />
          </div>
          <main className="pl-[20px] pr-[10px] pt-[10px] sm:pl-[50px] h-full md:pl-[180px] pr-[45px] pt-[45px] h-full">
            <div
              className="mt-6"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                width: '86vw',
                position: 'relative',
              }}
            >
              <div style={{ width: '90%', height: '90%', position: 'relative', paddingRight: '50px' }}>
                <Editor />
              </div>
              {children}
            </div>
          </main>
        </div>
      );
      
}
 
export default MainLayout;