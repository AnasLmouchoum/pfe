import axios from 'axios'
import { openPalette } from 'config/rtk/rtk_palette'
import React, { useEffect, useState } from 'react'
import { Colis, Palette, PaletteJson } from 'tools/types'
import { Button } from 'widgets'
import Bcyan from 'widgets/Bcyan'
import Table from 'widgets/Table'
// import { openPalette } from '../rtk/rtk_palette'
// import { Colis, Palette, PaletteJson } from '../tools/types'
import ModifPalette from './ModifPalette'
import NouvelPalette from './NouvellePalette'

type PaletteProps={
    showModal:boolean
    setShowModal:(b:boolean)=>void
    colis:Colis
    setShowModalE:(b:boolean)=>void
    showModalE:boolean
}

function Palettes({setShowModalE,showModalE,showModal,setShowModal,colis }:PaletteProps) {
    const [data,setData] = useState()
    const PaletteToOpen:any = openPalette(colis.idClient)
    const paletteJson: PaletteJson = PaletteToOpen.data;
    const refetchPalette = PaletteToOpen.refetch;
    // const fetchData = async () => {
    //     const result = await axios('http://localhost:1000/api/v1/palette/client/'+colis.idClient);
    //     for(let i=0;i<2;i++){
    //         setData(result.data);
    //     }
        
    // };
    useEffect(() => {
        refetchPalette();
      }, []);
      const [paletteR,setPR] = useState<Palette>()

    const [listPret,setListPret] = useState([{
        code:1,
        designation:"vvvvvvv",
        pois_brut:500,
        qntTot:100,
        qnt_rest:100,
        nCmd:5,
        saison:4,
        portion:"Maroc",
        packaging:20
    }])
  return (
    <div className=''>
        <fieldset className=' border-2 rounded-xl'>
            <legend className='ml-5 text-2xl text-gray-400 p-2 '>List des palettes</legend>
            <div className='m-5'>
            <Bcyan label='Nouvelle palette' className='ml-3' onClick={()=>{setShowModal(true)}}/>
             <NouvelPalette  showModal={showModal} setShowModal={setShowModal} colis={colis}/>  
            <Table className='tab-list my-8 px-1 tab-list float-left'
                thead = 
                    {<Table.tr >
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Nº Palette</Table.th>
                        <Table.th className=' top-0 z-10    py-5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Nombre de colis</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Remarque</Table.th>
                        <Table.th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '></Table.th>
                        
                    </Table.tr>}
            >
                {paletteJson?.map((p:Palette) => {
                        return (
                                 <Table.tr key={p.id}  >
                                <Table.td>{p.nummero_Palette}</Table.td>
                                <Table.td>{p.nombre_colis}</Table.td>
                                <Table.td>{p.remarque}</Table.td>
                                <Table.td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-semibold sm:pr-6 md:pr-0">
                                     <Button className="text-green-600 hover:text-green-800" onClick={()=>{setPR(p);setShowModalE(true);}}>Modifier</Button>
                                     
                                     <ModifPalette  showModalE={showModalE} setShowModalE={setShowModalE} palette={paletteR} refetchPalette={refetchPalette}  /> 
                                    </td>
                                </Table.td>                                
                            </Table.tr>
                        )
                    })}
            </Table>
            </div>
        </fieldset>
        </div>
  )
}

export default Palettes