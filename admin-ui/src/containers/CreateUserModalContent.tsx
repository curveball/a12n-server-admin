import { Box, Flex, Text, TextField, Checkbox } from '@radix-ui/themes';
import { UserModalContentProps } from '../utils/interfaces';

export function CreateUserModalContent({ 
    state,
    errors,
    onChange
}: UserModalContentProps) {
return (
    <Flex direction='column' gap='4' style={{ paddingTop: '20px', paddingBottom: '36px' }} justify='start'>
        <Box>
            <Text 
                as='label' 
                size='2'
                style={{ 
                    display: 'block', 
                    marginBottom: '8px'
                }}
            >
                User Name<span style={{ color: 'red' }}>*</span>
            </Text>

            <TextField.Root 
                size='3' 
                placeholder='Clark Kent' 
                radius='large'
                value={ state.userName }
                onChange={ (e) => onChange("userName", e.target.value) }
                style={{ width: '100%' }} 
            />
            {errors.userName && <Text style={{ color: 'red', fontSize: '12px' }}>{ errors.userName }</Text>}
        </Box>
        
        <Box style={{ paddingBottom: '8px' }}>
            <Text 
                as='label' 
                size='2' 
                style={{ 
                    display: 'block', 
                    marginBottom: '8px' 
                }}
            >
                Email address<span style={{ color: 'red' }}>*</span>
            </Text>

            <TextField.Root 
                size='3' 
                placeholder='clark.kent@superman.com' 
                radius='large'
                value={state.email}
                onChange={(e) => onChange("email", e.target.value)}
                style={{ width: '100%' }} 
            />
            {errors.email && <Text style={{ color: 'red', fontSize: '12px' }}>{ errors.email }</Text>}
        </Box>

        <Flex direction='row' gap='3' justify='start'>
            <Box 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px' 
                }}
            >
                <Text as='label' size='2'>
                    <Flex gap='2'>
                        <Checkbox 
                            color='brown'
                            checked={ state.autoGeneratePassword }
                            onCheckedChange={ (checked) => onChange("autoGeneratePassword", !!checked) }
                        />
                        Auto-generate password?
                    </Flex>
                </Text>
            </Box>

            <Box 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px' 
                }}
            >
                <Text as='label' size='2'>
                    <Flex gap='2'>
                        <Checkbox 
                            color='brown'
                            checked={ state.emailValidated }
                            onCheckedChange={ (checked) => onChange("emailValidated", !!checked) }
                        />
                        Mark email as validated?
                    </Flex>
                </Text>
            </Box>
        </Flex>
    </Flex> 
    );
}