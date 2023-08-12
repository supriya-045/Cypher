import Layout from "../../components/Layout"
import { Flex, Heading, Text } from "@chakra-ui/react"

export default function SecureFiles() {
    return (
        <Layout>
            <Flex minH={"90vh"} align={"center"} justify={"center"} flex={1}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                    Coming
                    <Text as={'span'} color={'purple.500'}>
                        {" Soon"}
                    </Text>
                </Heading>
            </Flex>
        </Layout>
    )
}
