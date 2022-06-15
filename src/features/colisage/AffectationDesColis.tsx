import React, { useEffect, useState } from 'react'
import { Field, Form } from 'widgets';
import Bsave from 'widgets/Bsave';
import Bcancel from 'widgets/Bcancel';
import Modal from 'widgets/Modal';
import axios from 'axios';
import { Colis, colPal0 } from 'tools/types';
import { OpenColisPaletteProp, openColisPalettes } from 'config/rtk/rtkColisPalette';
type AffectationColis={
    showAffectation:boolean;
    setshowAffectation:(b:boolean)=>void
    colis: Colis
    refetchColis: any
}
function GestionColisCommande({showAffectation,setshowAffectation, colis, refetchColis}:AffectationColis) {
    const [dataa,setData] = useState([])
    const fetchData = async () => {
        const result = await axios('http://localhost:1000/api/v1/palette');
        console.log(dataa);
        setData(result.data.content);
    };
    const ColisPalettesToOpen: OpenColisPaletteProp = openColisPalettes();
    const refetchColisPalette = ColisPalettesToOpen.refetch;
    useEffect(() => {
        fetchData();
        refetchColisPalette();
      }, []);
    const onSubmit = (data:any) => {
        // console.log({...data, idClient: idClient})
        const colisCopy = {...colis, inPalette: true};
        axios.post("http://localhost:1000/api/v1/colis", colisCopy);
        axios.post("http://localhost:1000/api/v1/colisPalettes", {...data, idColis: colis.id}).then(() => {});
        // refetchColis();
        // for(let i = 0; i<3; i++){
        //     refetchColisPalette();
        // }
        setTimeout(() => {
            refetchColisPalette();
            refetchColis();
        }, 500);
        close();
    }
    const close=()=>{
        setshowAffectation(false)
      }

  return (
    <Modal title={"Affectation des colis"} show={showAffectation} format={5} close={close}>
         <Form onSubmit={onSubmit} >
         <div className='grid grid-rows-6'>
                    <div className='grid  row-span-4'>
                        <div className='m-auto'> 
                            <div className="grid grid-cols-1 my-5 w-full  ">
                                <div>
                                    <p className='text-2xl pt-2'>Veuillez préciser les numéros des palettes</p>
                                </div>
                            </div>
                            {/* <div className="flex my-5">
                                <div className="flex items-center ">
                                   <p className='text-2xl pt-2'>Nombre de colis : </p>
                                   <Field  
                                        label="de" 
                                        name="ncolisDe"  
                                        className="w-20 text-2xl" />
                                   <Field  
                                        label="à" 
                                        name="ncolisA"
                                        
                                        // onChange={(e:any)=>setA(e.target.value)}
                                        className="w-20 text-2xl" />
                                </div>
                            </div> */}
                            <div className=''>
                                <div className=" flex   my-5">
                                    {/* <p className=''></p> */}
                                    
                                    <Field  
                                        label="La palette de destination" 
                                        name="idPalette"  
                                        optionKeyName="id"
                                        optionLabelName="nummero_Palette"
                                        options={["",...(dataa || [])]}
                                        className="w-50 text-2xl"
                                        as="select"
                                        
                                        />
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