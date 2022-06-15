import React from 'react'
import { Field, Form } from 'widgets';
import Bsave from 'widgets/Bsave';
import Bcancel from 'widgets/Bcancel';
import Modal from 'widgets/Modal';
import { Colis,colis0 } from 'tools/types';
import { OpenCommandeProp, openCommandes } from 'components/gestionProduction/rtk/RtkCommande';
import { Commande, CommandeJson } from 'components/gestionProduction/types';
import axios from 'axios';
type GestionColisCmd={
    showColisCmd:boolean;
    setShowColisCmd:(b:boolean)=>void
    product:any
    idColisage:any
    colisRefetch: any
}
function GestionColisCommande({showColisCmd,setShowColisCmd,product, idColisage, colisRefetch}:GestionColisCmd) {
    const onSubmit = (data:Colis) => {
        const colisCopy: Colis = {...data, 
                                    idArticle:product.idArticle,
                                    idCommande: product.idCommande,
                                    idClient: product.idClient,
                                    portion: product.portion,
                                    idColisage: idColisage,
                                    quantite: data.packing*(data.ncolisA-data.ncolisDe+1)
                                }

        axios.post("http://localhost:1000/api/v1/colis", colisCopy).then(() => {});
        setTimeout(() => {
            colisRefetch();
        }, 500);
        setShowColisCmd(false);
    }
    const close=()=>{
        setShowColisCmd(false)
      }

    const CommandesToOpen: OpenCommandeProp = openCommandes();
    const CommandesJson: CommandeJson = CommandesToOpen.data
    const Commandes: Commande[] = CommandesJson.content

  return (
    <Modal title={"Création des colis commande Ref: "+Commandes?.map(c => {if(c.id === product.idCommande){return c.nbc}}).filter(e=>e)} show={showColisCmd} format={5} close={close}>{/*@ts-ignore*/}
         <Form  defaultValues={colis0}  onSubmit={onSubmit} >
            <div className='grid grid-rows-6'>
                    <div className='grid  row-span-4'>
                        <div className='m-auto'> 
                            <div className="grid grid-cols-1 my-5 w-full  ">
                                <div>
                                    <p className='text-2xl mt-2'>Veuillez préciser les données de génération</p>
                                </div>
                                <div className=" flex align-middle my-5 ">
                                    <p className='text-2xl pt-2'>Packaging (Nombre d'article par colis) : 20 </p>
                                    
                                    <Field  label="Personnaliser" name="packing" type='number' className="w-46 text-2xl"  />
                                </div>
                            </div>
                            <div className="flex my-5">
                                <div className="flex items-center ">
                                   <p className='text-2xl pt-2'>Numéros de colis : </p>
                                   <Field placeholder="de" min={1} name="ncolisDe" type='number' className="w-28 text-2xl" />
                                   <Field placeholder="à" min={1} name="ncolisA" type='number' className="w-28 text-2xl" />
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div className='row-span-1'>
                        <div className="">
                            <Bcancel className="float-right mr-10" onClick={close}/>
                            <Bsave type='submit' className="    float-right mr-10 " />
                        </div>
                    </div>
                </div>
    </Form>
    </Modal>
  )
}

export default GestionColisCommande