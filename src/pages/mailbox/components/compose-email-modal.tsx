import { Dialog, Portal, CloseButton } from "@chakra-ui/react";
import ComposeEmailForm from "./compose-email-form";
import type { Dispatch, SetStateAction } from "react";

const ComposeEmailModal = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title fontWeight="light" fontSize="2xl">New Email</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <ComposeEmailForm callback={() => setOpen(false)} />
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    );
};

export default ComposeEmailModal;