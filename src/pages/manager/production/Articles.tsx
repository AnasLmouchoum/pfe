import { BriefcaseIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react'
import { art0, Article, ArticleJson, ArticleMatiere, c0, Client, ClientJson, f0, famArt0, FamilleArticle, FamilleArticleJson, Fournisseur, FournisseurJson } from 'components/gestionProduction/types';
import { Field, Form } from 'widgets';
import Bcyan from 'widgets/Bcyan';
import Modal from 'widgets/Modal';
import NavTabs from 'widgets/NavTabs';
import { MenuNavTabs } from 'widgets/TypeWidgets';
import HistoriqueTab from './HistoriqueTab';
import ListeMatiers from './ListeMatiers';
import Table from 'widgets/Table';
import Mitems from 'widgets/Mitems';
import axios from 'axios';
import Pagin from 'widgets/Pagin';
import { ARCHIVE, DEL, REQUEST_EDIT, REQUEST_SAVE } from 'tools/consts';
import { OpenArticleProp, openArticles, openPaginationArticles } from 'components/gestionProduction/rtk/RtkArticle';
import { OpenClientProp, openClients } from 'components/gestionProduction/rtk/RtkClient';
import { OpenFournisseurProp, openFournisseurs } from 'components/gestionProduction/rtk/RtkFournisseur';
import { OpenFamilleArticleProp, openFamilleArticles } from 'components/gestionProduction/rtk/RtkFamilleArticle';
import Section from 'widgets/Section';
import Action from 'widgets/Action';
import { XIcon } from '@heroicons/react/solid';
import Required from 'widgets/Required';

const color="text-[#2B5173]"
const style_icon="mr-3 h-8 w-8 group-hover:text-gray-500 float-left "+color
const style_span="mt-px "+color

type Props = {}

const Articles = (props: Props) => {

  const [page, setPage] = useState(0); 
//*****************************// 
//************ARTICLE**********//
    const ArticlesToOpen: OpenArticleProp = openPaginationArticles(page);
    const ArticleJson: ArticleJson = ArticlesToOpen.data
    const Articles: Article[] = ArticleJson.content
    const refetchArticle:()=>void=ArticlesToOpen.refetch
    const saveArticle=ArticlesToOpen.save
    const editArticle=ArticlesToOpen.edit
    const del = useRef(null);
    const archive = useRef(null);
    const restore = useRef(null);
    const loadPage = (p: number) => {
      setPage(p);
      refetchArticle();
    };


    const AllArticlesToOpen: OpenArticleProp = openArticles();
    const AllArticleJson: ArticleJson = AllArticlesToOpen.data;
    const AllArticles: Article[] = AllArticleJson.content;

//*******************************//
//************CLIENT**********//
// const ClientsToOpen: OpenClientProp = openClients();
// const ClientsJson: ClientJson = ClientsToOpen.data
// const Clients: Client[] = ClientsJson.content
const [Clients, setClients] = useState<Client[]>([c0])
useEffect(() => {
  axios.get('http://localhost:1000/api/v1/clients').then(resp => {
    setClients(Clients.concat(resp.data.content));
  })
}, [])
//*******************************//
//************FOURNISSEUR**********//
// const FournisseursToOpen: OpenFournisseurProp = openFournisseurs();
// const FournisseursJson: FournisseurJson = FournisseursToOpen.data
// const Fournisseurs: Fournisseur[] = FournisseursJson.content
const [Fournisseurs, setFournisseurs] = useState<Fournisseur[]>([f0])
useEffect(() => {
  axios.get('http://localhost:1000/api/v1/fournisseurs').then(resp => {
    setFournisseurs(Fournisseurs.concat(resp.data.content));
  })
}, [])
//*******************************//
//************FAMILLE ARTICLE**********//
// const FamilleArticleToOpen: OpenFamilleArticleProp = openFamilleArticles();
// const FamilleArticleJson: FamilleArticleJson = FamilleArticleToOpen.data
// const FamilleArticles: FamilleArticle[] = FamilleArticleJson.content
const [FamilleArticles, setFamilleArticles] = useState<FamilleArticle[]>([famArt0])
useEffect(() => {
  axios.get('http://localhost:1000/api/v1/articles').then(resp => {
    setFamilleArticles(FamilleArticles.concat(resp.data.content));
  })
}, [])
//*******************************//

  const [request, setRequest] = useState(REQUEST_SAVE);


  const addArticleMatiere = (data: Article) => {
      const ArtBody = {...data, articleMatieres: articleMatiere}
      console.log(ArtBody)
      if(request === REQUEST_SAVE)
        axios.post('http://localhost:1000/api/v1/articlees/save', ArtBody);
      else
        axios.put('http://localhost:1000/api/v1/articlees/save', ArtBody);
  };

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [art, setArt] = useState<Article>(art0);
    const [disabled, setDisabled] = useState(false);
    const [detail, setDetail] = useState(false);

    const [articleMatiere, setArticleMatiere] = useState<ArticleMatiere[]>([]);
    const [idArticle, setIdArticle] = useState("");

    const openAddArt = () => {
        setArticleMatiere([]);
        setRequest(REQUEST_SAVE);
        setIsOpen(true);
    }

    const closed = () => {
        setArticleMatiere([]);
        setIdArticle("");
        setIsOpen(false);
        setArt(art0);
        setDetail(false)
        setDisabled(false);
    }

    const POIDS = ["", "1 KG", "2 KG", "3 KG"]


    const tabs: MenuNavTabs[] = [
        {
            id:1,
            name: (<><BriefcaseIcon className={style_icon} aria-hidden="true" /><span className={style_span}>Matière Première</span></>),
            featured: (<ListeMatiers detail={detail} matieres={articleMatiere} setMatiers={setArticleMatiere}/>),
        },
        {
            id:2,
            name: (<><BriefcaseIcon className={style_icon} aria-hidden="true" /><span className={style_span}>Historique de production</span></>),
            featured: (<HistoriqueTab idArticle={idArticle}/>),
        }
    ]

    const addArticle = 
        <div className="float-left w-full text-xs">
          {/*@ts-ignore*/}
            <Form defaultValues={art} onSubmit={(data) => {request == REQUEST_SAVE ? addArticleMatiere : request == REQUEST_EDIT ? addArticleMatiere : void _;setTimeout(() => {
                        closed();
                        setRequest(REQUEST_SAVE);
                        refetchArticle();
                    }, 500);}}>
                <div className="float-left w-full">
                    <div className="float-left w-1/2 pt-1">
                        <Field
                            label={<Required msg='Code' />}
                            name="codeArt"
                            disabled={disabled}
                            required
                        />
                    </div>
                    <div className="float-right w-1/2 pt-1">
                        <Field
                            label={<Required msg='Désignation' />}
                            name="designation"
                            disabled={disabled}
                            required
                        />
                    </div>
                    <div className="float-left w-1/2 pt-1">
                        <Field
                            label={<Required msg='Prix unitaire' />}
                            name="prixUnit"
                            disabled={disabled}
                            required
                        />
                    </div>
                    <div className="float-right w-1/2 pt-1">
                        <Field
                            label="Client"
                            name="idClient"
                            optionKeyName="id"
                            optionLabelName="design"
                            options={Clients}
                            as="select"
                            disabled={disabled}
                        />
                    </div>
                    <div className="float-right w-1/2 pt-1">
                        <Field
                            label="Fournisseur"
                            name="idFournisseur"
                            optionKeyName="id"
                            optionLabelName="design"
                            options={Fournisseurs}
                            as="select"
                            disabled={disabled}
                        />
                    </div>
                    <div className="float-right w-1/2 pt-1">
                        <Field
                            label={<Required msg='Poids' />}
                            name="poids"
                            placeholder="en kg"
                            disabled={disabled}
                            required
                        />
                    </div>
                    <div className="float-left w-1/2 pt-1">
                        <Field
                            label={<Required msg='Famille article' />}
                            name="idFamilleArticle"
                            optionKeyName="id"
                            optionLabelName="design"
                            options={FamilleArticles}
                            as="select"
                            disabled={disabled}
                            required
                        />
                    </div>
                    <div className="float-right w-1/2 pt-1">
                        <Field
                            label="Code Barre"
                            name="codeBarre"
                            disabled={disabled}
                        />
                    </div>
                </div>
                <Field type="hidden" name="articleMatieres" value={articleMatiere} />
                {!detail &&
                  <>
                  <Bcyan
                    className="float-right m-4 mt-8 px-4 w-32"
                    onClick={() => {
                    if(request === REQUEST_EDIT)
                      setDetail(true);
                    else
                      closed()
                    }}
                >
                    Annuler
                </Bcyan>
                {true && (
                <Bcyan
                    className="float-right m-4 mt-8 px-4 w-32"
                    type="submit"
                    onClick={() => {
                    // setTimeout(() => {
                    //     closed();
                    //     setRequest(REQUEST_SAVE);
                    //     refetchArticle();
                    // }, 500);
                    }}
                >
                    Sauvgarder
                </Bcyan>
                )}
                </>
                }
                {detail &&
                  <Bcyan
                  className="float-right m-4 mt-8 px-4 w-32"
                  onClick={() => {
                    setDetail(false)
                    setRequest(REQUEST_EDIT);
                    setDisabled(false)
                  }}
              >
                  Modifier
              </Bcyan>
                }
            </Form>
            <NavTabs tab={tabs}></NavTabs>
        </div>

    const FromDetails = (article: Article) => {
        setArticleMatiere(article.articleMatieres);
        setIdArticle(article.id);
        setDisabled(true);
        setIsOpen(true);
        setDetail(true);
        setArt(article);
    };
    const FormAsUpdate = (article: Article) => {
        setArticleMatiere(article.articleMatieres);
        setIdArticle(article.id);
        setIsOpen(true);
        setDetail(false);
        setRequest(REQUEST_EDIT);
        setArt(article);
    };

    const [recherche, setRecherche] = useState('');
    const [isRecherche, setIsRecherch] = useState(false);

  return (
    <>
    <Section>
          <Action
						id=''
						path='articlees'
						design=''
						type="l'article"
						ref={del}
						action={DEL}
            refetch={refetchArticle}
					/>
          <Action
						id=''
						path='articlees'
						design=''
						type="l'article"
						ref={archive}
						action={ARCHIVE}
            refetch={refetchArticle}
					/>
        <div className='float-left w-full'>
        <h1>Liste des articles</h1>
            <button className='bg-[#2d2e2e] p-3 text-white border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left' onClick={openAddArt}>Nouvelle Article</button>
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
        <Table className='tab-list float-left w-full mt-8 tab-list'
            thead = 
                {<tr>
                    <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Code Article</th>
                    <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Désignation</th>
                    <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Poids</th>
                    <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Prix</th>
                    <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Famille</th>
                    <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Client</th>
                    <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Fournisseur</th>
                    <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Date</th>
                    <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '></th>
                </tr>}
            >
            {!isRecherche && //@ts-ignore
            Articles?.map((a) => {
                return (
                    <tr key={a.id} className='cursor-pointer h-20 text-xl'>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{a.codeArt}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{a.designation}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{a.poids}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{a.prixUnit}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{FamilleArticles?.map(e => {if(e.id === a.idFamilleArticle)return e.design}).filter(e=>e)}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{Clients?.map(e => {if(e.id === a.idClient)return e.design}).filter(e=>e)}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{Fournisseurs?.map(e => {if(e.id === a.idFournisseur)return e.design}).filter(e=>e)}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{a.date}</Table.td>
                        <Table.td className='cursor-pointer'><Mitems 
                                          archive={() => {
                                            //@ts-ignore
                                            archive.current(a.id, a.designation);
                                            refetchArticle();
                                          }}
                                          /*    restore={() => {
                                            //@ts-ignore
                                            restore.current(fournisseur.id,fournisseur.design);
                                          }} */
                                          del={() => {
                                            //@ts-ignore
                                            del.current(a.id, a.designation);
                                            refetchArticle();
                                          }}
                                          edit={() => {
                                            FromDetails(a);
                                          }}
                                          obj={a}
                                          update={() => {
                                            FormAsUpdate(a);
                                          }}
                        /></Table.td>
                    </tr>
                )
            })}
            {isRecherche && //@ts-ignore
            AllArticles?.map((a) => {//@ts-ignore
              if(a.codeArt.toLocaleLowerCase() == recherche.toLocaleLowerCase() ||//@ts-ignore
               a.designation.toLocaleLowerCase() == recherche.toLocaleLowerCase() || a.date == recherche)
                return (
                    <tr key={a.id} className='cursor-pointer'>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{a.codeArt}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{a.designation}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{a.poids}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{a.prixUnit}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{FamilleArticles?.map(e => {if(e.id === a.idFamilleArticle)return e.design}).filter(e=>e)}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{Clients?.map(e => {if(e.id === a.idClient)return e.design}).filter(e=>e)}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{Fournisseurs?.map(e => {if(e.id === a.idFournisseur)return e.design}).filter(e=>e)}</Table.td>
                        <Table.td onDoubleClick={() => {FromDetails(a)}}>{a.date}</Table.td>
                        <Table.td className='cursor-pointer'><Mitems 
                                          archive={() => {
                                            //@ts-ignore
                                            archive.current(a.id, a.designation);
                                            refetchArticle();
                                          }}
                                          /*    restore={() => {
                                            //@ts-ignore
                                            restore.current(fournisseur.id,fournisseur.design);
                                          }} */
                                          del={() => {
                                            //@ts-ignore
                                            del.current(a.id, a.designation);
                                            refetchArticle();
                                          }}
                                          edit={() => {
                                            FromDetails(a);
                                          }}
                                          obj={a}
                                          update={() => {
                                            FormAsUpdate(a);
                                          }}
                        /></Table.td>
                    </tr>
                )
            })}
        </Table>
        <Pagin load={loadPage} visible={Articles?.length > 0} max={Articles?.length} />
    </Section>
    
    <Modal show={isOpen} children={addArticle} close={closed} title={"Nouvel Article"} format={+classNames("5")} ></Modal>
    
    </>
  )
}

export default Articles