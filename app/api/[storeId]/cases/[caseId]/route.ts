import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
    _req: Request,
    { params }: { params: { caseId: string } }
) {
    try {
        if (!params.caseId) return new NextResponse("Case ID is required", { status: 400 });

        const watchCase = await prismadb.case.findUnique({
            where: {
                id: params.caseId,
            }, 
        });

        return NextResponse.json(watchCase);
    } catch (error) {
        console.log("[CASE_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, caseId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body;
    
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
        if (!name) return new NextResponse("Name is required", { status: 400 });
        if (!value) return new NextResponse("Value is required", { status: 400 });
        if (!params.caseId) return new NextResponse("Billboard ID is required", { status: 400 });
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const watchCase = await prismadb.case.updateMany({
            where: {
                id: params.caseId,
            },
            data: {
                name,
                value
            }       
        });

        return NextResponse.json(watchCase);
    } catch (error) {
        console.log("[CASE_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    _req: Request,
    { params }: { params: { storeId: string, caseId: string } }
) {
    try {
        const { userId } = auth();
    
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
        if (!params.caseId) return new NextResponse("Case ID is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });
        
        const watchCase = await prismadb.case.deleteMany({
            where: {
                id: params.caseId,
            }, 
        });

        return NextResponse.json(watchCase);
    } catch (error) {
        console.log("[CASE_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};