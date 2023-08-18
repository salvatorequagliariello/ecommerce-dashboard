import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
    _req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        if (!params.productId) return new NextResponse("Product ID is required", { status: 400 });

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true,
                category: true,
                case: true,
                bracelet: true,
                movement: true,
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log("[PRODUCT_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, productId: string } }
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
        if (!params.productId) return new NextResponse("Product ID is required!", { status: 400 });
        
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        await prismadb.product.update({
            where: {
                id: params.productId,
            },
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
                    deleteMany: {}
                }
            } 
        });

        const product = await prismadb.product.update({
            where: {
                id: params.productId,    
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product);
    } catch (error) {
        console.log("[PRODUCT_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    _req: Request,
    { params }: { params: { storeId: string, productId: string } }
) {
    try {
        const { userId } = auth();
    
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
        if (!params.productId) return new NextResponse("Product ID is required", { status: 400 });

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });
        
        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId,
            }, 
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log("[PRODUCT_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
};