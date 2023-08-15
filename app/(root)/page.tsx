"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Modal } from "@/components/ui/modal";

const SetupPage = () => {
  return (
    <div className="p-4">
      <Modal isOpen={true} onClose={() => {}} title="Test" description="Test Desc">
        Children
      </Modal>
        <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default SetupPage;