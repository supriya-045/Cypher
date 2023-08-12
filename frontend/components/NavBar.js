import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
	Box,
	Flex,
	HStack,
	Text,
	IconButton,
	Image,
	Spacer,
	Stack,
	useDisclosure
} from "@chakra-ui/react";
import { links } from "../utils/constants";
import logo from '../public/logo.png'
import NavLink from "./NavLink";

export default function NavBar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box as="nav" role="navigation" position="sticky" top="0" zIndex="999" backdropFilter="blur(6px)">
			<Box px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<HStack spacing={8} alignItems={"center"}>
						<HStack as={"a"} href={"/"}>
							<Image src={logo.src} alt="logo" h={12} />
							<Text px={'2'} fontSize={'2xl'} fontWeight={'normal'}>Cypher</Text>
						</HStack>
						<Spacer />
						<HStack
							spacing={4}
							display={{ base: "none", md: "flex" }}
						>
							{links.map(({ title, route, icon }) => (
								<NavLink title={title} route={route} icon={icon} key={route}></NavLink>
							))}
						</HStack>
					</HStack>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					></IconButton>
				</Flex>
				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{links.map(({ title, route, icon }) => (
								<NavLink title={title} route={route} icon={icon} key={route}></NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</Box>
	);
}
