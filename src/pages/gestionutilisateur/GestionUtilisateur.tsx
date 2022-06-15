import React, { useState } from "react";
import ListUtilisateur from "components/profile/ListUtilisateur";
import { User, Users } from "tools/types";
import NouvelUtilisateur from "components/profile/NouvelUtilisateur";
import ConsulterUtilisateur from "components/profile/ConsulterUtilisateur";
import { openUsers } from "config/rtk/RtkUser";

function GestionUtilisateur(): JSX.Element {
  const [estAjt, setEstAjt] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [estModifier, setModifier] = useState(false);
  const [user, setUser] = useState({});
  const openToUser = openUsers()
  const listUser = openToUser.data.content;
  const refetchUser = openToUser.refetch;

  return (
    <>
      {!estAjt && !showUser && (
        <ListUtilisateur
          setEstAjt={setEstAjt}
          setShowUser={setShowUser}
          setModifier={setModifier}
          setUser={setUser}
          listUser={listUser}
          refetchUser={refetchUser}
        />
      )}
      {estAjt && !showUser && <NouvelUtilisateur setEstAjt={setEstAjt} refetchUser={refetchUser} />}
      {showUser && !estAjt && (
        <ConsulterUtilisateur
          setShowUser={setShowUser}
          estModifier={estModifier}
          setModifier={setModifier}
          user={user}
          setUser={setUser}
          refetchUser={refetchUser}
        />
      )}
    </>
  );
}

export default GestionUtilisateur;
