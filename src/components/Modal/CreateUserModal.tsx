import { Box, Button, Checkbox, Flex, Text } from '@radix-ui/themes';
import { isValid } from 'zod';
import { InputField } from '..';
import { useAxios, useFormValidation } from '../../lib';
import { useCreateUserQuery } from '../../utils/queries/users';
import { Resource, User } from '../../utils/types';
import { CreateUserModalSchema } from '../../utils/types/forms';
import Modal from './Modal';

export default function CreateUserModal({
    isOpen,
    onPasswordGenerated,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
    onPasswordGenerated: (pass: string) => void;
}) {
    const title = 'Create User';
    const description = 'Enter in details below to create a new user';

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
        <Modal
            data-testid='create-user-modal'
            title={title}
            description={description}
            onClose={onClose}
            isOpen={isOpen}
        >
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
                        {errors.nickname && <Text style={{ color: 'red', fontSize: '12px' }}>{errors.nickname}</Text>}
                    </Box>

                    <Box style={{ marginTop: '20px', paddingBottom: '8px' }}>
                        <Text as='label' size='2' className='block mb-2 font-semibold'>
                            Email address<span className='text-red-500'>*</span>
                        </Text>

                        <InputField
                            name='email'
                            size='3'
                            placeholder='clark.kent@superman.com'
                            radius='large'
                            value={formState.email}
                            onChange={handleInputChange}
                            className='w-full'
                        />
                        {errors.email && <Text style={{ color: 'red', fontSize: '12px' }}>{errors.email}</Text>}
                    </Box>

                    <Flex direction='row' gap='3' justify='start' className='mt-5'>
                        <Box className='flex items-center gap-2'>
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

                        <Box className='flex items-center gap-2'>
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
                            variant='outline'
                            color='brown'
                            radius='large'
                            onClick={onClose}
                            className='text-white min-w-20 pr-4 h-10 rounded-lg'
                        >
                            Cancel
                        </Button>

                        <Button
                            type='submit'
                            color='amber'
                            radius='large'
                            onClick={handleCreateUser}
                            disabled={!isValid}
                            className='flex-1 bg-amber-500 text-white h-10 rounded-lg'
                        >
                            Create
                        </Button>
                    </Flex>
                </form>
            </Flex>
        </Modal>
    );
}
