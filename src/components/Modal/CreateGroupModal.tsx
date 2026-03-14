import { Box, Button, Flex, Text } from '@radix-ui/themes';
import { InputField } from '..';
import { useCreateGroupQuery } from '../../api/groups';
import { useAxios, useFormValidation } from '../../hooks';
import { CreateGroupModalSchema } from '../../types/forms';
import Modal from './Modal';

export default function CreateGroupModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const title = 'Create Group';
    const description = 'Enter in details below to create a new group';

    const { formState, errors, handleInputChange, isFormValid } = useFormValidation({
        schema: CreateGroupModalSchema,
    });

    const api = useAxios();
    const mutation = useCreateGroupQuery(api);

    const handleCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) return false;

        const { nickname } = formState;

        try {
            const response = await mutation.mutateAsync({ nickname });
            if (response) {
                console.log('Group Created Successfully', response);
                console.info('Group Created:', { formState });
                onClose();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error creating group:', error);
            return false;
        }
    };

    return (
        <Modal
            data-testid='create-group-modal'
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
                            Group Name<span style={{ color: 'red' }}>*</span>
                        </Text>

                        <InputField
                            name='nickname'
                            size='3'
                            placeholder='Admin Team'
                            radius='large'
                            value={formState.nickname}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                        />
                        {errors.nickname && <Text style={{ color: 'red', fontSize: '12px' }}>{errors.nickname}</Text>}
                    </Box>

                    <Flex gap='3' mt='4' justify='end'>
                        <Button variant='soft' color='gray' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type='submit' onClick={handleCreateGroup} loading={mutation.isPending}>
                            Create Group
                        </Button>
                    </Flex>
                </form>
            </Flex>
        </Modal>
    );
}