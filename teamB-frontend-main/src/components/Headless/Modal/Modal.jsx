import { HeadlessModal } from "./HeadlessModal";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button } from "../Button/Button";
function Modal({
    modalContent,
    modalTitle,
    modalClassName,
    modalButtonLabel,
    modalButtonClassName,
    modalPanelClassName,
    modalTitleClassName,
}) {

    return (
        <HeadlessModal
            modalTitle={modalTitle}
            modalContent={modalContent}
        >
            {({ show, showModal, hideModal, modalTitle, modalContent }) => (
                <>
                    <Button onClick={showModal}
                        label={modalButtonLabel}
                        className={modalButtonClassName}
                    />
                    <Dialog open={show} as="div" className={modalClassName} onClose={hideModal}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4">
                                <DialogPanel
                                    transition
                                    className={modalPanelClassName}
                                >
                                    <DialogTitle as="h1" className={modalTitleClassName}>
                                       {modalTitle}
                                    </DialogTitle>
                                    {modalContent}
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
                </>
            )}
        </HeadlessModal>
    );


}



export { Modal };
