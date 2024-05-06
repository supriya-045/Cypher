import Layout from "../../components/Layout";
import {
    Flex,
    Select,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    SimpleGrid,
    Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import {
    HiOutlineClipboardDocument,
    HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { TbUserShare } from "react-icons/tb";
import { Error } from "../../components/Error";
import { encrypt } from "../../utils/encryption";
import axios from "axios";
import { toBase58 } from "../../utils/base";
import { apiHostUrl } from "../../utils/constants";

export default function ShareSecret() {
    return (
        <Layout>
            <EncodeSecretCard />
        </Layout>
    );
}

export function EncodeSecretCard() {
    const [message, setMessage] = useState("");
    const [maxReads, setMaxReads] = useState(99);
    const [expiresIn, setExpiresIn] = useState(7);
    const [expiryMultiplier, setExpiryMultiplier] = useState(60 * 60 * 24 * 1000);
    const [link, setLink] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLink("");
            setLoading(true);

            const { encryptedMessage, initVector, exportedKey } = await encrypt(
                message
            );

            const key = toBase58(exportedKey);
            let compositeKey = "";

            const data = JSON.stringify({
                "encryptedMessage": toBase58(encryptedMessage),
                "initVector": toBase58(initVector),
                "readsRemaining": maxReads,
                "expiryTimestamp": Date.now() + (expiresIn * expiryMultiplier)
            });
            let requestConfig = {
                method: 'post',
                url: `${apiHostUrl}/api/store`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data,
            };

            await axios.request(requestConfig)
                .then((response) => {
                    if (response.status === 200) {
                        compositeKey = `${response.data.id}:${key}`;
                    }
                })
                .catch((error) => {
                    throw error;
                });

            const url = new URL(window.location.href);

            url.pathname = "/decode-secret";
            url.hash = compositeKey;
            setCopied(false);
            setLink(url.toString());
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError(err);
            setLoading(false);
        }
    };

    return error ? (
        <Error
            headng={"Something went wrong"}
            description={
                "Unable to process your request at the moment. Please try again later."
            }
        />
    ) : (
        <Flex minH={"95vh"} align={"center"} justify={"center"} flex={1}>
            {link ? (
                <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"} textAlign={"center"}>
                            Now share this link with others
                        </Heading>
                    </Stack>
                    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                        <Stack spacing={4}>
                            <Input
                                type="string"
                                value={link}
                                isReadOnly={true}
                                size={"lg"}
                            />
                            <Button
                                leftIcon={
                                    copied ? (
                                        <HiOutlineClipboardDocumentCheck />
                                    ) : (
                                        <HiOutlineClipboardDocument />
                                    )
                                }
                                colorScheme={"blue"}
                                size="lg"
                                onClick={() => {
                                    setCopied(true);
                                    navigator.clipboard.writeText(link);
                                }}
                            >
                                {copied ? "Copied" : "Click to copy"}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            ) : (
                <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"} textAlign={"center"}>
                            Encrypt & Share
                        </Heading>
                        <Text fontSize={"lg"} color={"gray.600"}>
                            all of your secrets 🔐
                        </Text>
                    </Stack>
                    <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                        <Stack spacing={4}>
                            <FormControl id="message" isRequired>
                                <FormLabel>Message</FormLabel>
                                <Textarea
                                    resize={"vertical"}
                                    rows={Math.max(
                                        5,
                                        message.split("\n").length
                                    )}
                                    placeholder={"The quick brown fox..."}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </FormControl>
                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                spacing={4}
                            >
                                <Box>
                                    <FormControl id="maxReads">
                                        <FormLabel>Max reads</FormLabel>
                                        <Input
                                            type="number"
                                            value={maxReads}
                                            onChange={(e) =>
                                                setMaxReads(e.target.value)
                                            }
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="expiresInNext">
                                        <FormLabel>Expires in next</FormLabel>
                                        <InputGroup>
                                            <Input
                                                type={"number"}
                                                value={expiresIn}
                                                onChange={(e) =>
                                                    setExpiresIn(e.target.value)
                                                }
                                            />
                                            <InputRightElement
                                                height={"full"}
                                                width={"max-content"}
                                            >
                                                <FormControl id="expireInMultiplier">
                                                    <Select
                                                        variant={"unstyled"}
                                                        value={expiryMultiplier}
                                                        onChange={(e) =>
                                                            setExpiryMultiplier(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option
                                                            value={60 * 1000}
                                                        >
                                                            Secs
                                                        </option>
                                                        <option
                                                            value={
                                                                60 * 60 * 1000
                                                            }
                                                        >
                                                            Mins
                                                        </option>
                                                        <option
                                                            value={
                                                                60 *
                                                                60 *
                                                                24 *
                                                                1000
                                                            }
                                                        >
                                                            Days
                                                        </option>
                                                    </Select>
                                                </FormControl>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </Box>
                            </SimpleGrid>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    isDisabled={message.length <= 0}
                                    isLoading={loading}
                                    size="lg"
                                    type="submit"
                                    leftIcon={<TbUserShare />}
                                    colorScheme="blue"
                                    spinnerPlacement="start"
                                    onClick={submitHandler}
                                >
                                    {loading ? "Processing..." : "Share"}
                                </Button>
                            </Stack>
                            <Stack>
                                <Text align={"left"} fontSize={"xs"}>
                                    Max reads defines the maximum number of
                                    times this message can be decoded before is
                                    self destroyed.
                                </Text>
                                <Text align={"left"} fontSize={"xs"}>
                                    Expires in next field defines time for which
                                    this message is going to be decodable/alive.
                                </Text>
                                <Text align={"left"} fontSize={"xs"}>
                                    Encrypted messages are self destroyed based
                                    on above rules, whichever occurs first in
                                    chronological order.
                                </Text>
                                <Text align={"left"} fontSize={"xs"}>
                                    A symmetric key is generated and message is
                                    encrypted. Only encrypted data is stored on
                                    the server. Symmetric key is attached to the
                                    sharable url.
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            )}
        </Flex>
    );
}
