import prismadb from "@/lib/prismadb";
import { BraceletsClient } from "./components/client";
import { BraceletsColumn } from "./components/columns";
import { format } from "date-fns";

const BraceletsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const bracelets = await prismadb.bracelet.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedBracelets: BraceletsColumn[] = bracelets.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "do MMMM, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BraceletsClient data={formattedBracelets} />
            </div>
        </div>
    );
};

export default BraceletsPage;