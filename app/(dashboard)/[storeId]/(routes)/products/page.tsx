import prismadb from "@/lib/prismadb";
import { ProductsClient } from "./components/client";
import { ProductsColumns } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
           category: true,
           case: true,
           bracelet: true,
           movement: true 
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedProducts: ProductsColumns[] = products.map(item => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price.toNumber()),
        category: item.category.name,
        case: item.case.name,
        bracelet: item.bracelet.name,
        movement:  item.movement.name,
        createdAt: format(item.createdAt, "do MMMM, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsClient data={formattedProducts} />
            </div>
        </div>
    );
};

export default ProductsPage;