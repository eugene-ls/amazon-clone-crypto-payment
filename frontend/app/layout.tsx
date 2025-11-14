import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Mazon",
  description: "E-commerce project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className="bg-white">
    <Navbar />
    <main>{children}</main>
    </body>
    </html>
  );
}