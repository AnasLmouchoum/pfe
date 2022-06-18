import React, { useState } from "react";
import ListUtilisateur from "components/profile/ListUtilisateur";
import NouvelUtilisateur from "components/profile/NouvelUtilisateur";
import ConsulterUtilisateur from "components/profile/ConsulterUtilisateur";
import { openPaginationUsers, openUsers } from "config/rtk/RtkUser";

function GestionUtilisateur(): JSX.Element {
  const [estAjt, setEstAjt] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [estModifier, setModifier] = useState(false);
  const [user, setUser] = useState({});
  // const openToUser = openUsers()
  // const listUser = openToUser.data.content;

  const [page, setPage] = useState(0);
  // const openToUsers = openUsers()
  // const DataUsers = openToUsers.data.content;
  // console.log(DataUsers)
  const loadPage = (p: number) => {
    setPage(p);
    refetchUser();
    // refetch();
  };
  const openToUser = openPaginationUsers(page)
  const listUser = openToUser.data.content;
  console.log(listUser)
  const refetchUser = openToUser.refetch;
  const openToUsers = openUsers()
  const refetchDataUser = openToUsers.refetch;

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
          refetchDataUser={refetchDataUser}
        />
      )}
    </>
  );
}

export default GestionUtilisateur;
