import Email from 'next-auth/providers/email'
import { signIn } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import { Field, Form } from 'widgets'
import Bcyan from 'widgets/Bcyan'
import emailjs from '@emailjs/browser';
import { openOneUserByEmail, openPaginationUsers } from 'config/rtk/RtkUser'

type MDPoublierProps = {
    setMDPOublier:(b:boolean)=>void
}

function MDPoublier({setMDPOublier}:MDPoublierProps) {
    const [myEmail,setEmail] = useState("")

  const openToOneClient = openOneUserByEmail(myEmail);
  const dataUser = openToOneClient.data
  const save = openToOneClient.save;
  const refetch = openToOneClient.refetch;
  const openAllUser = openPaginationUsers(0);
  const refetchAll = openAllUser.refetch;

  console.log(dataUser)

  const [codeVer, setCodeVer] = useState(true);
  const [code, setCode] = useState('');
  const [changePass, setChangePass] = useState(false);
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const [hide1, setHide1] = useState('hidden');

    const form = useRef(null);

    // const submit = () =>{
    
    //     signIn("credentials",{email:myEmail,password:myPassword,callbackUrl:"/"})
    // }

    const verificationRandoms = ["1334", "1344", "3223", "2246", "2378", "0098", "0980", "0110", "1120", "2378", "0011", "7789", "7553", "3577"];

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_0gu07af', 'template_ip9nu8p', form.current, 'dVf18gQq5nXNPhG3n')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

  return (
  <div className=" col-span-1">
      <div className="grid justify-center grid-rows-2">
        <div className="mt-32 mb-1 text-center w-full">
          <h1 className="black text-5xl font-bold">GESTION COMMERCIAL</h1>

          <p className="text-gray-500 text-xl w-96 my-11 m-auto">
            Entrez votre adresse e-mail pour récupérer le mot de passe
          </p>
        </div>
        <div className="shadow-md">
        <div className="grid justify-center w-full ">
            {!changePass &&
            <div className={hide1}><p className="cursor-pointer float-left text-green-500 ">Vous avez reçu votre mot de passe dans votre boite</p></div>
            }
        </div>
        {codeVer &&
        <form ref={form} onSubmit={sendEmail} >
        <div className="grid  justify-center mt-14 w-full  ">
        <input 
            type="text"
            name="email"
            placeholder="Votre adresse e-mail"
            className=" my-5 w-96"
            onChange={(e:any)=>setEmail(e.target.value)}
          />
          <input 
            type="hidden"
            name="message"
            value={verificationRandoms[Math.floor(Math.random() * verificationRandoms.length)]}
          />
          <input 
            type="hidden"
            name="subject"
            value="Mot de passe oublié"
          />
          </div>
          {/* <div className="grid  justify-center  mb-14 w-full ">
          <input 
            type="password"
            name="email"
            placeholder="Mot de passe"
            className=" w-96"
            onChange={(e:any)=> setPassword(e.target.value)}
          />
          </div> */}
          <div className="grid justify-center w-full ">
            {/* <p className="cursor-pointer   float-right text-yellow-700 " onClick={()=>{}}>Mot de passe oublié ?</p> */}
          </div>
          <div className="grid  justify-center ">
            <Bcyan  type="submit" className="w-96" onClick={() => {setHide1('block'); setCodeVer(false)}}>Envoyer le code par e-mail</Bcyan>
          </div>
          
          <p className="text-center mt-10 text-yellow-700 cursor-pointer" onClick={()=>setMDPOublier(false)}>Login</p>


        </form>
        }
        {(!codeVer && !changePass) &&
        <div className="grid  justify-center mt-14 w-full  ">
          <input type="text" name="" id="" onChange={(e) => { setCode(e.target.value) }} placeholder='Code de vérification' />
          <Bcyan  type="submit" className="w-96" onClick={() => {if(verificationRandoms.indexOf(code) >= 0){setChangePass(true)}}}>Valider</Bcyan>
        </div>
        }
        {(!codeVer && changePass) && 
        <div className="grid  justify-center mt-14 w-full">
          <input  className="w-96" type="password" name="" id="" onChange={(e) => { setPassword(e.target.value) }} placeholder='New password' />
          <input  className=" mt-2 w-96" type="password" name="" id="" onChange={(e) => { setConfPassword(e.target.value) }} placeholder='Confirm password' />
          <Bcyan  type="submit" className="w-96" onClick={() => { if(password == confPassword && password != ''){save({...dataUser, password: password});setMDPOublier(false); setTimeout(() => {refetch();refetchAll();}, 500);setTimeout(() => {refetch();refetchAll();}, 500);}; }}>Valider</Bcyan>
        </div>
        }
      </div>
    </div>
  </div>
  )
}

export default MDPoublier