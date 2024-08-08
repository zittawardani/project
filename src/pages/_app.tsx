import Appshell from "@/components/layouts/appshell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Appshell>
      <Component {...pageProps} />
    </Appshell>
  );
}
