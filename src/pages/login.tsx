// import Login from "components/login/login";
import Login from "components/login/Login";
import MDPoublier from "components/login/MDPoublier";
import Register from "components/login/Register";
import { signIn } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { Field, Form, Image, Link } from "widgets";
import Bsave from "widgets/Bsave";

export default function ThemeForm() {
  const styling = {
    // backgroundImage: `url('/images/login.png')`,
    width:"100%",
    height:"100%",
    objectFit: "cover"
}
  const [mdpOublier,setMDPOublier] = useState(false)
  // const [register,setRegister] = useState(false)


  return (
    <div className="">
      <div className="grid grid-cols-2 absolute top-0 bottom-0 ">
        <div className=" relative col-span-1 h-full object-fill">
          <div className="absolute left-0 right-0 top-20 flex justify-center">
            <img 
              src="/images/logo-4.png"
              alt=""
              className="object-none object-center "
            />
          </div>
          
          <img
            src="/images/login.png"
            alt=""
            className=" object-cover h-full w-full  "
            // style={styling}
          />
        </div>
        { !mdpOublier  && <Login setMDPOublier={setMDPOublier}   />}
        { mdpOublier  && <MDPoublier setMDPOublier={setMDPOublier}  />}
        {/* {  register && <Register setRegister={setRegister} />} */}
        
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      layout: "empty",
      ...(await serverSideTranslations(locale, ["common", "login"])),
      // Will be passed to the page component as props
    },
  };
}
