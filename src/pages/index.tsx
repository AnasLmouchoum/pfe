import { Col, Form, Head, Link, Text, View } from "widgets";
import Counter from "features/counter/Counter";
import { useTranslation } from "hooks/translate";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";

const IndexPage: NextPage = () => {
  const { data: session, status } = useSession();
  // const loading = status === "loading";
  console.log(session)
  const router = useRouter();
  useEffect(()=>{
        
    const securePage = async () =>{
        const session = await getSession()
        if(!session){
          router.push({
            pathname: '/login',
            query: { returnUrl: router.asPath }
        });
        }else{
          console.log(session)
        }

        
    }
   securePage() 
})
  const { t } = useTranslation("common");
  return (
    <Col>
      <Head title={t("GESCOM")} />
      <View as="main">
        <h1 className="center">La Page d'accueil en cours de construction</h1>
      </View>
    </Col>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default IndexPage;
