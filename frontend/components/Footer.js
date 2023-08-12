import { Box, Flex, Image, Text } from "@chakra-ui/react";
import logo from '../public/logo.png'

export default function Footer() {
	return (
		<Box py={4} as="footer">
			<Flex
				align={"center"}
				_before={{
					content: '""',
					borderBottom: "2px solid",
					borderImage:
						"linear-gradient(-90deg, #FCEF04, #EC458d, #474ED7) 2",
					flexGrow: 1,
					mr: 4,
				}}
				_after={{
					content: '""',
					borderBottom: "2px solid",
					borderImage:
						"linear-gradient(90deg, #FCEF04, #EC458d, #474ED7) 2",
					flexGrow: 1,
					ml: 4,
				}}
			>
				<Image src={logo.src} alt="logo_footer" h={10} />
			</Flex>
			<Text pt={4} fontSize={"sm"} textAlign={"center"}>
				Made with ❤️.
			</Text>
			<Text fontSize={"sm"} textAlign={"center"}>
				&copy; Cypher. All rights reserved.
			</Text>
		</Box>);
}