import React from 'react'
import { Field, Form } from 'widgets';
import Bsave from 'widgets/Bsave';
import Bcancel from 'widgets/Bcancel';
// import { Colis, palette0 , } from '../tools/types';
import Modal from 'widgets/Modal';
import { Colis,palette0 } from 'tools/types';
type GestionColisCmd={
    showColisCmd:boolean;
    setShowColisCmd:(b:boolean)=>void
    colis:Colis
}
function GestionColisCommande({showColisCmd,setShowColisCmd,colis}:GestionColisCmd) {
    const onSubmit = (data:any) => {
        console.log(data)
  
    }
    const close=()=>{
        setShowColisCmd(false)
      }

  return (
    <Modal title={"Création des colis commande Ref: "+colis.id} show={showColisCmd} format={5} close={close}>
         <Form  defaultValues={palette0}  onSubmit={onSubmit} >
            <div className='grid grid-rows-6'>
                    <div className='grid  row-span-4'>
                        <div className='m-auto'> 
                            <div className="grid grid-cols-1 my-5 w-full  ">
                                <div>
                                    <p className='text-2xl mt-2'>Veuillez préciser les données de génération</p>
                                </div>
                                <div className=" flex align-middle my-5 ">
                                    <p className='text-2xl pt-2'>Packaging (Nombre d'article par colis) : 20 </p>
                                    
                                    <Field  label="Personnaliser" name="Remarque"  className="w-46 text-2xl"  />
                                </div>
                            </div>
                            <div className="flex my-5">
                                <div className="flex items-center ">
                                   <p className='text-2xl pt-2'>Numéros de colis : </p>
                                   <Field  label="de" name="Remarque"  className="w-20 text-2xl" />
                                   <Field  label="à" name="Remarque"  className="w-20 text-2xl" />
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