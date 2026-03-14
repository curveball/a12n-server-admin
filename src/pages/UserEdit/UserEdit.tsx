import { Box, Heading, Text, Separator, Button, Flex, Checkbox, Grid } from '@radix-ui/themes';
import { isValid } from 'zod';
import { InputField } from '../../components';
import { useUpdateUserQuery, useGetUserQuery } from '../../api';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios, useFormValidation } from '../../hooks';
import { UpdateUserModalSchema } from '../../types';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../api/query-keys';
import { CLIENT_ROUTES } from '../../routes';

const UserEdit = () => {
    const { id } = useParams<{ id: string }>();
    const api = useAxios();

    const { data, isLoading, error } = useGetUserQuery(id as string);
    const mutation = useUpdateUserQuery(api);
    const queryClient = useQueryClient();

    const { formState, setFormState, errors, handleInputChange, handleCheckboxChange, isFormValid } = useFormValidation(
        {
            schema: UpdateUserModalSchema,
        },
    );

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id as string) });
            setFormState({
                nickname: data.nickname || '',
                active: !!data.active,
                name: data.name || undefined,
                locale: data.locale || undefined,
                givenName: data.givenName || undefined,
                middleName: data.middleName || undefined,
                familyName: data.familyName || undefined,
                birthdate: data.birthdate || undefined,
                address: data.address || undefined,
                zoneinfo: data.zoneinfo || undefined,
            });
        }
    }, [data, isLoading]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleUpdateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid()) return false;
        try {
            const result = await mutation.mutateAsync({ id: id as string, userData: formState });
            console.log('User Updated Successfully', data);
            return true;
        } catch (error) {
            console.error('Error updating user:', error);
            return false;
        }
    };

    // Add this function to your component

    return (
        <div>
            <Box>
                <Heading size='6'>{data?.nickname}</Heading>
                <Text>View and edit user details below</Text>
            </Box>

            <Separator my='4' size='4' />

            <Flex direction='column' gap='4' style={{ paddingTop: '20px', paddingBottom: '36px' }} justify='start'>
                <Grid columns={{ initial: '1', md: '2', lg: '3' }} gap='4'>
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
                            placeholder={data?.nickname || 'Clark Kent'}
                            radius='large'
                            value={formState.nickname}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            error={errors.nickname}
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
                            Given Name
                        </Text>
                        <InputField
                            name='givenName'
                            size='3'
                            placeholder={data?.givenName || 'Clark'}
                            radius='large'
                            value={formState.givenName ?? ''}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            error={errors.givenName}
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
                            Family Name
                        </Text>
                        <InputField
                            name='familyName'
                            size='3'
                            placeholder={data?.familyName || 'Kent'}
                            radius='large'
                            value={formState.familyName ?? ''}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            error={errors.familyName}
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
                            Language
                        </Text>
                        <InputField
                            name='locale'
                            size='3'
                            placeholder={data?.locale || 'en-US'}
                            radius='large'
                            value={formState.locale ?? ''}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            error={errors.locale}
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
                            Birthdate
                        </Text>
                        <InputField
                            name='birthdate'
                            size='3'
                            placeholder={data?.birthdate || 'YYYY-MM-DD'}
                            radius='large'
                            value={formState.birthdate ?? ''}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            error={errors.birthdate}
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
                            Zone Info
                        </Text>
                        <InputField
                            name='zoneinfo'
                            size='3'
                            placeholder={data?.zoneinfo || 'America/New_York'}
                            radius='large'
                            value={formState.zoneinfo ?? ''}
                            onChange={handleInputChange}
                            style={{ width: '100%' }}
                            error={errors.zoneinfo}
                        />
                    </Box>

                    <Box
                        style={{
                            gridColumn: '1 / -1', // Make the address box span the entire row
                        }}
                    >
                        <Text
                            as='label'
                            size='2'
                            style={{
                                display: 'block',
                                marginBottom: '8px',
                            }}
                        >
                            Address
                        </Text>
                        <Grid
                            columns={{ initial: '1', md: '2', lg: '3' }}
                            gap='4'
                            style={{
                                padding: '16px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                backgroundColor: '#f9f9f9',
                            }}
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
                                    Street Address
                                </Text>
                                <InputField
                                    name='address.streetAddress.0'
                                    size='3'
                                    placeholder={data?.address?.streetAddress?.[0] || '123 Main St'}
                                    radius='large'
                                    value={formState?.address?.streetAddress?.[0] ?? ''}
                                    onChange={handleInputChange}
                                    style={{ width: '100%' }}
                                    error={
                                        typeof errors.address === 'string'
                                            ? errors.address
                                            : errors.address?.streetAddress?.[0]
                                    }
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
                                    City
                                </Text>
                                <InputField
                                    name='address.locality'
                                    size='3'
                                    placeholder={data?.address?.locality || 'New York'}
                                    radius='large'
                                    value={formState?.address?.locality ?? ''}
                                    onChange={handleInputChange}
                                    style={{ width: '100%' }}
                                    error={
                                        typeof errors.address === 'string' ? errors.address : errors.address?.locality
                                    }
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
                                    Postal Code
                                </Text>
                                <InputField
                                    name='address.postalCode'
                                    size='3'
                                    placeholder={data?.address?.postalCode || '10001'}
                                    radius='large'
                                    value={formState?.address?.postalCode ?? ''}
                                    onChange={handleInputChange}
                                    style={{ width: '100%' }}
                                    error={
                                        typeof errors.address === 'string' ? errors.address : errors.address?.postalCode
                                    }
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
                                    Country
                                </Text>
                                <InputField
                                    name='address.country'
                                    size='3'
                                    placeholder={data?.address?.country || 'US'}
                                    radius='large'
                                    value={formState?.address?.country ?? ''}
                                    onChange={handleInputChange}
                                    style={{ width: '100%' }}
                                    error={
                                        typeof errors.address === 'string' ? errors.address : errors.address?.country
                                    }
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
                                    Region
                                </Text>
                                <InputField
                                    name='address.region'
                                    size='3'
                                    placeholder={data?.address?.region || 'NY'}
                                    radius='large'
                                    value={formState?.address?.region ?? ''}
                                    onChange={handleInputChange}
                                    style={{ width: '100%' }}
                                    error={typeof errors.address === 'string' ? errors.address : errors.address?.region}
                                />
                            </Box>
                        </Grid>
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
                                    checked={formState?.active}
                                    onCheckedChange={(checked) => handleCheckboxChange('active', !!checked)}
                                />
                                Set user to be active?
                            </Flex>
                        </Text>
                    </Box>
                </Grid>
            </Flex>
            <Flex direction='row' gap='2' width='100%' align='center'>
                <Button
                    variant='outline'
                    radius='large'
                    onClick={() => (window.location.href = CLIENT_ROUTES.USERS_TABLE)}
                    style={{
                        flex: 1,
                        height: '40px',
                        borderRadius: '8px',
                    }}
                >
                    Go Back
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
        </div>
    );
};

export default UserEdit;
