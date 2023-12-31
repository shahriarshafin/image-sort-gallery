import './globals.css';

export const metadata = {
	title: 'Image Sort Gallery',
	description:
		'An image gallery that enables seamless sorting, rearranging, and showcasing of images effortlessly',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<main className='container max-w-5xl w-full lg:h-screen flex justify-center items-center p-5 md:px-20 md:py-10 mx-auto'>
					{children}
				</main>
			</body>
		</html>
	);
}
