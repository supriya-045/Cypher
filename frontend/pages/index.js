import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Icon,
	Container,
	Flex,
	Heading,
	HStack,
	Image,
	Link,
	SimpleGrid,
	Stack,
	Text,
	VStack,
	Tag,
	TagLabel
} from "@chakra-ui/react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { faqs, features } from "../utils/constants";
import React from 'react';
import Layout from "../components/Layout";
import hero from '../public/hero.png';

export default function Home() {
	return (
		<Layout>
			<Main />
		</Layout>)
}

export const Main = () => {
	return (
		<>
			<Flex flex={1} minH={"95vh"} align={"center"} justify={"center"}>
				<Container maxW={"7xl"}>
					<Stack
						align={"center"}
						spacing={{ base: 8, md: 10 }}
						py={{ base: 20, md: 28 }}
						direction={{ base: "column", md: "row" }}
					>
						<Stack flex={1} spacing={{ base: 5, md: 10 }}>
							<Tag size='lg' variant={'outline'} borderRadius='full' width={'max-content'}>
								<TagLabel backgroundImage={"linear-gradient(-30deg, #FCEF04, #EC458d, #474ED7)"} bgClip="text">Introducing Cypher</TagLabel>
							</Tag>
							<Heading
								lineHeight={1.1}
								fontWeight={600}
								fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
							>
								<Text
									as={"span"}
									position={"relative"}
									_after={{
										content: "''",
										width: "full",
										height: "30%",
										position: "absolute",
										bottom: 1,
										left: 0,
										bg: "blue.400",
										zIndex: -1,
									}}
								>
									Secret Sharing {/*and File encryption*/}
								</Text>
								<br />
								<Text as={"span"} color={"blue.400"}>
									Made Easy
								</Text>
							</Heading>
							<Text color={"gray.500"}>
								With Cypher, you can easily share passwords, messages, and other confidential data with your team members or clients. Cypher uses AES-GCM encryption algorithm to encrypt your messages. Plaintext messages never leave your browser, they are encrypted in-browser. Neither we store encryption key nor the plaintext message. Try now! ↓
							</Text>
							<Stack
								spacing={{ base: 4, sm: 6 }}
								direction={{ base: "column", sm: "row" }}
							>
								<Button
									rounded={"full"}
									size={"lg"}
									fontWeight={"normal"}
									px={6}
									colorScheme={"blue"}
									bg={"blue.400"}
									leftIcon={
										<FaLock
											h={4}
											w={4}
											color={"gray.300"}
										></FaLock>
									}
									_hover={{
										bg: "blue.500",
										textDecoration: "none",
									}}
									as={Link}
									href={'/share-secret'}
								>
									Try sharing a secret
								</Button>
								<Button
									rounded={"full"}
									size={"lg"}
									fontWeight={"normal"}
									px={6}
									leftIcon={
										<FaUnlock
											h={4}
											w={4}
											color={"gray.300"}
										></FaUnlock>
									}
									_hover={{
										textDecoration: "none",
										bg: "gray.500",
									}}
									href="/decode-secret"
									as={Link}
								>
									Decode one
								</Button>
							</Stack>
						</Stack>
						<Flex
							flex={1}
							justify={"center"}
							align={"center"}
							position={"relative"}
							w={"full"}
						>
							<Box
								position={"relative"}
								height={"300px"}
								rounded={"2xl"}
								boxShadow={"2xl"}
								width={"full"}
								overflow={"hidden"}
							>
								<Image
									alt={"Hero image"}
									fit="cover"
									align={"center"}
									w={"100%"}
									h={"100%"}
									src={hero.src}
								></Image>
							</Box>
						</Flex>
					</Stack>
				</Container>
			</Flex>
			<Box py={{ base: 20, md: 28 }}
				backgroundImage={`linear-gradient(-15deg,#cf9ffc,#fad48e,#f8f8ff)`}
				backgroundAttachment={'fixed'}
				backgroundPosition={'center'}
				backgroundRepeat={'no-repeat'}
				backgroundSize={'cover'}
			>
				<Stack
					spacing={4}
					as={Container}
					maxW={"3xl"}
					textAlign={"center"}
				>
					<Heading fontSize={"3xl"}>Features</Heading>
					<Text color={"gray.600"} fontSize={"xl"}>...</Text>
				</Stack>
				<Container maxW={"6xl"}>
					<SimpleGrid
						columns={{ base: 1, md: 2, lg: 3 }}
						spacing={10}
					>
						{features.map((feature) => (
							<VStack align={"start"} key={feature.id} px={'4'}>
								<Flex w={10} h={10} align={'center'} justify={'center'} rounded={'full'} bg={feature.color}>
									{feature.icon}
								</Flex>
								<Text fontWeight={600}>
									{feature.title}
								</Text>
								<Text color={"gray.600"}>
									{feature.text}
								</Text>
							</VStack>
						))}
					</SimpleGrid>
				</Container>
			</Box>
			<Box py={{ base: 20, md: 28 }}>
				<Stack
					spacing={4}
					as={Container}
					maxW={"3xl"}
					textAlign={"center"}
				>
					<Heading fontSize={"3xl"}>
						Frequently Asked Questions
					</Heading>
					<Text color={"gray.600"} fontSize={"xl"}>
						...
					</Text>
				</Stack>
				<Container maxW={"6xl"}>
					<SimpleGrid columns={{ base: 1 }} spacing={10}>
						<Accordion allowToggle px={'4'}>
							{faqs.map((faq) => (
								<AccordionItem key={faq.id}>
									<h2>
										<AccordionButton>
											<Box flex="1" textAlign="left">
												{faq.query}
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										{faq.solution}
									</AccordionPanel>
								</AccordionItem>
							))}
						</Accordion>
					</SimpleGrid>
				</Container>
			</Box>
		</>);
}
