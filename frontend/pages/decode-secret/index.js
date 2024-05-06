import Layout from "../../components/Layout";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	Heading,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbLockBolt } from "react-icons/tb";
import {
	HiOutlineClipboardDocument,
	HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { Error } from "../../components/Error";
import { decrypt } from "../../utils/encryption";
import axios from "axios";
import { apiHostUrl } from "../../utils/constants";

export default function DecodeSecret() {
	return (
		<Layout>
			<DecodeSecretCard />
		</Layout>
	);
}

export function DecodeSecretCard() {
	const [message, setMessage] = useState(null);
	const [readsRemaining, setReadsRemaining] = useState(null);
	const [compositeKey, setCompositeKey] = useState("");
	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorHeading, setErrorHeading] = useState("Something went wrong");
	const [errorMessage, setErrorMessage] = useState("Unable to process your request at the moment. Please make sure url is not currupted.");
	
	useEffect(() => {
		let hash = window.location.hash;
		hash = hash.replace(/^#/, "");
		setCompositeKey(hash);
	}, []);

	const parseId = (urlOrId) => {
		if (urlOrId.includes("decode-secret")) {
			urlOrId = urlOrId.split("#")[1];
		}
		const [id, key] = urlOrId.split(":");
		return { id, key };
	}

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			console.log(compositeKey);
			const { id, key } = parseId(compositeKey);
			console.log(id, key);
			let requestConfig = {
				method: 'get',
				url: `${apiHostUrl}/api/fetch?id=${id}`,
				headers: {
					'Content-Type': 'application/json'
				},
			};
			let initVector;
			let encryptedMessage;
			let readsRemaining;
			await axios.request(requestConfig)
				.then((response) => {
					console.log(response);
					if (response.status === 200) {
						initVector = response?.data?.data?.initVector;
						encryptedMessage = response?.data?.data?.encryptedMessage;
						readsRemaining = response?.data?.data?.readsRemaining;
					}
				})
				.catch((error) => {
					throw error;
				});
			const message = await decrypt(encryptedMessage, key, initVector)
			setMessage(message);
			setReadsRemaining(readsRemaining);
			setLoading(false);
		} catch (error) {
			setError(error);
			setErrorMessage("We couldn't find the message you are trying to find. Check your URL.");
			setLoading(false);
		}
	};

	return error ? (
		<Error
			headng={errorHeading}
			description={
				errorMessage
			}
		/>
	) : (
		<Flex minH={"95vh"} align={"center"} justify={"center"} flex={1}>
			{message ? (
				<Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
					<Stack align={"center"}>
						<Text fontSize={"lg"} color={"gray.600"}>
							{readsRemaining >= 0
								? "This message can be further read " +
								readsRemaining +
								" times only."
								: "Message has either expired or has been read maximum number of times."}
						</Text>
					</Stack>
					<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
						<Stack spacing={4}>
							<FormControl id="message" isRequired>
								<FormLabel>Message</FormLabel>
								<Textarea
									readOnly={true}
									resize={"vertical"}
									rows={message.split("\n").length}
									placeholder={"The quick brown fox..."}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								/>
							</FormControl>
							<Stack spacing={10} pt={2}>
								<Button
									isDisabled={message.length <= 0}
									size="lg"
									type="submit"
									leftIcon={
										copied ? (
											<HiOutlineClipboardDocumentCheck />
										) : (
											<HiOutlineClipboardDocument />
										)
									}
									colorScheme={"blue"}
									spinnerPlacement="start"
									onClick={() => {
										navigator.clipboard.writeText(message);
										setCopied(true);
									}}
								>
									{copied ? "Copied" : "Copy"}
								</Button>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			) : (
				<Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
					<Stack align={"center"}>
						<Heading fontSize={"4xl"} textAlign={"center"}>
							Decode a message
						</Heading>
						<Text fontSize={"lg"} color={"gray.600"}>
							Paste the sharable url/ID below to decode a message
							🔓
						</Text>
					</Stack>
					<Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
						<Stack spacing={4}>
							<FormControl id="url-id" isRequired>
								<FormLabel>URL/ID</FormLabel>
								<Input
									type="text"
									value={compositeKey}
									onChange={(e) => setCompositeKey(e.target.value)}
								/>
							</FormControl>
							<Button
								isDisabled={compositeKey.length <= 0}
								isLoading={loading}
								leftIcon={<TbLockBolt />}
								colorScheme={"blue"}
								spinnerPlacement="start"
								size="lg"
								onClick={submitHandler}
							>
								{loading ? "Decoding..." : "Decode"}
							</Button>
						</Stack>
					</Box>
				</Stack>
			)}
		</Flex>
	);
}
