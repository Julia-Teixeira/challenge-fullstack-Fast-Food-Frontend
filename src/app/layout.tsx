import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProductProvider } from "@/provider/productProvider";
import Header from "@/components/header";
import { OrderProvider } from "@/provider/orderProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fast Food",
  description: "App delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductProvider>
          <OrderProvider>
            <Header />
            <main className="flex min-h-screen flex-col px-2 sm:px-6 xl:px-36 mx-auto max-w-7xl">
              {children}
            </main>
          </OrderProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
