import React, { useState, useEffect } from "react";
import Section from "../../widgets/Section";
import { XIcon } from "@heroicons/react/solid";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { ROLE, URL_API_SEC } from "tools/consts";
import { useForm } from "react-hook-form";
import { Field, Form, Input } from "widgets";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { User, user0, Users } from "tools/types";
import Bsave from "widgets/Bsave";
import Bcancel from "widgets/Bcancel";
import Bcyan from "widgets/Bcyan";
import { openUsers } from "config/rtk/RtkUser";
type NouvelUtilisateurProps = {
  setEstAjt: (b: boolean) => void;
  refetchUser:()=>void
};
function NouvelUtilisateur({ setEstAjt,refetchUser}: NouvelUtilisateurProps) {
  const [savenew, setSaveNew] = useState(false);
  const openToUser = openUsers()
  const saveUser = openToUser.save;

  // for(let i=0;i<3;i++)refetchUser()
  const onSubmit = (data: Users) => {
    console.log(data)
    saveUser(data)
    setEstAjt(false);
    if (savenew) {
      setEstAjt(true);
      setSaveNew(false);
    }
    setTimeout(() => {
      refetchUser();
    }, 500);
    // for(let i=0;i<30;i++){
    //   // console.log("Refetch")
    //   refetchUser()
    // }

    //@ts-ignore
  };

  return (
    <Section>
     
      <Form defaultValues={user0} onSubmit={onSubmit}>
        <div className="grid grid-rows-6">
          <div className="row-span-1">
            <h1 className="float-left">Nouvelle utilisateur</h1>
            <XIcon
              className="w-6 h-6 float-right cursor-pointer"
              onClick={() => {setEstAjt(false);refetchUser();}}
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
                    className="w-96"  />
                </div>
                 
                <div className="flex items-center ml-5">
                  <Field 
                    label="prénom"  
                    name="prenom" 
                    type="text"  
                    className="w-96"  />
                </div>
              </div>

              <div className="flex my-7 ">
                <div className="flex items-center">

                  <Field 
                    label="password"  
                    name="password" 
                    type="password"  
                    className="w-96"  />
                </div>
                 
                <div className="flex items-center ml-5">
                  <Field 
                    label="confirmer"  
                    name="copassword" 
                    type="password"  
                    className="w-96"  />
                </div>
              </div>

              <div className="flex my-7">
                <div className="flex items-center">
                  <Field 
                    label="Rôle"
                    name="role"
                    as="select"
                    // optionKeyName="id"
                    optionLabelName="role"
                    options={["","Admin","Utilisateur","Responsable de colisage", "Responsable de production"]}
                    className="w-96"
                            
                />
                </div>
                <div className="flex items-center ml-5">
                  <Field 
                    label="email"  
                    name="email" 
                    type="text"  
                    className="w-96"  />
                </div>
              </div>

              <div className="flex my-7">
                <div className="flex items-center">
                  <Field 
                      label="Genre"
                      name="genre"
                      as="select"
                      options={["","Homme","Femme"]}
                      className="w-96"
                  />
                </div>
                <div className="flex items-center ml-5">
                  <Field 
                    label="Téléphone"  
                    name="phone" 
                    type="text"  
                    className="w-96"  />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className=" justify-center col-span-2">
                <div className="grid justify-center">
                  <div className="w-40 h-40  block mt-10">
                  <img src="/images/empty-avatar.png" />
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
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-1">
            <div className="" onClick={() => setSaveNew(true)}>
              <Bcyan label="Sauvgarder et Nouveau" type="submit" className="float-left mr-10 h-10 w-52"  />
            </div>
            <div className="">

              <Bcancel label="Annuler" onClick={() => setEstAjt(false)} className="float-right mr-10" />

              <Bsave type="submit" className=" float-right mr-10" />
            </div>
          </div>
        </div>
      </Form>
    </Section>
  );
}

export default NouvelUtilisateur;
