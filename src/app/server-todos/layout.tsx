
import { SideBar } from '@/components';

export default function CategoriesLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>

            <SideBar />

            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">


                


                <div className="px-6 pt-6">

                    {children}



                </div>
            </div>
        </>
    );
}