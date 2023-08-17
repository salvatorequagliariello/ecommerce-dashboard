"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CasesColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CasesClientProps {
    data: CasesColumn[]
}

export const CasesClient: React.FC<CasesClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                title={`Cases (${data.length})`}
                description="Manage cases for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/cases/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Cases"  />
            <Separator />
            <ApiList entityName="cases" entityIdName="caseId" />
        </>
    )
};