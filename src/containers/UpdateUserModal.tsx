import { Box, Button, Dialog, Flex, Text, Checkbox } from '@radix-ui/themes';
import { isValid } from 'zod';
import { useAxios, useFormValidation } from '../lib';
import { UpdateUserModalSchema, UserUpdateInitialValues } from '../utils/types/forms';
import { InputField } from '../components';
import { useUpdateUserQuery } from '../utils/queries/users';

export function UpdateUserModal({
    onClose,
    initialValues,
}: {
    onClose: () => void;
    initialValues: UserUpdateInitialValues;
}) {
    const { formState, errors, handleInputChange, handleCheckboxChange, isFormValid } = useFormValidation({
        schema: UpdateUserModalSchema,
        initialValues,
    });

    const api = useAxios();
    const mutation = useUpdateUserQuery(api);

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) return false;

        const { id } = initialValues;
        const { nickname, active } = formState;

        console.log('User Updated:', { formState });

        try {
            const data = await mutation.mutateAsync({ nickname, id, active });
            console.log('User Updated Successfully', data);
            onClose();
            return true;
        } catch (error) {
            console.error('Error creating user:', error);
            return false;
        }
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
                                name='nickname'
                                size='3'
                                placeholder={initialValues.nickname || 'Clark Kent'}
                                radius='large'
                                value={formState.nickname}
                                onChange={handleInputChange}
                                style={{ width: '100%' }}
                                error={errors.nickname}
                            />
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
                                        color='brown'
                                        checked={formState.active}
                                        onCheckedChange={(checked) => handleCheckboxChange('active', !!checked)}
                                    />
                                    Set user to be active?
                                </Flex>
                            </Text>
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
                            Update
                        </Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
}
