"use client";

import { Image, Product } from "@prisma/client";
import React, { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = zod.object({
    name: zod.string().min(1),
    images: zod.object({ url: zod.string() }).array(),
    price: zod.coerce.number().min(1),
    categoryId: zod.string().min(1),
    caseId: zod.string().min(1),
    braceletId: zod.string().min(1),
    movementId: zod.string().min(1),
    description: zod.string().min(1),
    caseDescription: zod.string().min(1),
    features: zod.string().min(1),
    isFeatured: zod.boolean().default(false).optional(),
    isArchived: zod.boolean().default(false).optional(),
});

type ProductsFormValues = zod.infer<typeof formSchema>;

interface ProductsFormProps {
    initialData: Product & {
        images: Image[]
    } | null;
};

export const ProductsForm: React.FC<ProductsFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const origin = useOrigin();

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit product" : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ProductsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues : initialData ? {
            ...initialData,
            price: parseFloat(String(initialData?.price)),
        } : {
            name: "",
            images: [],
            price: 0,
            categoryId: "",
            caseId: "",
            braceletId: "",
            movementId: "",
            description: "",
            caseDescription: "",
            features: "",
            isFeatured: false,
            isArchived: false
        }
    });

    const onSubmit = async (data: ProductsFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/billboards`)
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            toast.success("Billboard deleted!");
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first.")
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
        <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData &&(
                    <Button variant="destructive" size="icon" onClick={() => setOpen(true)} disabled={loading}>
                        <Trash className="h-4 w-4"  />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField 
                            control={form.control} 
                            name="imageUrl" 
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Background Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload 
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                        control={form.control} 
                        name="label" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Billboard Label" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">{action}</Button>
                </form>
            </Form>
        </>
    );
};