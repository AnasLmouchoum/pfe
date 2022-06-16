
import React, { useState, useEffect } from "react";
import Section from "../../widgets/Section";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { Field, Form } from "widgets";
import Bcyan from "widgets/Bcyan";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import {  openOneUserByEmail, openUsers } from "config/rtk/RtkUser";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import ChangerMdp from "components/profile/ChangerMdp";
type ConsulterUtilisateurProps = {
  // setShowUser: (b: boolean) => void;
  // estModifier: boolean;
  // setModifier: (b: boolean) => void;
  user: any;
  // refetchUser:()=>void
  // setUser:(b:boolean)=>void
};

function ConsulterUtilisateur({user
}: ConsulterUtilisateurProps) {
  const [email,setEmail] = useState("")
  const [visibilite,setVisibilite] = useState(false)
  const session2= getSession()
  const [modifier,setModifier] = useState(false)
  
  session2.then((val)=> setEmail(val?.user?.email))

  const openToOneClient = openOneUserByEmail(email)
  const editUsers = openToOneClient.edit
  const dataUser = openToOneClient.data
  const refetechUser = openToOneClient.refetch

  const onSubmit = (data: any) => {
    // console.log(data)
    setModifier(false)
    editUsers({...data, img: img});
    // const myTimeout = setTimeout(myGreeting, 100);
    setTimeout(() => {
      refetechUser();
    }, 1000);

    // function myGreeting() {
    //   refetechUser()
    //   // console.log("refeteched")
    // }
  }

  const [img, setImg] = useState('');
  
  return (
    <Section>
      <Form  defaultValues={dataUser} onSubmit={onSubmit}>
        <div className="grid grid-rows-6">
          <div className="row-span-1">
            <p className="float-left">Profile</p>
          </div>
          <div className="grid grid-cols-6 row-span-4">
            <div className="col-span-5">

              <div className="flex my-7 ">
                <div className="flex items-center">
                  <Field 
                    label="nom"  
                    name="nom" 
                    type="text"  
                    className="w-96"
                    disabled={!modifier}
                    />
                </div>
                 
                <div className="flex items-center ml-5">
                  <Field 
                    label="prénom"  
                    name="prenom" 
                    type="text"  
                    className="w-96"
                    disabled={!modifier}
                    />
                </div>
              </div>
              <div className="flex my-7">
                <div className="flex items-center">
                  <Field 
                    label="Rôle"
                    name="role"
                    as="select"
                    // optionKeyName="id"
                    // optionLabelName="design"
                    options={["","Admin","Utilisateur","Responsable de colisage", "Responsable de production"]}
                    className="w-96"
                    disabled={!modifier}
                            
                />
                </div>
                <div className="flex items-center ml-5">
                  <Field 
                    label="email"  
                    name="email" 
                    type="text"  
                    className="w-96" 
                    disabled={!modifier}
                    />
                </div>
              </div>
              <div className="flex my-7">
              <div className="flex items-center">
                <Field 
                    label="Genre"
                    name="genre"
                    as="select"
                    // optionKeyName="id"
                    optionLabelName="genre"
                    options={["","Homme","Femme"]}
                    className="w-96"
                    disabled={!modifier}       
                />
              </div>
                <div className="flex items-center ml-5 ">

                  <Field 
                    label="Téléphone"  
                    name="phone" 
                    type="text"  
                    className="w-96"
                    disabled={!modifier}
                    />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className=" justify-center col-span-2">
                <div className="grid justify-center">
                  <div className="w-28 h-28  block mt-10">
                  <img src={dataUser.img?.length > 0 ? "/profileImages/"+dataUser.img : "/profileImages/empty-avatar.png"} />
                  </div>
                  <div className="text-sm text-gray-600 ">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>
                        <DotsHorizontalIcon className="w-8 h-8 text-gray-400 m-auto" />
                      </span>
                      <input
                        id="file-upload"
                        name="img"
                        type="file"
                        className="sr-only"
                        disabled={!modifier}
                        onChange={(e) => {setImg(e.target.files[0].name);}}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
              <p onClick={()=>setVisibilite(true)} className={"text-yellow-700 text-xl ml-14 hover:underline cursor-pointer "+(modifier?"visible":"hidden")} >Changer le  mot de passe</p>
              <ChangerMdp visibilite={visibilite} setVisibilite={setVisibilite} dataUser={dataUser} />
          </div>
          <div className="row-span-1">
            { !modifier && (
              <div className="">
                <Bcyan label="Modifier" onClick={() => setModifier(true)} className="float-right mr-28" />
              </div>
            )}
            {modifier && (
              <div className="">
                <Bcancel label="Annuler" onClick={() => setModifier(false)} className="float-right mr-28" />
                  <Bsave  type="submit" className="float-right mr-10" />
                
              </div>
            )}
          </div>
        </div>
      </Form>
    </Section>
  );
}

export default ConsulterUtilisateur;

