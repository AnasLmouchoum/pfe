import React, { useState } from 'react'
// import ListColisage from 'components/colisage/features/Listcolisage';
import ListColisage from 'features/colisage/Listcolisage'; 
import FicheDeColisage from 'features/colisage/FicheDeColisage';
import NouvelFich from 'features/colisage/NouvelFich'
import { ClientJson, colis0 } from 'tools/types';
import { openClients } from 'config/rtk/RtkClient';
import { openColisage } from 'config/rtk/rtk_colisage';

// import NouvelPalette from 'components/manager/colisage/NouvellePalette';




function GestionColisge():JSX.Element {
  const ClientToOpen: any = openClients();
    const ClientJson: ClientJson = ClientToOpen.data.content
    const [estAjt,setEstAjt] = useState(false);
    const [showColis,setShowColis] = useState(false);
    const [estModifier,setModifier] = useState(false)
    const [colis,setColis] = useState(colis0)

  return <>
         { !estAjt && !showColis && <ListColisage setEstAjt={setEstAjt}  setShowColis={setShowColis}   setModifier={setModifier} setColis={setColis} ClientJson={ClientJson}  />
        
      }
      { estAjt && !showColis && <NouvelFich setEstAjt={setEstAjt} ClientJson={ClientJson}   />

      }
      { showColis && !estAjt && <FicheDeColisage setShowColis={setShowColis}  estModifier={estModifier} setModifier={setModifier} colis={colis} setColis={setColis} ClientJson={ClientJson} />
      
      }
 
  </>
     
}

export default GestionColisge