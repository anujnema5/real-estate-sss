import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/app/providers/theme-provider';
import { GlobalState } from '@/components/providers/redux-provider';
import AuthProvider from './providers/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Next.js Shadcn + v0 Starter Template',
	description:
		'Next.js Starter Template with Tailwind CSS, Shadcn Components, v0 Components (Alpha), Bun as npm installer and builder, Vercel as deployer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<GlobalState>
					<AuthProvider>
						<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
							{children}
						</ThemeProvider>
					</AuthProvider>
				</GlobalState>
			</body>
		</html>
	);
}