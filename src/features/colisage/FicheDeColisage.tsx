import React, {  useState } from 'react';
import Section from 'widgets/Section';
// import { ClientJson, Colisage, colisage0 } from '../tools/types';
import {  Field, Form } from 'widgets';
import { XIcon } from '@heroicons/react/solid';
import Bcyan from 'widgets/Bcyan';
import Bcancel from 'widgets/Bcancel';
import Bsave from 'widgets/Bsave';

import { openColisage } from 'config/rtk/rtkColisage';
import Palettes from './Palettes';
import ListeColis from './ListeColis';
import ListeDesCommandesPrete from './ListeDesCommandesPrete';
import { ClientJson, Colisage, colisage0 } from 'tools/types';
import { Client } from 'components/gestionProduction/types';
import Required from 'widgets/Required';

type ConsulterUtilisateurProps={
    setShowColis:(b:boolean)=>void
    estModifier:boolean
    setModifier:(b:boolean)=>void
    colis:Colisage
    Client:Client[]
    setColis:(b:boolean)=>void
}

function FicheDeColisage({setShowColis,estModifier,setModifier,colis,setColis,Client}:ConsulterUtilisateurProps) {
    const [page, setPage] = useState(0);
    const ColisToOpen:any = openColisage(page)
    const saveColis = ColisToOpen.save; 
    const refetchColis = ColisToOpen.refetch
    const [showModal, setShowModal] = useState(false);
    const [showModalE, setShowModalE] = useState(false);
    const [showColisCmd,setShowColisCmd] = useState(false)
    const [showAffectation,setshowAffectation] = useState(false)
    const [showAnnulation,setShowAnnulation] = useState(false)
    const change = (obj:String,val:String|Number|Date) =>{
        //@ts-ignore
         setColis({
            ...colis,//@ts-ignore
            [obj]:val
        })
       
    }



  return (
    <Section>
            <Form  defaultValues={colisage0}  onSubmit={()=>{saveColis(colis);setTimeout(() => {refetchColis()}, 500);;setModifier(false)}} >
            <div className='grid grid-rows-6'>
                <div className='row-span-1'>
                    <p className='float-left text-xl'>Fiche de colisage le {colis.date_colisage}</p>
                    <XIcon className='w-6 h-6 float-right cursor-pointer' onClick={()=>{setShowColis(false);setModifier(false)}} />
                    {/* <XIcon className='w-6 h-6 float-right cursor-pointer' onClick={()=>{}} /> */}
                </div>
                <div className='grid  row-span-4'>
                    <div className='m-auto'> 
                        <div className="flex my-5 w-full ">
                            <div className="flex items-center">
                                <Field 
                                    label={<Required msg='Client' />}
                                    name="client"
                                    as="select"
                                    optionKeyName="id"
                                    optionLabelName="design"
                                    options={["",...(Client || [])]}
                                    className="w-96"
                                    disabled={!estModifier}
                                    value={colis.idClient}
                                    onChange={(e:any)=> change("idClient",e.target.value)}
                                    required
                                    />
                            </div>
                            <div className="flex items-center ml-5">
                                <Field 
                                    label={<Required msg='Date de Colisage' />} 
                                    name="date_colisage" 
                                    type="date"  
                                    className="w-96" 
                                    disabled={!estModifier}
                                    value={colis.date_colisage}
                                    onChange={(e:any)=> change("date_colisage",e.target.value)}
                                    required
                                 />
                            </div>
                        </div>
                        <div className="flex my-5">
                            <div className="flex items-center ">
                                <Field 
                                    label="Poids brut" 
                                    type="number" 
                                    name="pois_brut"  
                                    className="w-96"
                                    disabled={!estModifier}
                                    value={colis.pois_brut}
                                    onChange={(e:any)=> change("pois_brut",e.target.value)}
                                    />
                            </div>
                            <div className="flex items-center ml-5">
                                <Field 
                                    label="Nombre de palettes" 
                                    type="number" 
                                    name="nombre_palettes"  
                                    className="w-96"
                                    disabled={!estModifier}
                                    value={colis.nombre_palettes}
                                    onChange={(e:any)=> change("nombre_palettes",e.target.value)}
                                     />
                            </div>
                        </div> 
                        <div className="flex my-5 w-full">
                            <div className="flex items-center ">
                                <Field 
                                    label="Poids net" 
                                    type="number" 
                                    name="pois_net"  
                                    className="w-96"
                                    disabled={!estModifier}
                                    value={colis.pois_net}
                                    onChange={(e:any)=> change("pois_net",e.target.value)}
                                    />
                            </div>
                        </div> 
                    </div>
                </div>
                <div className='row-span-1'>
                    {
                    !estModifier && <div className="">
                        <Bcyan onClick={()=> setModifier(true)} label="Modifier" className="float-right mr-28 " />
                    </div>
                    }
                    {
                    estModifier && <div className="">
                        <Bcancel onClick={()=> setModifier(false)} label="" className="float-right mr-28 " />
                        <Bsave type='submit' /*onClick={() => setModifier(false)}*/  className="float-right mr-10 " />
                    </div>
                    }
                </div>
            </div>
        </Form>
        <div>
            <ListeDesCommandesPrete showColisCmd={showColisCmd} setShowColisCmd={setShowColisCmd} colis={colis} />
        </div>
        <div>
            <ListeColis  showAnnulation={showAnnulation} setShowAnnulation={setShowAnnulation} showAffectation={showAffectation} setshowAffectation={setshowAffectation} colis={colis} />
        </div>
        
        <div>
            <Palettes setShowModalE={setShowModalE} showModalE={showModalE} showModal={showModal} setShowModal={setShowModal}  colis={colis}/>
        </div>
        
        </Section>
  )
}

export default FicheDeColisage

