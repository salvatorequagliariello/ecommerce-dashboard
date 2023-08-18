import prismadb from "@/lib/prismadb";
import { ProductsForm } from "./components/products-form";

const ProductPage = async ({
    params
}: {
    params: { productId: string }
}) => {
    const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    })

    return (
        <div>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsForm initialData={product} />
            </div>
        </div>
    );
};

export default ProductPage;