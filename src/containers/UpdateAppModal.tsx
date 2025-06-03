import { Box, Button, Dialog, Flex, TextField, Text } from '@radix-ui/themes';
import { isValid } from 'zod';
import { useFormValidation } from '../lib';
import { UpdateAppModalSchema, UserAppInitialValues } from '../utils/types/forms';
import { InputField } from '../components';

export function UpdateUserModal({
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
        <Dialog.Root open={true} onOpenChange={onClose}>
            <Dialog.Content width='md'>
                <Dialog.Title>Update App</Dialog.Title>
                <Dialog.Description>Enter in credentials below to update an existing app</Dialog.Description>
                <form onSubmit={handleUpdateApp}>
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
                            <Text
                                as='label'
                                size='2'
                                style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                }}
                            >
                                App URL<span style={{ color: 'red' }}>*</span>
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
                            onClick={handleUpdateApp}
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
