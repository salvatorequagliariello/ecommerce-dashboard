"use client"

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () => {
    const storeModal = useStoreModal();

    return (
        <Modal title="Create store" description="Add a new store to mangage products and categories." isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
            Create Store Form
        </Modal>
    )
};