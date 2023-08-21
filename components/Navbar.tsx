import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";


const Navbar = async () => {
    const { userId } =  auth();
    if (!userId) redirect("/sign-in");

    const stores = await prismadb.store.findMany({
        where: {
            userId,
        },
    });

    return (
        <div className="border-b w-full">
            <div className="flex h-16 items-center px-4 w-full">
                <StoreSwitcher items={stores} />
                <MainNav className="mx-6 w-full"/>
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
    )
};

export default Navbar;