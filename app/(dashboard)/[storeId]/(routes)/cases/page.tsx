import prismadb from "@/lib/prismadb";
import { CasesClient } from "./components/client";
import { CasesColumn } from "./components/columns";
import { format } from "date-fns";

const CasesPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const cases = await prismadb.case.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCases: CasesColumn[] = cases.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "do MMMM, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CasesClient data={formattedCases} />
            </div>
        </div>
    );
};

export default CasesPage;