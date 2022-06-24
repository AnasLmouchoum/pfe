import React, { useEffect, useRef, useState } from "react";
import Section from "../../widgets/Section";
import { SearchIcon, XIcon } from "@heroicons/react/solid";
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
import { openPaginationUsers, openUsers } from "config/rtk/RtkUser";

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
  const openPaginUsers = openPaginationUsers(page)
  const paginUsers = openPaginUsers.data.content;
  const refetchPaginUser = openPaginUsers.refetch;
  // console.log(DataUsers)
  const loadPage = (p: number) => {
    setTimeout(() => {
      setPage(p);
      refetchUser();
      refetchDataUser();
      refetchPaginUser();
    }, 200);
    // refetch();
  };
  

  const openToUsers = openUsers()
  const DataUsers = openToUsers.data.content;
  const refetchDataUser = openToUsers.refetch;
  console.log(DataUsers)

  const [recherche, setRecherche] = useState('');
  const [isRecherche, setIsRecherch] = useState(false);

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
const archive = useRef(null);
const update = useRef(null);


  return (
    <Section>
         <Action
						id=''
						path='users'
						design=''
						type="l'utilisateur"
						ref={del}
						action={DEL}
            refetch={refetchUser}
					/>
          <Action
						id=''
						path='users'
						design=''
						type="l'utilisateur"
						ref={archive}
						action={ARCHIVE}
            refetch={refetchPaginUser}
					/>
          <Action
						id=''
						path='users'
						design=''
						type="l'utilisateur"
						ref={edit}
						action={REQUEST_EDIT}
            refetch={refetchPaginUser}
					/>
          {/* <Action
						id=''
						path='colisage'
						design=''
						type='colisage'
						ref={update}
						action={REQUEST_SAVE}
					/> */}
      <div className="">
        <div className="float-left w-full">
        <button className='bg-[#2d2e2e] p-3 text-white border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left' onClick={() => setEstAjt(true)}>Nouvelle Utilisateur</button>
          <div className='float-right'>
              <button className='bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg' onClick={() => {if(recherche != ""){ setIsRecherch(true) }}}>
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
              </button>
              <input type="text" value={recherche} className='py-3 border outline-[#ddd] border-[#ddd] float-left border-l-0 w-96' placeholder='Recherche' onChange={(e) => {setRecherche(e.target.value);if(e.target.value == ''){setRecherche(''); setIsRecherch(false)}}}/>
              <button className='bg-white float-left border border-[#ddd] border-l-0 p-2 rounded-r-lg' onClick={() => {setIsRecherch(false);setRecherche('');}}>
                <XIcon
                  className='w-8 text-[#C1BFBF] group-hover:text-gray-500'
                  aria-hidden='true'
                />
              </button>
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
          {!isRecherche &&
          paginUsers?.map((p: any) => {
            return (
              <Table.tr key={p.id} className="cursor-pointer">
                <Table.td onDoubleClick={()=>FromDetails(p)}>
                  <figure>
                    <img
                      src={p.img?.length > 0 ? "/profileImages/"+p.img : "/profileImages/empty-avatar.png"}
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
                                      archive.current(p.id, p.nom+" "+p.prenom);
                                    }}
                                    del={() => {
                                      // deleteUser(p.id)
                                      //@ts-ignore
                                      del.current(p.id, p.nom+" "+p.prenom)
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
          {isRecherche &&
          DataUsers?.map((p: any) => {
          if(recherche.toLocaleLowerCase() == p.nom.toLocaleLowerCase() ||
            recherche.toLocaleLowerCase() == p.prenom.toLocaleLowerCase() ||
            recherche.toLocaleLowerCase() == p.role.toLocaleLowerCase() || 
            recherche.toLocaleLowerCase() == p.email.toLocaleLowerCase() || recherche == p.phone ||
            recherche.toLocaleLowerCase() == p.nom.toLocaleLowerCase()+" "+p.prenom.toLocaleLowerCase() ||
            recherche.toLocaleLowerCase() == p.prenom.toLocaleLowerCase()+" "+p.nom.toLocaleLowerCase())
            return (
              <Table.tr key={p.id} className="cursor-pointer">
                <Table.td onDoubleClick={()=>FromDetails(p)}>
                  <figure>
                    <img
                      src={p.img?.length > 0 ? "/profileImages/"+p.img : "/profileImages/empty-avatar.png"}
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
                                      archive.current(p.id, p.nom+" "+p.prenom);
                                    }}
                                    del={() => {
                                      // deleteUser(p.id)
                                      //@ts-ignore
                                      del.current(p.id, p.nom+" "+p.prenom)
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
