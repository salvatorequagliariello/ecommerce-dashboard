import prismadb from "@/lib/prismadb";
import { BraceletForm } from "./components/bracelet-form";

const BraceletPage = async ({
    params
}: {
    params: { braceletId: string }
}) => {
    const bracelet = await prismadb.bracelet.findUnique({
        where: {
            id: params.braceletId
        }
    })

    return (
        <div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BraceletForm initialData={bracelet} />
            </div>
        </div>
    );
};

export default BraceletPage;