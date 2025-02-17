import { Box, Button, Card, Flex, Grid, Switch, Text, TextArea } from '@radix-ui/themes';

const LoginPage = () => {
    return (
        <Box maxWidth='400px'>
            <Card size='2'>
                <Flex direction='column' gap='3'>
                    <Grid gap='1'>
                        <Text as='div' weight='bold' size='2' mb='1'>
                            Feedback
                        </Text>
                        <TextArea placeholder='Write your feedback…' />
                    </Grid>
                    <Flex asChild justify='between'>
                        <label>
                            <Text color='gray' size='2'>
                                Attach screenshot?
                            </Text>
                            <Switch size='1' defaultChecked />
                        </label>
                    </Flex>
                    <Grid columns='2' gap='2'>
                        <Button variant='surface'>Back</Button>
                        <Button>Send</Button>
                    </Grid>
                </Flex>
            </Card>
        </Box>
    );
};

export default LoginPage;
