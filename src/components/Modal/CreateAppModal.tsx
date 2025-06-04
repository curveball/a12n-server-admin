import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { isValid } from 'zod';
import { Modal } from '.';
import { InputField } from '..';
import { useFormValidation } from '../../lib';
import { CreateAppModalSchema } from '../../utils/types/forms';

export default function CreateAppModal({ onClose, isOpen }: { onClose: () => void; isOpen: boolean }) {
    const title = 'Create App';
    const description = 'Enter in details below to create a new app';

    const { formState, errors, handleInputChange, isFormValid } = useFormValidation({
        schema: CreateAppModalSchema,
    });

    const handleCreateApp = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) return false;

        // TODO: API call to a12n server here

        console.log('App Created:', { formState });
    };

    return (
        <Modal data-testid='create-app-modal' isOpen={isOpen} title={title} description={description} onClose={onClose}>
            <Flex direction='column' gap='4' className='pt-5 pb-3' justify='start'>
                <form>
                    <Box>
                        <Text as='label' size='2' className='block mb-2 font-semibold'>
                            App Name<span style={{ color: 'red' }}>*</span>
                        </Text>

                        <InputField
                            name='appName'
                            size='3'
                            placeholder='My App'
                            radius='large'
                            value={formState.appName}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                        {errors.appName && <Text className='text-red-500 text-sm'>{errors.appName}</Text>}
                    </Box>

                    <Box className='mt-2 pb-2'>
                        <Text as='label' size='2' className='block mb-2 font-semibold'>
                            App URL<span className='text-red-500'>*</span>
                        </Text>

                        <InputField
                            name='appURL'
                            size='3'
                            placeholder='http://my-app.com'
                            radius='large'
                            value={formState.appURL}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                        {errors.appURL && <Text className='text-red-500 text-sm'>{errors.appURL}</Text>}
                    </Box>

                    <Flex direction='row' gap='2' width='100%' align='center' className='mt-5'>
                        <Button
                            data-testid='cancel-create-app'
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
                            color='orange'
                            radius='large'
                            onClick={handleCreateApp}
                            disabled={!isValid}
                            className='flex-1 bg-orange-500 text-white h-10 rounded-lg'
                        >
                            Create
                        </Button>
                    </Flex>
                </form>
            </Flex>
        </Modal>
    );
}
