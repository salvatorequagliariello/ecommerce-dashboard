import prismadb from "@/lib/prismadb";
import { MovementsClient } from "./components/client";
import { MovementsColumn } from "./components/columns";
import { format } from "date-fns";

const MovementsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const movements = await prismadb.movement.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedMovements: MovementsColumn[] = movements.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "do MMMM, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <MovementsClient data={formattedMovements} />
            </div>
        </div>
    );
};

export default MovementsPage;