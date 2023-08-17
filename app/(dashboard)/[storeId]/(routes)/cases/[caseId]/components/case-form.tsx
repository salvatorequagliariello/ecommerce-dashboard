"use client";

import { Billboard, Case } from "@prisma/client";
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
    value: zod.string().min(1),
});

type CaseFormValues = zod.infer<typeof formSchema>;

interface CaseFormProps {
    initialData: Case | null;
};

export const CaseForm: React.FC<CaseFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const origin = useOrigin();

    const title = initialData ? "Edit case" : "Create case";
    const description = initialData ? "Edit case" : "Add a new case";
    const toastMessage = initialData ? "Case updated." : "Case created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CaseFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    });

    const onSubmit = async (data: CaseFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/cases/${params.caseId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/cases`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/cases`)
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
            await axios.delete(`/api/${params.storeId}/cases/${params.caseId}`);
            router.refresh();
            router.push(`/${params.storeId}/cases`);
            toast.success("Case deleted!");
        } catch (error) {
            toast.error("Make sure you removed all products using this case first.")
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
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                        control={form.control} 
                        name="name" 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Case name" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control} 
                        name="value" 
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Case type" {...field}/>
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