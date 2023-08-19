import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { 
            name,
            images,
            price,
            categoryId,
            caseId,
            braceletId,
            movementId,
            description,
            caseDescription,
            features,
            isFeatured,
            isArchived
         } = body;

        if (!userId) return new NextResponse("Unauthenticated.", { status: 401 });
        if (!name) return new NextResponse("Name is required!", { status: 400 });
        if (!images || !images.length) return new NextResponse("Images are required!", { status: 400 })
        if (!price) return new NextResponse("Price is required!", { status: 400 });
        if (!categoryId) return new NextResponse("Category ID is required!", { status: 400 });
        if (!caseId) return new NextResponse("Case ID is required!", { status: 400 });
        if (!braceletId) return new NextResponse("Bracelet ID is required!", { status: 400 });
        if (!movementId) return new NextResponse("Movemenet ID is required!", { status: 400 });
        if (!description) return new NextResponse("Description is required!", { status: 400 });
        if (!caseDescription) return new NextResponse("Case Description is required!", { status: 400 });
        if (!features) return new NextResponse("Features Description is required!", { status: 400 });
        if (!params.storeId) return new NextResponse("Store ID is required!", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                categoryId,
                caseId,
                braceletId,
                movementId,
                description,
                caseDescription,
                features,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log("[PRODUCTS_POST]", error);
        return new NextResponse("Internal error!", {status: 500});
    };
};

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } =  new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const caseId = searchParams.get("caseId") || undefined;
        const braceletId = searchParams.get("braceletId") || undefined;
        const movementId = searchParams.get("movementId") || undefined;
        const isFeatured = searchParams.get("isFeatured");


        if (!params.storeId) return new NextResponse("Store ID is required!", { status: 400 });

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                caseId,
                braceletId,
                movementId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                case: true,
                bracelet: true,
                movement: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(products);
    } catch (error) {
        console.log("[PRODUCTS_GET]", error);
        return new NextResponse("Internal error!", {status: 500});
    };
};