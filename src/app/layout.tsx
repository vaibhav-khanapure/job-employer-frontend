import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import APP from "../constants/app";
import AppProviders from "../components/hoc/providers/AppProviders";
import Toast from "../components/common/toast/Toast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: APP.APP_NAME,
  description: APP.APP_TAGLINE,
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Toast />

        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;