import { ReactNode, forwardRef, useImperativeHandle } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import React from "react";

interface ChildComponentProps {
    children?: ReactNode;
    onClose?: () => void;
    modalTitle?: string;
    size?: "sm" | "md" | "lg" | "xl";
    backdrop?: "opaque" | "blur" | "transparent";
}

interface ChildComponentHandles {
    onOpen: () => void;
    onClose: () => void;
}

// eslint-disable-next-line react/display-name
const NextModal = forwardRef<ChildComponentHandles, ChildComponentProps>(({ children, modalTitle = "", size = "md", backdrop = "opaque" }, ref) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    useImperativeHandle(ref, () => ({
        onOpen,
        onClose,
    }));

    return (
        <Modal
            backdrop={backdrop}
            size={size}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
            }}
        >
            <ModalContent>
                {() => (
                    <React.Fragment>
                        <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
                        <ModalBody>{children}</ModalBody>
                    </React.Fragment>
                )}
            </ModalContent>
        </Modal>
    );
});

export default NextModal;
