import prismadb from "@/lib/prismadb";
import { ProductsForm } from "./components/products-form";

const ProductPage = async ({
    params
}: {
    params: { productId: string, storeId: string }
}) => {
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        }
    });

    const cases = await prismadb.case.findMany({
        where: {
            storeId: params.storeId
        }
    });
        
    const bracelets = await prismadb.bracelet.findMany({
        where: {
            storeId: params.storeId
        }
    });

    const movements = await prismadb.movement.findMany({
        where: {
            storeId: params.storeId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsForm 
                initialData={product} 
                categories={categories}
                cases={cases}
                bracelets={bracelets}
                movements={movements}
                />
            </div>
        </div>
    );
};

export default ProductPage;