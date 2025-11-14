import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Mazon",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
    <body className="bg-white text-black">
    <Navbar />
    {children}
    </body>
    </html>
  );
}