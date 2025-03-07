import { Flex, Button, Dialog } from '@radix-ui/themes';
import { ActionButtonsProps } from '../utils/interfaces';

export function ActionButtons({ isUpdate = false, isValid, onCreate, onClose }: ActionButtonsProps) {
    return (
        <Flex 
            direction='row' 
            gap='2' 
            width='100%' 
            align='center'
            >
            <Dialog.Close>
                <Button 
                    variant='soft'
                    radius='large'
                    onClick={ onClose }
                    style={{ 
                        backgroundColor: '#43302b', 
                        color: '#fff', 
                        minWidth: '80px',
                        paddingRight: '16px',
                        height: '40px',
                        borderRadius: '8px'
                    }}
                >
                    Cancel
                </Button>
            </Dialog.Close>
    
            <Button
                variant='soft'
                radius='large'
                onClick={() => {
                    const success = onCreate();
                    if (success) onClose();
                }}
                disabled={!isValid}
                style={{ 
                    flex: 1, 
                    backgroundColor: '#ab6400', 
                    color: '#fff',
                    height: '40px',
                    borderRadius: '8px'
                }}
            >
                {isUpdate ? 'Update' : 'Create'}
            </Button>
        </Flex>
    );
}