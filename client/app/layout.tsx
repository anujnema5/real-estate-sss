import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StateProvider from "./providers/redux-provider";
import AuthProvider from "./providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StateProvider>
        <AuthProvider>
          <body className={`${inter.className} scrollbar-thumb-rounded-md scrollbar scrollbar-thumb-primary scrollbar-w-3 `}>
            {children}
          </body>
        </AuthProvider>
      </StateProvider>
    </html>
  );
}
