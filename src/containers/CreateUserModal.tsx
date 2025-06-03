import { Box, Button, Checkbox, Dialog, Flex, Text } from '@radix-ui/themes';
import { useAxios, useFormValidation } from '../lib';
import { CreateUserModalSchema } from '../utils/types/forms';
import { InputField } from '../components';
import { isValid } from 'zod';
import { useCreateUserQuery } from '../utils/queries/users';
import { Resource, User } from '../utils/types';

export function CreateUserModal({
    onPasswordGenerated,
    onClose,
}: {
    onClose: () => void;
    onPasswordGenerated: (pass: string) => void;
}) {
    const { formState, errors, handleInputChange, handleCheckboxChange, isFormValid } = useFormValidation({
        schema: CreateUserModalSchema,
    });

    const api = useAxios();
    const mutation = useCreateUserQuery(api);

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) return false;

        const { nickname: nickname, email } = formState;
        const markEmailValid = String(formState.autoValidateEmail);
        const autoGeneratePassword = String(formState.autoGeneratePassword);

        try {
            console.log(markEmailValid);
            const response = await mutation.mutateAsync({ nickname, email, markEmailValid, autoGeneratePassword });
            if (response) {
                const password = (response as Resource<User>).password;
                console.log('User Created Successfully', password);
                if (password) {
                    onPasswordGenerated(password);
                }
                console.log('User Created:', { formState });
                onClose();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error creating user:', error);
            return false;
        }
    };

    return (
        <Dialog.Root open={true} onOpenChange={onClose}>
            <Dialog.Content width='md'>
                <Dialog.Title>Create User</Dialog.Title>
                <Dialog.Description>Enter in details below to create a new user</Dialog.Description>
                <Flex direction='column' gap='4' style={{ paddingTop: '20px', paddingBottom: '15px' }} justify='start'>
                    <form>
                        <Box>
                            <Text
                                as='label'
                                size='2'
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                }}
                            >
                                User Name<span style={{ color: 'red' }}>*</span>
                            </Text>

                            <InputField
                                name='nickname'
                                size='3'
                                placeholder='Clark Kent'
                                radius='large'
                                value={formState.nickname}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                            {errors.nickname && (
                                <Text style={{ color: 'red', fontSize: '12px' }}>{errors.nickname}</Text>
                            )}
                        </Box>

                        <Box style={{ marginTop: '20px', paddingBottom: '8px' }}>
                            <Text
                                as='label'
                                size='2'
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                }}
                            >
                                Email address<span style={{ color: 'red' }}>*</span>
                            </Text>

                            <InputField
                                name='email'
                                size='3'
                                placeholder='clark.kent@superman.com'
                                radius='large'
                                value={formState.email}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                            />
                            {errors.email && <Text style={{ color: 'red', fontSize: '12px' }}>{errors.email}</Text>}
                        </Box>

                        <Flex direction='row' gap='3' justify='start' style={{ marginTop: '20px' }}>
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <Text as='label' size='2'>
                                    <Flex gap='2'>
                                        <Checkbox
                                            name='autoGeneratePassword'
                                            color='brown'
                                            checked={formState.autoGeneratePassword}
                                            onCheckedChange={(checked) =>
                                                handleCheckboxChange('autoGeneratePassword', !!checked)
                                            }
                                        />
                                        Auto-generate password?
                                    </Flex>
                                </Text>
                            </Box>

                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <Text as='label' size='2'>
                                    <Flex gap='2'>
                                        <Checkbox
                                            name='autoValidateEmail'
                                            color='brown'
                                            checked={formState.autoValidateEmail}
                                            onCheckedChange={(checked) =>
                                                handleCheckboxChange('autoValidateEmail', !!checked)
                                            }
                                        />
                                        Mark email as validated?
                                    </Flex>
                                </Text>
                            </Box>
                        </Flex>
                        <Flex direction='row' gap='2' width='100%' align='center' style={{ marginTop: '36px' }}>
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
                                onClick={handleCreateUser}
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
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
