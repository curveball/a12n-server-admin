import { Dialog } from '@radix-ui/themes';
import { useState } from 'react';
import { UserModalProps, UserModalState } from '../utils/interfaces';
import { ActionButtons } from '../containers/ModalActionButtons';
import { CreateUserModalContent } from '../containers/CreateUserModalContent';

export function CreateUserModal({ onClose }: UserModalProps) {
    const [userState, setUserState] = useState<UserModalState>({
        userName: "",
        email: "",
        password: "",
        autoGeneratePassword: false,
        emailValidated: false,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof UserModalState, string>>>({});

    const handleFieldChange = (field: keyof UserModalState, value: string | boolean) => {
        setUserState((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateFields = () => {
        let newErrors = { userName: '', email: '' };
        let isValid = true;

        if (!userState.userName.trim()) {
            newErrors.userName = 'User name is required';
            isValid = false;
        }

        if (!userState.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userState.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleCreateUser = () => {
        if (!validateFields()) {
            return false;
        }

        // API call to a12n server here

        console.log('User Created:', { userState });
        return true;
    };

    return (
        <Dialog.Root open={ true } onOpenChange={ onClose }>
            <Dialog.Content width='md'>
                <Dialog.Title>
                    Create User
                </Dialog.Title>
                <Dialog.Description>
                    Enter in details below to create a new user                        
                </Dialog.Description>
                <CreateUserModalContent 
                    state={ userState }
                    errors={ errors }
                    onChange={ handleFieldChange }
                />
                <ActionButtons 
                    onCreate={ handleCreateUser } 
                    isValid={ !Object.values(errors).some(err => err) } 
                    onClose={ onClose }
                />
            </Dialog.Content>
        </Dialog.Root>
    );
}
