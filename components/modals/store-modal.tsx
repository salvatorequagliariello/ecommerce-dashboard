"use client"

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const formSchema = zod.object({
    name: zod.string().min(1),
})

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    return (
        <Modal title="Create store" description="Add a new store to mangage products and categories." isOpen={storeModal.isOpen} onClose={storeModal.onClose}> 
        </Modal>
    )
};