import React from 'react'
import Section from "widgets/Section"
import { XIcon } from '@heroicons/react/solid';
import { Field, Form } from 'widgets';
import Bsave from 'widgets/Bsave';
import Bcancel from 'widgets/Bcancel';
import { openColisage } from 'config/rtk/rtk_colisage';
import { Client, ClientJson, Colis, colis0, ColisJson } from 'tools/types';
// import { Client, ClientJson, Colis, colis0, ColisJson } from '../tools/types';
// import { openClients } from '../rtk/rtk_client';
// import { openColisage } from '../rtk/rtk_colisage';
type NouvelUtilisateurProps={
    setEstAjt:(b:boolean)=>void
    ClientJson:ClientJson
}
function NouvelFich({setEstAjt,ClientJson}:NouvelUtilisateurProps) {

    const ColisToOpen:any = openColisage()
    const colisJson: ColisJson = ColisToOpen.data;
    const saveColis = ColisToOpen.save;
    const onsubmit = (data:Colis) =>{
        saveColis(data)
        setEstAjt(false)
        
    }
    
    
  return (
    <Section>
         <Form  defaultValues={colis0}  onSubmit={onsubmit} >
    <div className='grid grid-rows-6'>
        <div className='row-span-1'>
            <p className='float-left text-xl'>Nouvelle Fiche Collissage </p>
            <XIcon className='w-6 h-6 float-right cursor-pointer' onClick={()=>setEstAjt(false)} />
        </div>
        <div className='grid  row-span-4'>
            <div className='m-auto'> 
                <div className="flex my-5 w-full ">
                    <div className="flex items-center">
                        <Field 
                            label="Client"
                            name="idClient"
                            as="select"
                            optionKeyName="id"
                            optionLabelName="design"
                            options={["",...ClientJson]}
                            className="w-96"
                            
                             />
                    </div>
                    <div className="flex items-center ml-5">
                        <Field label="Date de Colisage"  name="date_colisage" type="date"  className="w-96"  />
                    </div>
                </div>
                <div className="flex my-5">
                    <div className="flex items-center ">
                        <Field label="Poids brut" type="number" name="pois_brut"  className="w-96" />
                    </div>
                    <div className="flex items-center ml-5">
                        <Field label="Nombre de palettes" type="number" name="nombre_palettes"  className="w-96" />
                    </div>
                </div>  
            </div>
        </div>
        <div className='row-span-1'>
            <div className="">
                
                <Bcancel onClick={()=> setEstAjt(false)} className="    float-right mr-10 " />
                <Bsave type='submit'    className="float-right mr-10 " />
                
            </div>
        </div>
    </div>
    </Form>
</Section>
  )
}

export default NouvelFich