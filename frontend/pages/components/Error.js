import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

export function Error({ heading, description }) {
    return (
        <Flex minH={'90vh'}
            align={'center'}
            justify={'center'}
            flex={1}>
            <Box textAlign={'center'}>
                <Box display="inline-block">
                    <Flex
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        bg={'red.500'}
                        rounded={'50px'}
                        w={'55px'}
                        h={'55px'}
                        textAlign="center">
                        <CloseIcon boxSize={'20px'} color={'white'} />
                    </Flex>
                </Box>
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    {heading ? heading : 'Something went wrong!'}
                </Heading>
                <Text color={'gray.500'}>
                    {description ? description : ''}
                </Text>
            </Box>

        </Flex>
    )
}