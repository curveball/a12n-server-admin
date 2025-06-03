import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { isValid } from 'zod';
import { Modal } from '.';
import { InputField } from '..';
import { useFormValidation } from '../../lib';
import { UpdateAppModalSchema, UserAppInitialValues } from '../../utils/types/forms';

export default function UpdateUserModal({
    onClose,
    initialValues,
}: {
    onClose: () => void;
    initialValues: UserAppInitialValues;
}) {
    const { formState, errors, handleInputChange, isFormValid } = useFormValidation({
        schema: UpdateAppModalSchema,
        initialValues,
    });

    const handleUpdateApp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) return false;

        // TODO: API call to a12n server here

        console.log('App Updated:', { formState });
    };

    return (
        <Modal
            data-testid='update-app-modal'
            isOpen={true}
            title='Update App'
            description='Enter in credentials below to update an existing app'
            onClose={onClose}
        >
            <form onSubmit={handleUpdateApp}>
                <Flex direction='column' gap='4' className='pt-5 pb-9' justify='start'>
                    <Box>
                        <Text as='label' size='2' className='block mb-2 font-semibold'>
                            App Name<span style={{ color: 'red' }}>*</span>
                        </Text>

                        <InputField
                            name='appName'
                            size='3'
                            placeholder={formState.appName || 'My App'}
                            radius='large'
                            value={formState.appName}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            error={errors.appName}
                        />
                    </Box>

                    <Box>
                        <Text as='label' size='2' className='block mb-2 font-semibold'>
                            App URL<span className='text-red-500'>*</span>
                        </Text>

                        <InputField
                            name='email'
                            size='3'
                            placeholder={formState.appURL || 'https://my-app.com'}
                            radius='large'
                            value={formState.appURL}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            error={errors.appURL}
                        />
                    </Box>
                </Flex>
                <Flex direction='row' gap='2' width='100%' align='center'>
                    <Button
                        variant='outline'
                        color='red'
                        radius='large'
                        onClick={onClose}
                        className='bg-gray-800 text-white min-w-20 pr-4 h-10 rounded-lg'
                    >
                        Cancel
                    </Button>

                    <Button
                        variant='soft'
                        color='orange'
                        type='submit'
                        radius='large'
                        onClick={handleUpdateApp}
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
