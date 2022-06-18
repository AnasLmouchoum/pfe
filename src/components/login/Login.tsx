import { openOneUserByEmail } from 'config/rtk/RtkUser'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { Field, Form } from 'widgets'
import Bcyan from 'widgets/Bcyan'
import Bsave from 'widgets/Bsave'

type LoginProps = {
  setMDPOublier: (b: boolean) => void;
  // setRegister: (b: boolean) => void;
}


function Login({setMDPOublier}:LoginProps) {
    const [myEmail,setEmail] = useState("")
    const [myPassword,setPassword] = useState("")
    const [hide1, setHide1] = useState('hidden');
    const [hide2, setHide2] = useState('hidden');
    const user = openOneUserByEmail(myEmail).data;
    const refetchUser = openOneUserByEmail(myEmail).refetch;
    

    const submit = (e) =>{

      setTimeout(() => {
        refetchUser();
      }, 500);

      if(myEmail.length == 0 || myPassword.length == 0){
        e.preventDefault();
        setHide1('block');
      }else{
        if(user?.password == myPassword){
          signIn("credentials",{email:myEmail,password:myPassword,callbackUrl:"/"});
        }else{
          e.preventDefault();
          setHide2('block');
        }
        
      }
    }
  return (
    <div className="col-span-1">
    <div className="grid justify-center grid-rows-2">
        <div className="mt-32 mb-1 text-center w-full">
          <h1 className="back text-5xl font-bold">GESTION COMMERCIAL</h1>

          <p className="text-gray-500 text-xl w-96 my-11 m-auto">
            Entrez votre adresse e-mail et votre mot de passe pour accéder à votre espace
          </p>
        </div>
        <div className="shadow-md">
        <form onSubmit={submit}>
        <div className="grid justify-center w-full ">
            <div className={hide1}><p className="cursor-pointer float-left text-red-700 ">Il faut remplir saisir login et mot de passe</p></div>
          </div>
          <div className="grid justify-center w-full ">
            <div className={hide2}><p className="cursor-pointer float-left text-red-700 ">Email ou mot de passe incorrect</p></div>
          </div>
        <div className="grid  justify-center mt-14 w-full  ">
        <input 
            type="email"
            name="email"
            placeholder="Votre adresse e-mail"
            className=" my-5 w-96"
            onChange={(e:any)=>{setEmail(e.target.value); setHide1('hidden'); setHide2('hidden')}}
          />
          </div>
          <div className="grid  justify-center  mb-14 w-full ">
          <input 
            type="password"
            name="email"
            placeholder="Mot de passe"
            className=" w-96"
            onChange={(e:any)=> {setPassword(e.target.value); setHide1('hidden'); setHide2('hidden')}}
          />
          </div>
          <div className="grid justify-center w-full ">
            <p className="cursor-pointer   float-right text-yellow-700 " onClick={()=>setMDPOublier(true)}>Mot de passe oublié ?</p>
          </div>
          <div className="grid  justify-center ">
            <Bcyan label="Se connecter" onClick={submit} type="button" className="" />
          </div>
          
          {/* <p className="text-center mt-10 text-yellow-700 cursor-pointer " onClick={()=>setRegister(true)}>Register</p> */}


        </form>
        </div>
      
    </div>
         

  </div>
  )
}

export default Login