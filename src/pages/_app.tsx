import "@/styles/globals.css";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
import type { AppProps } from "next/app";
import { usePageView } from "@/hooks/usePageView";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  usePageView();
  return <Component {...pageProps} />;
}
export default MyApp;
