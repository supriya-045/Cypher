import { TbSmartHome, TbPhotoShield, TbShieldShare, TbShieldCode, TbBrowserCheck, TbRosetteNumber9 } from "react-icons/tb";
import { CgSandClock } from "react-icons/cg";
export const links = [
	// {
	// 	"title": "Home",
	// 	"route": "/",
	// 	"icon": <TbSmartHome />
	// },
	// {
	// 	"title": "Secure Files",
	// 	"route": "/secure-files",
	// 	"icon": <TbPhotoShield />
	// },
	{
		"title": "Share a Secret",
		"route": "/share-secret",
		"icon": <TbShieldShare />
	},
	{
		"title": "Decode a Secret",
		"route": "/decode-secret",
		"icon": <TbShieldCode />
	}
]

export const features = [
	{
		id: 1,
		icon: <TbBrowserCheck size={30} color='green' />,
		color: 'green.100',
		title: "In-Browser",
		text: "Plaintext messages dont leave your browser. They get encrypted on your device only.",
	},
	{
		id: 2,
		icon: <TbRosetteNumber9 size={30} color='orange' />,
		color: 'orange.100',
		title: "Limit maximum reads",
		text: "Encrypted messages can be decrypted only a certain number of times, which is configurable. After that it is self destroyed.",
	},
	{
		id: 3,
		icon: <CgSandClock size={30} color='red' />,
		color: 'red.100',
		title: "Set expiry time",
		text: "Encrypted messages are self destructed after given expiry time.",
	}
]
export const faqs = [
	{
		id: 1,
		query: "Is my data secure?",
		solution: "Yes, your data is 100% secure. Your data never leaves your browser without encryption. Key used to encrypt data is also generated in-browser.",
	},
	{
		id: 2,
		query: "Where is the encryption key stored?",
		solution: "Encryption key is the part of URL given to you. It is never stored in our databases.",
	},
	{
		id: 3,
		query: "How does this even work?",
		solution: "You start by entering the message/secret to secure, maximum read counts, and expiry timeperiod. Cypher generates an encryption key and uses AES-GCM to encrypt your messages. Now encrypted message is stored on to the database with given max reads and expiry timestamp. A unique url is generated which points to your encrypted message. Now share this URL instead of sharing secrets in plaintext.",
	}
]

export const apiHostUrl = 'https://cypher-9zmx.onrender.com';