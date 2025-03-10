import { Box, Button, Dialog, Flex, TextField, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { isValid } from 'zod';
import { useFormValidation } from '../lib';
import { UpdateUserModalSchema, UserUpdateInitialValues } from '../utils/types/forms';
import { InputField } from '../components';

export function UpdateUserModal({
    onClose,
    initialValues,
}: {
    onClose: () => void;
    initialValues: UserUpdateInitialValues;
}) {
    const { formState, errors, handleInputChange, isFormValid } = useFormValidation({
        schema: UpdateUserModalSchema,
        initialValues,
    });
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleUpdateUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) return false;

        // TODO: API call to a12n server here

        console.log('User Updated:', { formState });
    };

    return (
        <Dialog.Root open={true} onOpenChange={onClose}>
            <Dialog.Content width='md'>
                <Dialog.Title>Update User</Dialog.Title>
                <Dialog.Description>Enter in credentials below to update an existing user</Dialog.Description>
                <form onSubmit={handleUpdateUser}>
                    <Flex
                        direction='column'
                        gap='4'
                        style={{ paddingTop: '20px', paddingBottom: '36px' }}
                        justify='start'
                    >
                        <Box>
                            <Text
                                as='label'
                                size='2'
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                }}
                            >
                                User Name<span style={{ color: 'red' }}>*</span>
                            </Text>

                            <InputField
                                name='userName'
                                size='3'
                                placeholder={formState.userName || 'Clark Kent'}
                                radius='large'
                                value={formState.userName}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                                error={errors.userName}
                            />
                        </Box>

                        <Box>
                            <Text
                                as='label'
                                size='2'
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                }}
                            >
                                Email address<span style={{ color: 'red' }}>*</span>
                            </Text>

                            <InputField
                                name='email'
                                size='3'
                                placeholder={formState.email || 'clark.kent@superman.com'}
                                radius='large'
                                value={formState.email}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                                error={errors.email}
                            />
                        </Box>

                        <Box>
                            <Text
                                as='label'
                                size='2'
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    textAlign: 'left',
                                }}
                            >
                                Password<span style={{ color: 'red' }}>*</span>
                            </Text>

                            <InputField
                                name='password'
                                type={passwordVisible ? 'text' : 'password'}
                                size='3'
                                radius='large'
                                value={formState.password}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                                error={errors.password}
                            >
                                <TextField.Slot side='right'>
                                    <Button
                                        size='1'
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        style={{
                                            backgroundColor: 'var(--bronze-11)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Show
                                    </Button>
                                </TextField.Slot>
                            </InputField>
                        </Box>
                    </Flex>
                    <Flex direction='row' gap='2' width='100%' align='center'>
                        <Button
                            variant='soft'
                            radius='large'
                            onClick={onClose}
                            style={{
                                backgroundColor: '#43302b',
                                color: '#fff',
                                minWidth: '80px',
                                paddingRight: '16px',
                                height: '40px',
                                borderRadius: '8px',
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            type='submit'
                            variant='soft'
                            radius='large'
                            onClick={handleUpdateUser}
                            disabled={!isValid}
                            style={{
                                flex: 1,
                                backgroundColor: '#ab6400',
                                color: '#fff',
                                height: '40px',
                                borderRadius: '8px',
                            }}
                        >
                            Create
                        </Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
}
