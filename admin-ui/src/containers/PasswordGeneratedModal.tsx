import { Dialog, TextField, Button, Tooltip, Flex } from '@radix-ui/themes';
import { useState } from "react";
import { PasswordGeneratedModalProps } from '../utils/types';

export function PasswordGeneratedModal({ password, onClose }: PasswordGeneratedModalProps) {
    const [copied, setCopied] = useState(false);

    if (password === '') onClose();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(password);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };
    
    return (
        <Dialog.Root open={ true } onOpenChange={ onClose }>
            <Dialog.Content width='md'>
                <Dialog.Title>
                    Password Created Successfully!
                </Dialog.Title>
                <Dialog.Description>
                    Save the one time password below:                       
                </Dialog.Description>
                <Flex direction='column' gap='4' style={{ paddingTop: '20px', paddingBottom: '36px' }} justify='start'>

                    <TextField.Root
                        value={password}
                        readOnly
                        radius='large'
                        size='3'
                        style={{ width: '100%' }}
                    >
                        <TextField.Slot side='right'>
                            <Tooltip content={copied ? "Copied!" : "Copy"}>
                                <Button
                                    size='1'
                                    onClick={ handleCopy }
                                    style={{
                                        backgroundColor: 'var(--bronze-11)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Copy
                                </Button>
                            </Tooltip>
                        </TextField.Slot>
                    </TextField.Root>
                </Flex>
                <Flex 
                direction='row' 
                gap='2' 
                width='100%' 
                align='center'
                >
                    <Button
                        variant='soft'
                        radius='large'
                        onClick={ onClose }
                        style={{ 
                            flex: 1, 
                            backgroundColor: '#ab6400', 
                            color: '#fff',
                            height: '40px',
                            borderRadius: '8px'
                        }}>
                        Close
                    </Button>

                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}