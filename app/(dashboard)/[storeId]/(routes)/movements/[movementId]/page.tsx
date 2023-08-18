import prismadb from "@/lib/prismadb";
import { MovementsForm } from "./components/movements-form";

const MovementPage = async ({
    params
}: {
    params: { movementId: string }
}) => {
    const movements = await prismadb.movement.findUnique({
        where: {
            id: params.movementId
        }
    })

    return (
        <div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <MovementsForm initialData={movements} />
            </div>
        </div>
    );
};

export default MovementPage;