import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
    _req: Request,
    { params }: { params: { braceletId: string } }
) {
    try {
        if (!params.braceletId) return new NextResponse("Bracelet ID is required", { status: 400 });

        const bracelet = await prismadb.bracelet.findUnique({
            where: {
                id: params.braceletId,
            }, 
        });

        return NextResponse.json(bracelet);
    } catch (error) {
        console.log("[BRACELET_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, braceletId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body;
    
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
        if (!name) return new NextResponse("Name is required", { status: 400 });
        if (!value) return new NextResponse("Value is required", { status: 400 });
        if (!params.braceletId) return new NextResponse("Bracelet ID is required", { status: 400 });
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const bracelet = await prismadb.bracelet.updateMany({
            where: {
                id: params.braceletId,
            },
            data: {
                name,
                value
            }       
        });

        return NextResponse.json(bracelet);
    } catch (error) {
        console.log("[BRACELET_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    _req: Request,
    { params }: { params: { storeId: string, braceletId: string } }
) {
    try {
        const { userId } = auth();
    
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
        if (!params.braceletId) return new NextResponse("Bracelet ID is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });
        
        const bracelet = await prismadb.bracelet.deleteMany({
            where: {
                id: params.braceletId,
            }, 
        });

        return NextResponse.json(bracelet);
    } catch (error) {
        console.log("[BRACELET_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};