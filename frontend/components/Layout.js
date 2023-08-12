import { Flex } from "@chakra-ui/react";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function Layout(props) {
	return (
		<Flex flexDirection={"column"} flex={1} minHeight={"100vh"} bg={'gray.100'}>
			<NavBar />
			{props.children}
			<Footer />
		</Flex>
	);
}