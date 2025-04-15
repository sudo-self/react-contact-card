import { Geist, Geist_Mono } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"], 
});

export const metadata: Metadata = {
  title: "Jesse",
  description: "Hello! I am Jesse this is my contact info",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* You can include additional meta tags or links to external resources here */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* The `children` prop will render your page's content */}
        {children}
      </body>
    </html>
  );
}

