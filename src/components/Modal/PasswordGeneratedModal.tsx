import { Button, Flex, TextField, Tooltip } from '@radix-ui/themes';
import { useState } from 'react';
import { Modal } from '.';

export interface PasswordGeneratedModalProps {
    password: string;
    onClose: () => void;
    isOpen: boolean;
}

export default function PasswordGeneratedModal({ password, onClose, isOpen }: PasswordGeneratedModalProps) {
    const [copied, setCopied] = useState(false);

    if (password === '') onClose();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(password);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <Modal
            data-testid='password-generated-modal'
            isOpen={isOpen}
            title='Password Created Successfully!'
            description='Save the one time password below:'
            onClose={onClose}
        >
            <Flex direction='column' gap='4' style={{ paddingTop: '20px', paddingBottom: '36px' }} justify='start'>
                <TextField.Root value={password} readOnly radius='large' size='3' style={{ width: '100%' }}>
                    <TextField.Slot side='right'>
                        <Tooltip content={copied ? 'Copied!' : 'Copy'}>
                            <Button
                                size='1'
                                onClick={handleCopy}
                                className='bg-orange-500 text-white h-10 rounded-lg cursor-pointer'
                            >
                                Copy
                            </Button>
                        </Tooltip>
                    </TextField.Slot>
                </TextField.Root>
            </Flex>
            <Flex direction='row' gap='2' width='100%' align='center'>
                <Button
                    variant='soft'
                    radius='large'
                    color='orange'
                    onClick={onClose}
                    className='text-white rounded-lg'
                >
                    Close
                </Button>
            </Flex>
        </Modal>
    );
}
