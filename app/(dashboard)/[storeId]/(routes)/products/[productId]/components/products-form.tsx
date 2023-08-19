"use client";

import { Bracelet, Case, Category, Image, Movement, Product } from "@prisma/client";
import React, { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

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
    categories: Category[];
    cases: Case[];
    bracelets: Bracelet[];
    movements: Movement[];
};

export const ProductsForm: React.FC<ProductsFormProps> = ({
    initialData,
    categories,
    cases,
    bracelets,
    movements
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
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/products`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/products`)
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
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success("Product deleted!");
        } catch (error) {
            toast.error("Something went wrong.")
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
                            name="images" 
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <ImageUpload 
                                        value={field.value.map((image => image.url))}
                                        disabled={loading}
                                        onChange={(url) => field.onChange([...field.value, { url }])}
                                        onRemove={(url) => field.onChange([...field.value.filter((current => current.url !== url))])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                        control={form.control} 
                        name="name" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Product name" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control} 
                        name="price" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" disabled={loading} placeholder="Product price" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control} 
                        name="categoryId" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map(category => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control} 
                        name="caseId" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Case</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue  defaultValue={field.value} placeholder="Select a case" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {cases.map(watchCase => (
                                            <SelectItem key={watchCase.id} value={watchCase.id}>
                                                {watchCase.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control} 
                        name="braceletId" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Bracelet</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue  defaultValue={field.value} placeholder="Select a bracelet" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {bracelets.map(bracelet => (
                                            <SelectItem key={bracelet.id} value={bracelet.id}>
                                                {bracelet.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control} 
                        name="movementId" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Movement type</FormLabel>
                                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue  defaultValue={field.value} placeholder="Select a movement type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {movements.map(movemenet => (
                                            <SelectItem key={movemenet.id} value={movemenet.id}>
                                                {movemenet.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control} 
                        name="isFeatured" 
                        render={({field}) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Featured
                                    </FormLabel>
                                    <FormDescription>
                                        This product will appear on the homepage.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control} 
                        name="isArchived" 
                        render={({field}) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Archiveed
                                    </FormLabel>
                                    <FormDescription>
                                        This product will not appear anywhere in the store.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                        />
                    </div>
                        <FormField 
                        control={form.control} 
                        name="description" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Product description</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} placeholder="Enter a description..." {...field} className="resize-none h-[200px]"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control} 
                        name="caseDescription" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Case description</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} placeholder="Enter a description..." {...field} className="resize-none h-[200px]"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control} 
                        name="features" 
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Product features</FormLabel>
                                <FormControl>
                                    <Textarea disabled={loading} placeholder="Enter a description..." {...field} className="resize-none h-[200px]"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button disabled={loading} className="ml-auto" type="submit">{action}</Button>
                </form>
            </Form>
        </>
    );
};