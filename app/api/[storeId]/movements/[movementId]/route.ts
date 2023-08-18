import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
    _req: Request,
    { params }: { params: { movementId: string } }
) {
    try {
        if (!params.movementId) return new NextResponse("Movement ID is required", { status: 400 });

        const movement = await prismadb.movement.findUnique({
            where: {
                id: params.movementId,
            }, 
        });

        return NextResponse.json(movement);
    } catch (error) {
        console.log("[MOVEMENT_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, movementId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { name, value } = body;
    
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
        if (!name) return new NextResponse("Name is required", { status: 400 });
        if (!value) return new NextResponse("Value is required", { status: 400 });
        if (!params.movementId) return new NextResponse("Movement ID is required", { status: 400 });
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const movement = await prismadb.movement.updateMany({
            where: {
                id: params.movementId,
            },
            data: {
                name,
                value
            }       
        });

        return NextResponse.json(movement);
    } catch (error) {
        console.log("[MOVEMENT_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    _req: Request,
    { params }: { params: { storeId: string, movementId: string } }
) {
    try {
        const { userId } = auth();
    
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
        if (!params.movementId) return new NextResponse("Movement ID is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });
        
        const movement = await prismadb.movement.deleteMany({
            where: {
                id: params.movementId,
            }, 
        });

        return NextResponse.json(movement);
    } catch (error) {
        console.log("[MOVEMENT_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};