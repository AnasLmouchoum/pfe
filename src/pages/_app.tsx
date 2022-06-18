import { Head } from "widgets";
import { Notifications } from "widgets/Notifications";
import { LayoutName } from "widgets/types";
import store, { persistor } from "config/store";
import Layout from "layouts";
import { NextPage } from "next";
import {
  getSession,
  SessionProvider,
  signIn,
  useSession,
} from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { FC, ReactElement, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "styles/globals.css";
import "styles/custom.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: LayoutName;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const getDefaultLayout = (name?: LayoutName) => {
  return function layout(page: ReactElement): ReactNode {
    return <Layout name={name}>{page}</Layout>;
  };
};

const App: FC<AppPropsWithLayout> = ({ Component, pageProps }) => {
  /* useEffect(()=>{
        
    const securePage = async () =>{
        const session = await getSession()
        if(!session){
            signIn("keycloak")
        }else{
          console.log(session)
        }

        
    }
   securePage() 
}) */
  // console.log("comp ", Component);
  // console.log("page props : ", pageProps);
  const getLayout =
    Component.getLayout ??
    getDefaultLayout(Component.layout ?? pageProps.layout);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <>
            <Head>
              <meta charSet="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
              />
              <meta name="description" content="Description" />
              <meta name="keywords" content="Keywords" />
              <title>GESCOM</title>

              <link rel="manifest" href="/manifest.json" />
              <link
                href="/images/swinga.png"
                rel="icon"
                type="image/png"
                sizes="16x16"
              />
              <link
                href="/images/swinga.png"
                rel="icon"
                type="image/png"
                sizes="32x32"
              />
              <link rel="apple-touch-icon" href="/logo-5.png"></link>
              <meta name="theme-color" content="#317EFB" />
            </Head>
            {getLayout(
              <>
                <Notifications />
                <Component {...pageProps} />
              </>
            )}
          </>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default appWithTranslation(App);
