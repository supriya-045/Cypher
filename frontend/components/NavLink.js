import { Box, HStack, Link, Text } from "@chakra-ui/react";
import { TbHomeShield } from "react-icons/tb";
import { useRouter } from "next/router";

export default function NavLink({ title, route, icon }) {
	const router = useRouter();
	const active = isActive(router, route);
	return (
		<Link
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
			}}
			href={route}
		>
			<HStack>
				<Box pr={2}>
					{icon ? icon : <TbHomeShield />}
				</Box>
				<Text
					bgGradient={active ? "linear-gradient(-90deg, #FCEF04, #EC458d, #474ED7)" : "linear-gradient(-90deg, #000000, #000000)"}
					bgClip="text"
					fontWeight={active ? "bold" : ""}
				>
					{title}
				</Text>
			</HStack>
		</Link>
	);
}

export function isActive(router, route) {
	return router.pathname === route;
}
