import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../store/store";
import WithLayout from "../components/layout/layout.component";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const { store } = wrapper.useWrappedStore(props);
  return (
    <Provider store={store}>
      {WithLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
