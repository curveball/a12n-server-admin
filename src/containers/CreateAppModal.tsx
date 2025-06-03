import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { useFormValidation } from '../lib';
import { CreateAppModalSchema } from '../utils/types/forms';
import { InputField } from '../components';
import { isValid } from 'zod';

export function CreateAppModal({ onClose }: { onClose: () => void }) {
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
        <Dialog.Root open={true} onOpenChange={onClose}>
            <Dialog.Content width='md'>
                <Dialog.Title>Create App</Dialog.Title>
                <Dialog.Description>Enter in details below to create a new app</Dialog.Description>
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
                            {errors.appName && <Text style={{ color: 'red', fontSize: '12px' }}>{errors.appName}</Text>}
                        </Box>

                        <Box style={{ marginTop: '10px', paddingBottom: '8px' }}>
                            <Text
                                as='label'
                                size='2'
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                }}
                            >
                                App URL<span style={{ color: 'red' }}>*</span>
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
                            {errors.appURL && <Text style={{ color: 'red', fontSize: '12px' }}>{errors.appURL}</Text>}
                        </Box>

                        <Flex direction='row' gap='2' width='100%' align='center' style={{ marginTop: '20px' }}>
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
                                onClick={handleCreateApp}
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
