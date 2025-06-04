import { Dialog, Flex } from '@radix-ui/themes';

type ModalProps = {
    isOpen: boolean;
    title?: string;
    description?: string;
    children: React.ReactNode;
    onClose: () => void;
};
const Modal = ({ isOpen, title, description, children, onClose }: ModalProps) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleClose}>
            <Dialog.Content width='md'>
                {title && <Dialog.Title>{title}</Dialog.Title>}
                {description && <Dialog.Description>{description}</Dialog.Description>}

                <Flex direction='column' gap='4' className='pt-5 pb-3' justify='start'>
                    {children}
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default Modal;
