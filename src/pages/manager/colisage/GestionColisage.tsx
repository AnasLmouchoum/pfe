import React, { useState } from "react";
import { Client, ClientJson } from "components/gestionProduction/types";
import ListColisage from "features/colisage/Listcolisage";
import FicheDeColisage from "features/colisage/FicheDeColisage";
import NouvelFich from "features/colisage/NouvelFich";
import { colis0 } from "tools/types";
import { openClients } from "components/gestionProduction/rtk/RtkClient";
import { openColisage } from "config/rtk/rtkColisage";
// import NouvelPalette from 'components/manager/colisage/NouvellePalette';

function GestionColisge(): JSX.Element {
  const ClientToOpen: any = openClients();
  const ClientJson: ClientJson = ClientToOpen.data;
  const Client: Client[] = ClientJson.content;
  const [estAjt, setEstAjt] = useState(false);
  const [showColis, setShowColis] = useState(false);
  const [estModifier, setModifier] = useState(false);
  const [colis, setColis] = useState(colis0);

  const ColisageToOpen:any = openColisage(0);
  const colisageRefetch = ColisageToOpen.refetch;

  return (
    <>
      {!estAjt && !showColis && (
        <ListColisage
          setEstAjt={setEstAjt}
          setShowColis={setShowColis}
          setModifier={setModifier}
          setColis={setColis}
          Client={Client}
        />
      )}
      {estAjt && !showColis && (
        <NouvelFich setEstAjt={setEstAjt} Client={Client} refetchColis={colisageRefetch} />
      )}
      {showColis && !estAjt && (
        <FicheDeColisage
          setShowColis={setShowColis}
          estModifier={estModifier}
          setModifier={setModifier}
          //@ts-ignore
          colis={colis}
          //@ts-ignore
          setColis={setColis}
          Client={Client}
        />
      )}
    </>
  );
}

export default GestionColisge;
