import { Box, Flex, Text, TextField, Button } from '@radix-ui/themes';
import { useState } from 'react';
import { UserModalContentProps } from '../utils/interfaces';

export function UpdateUserModalContent({ 
    state,
    errors,
    onChange
}: UserModalContentProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
                    placeholder={ state.userName || 'Clark Kent' }
                    radius='large'
                    value={ state.userName } 
                    onChange={ (e) => onChange("userName", e.target.value) }
                    style={{ width: '100%' }} 
                />
                {errors.userName && <Text style={{ color: 'red', fontSize: '12px' }}>{ errors.userName }</Text>}
            </Box>
            
            <Box>
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
                    placeholder={ state.email || 'clark.kent@superman.com' } 
                    radius='large'
                    value={ state.email } 
                    onChange={ (e) => onChange("email", e.target.value) }
                    style={{ width: '100%' }} 
                />
                {errors.email && <Text style={{ color: 'red', fontSize: '12px' }}>{ errors.email }</Text>}
            </Box>

            <Box>
                <Text 
                    as='label' 
                    size='2' 
                    style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        textAlign: 'left' 
                    }}
                >
                    Password<span style={{ color: 'red' }}>*</span>
                </Text>

                <TextField.Root
                    type={ isPasswordVisible ? 'text' : 'password' }
                    size='3'
                    placeholder='••••••••••••••••••••••••••••••'
                    radius='large'
                    value={ state.password } 
                    onChange={ (e) => onChange("password", e.target.value) }
                    style={{ width: '100%' }}
                >
                {errors.password && <Text style={{ color: 'red', fontSize: '12px' }}>{ errors.password }</Text>}
                    <TextField.Slot side='right'>
                        <Button
                            size='1'
                            onClick={ () => setIsPasswordVisible(!isPasswordVisible) }
                            style={{
                                backgroundColor: 'var(--bronze-11)',
                                cursor: 'pointer',
                            }}
                        >
                            Show
                        </Button>
                    </TextField.Slot>
                </TextField.Root>
            </Box>
        </Flex> 
    );
}