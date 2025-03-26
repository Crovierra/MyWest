import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { UserProvider } from "@/lib/action/user-context";
import { TransactionProvider } from "@/lib/action/transaction-context";
import Sidebar from "@/components/Sidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My West",
  description: "My West, your personal expense tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
        <Nav />
        <Sidebar />
        <TransactionProvider>
        <main className="min-h-screen">{children}</main>
        </TransactionProvider>
        <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
