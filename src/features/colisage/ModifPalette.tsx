import React, { useEffect, useState } from 'react'
// import Section from "../../../widgets/Section"
import { MinusIcon, XIcon } from '@heroicons/react/solid';
import { Field, Form } from 'widgets';
import Bsave from 'widgets/Bsave';
import Bcancel from 'widgets/Bcancel';
import { Colis, ColisJson, ColisPalette, ColisPaletteJson, Palette, paletteM } from 'tools/types';
import Modal from 'widgets/Modal';
import Table from 'widgets/Table';
import { openAllPalette } from 'config/rtk/rtkPalette';
import axios from 'axios';
import { OpenArticleProp, openArticles } from 'components/gestionProduction/rtk/RtkArticle';
import { Article, ArticleJson, Commande, CommandeJson } from 'components/gestionProduction/types';
import { OpenCommandeProp, openCommandes } from 'components/gestionProduction/rtk/RtkCommande';
import { OpenColisPaletteProp, openColisPalettes } from 'config/rtk/rtkColisPalette';
import { openAllColis } from 'config/rtk/rtkColis';
import RemoveFromPalette from './RemoveFromPalette';
// import { Palette, palette0 } from '../tools/types';
// import { openPalette } from '../rtk/rtk_palette';
type NouvellePaletteProps={
    showModalE:boolean
    setShowModalE:(b:boolean)=>void
    palette:Palette
    refetchPalette:()=>void
}
function ModifPalette({showModalE,setShowModalE,palette,refetchPalette}:NouvellePaletteProps) {
    const PaletteToOpen:any = openAllPalette()
    const savePalette = PaletteToOpen.save;
    // const refetchPalette = PaletteToOpen.refetch;

    // const [colisPalettes, setColisPalettes] = useState<ColisPalette[]>([])
    // useEffect(()=>{
    //     axios.get("http://localhost:1000/api/v1/colisPalettes").then((resp) => {
    //         setColisPalettes(colisPalettes.concat(resp.data.content));
    //     })
    // },[])
    // const [colis, setColis] = useState<Colis[]>([])
    // useEffect(()=>{
    //     axios.get("http://localhost:1000/api/v1/colis").then((resp) => {
    //         setColis(colis.concat(resp.data.content));
    //     })
    // },[])
    const colisToOpen = openAllColis()
    const colisJson:ColisJson = colisToOpen.data;
    const colis: Colis[] = colisJson.content;
    const colisRefetch = colisToOpen.refetch;
    //*******************************//
    //************ARTICLE************//
    const ColisPalettesToOpen: OpenColisPaletteProp = openColisPalettes();
    const ColisPalettesJson: ColisPaletteJson = ColisPalettesToOpen.data;
    const ColisPalettes: ColisPalette[] = ColisPalettesJson.content;
    const refetchColisPalette = ColisPalettesToOpen.refetch;

    //*******************************//
    //************ARTICLE************//
    const ArticlesToOpen: OpenArticleProp = openArticles();
    const ArticleJson: ArticleJson = ArticlesToOpen.data;
    const Articles: Article[] = ArticleJson.content;

    //*******************************//
    //************COMMANDE***********//
    const CommandesToOpen: OpenCommandeProp = openCommandes();
    const CommandesJson: CommandeJson = CommandesToOpen.data
    const Commandes: Commande[] = CommandesJson.content

    const close=()=>{
        setShowModalE(false);
    }
    const submit = (data:Palette) => {
            savePalette(data)
            
            close()
            refetchPalette();
            
    }
    
    const [showAnnulation, setShowAnnulation] = useState(false);

  return (
    <Modal title={"Nouvelle Palette"} show={showModalE} format={5} close={close}>{/*@ts-ignore*/}
         <Form defaultValues={palette}   onSubmit={submit} >
    <div className='grid grid-rows-6'>
        <div className='grid  row-span-4'>
            <div className='m-auto'> 
                <div className="flex my-5 w-full ">
                    <div className="flex items-center">
                        <Field 
                            label="N° Palette"  
                            name="nummero_Palette" 
                            type="number"  
                            className="w-96" 
                            
                            />
                    </div>
                    <div className="flex items-center ml-5">
                        <Field  
                            label="Remarque" 
                            name="remarque"
                            type="text"  
                            className="w-96" 
                            />
                    </div>
                </div>
                <div className="flex my-5">
                    <div className="flex items-center ">
                        <Field
                            label="Nombre de colis"  
                            name="nombre_colis" 
                            type="number"  
                            className="w-96" 
                            
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
    <div className=''>
            <div className='m-5'>
            <Table className='tab-list my-8 px-1 tab-list float-left'
                thead = 
                    {<Table.tr >
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Code Article</Table.th>
                        <Table.th className=' top-0 z-10    py-5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Designation</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Nº Commande</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Saison</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Portion</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Nombre de colis</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '></Table.th>
                    </Table.tr>}
            >
                {ColisPalettes?.map((p: any) => {
                    if(p.idPalette == palette?.id)
                        return (
                            <Table.tr key={p.code}  >
                                <Table.td>{Articles?.map(a => {if(a.id == (colis?.map(c => {if(c.id == p.idColis)return c.idArticle}).filter(e => e)[0] || ''))return a.codeArt})}</Table.td>
                                <Table.td>{Articles?.map(a => {if(a.id == (colis?.map(c => {if(c.id == p.idColis)return c.idArticle}).filter(e => e)[0] || ''))return a.designation})}</Table.td>
                                <Table.td>{Commandes?.map(cm => {if(cm.id == (colis?.map(c => {if(c.id == p.idColis)return c.idCommande}).filter(e => e)[0] || ''))return cm.nbc})}</Table.td>
                                <Table.td>{Commandes?.map(cm => {if(cm.id == (colis?.map(c => {if(c.id == p.idColis)return c.idCommande}).filter(e => e)[0] || ''))return cm.season})}</Table.td>
                                <Table.td>{colis?.map(c => {if(c.id == p.idColis)return c.portion}).filter(e => e)/*@ts-ignore*/}</Table.td>
                                <Table.td>{colis?.map(c => {if(c.id == p.idColis)return c.ncolisA}).filter(e => e) - colis?.map(c => {if(c.id == p.idColis)return c.ncolisDe}).filter(e => e) + 1}</Table.td>
                                <Table.td className='cursor-pointer'>
                                <MinusIcon className='w-7 h-7 border-2 rounded-full border-black text-black ' onClick={()=>setShowAnnulation(true)}   />
                                <RemoveFromPalette showAnnulation={showAnnulation} setshowAnnulation={setShowAnnulation} refetchColisPalette={refetchColisPalette} colisRefetch={colisRefetch} colis={colis?.filter(c => c.id == p.idColis)[0]} id={p.id}  />
                                </Table.td>
                            </Table.tr>
                        )
                    })}
            </Table>
            </div>
        </div>
    </Modal>
  )
}

export default ModifPalette