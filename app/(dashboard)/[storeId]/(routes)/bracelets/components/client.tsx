"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BraceletsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BraceletsClientProps {
    data: BraceletsColumn[]
}

export const BraceletsClient: React.FC<BraceletsClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex flex-col gap-y-4 min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-between">
                <Heading 
                title={`Bracelets (${data.length})`}
                description="Manage bracelets for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/bracelets/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Bracelets"  />
            <Separator />
            <ApiList entityName="bracelets" entityIdName="braceletId" />
        </>
    )
};