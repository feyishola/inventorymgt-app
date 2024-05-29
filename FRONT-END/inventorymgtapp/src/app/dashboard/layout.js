import { Inter } from "next/font/google";
import "../globals.css";
import SideNav from "./components/sidenav";

// import Sidebar from "./components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Side inventory management app",
  description: "Generated by Feyi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <div>
          <SideNav />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
