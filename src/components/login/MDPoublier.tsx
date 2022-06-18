import Email from 'next-auth/providers/email'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { Field, Form } from 'widgets'
import Bcyan from 'widgets/Bcyan'
import Bsave from 'widgets/Bsave'

type MDPoublierProps = {
    setMDPOublier:(b:boolean)=>void
}

function MDPoublier({setMDPOublier}:MDPoublierProps) {
    const [myEmail,setEmail] = useState("")
    // const submit = () =>{
    
    //     signIn("credentials",{email:myEmail,password:myPassword,callbackUrl:"/"})
    // }

  const sendEmail = () => {
    
  }

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
        <form >
        <div className="grid  justify-center mt-14 w-full  ">
        <input 
            type="text"
            name="email"
            placeholder="Votre adresse e-mail"
            className=" my-5 w-96"
            onChange={(e:any)=>setEmail(e.target.value)}
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
            <Bcyan  type="button" className="w-96" onClick={() => {sendEmail()}}>Envoyer le code par e-mail</Bcyan>
          </div>
          
          <p className="text-center mt-10 text-yellow-700 cursor-pointer " onClick={()=>setMDPOublier(false)}>Login</p>


        </form>
        </div>
      
    </div>
         

  </div>
  )
}

export default MDPoublier