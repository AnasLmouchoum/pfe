import React from 'react'
import { Field, Form } from 'widgets';
import Bsave from 'widgets/Bsave';
import Bcancel from 'widgets/Bcancel';
// import { Colis, Palette, palette0 } from '../tools/types';
import Modal from 'widgets/Modal';
import { openPalette } from 'config/rtk/rtkPalette';
import { Colis, Palette, palette0  } from 'tools/types';
// import { openPalette } from '../rtk/rtk_palette';
type NouvellePaletteProps={
    showModal:boolean
    setShowModal:(b:boolean)=>void
    colis:Colis
}
function NouvelPalette({showModal,setShowModal,colis}:NouvellePaletteProps) {
    const PaletteToOpen:any = openPalette()
    // const paletteJson: PaletteJson = PaletteToOpen.data;
    const savePalette = PaletteToOpen.save;
    const close=()=>{
        setShowModal(false);
      }
    const onsubmit = (data:Palette) => {
        data.idClient = colis.idClient;
        savePalette(data)
    }

  return (
    <Modal title={"Nouvelle Palette"} show={showModal} format={5} close={close}>
         <Form  defaultValues={palette0}  onSubmit={onsubmit} >
    <div className='grid grid-rows-6'>
        <div className='grid  row-span-4'>
            <div className='m-auto'> 
                <div className="flex my-5 w-full ">
                    <div className="flex items-center ml-5">
                        <Field 
                            label="N° Palette"  
                            name="nummero_Palette"    
                            type="number"
                            className="w-96" 
                            placeholder="1" />
                    </div>
                    <div className="flex items-center ml-5">
                        <Field  
                            label="Remarque" 
                            name="remarque"  
                            className="w-96" />
                    </div>
                </div>
                <div className="flex my-5">
                    <div className="flex items-center ">
                        <Field 
                            label="Nombre de colis"  
                            name="nombre_colis" 
                            type="number"  
                            className="w-96" 
                            placeholder="20"/>
                    </div>
                </div>  
                <div className=" hidden">
                    <div className="flex items-center ">
                        <Field 
                            label=""  
                            name="idClient" 
                            type="text"  
                            className="w-96" 
                            placeholder="20"
                            value={colis.idClient}
                            />
                    </div>
                </div> 
            </div>
        </div>
        <div className='row-span-1'>
            {/* <div className='' onClick={()=>setSaveNew(true)}>
                <Bcyan label='Sauvgarder et Nouveau' type='submit'  className="    float-left mr-10 w-1/5 "  />
            </div> */}
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

export default NouvelPalette