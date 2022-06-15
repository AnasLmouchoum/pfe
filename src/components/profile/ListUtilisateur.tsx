import React, { useEffect, useRef, useState } from "react";
import Section from "../../widgets/Section";
import { SearchIcon } from "@heroicons/react/solid";
import Table from "widgets/Table";
import { ARCHIVE, DEL, REQUEST_EDIT, REQUEST_SAVE, RESTORE } from 'tools/consts';
import {
  ArchiveIcon,
  ClipboardListIcon,
  TableIcon,
  PencilAltIcon,
  ReplyIcon,
  TrashIcon,
  BriefcaseIcon,
} from "@heroicons/react/solid";
import Mitems from "widgets/Mitems";
import { MenuItems } from "widgets/TypeWidgets";
import axios from "axios";
import { useRouter } from "next/router";
// import { usePaginationClientsQuery } from "config/rtk";
import Pagin from "widgets/Pagin";
import { URL_API_SEC } from "tools/consts";
import { usePaginationArticleClientsQuery } from "config/rtk/RtkArticleClient";
import Bcyan from "widgets/Bcyan";
import Action from "widgets/Action";
import { openUsers } from "config/rtk/RtkUser";

type ListUtilisateurProps = {
  setEstAjt: (b: boolean) => void;
  setShowUser: (b: boolean) => void;
  setModifier: (b: boolean) => void;
  setUser: (b: boolean) => void;
  refetchUser:()=>void;
  listUser:any;
};

function ListUtilisateur({
  setEstAjt,
  setShowUser,
  setModifier,
  setUser,
  listUser,
  refetchUser,
}: ListUtilisateurProps) {
  // const [data, setData] = useState([]);
  // const [users, setUsers] = useState([]);
  const router = useRouter();
  const [page, setPage] = useState(0);
  // const openToUsers = openUsers()
  // const DataUsers = openToUsers.data.content;
  // console.log(DataUsers)
  const loadPage = (p: number) => {
    setPage(p);
    refetchUser();
    // refetch();
  };
  // const myTimeout = setTimeout(myGreeting, 100);

  // function myGreeting() {
  //   refetchUser()
  //   console.log("refeteched")
  // }
  
  // console.log("refetch 99")
  const FormAsUpdate = (u: any) => {
    setUser(u);
    setShowUser(true);
    setModifier(true);
  };
  const deleteUser = (u: String) => {
    console.log(u)
    axios.delete(process.env.NEXT_PUBLIC_URL+ "/users/" +u).then(
      (response) => {
        console.log("Record Deleted Successfully");
      },
      (error) => {
        console.log("Operation Failed Here");
        console.log(error)
      }
    );
    //@ts-ignore
    for(let i=0;i<3;i++)refetchUser()
  };
  const FromDetails = (u:any) => {
    console.log("FromDetailsUser")
    setUser(u)
    setShowUser(true);
    
};
const del = useRef(null);
const edit = useRef(null);
const update = useRef(null);

  //sdfsdf
  // const menu = (user: any): MenuItems[] => {
  //   return [
  //     {
  //       icon: (
  //         <ClipboardListIcon
  //           className="mr-3 h-8 w-8 text-green-300 group-hover:text-gray-500"
  //           aria-hidden="true"
  //         />
  //       ),
  //       text: "Détail",
  //       action: () => {
  //         // console.log(user)
  //         FromDetails(user);
  //       },
  //     },
  //     {
  //       icon: (
  //         <PencilAltIcon
  //           className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
  //           aria-hidden="true"
  //         />
  //       ),
  //       text: "Modifier",
  //       action: () => {
  //         FormAsUpdate(user);
  //       },
  //     },
  //     {
  //       icon: (
  //         <TrashIcon
  //           className="mr-3 h-8 w-8 text-rose-900 group-hover:text-gray-500"
  //           aria-hidden="true"
  //         />
  //       ),
  //       text: "Supprimer",
  //       action: () => {
  //         deleteProduct(user);
  //       },
  //     },
  //   ];
  // };
  return (
    <Section>
         <Action
						id=''
						path='user'
						design=''
						type='user'
						ref={del}
						action={DEL}
					/>
          <Action
						id=''
						path='user'
						design=''
						type='user'
						ref={edit}
						action={REQUEST_EDIT}
					/>
          <Action
						id=''
						path='colisage'
						design=''
						type='colisage'
						ref={update}
						action={REQUEST_SAVE}
					/>
      <div className="">
        <div className="grid grid-cols-6 justify-start">
          <div className="col-span-4">
            {/* <button
              className="h-10 w-40   rounded-md bg-gray-800 text-white float-left  "
              onClick={() => setEstAjt(true)}
            >
              Nouvel Utilisateur
            </button> */}
            <Bcyan label="Nouvel Utilisateur" onClick={() => setEstAjt(true)} className="" />
          </div>
          <div className="relative text-zinc-400 flex items-center col-span-2">
            <SearchIcon className="w-7 h-7 absolute ml-1 " />
            <input
              type="text"
              placeholder="Recherche"
              className="pl-8 w-full"
            />
          </div>
        </div>

        <Table
          onLoad={()=>{}}
          className="tab-list mt-8 tab-list float-left w-full"
          thead={
            <Table.tr>
              <Table.th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                Utilisateur
              </Table.th>
              <Table.th className=" top-0 z-10    py-5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                Contact
              </Table.th>
              <Table.th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ">
                Rôle
              </Table.th>
              <Table.th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "></Table.th>
            </Table.tr>
          }
        >
          {listUser?.map((p: any) => {
            return (
              <Table.tr key={p.id} className="cursor-pointer">
                <Table.td onDoubleClick={()=>FromDetails(p)}>
                  <figure>
                    <img
                      src={p.image ? p.image : "/images/empty-avatar.png"}
                      alt=""
                    />
                    <figcaption>
                      <span>{p.nom+" "+p.prenom}</span>
                      &nbsp;&nbsp;
                    </figcaption>
                  </figure>
                </Table.td>
                <Table.td onDoubleClick={()=>FromDetails(p)}>
                  <p>{p.email}</p>
                  <br />
                  <p>{p.phone}</p>
                </Table.td>
                <Table.td onDoubleClick={()=>FromDetails(p)}>
                  <p>{p.role}</p>
                </Table.td>
                <Table.td className="cursor-pointer">
                <Mitems 
                                     archive={() => {
                                      //@ts-ignore
                                      // archive.current(client.id, client.design);
                                    }}
                                    /*   restore={() => {
                                      //@ts-ignore
                                      restore.current(client.id,client.design);
                                    }} */
                                    del={() => {
                                      deleteUser(p.id)
                                    }}
                                    edit={() => {
                                      FromDetails(p)
                                    }}
                                    obj={p}
                                    update={() => {
                                      FormAsUpdate(p)
                                      
                                    }}
                                      
                                  />
                </Table.td>
              </Table.tr>
            );
          })}
        </Table>
        <Pagin load={loadPage} visible={listUser?.length > 0} max={listUser?.length} />
      </div>
      
    </Section>
  );
}

export default ListUtilisateur;
