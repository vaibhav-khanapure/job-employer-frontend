import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import APP from "../constants/app";
import AppProviders from "../components/hoc/providers/AppProviders";
import Toast from "../components/common/toast/Toast";
import PageLoader from "../components/common/loaders/PageLoader";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: APP.APP_NAME,
  description: APP.APP_TAGLINE,
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en" className={`${googleSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Toast />
        <PageLoader />

        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;