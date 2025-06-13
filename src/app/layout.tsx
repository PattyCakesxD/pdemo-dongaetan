import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import ResponsiveLayoutWrapper from "@/components/ResponsiveLayoutWrapper";
import { SidebarProvider } from "@/components/SidebarContext";
import { CartProvider } from "@/components/cart/CartContext";
import { ThemeProvider } from "@/components/ThemeProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <SidebarProvider>
              <ResponsiveLayoutWrapper>{children}</ResponsiveLayoutWrapper>
            </SidebarProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
