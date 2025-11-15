import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Mazon",
  description: "E-commerce platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className="bg-white">
    <Navbar />
    <main className="pt-10">{children}</main>
    </body>
    </html>
  );
}