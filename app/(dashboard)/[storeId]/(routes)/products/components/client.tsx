"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductsColumns, columns } from "./columns";
import { ProductsDataTable } from "@/components/ui/products-data-table";
import { ApiList } from "@/components/ui/api-list";

interface ProductsClientProps {
    data: ProductsColumns[]
}

export const ProductsClient: React.FC<ProductsClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex flex-col gap-y-4 min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-between">
                <Heading 
                title={`Products (${data.length})`}
                description="Manage products for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <ProductsDataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Products"  />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    )
};