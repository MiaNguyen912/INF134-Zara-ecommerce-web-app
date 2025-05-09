// import './globals.css';
import "@/assets/styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`, // template for dynamic title (e.g. "Catalog | Zara"), inside catalog/page.tsx, export title as metadata to override default and use template
  },
  description: `${APP_DESCRIPTION}`,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
