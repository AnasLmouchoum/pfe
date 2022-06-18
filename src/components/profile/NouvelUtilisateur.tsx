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
import Required from "widgets/Required";
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


    if(password == confPassword){
      saveUser({...data, img: img, password: password});
      setEstAjt(false);
      if (savenew) {
        setEstAjt(true);
        setSaveNew(false);
      }
      setTimeout(() => {
        refetchUser();
      }, 500);
    }else{
      setHide('block');
      setConfPassword("");
    }
    
  };

  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [hide, setHide] = useState('hidden');

  const [img, setImg] = useState('');

  return (
    <Section>
     
      <Form defaultValues={user0} onSubmit={onSubmit}>
        <div className="grid grid-rows-6">
          <div className="row-span-1">
            <h1 className="float-left">Nouvel utilisateur</h1>
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
                    label={<Required msg='Nom' />}
                    name="nom" 
                    type="text"  
                    className="w-96" required />
                </div>
                 
                <div className="flex items-center ml-5">
                  <Field 
                    label={<Required msg='prénom' />}  
                    name="prenom" 
                    type="text"  
                    className="w-96" required />
                </div>
              </div>

              <div className="flex my-7 ">
                <div className="flex items-center">

                  <Field 
                    label={<Required msg='Password' />}
                    name="password" 
                    type="password" 
                    onChange = {(e) => {setPassword(e.target.value); setHide('hidden');}} 
                    className="w-96" required />
                </div>
                 
                <div className="grid grid-cols-1 items-center ml-5">
                  <Field 
                    label={<Required msg='confirmer' />}
                    name="copassword" 
                    type="password"  
                    onChange = {(e) => {setConfPassword(e.target.value); setHide('hidden');}} 
                    value={confPassword}
                    className="w-96" required />
                    <p className={"text-red-700 ml-28 "+hide} >Mot de passe de confirmation incorrect</p>
                </div>
              </div>

              <div className="flex my-7">
                <div className="flex items-center">
                  <Field 
                    label={<Required msg='Rôle' />}
                    name="role"
                    as="select"
                    // optionKeyName="id"
                    optionLabelName="role"
                    options={["","Admin","Utilisateur","Responsable de colisage", "Responsable de production"]}
                    className="w-96"
                    required
                />
                </div>
                <div className="flex items-center ml-5">
                  <Field 
                    label={<Required msg='Email' />}  
                    name="email" 
                    type="email"  
                    className="w-96" required />
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
                  <div className="w-28 h-28 ml-10  block mt-10">
                  <img src="/profileImages/empty-avatar.png" />
                  </div>
                  <div className="text-sm ml-10 text-gray-600 ">
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
                        onChange={(e) => {setImg(e.target.files[0].name);}}
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

              <Bcyan label="Sauvgarder" type="submit" className=" float-right mr-10" />
            </div>
          </div>
        </div>
      </Form>
    </Section>
  );
}

export default NouvelUtilisateur;
