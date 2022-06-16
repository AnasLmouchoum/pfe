import React, { useState, useEffect } from "react";
import Section from "../../widgets/Section";
import {  XIcon } from "@heroicons/react/solid";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { Field, Form } from "widgets";
import Bcyan from "widgets/Bcyan";
import Bcancel from "widgets/Bcancel";
import Bsave from "widgets/Bsave";
import { openOneUser } from "config/rtk/RtkUser";
type ConsulterUtilisateurProps = {
  setShowUser: (b: boolean) => void;
  estModifier: boolean;
  setModifier: (b: boolean) => void;
  user: any;
  refetchUser:()=>void
  setUser:(b:boolean)=>void
};

function ConsulterUtilisateur({
  setShowUser,
  estModifier,
  setModifier,
  user,
  setUser,
  refetchUser
}: ConsulterUtilisateurProps) {
  const openToOneClient = openOneUser(user?.id)
  const editUsers = openToOneClient.edit
  const onSubmit = (data: any) => {
    setModifier(false)
    editUsers({...data, img: img})
    setUser(data)
    setTimeout(() => {
      refetchUser();
    }, 500);
  }

  const [img, setImg] = useState('');
  
  return (
    <Section>
      <Form defaultValues={user} onSubmit={onSubmit}>
        <div className="grid grid-rows-6">
          <div className="row-span-1">
            <h1 className="float-left">Détail d'utilisateur</h1>
            <XIcon
              className="w-6 h-6 float-right cursor-pointer"
              onClick={() => {setShowUser(false);refetchUser();}}
            />
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
                    disabled={!estModifier}
                    />
                </div>
                 
                <div className="flex items-center ml-5">
                  <Field 
                    label="prénom"  
                    name="prenom" 
                    type="text"  
                    className="w-96"
                    disabled={!estModifier}
                    />
                </div>
              </div>
              <div className="flex my-7">
                <div className="flex items-center my-5">
                  <Field 
                    label="Rôle"
                    name="role"
                    as="select"
                    // optionKeyName="id"
                    // optionLabelName="design"
                    options={["","Admin","User","Manager"]}
                    className="w-96"
                    disabled={!estModifier}
                            
                />
                </div>
                <div className="flex items-center ml-5">
                  <Field 
                    label="email"  
                    name="email" 
                    type="text"  
                    className="w-96" 
                    disabled={!estModifier}
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
                      disabled={!estModifier}       
                  />
                </div>
                <div className="flex items-center ml-5 ">

                  <Field 
                    label="Téléphone"  
                    name="phone" 
                    type="text"  
                    className="w-96"
                    disabled={!estModifier}
                    />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className=" justify-center col-span-2">
                <div className="grid justify-center">
                  <div className="w-28 h-28  block mt-10">
                  <img src={user.img?.length > 0 ? "/profileImages/"+user.img : "/profileImages/empty-avatar.png"} />
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
                        disabled={!estModifier}
                        onChange={(e) => {setImg(e.target.files[0].name)}}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-1">
            {!estModifier && (
              <div className="">
                <Bcyan label="Modifier" onClick={() => setModifier(true)} className="float-right mr-28" />
              </div>
            )}
            {estModifier && (
              <div className="">
                <Bcancel label="Annuler" onClick={() => setModifier(false)} className="float-right mr-28" />
                <Bsave /*onClick={() => setModifier(false)}*/ type="submit" className="float-right mr-10" />
              </div>
            )}
          </div>
        </div>
      </Form>
    </Section>
  );
}

export default ConsulterUtilisateur;
