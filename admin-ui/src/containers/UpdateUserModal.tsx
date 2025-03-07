import { Dialog } from '@radix-ui/themes';
import { useState } from 'react';
import { UserModalProps, UserModalState } from '../utils/interfaces';
import { ActionButtons } from '../containers/ModalActionButtons';
import { UpdateUserModalContent } from '../containers/UpdateUserModalContent';

export function UpdateUserModal({ onClose, userData }: UserModalProps) {
    const [userState, setUserState] = useState<UserModalState>({
        userName: userData.nickname,
        email: userData.emailAddress,
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
        let newErrors = { userName: '', email: '', password: '' };
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

        if (!userState.password?.trim()) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else {
            // TODO: validate password here
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleUpdateUser = () => {
        if (!validateFields()) {
            return false;
        }

        // TODO: API call to a12n server here

        console.log('User Updated:', { userState });
        return true;
    };

    return (
        <Dialog.Root open={ true } onOpenChange={ onClose }>
            <Dialog.Content width='md'>
                <Dialog.Title>
                    Update User
                </Dialog.Title>
                <Dialog.Description>
                    Enter in credentials below to update an existing user
                </Dialog.Description>
                <UpdateUserModalContent 
                    state={ userState }
                    errors={ errors }
                    onChange={ handleFieldChange }  
                />
                <ActionButtons 
                    isUpdate={ true } 
                    isValid={ !Object.values(errors).some(err => err) } 
                    onCreate={ handleUpdateUser } 
                    onClose={ onClose }
                />
            </Dialog.Content>
        </Dialog.Root>
    );
}
