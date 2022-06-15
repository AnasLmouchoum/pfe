import React from 'react'
import {  Form } from 'widgets';
import Modal from 'widgets/Modal';
import Bcyan from 'widgets/Bcyan';
import axios from 'axios';
import { Colis } from 'tools/types';
type AnnulationCommande={
    showAnnulation:boolean;
    setshowAnnulation:(b:boolean)=>void
    colisRefetch:() => void
    id:String
    colis: Colis
    refetchColisPalette: any
}
function RemoveFromPalette({showAnnulation,setshowAnnulation,colisRefetch,id,colis,refetchColisPalette}:AnnulationCommande) {

    const onSubmit = () => {
        axios.delete('http://localhost:1000/api/v1/colisPalettes/'+id);
        const colisCopy = {...colis, inPalette: false}
        axios.post("http://localhost:1000/api/v1/colis", colisCopy);
        colisRefetch();
        setTimeout(() => {
            refetchColisPalette();
        }, 500);
        close();
    }
    const close=()=>{
        setshowAnnulation(false);
      }

  return (
    <Modal title={"Nouvelle Palette"} show={showAnnulation} format={3} close={close} >
         <Form   onSubmit={onSubmit} >
    <div className='grid grid-rows-6 w-100'>
        <div className='grid  row-span-4 justify-center mt-10'>
            <p className='text-2xl pt-2'>Voulez-vous annuler les colis sélectionnées ?</p>
        </div>
        <div className='row-span-1'>
            {/* <div className='' onClick={()=>setSaveNew(true)}>
                <Bcyan label='Sauvgarder et Nouveau' type='submit'  className="    float-left mr-10 w-1/5 "  />
            </div> */}
            <div className="">
                <Bcyan label='Non'  className="float-right mr-10" onClick={close}/>
                <Bcyan label='Oui' type='submit' className="    float-right mr-10 " />
            </div>
        </div>
    </div>
    </Form>
    </Modal>
  )
}

export default RemoveFromPalette