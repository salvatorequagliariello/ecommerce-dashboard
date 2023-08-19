"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrdersColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrdersClientProps {
    data: OrdersColumn[]
}

export const OrdersClient: React.FC<OrdersClientProps> = ({
    data
}) => {

    return (
        <>
            <Heading 
            title={`Orders (${data.length})`}
            description="Manage orders for your store"
            />
            <Separator />
            <DataTable searchKey="products" columns={columns} data={data} />
        </>
    )
};