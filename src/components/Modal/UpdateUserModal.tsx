import { Box, Button, Checkbox, Flex, Text } from '@radix-ui/themes';
import { isValid } from 'zod';
import { Modal } from '.';
import { InputField } from '..';
import { useAxios, useFormValidation } from '../../lib';
import { useUpdateUserQuery } from '../../utils/queries/users';
import { UpdateUserModalSchema, UserUpdateInitialValues } from '../../utils/types/forms';

export default function UpdateUserModal({
    isOpen,
    onClose,
    initialValues,
}: {
    isOpen: boolean;
    onClose: () => void;
    initialValues: UserUpdateInitialValues;
}) {
    const title = 'Update User';
    const description = 'Enter in credentials below to update an existing user';

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
        <Modal
            data-testid='update-user-modal'
            isOpen={isOpen}
            title={title}
            description={description}
            onClose={onClose}
        >
            <form onSubmit={handleUpdateUser}>
                <Flex direction='column' gap='4' className='pt-5 pb-9' justify='start'>
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
                        className='bg-brown-500 text-white min-w-20 pr-4 h-10 rounded-lg'
                    >
                        Cancel
                    </Button>

                    <Button
                        type='submit'
                        variant='soft'
                        radius='large'
                        onClick={handleUpdateUser}
                        disabled={!isValid}
                        className='flex-1 bg-orange-500 text-white h-10 rounded-lg'
                    >
                        Update
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
}
