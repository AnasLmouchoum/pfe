import React, { useEffect, useRef, useState } from 'react'
import { Field, Form } from "widgets";
import { Product, pro0, Client, Commande, Article, ProductJson, ArticleJson, ClientJson, CommandeJson, ArticleCommandeJson, ArticleCommande, arc0, art0, CalculProductJson, CalculProduct, cp0, c0, com0 } from 'components/gestionProduction/types';
import { ArchiveIcon, ClipboardListIcon, PencilAltIcon, ReplyIcon, TrashIcon, XIcon } from '@heroicons/react/solid';
import Bcyan from 'widgets/Bcyan';
import Modal from 'widgets/Modal';
import classNames from 'classnames';
import Table from 'widgets/Table';
import Mitems from 'widgets/Mitems';
import MatieresForProduct from './MatieresForProduct';
import Pagin from 'widgets/Pagin';
import { ARCHIVE, DEL, REQUEST_EDIT, REQUEST_SAVE } from 'tools/consts';
import Section from 'widgets/Section';
import { openAllProducts, OpenProductProp, openProducts } from 'components/gestionProduction/rtk/RtkProduct';
import { OpenArticleProp, openArticles, openOneArticle } from 'components/gestionProduction/rtk/RtkArticle';
import { OpenClientProp, openClients } from 'components/gestionProduction/rtk/RtkClient';
import { OpenCommandeProp, openCommandes, openCommandesByIdClient } from 'components/gestionProduction/rtk/RtkCommande';
import { OpenArticleCommandeProp, openArticleCommandes } from 'components/gestionProduction/rtk/RtkArticleCommande';
import axios from 'axios';
import { OpenCalculProductProp, openCalculProducts } from 'components/gestionProduction/rtk/RtkCalculProduct';
import { indexOf } from 'lodash';
import Action from 'widgets/Action';
import { articleCommande0 } from 'tools/types';

type Props = {}

const FicheProduction = () => {

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  const [commandeSelected, setCommandeSelected] = useState("");
  const [idClient, setIdClient] = useState("");
  const [idArticle, setIdArticle] = useState("");
  const [portion, setPortion] = useState("");
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------

  const [page, setPage] = useState(0);
//*******************************//
//************PRODUCT************//
    const ProductsToOpen: OpenProductProp = openProducts(page);
    const ProductJson: ProductJson = ProductsToOpen.data
    const Products: Product[] = ProductJson.content
    const refetchProduct:()=>void=ProductsToOpen.refetch
    const saveProduct=ProductsToOpen.save
    const editProduct=ProductsToOpen.edit
    const del = useRef(null);
    const archive = useRef(null);
    const restore = useRef(null);
    const loadPage = (p: number) => {
      setPage(p);
      refetchProduct();
    };


//*******************************//
//************PRODUCT************//
const AllProductsToOpen: OpenProductProp = openAllProducts();
const AllProductJson: ProductJson = AllProductsToOpen.data
const AllProducts: Product[] = AllProductJson.content

//*******************************//
//************CLIENT*************//
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
//************COMMANDE***********//
// const CommandesToOpen: OpenCommandeProp = openCommandes();
// const CommandesJson: CommandeJson = CommandesToOpen.data
// const Commandes: Commande[] = CommandesJson.content
const [Commandes, setCommandes] = useState<Commande[]>([com0])
useEffect(() => {
  axios.get('http://localhost:1000/api/v1/commandes').then(resp => {
    setCommandes(Commandes.concat(resp.data.content));
  })
}, [])

//************COMMANDE BY ID CLIENT***********//
// const CommandesByIdClientToOpen: OpenCommandeProp = openCommandesByIdClient(idClient);
// const CommandesByIdClientJson: CommandeJson = CommandesByIdClientToOpen.data
// const CommandesByIdClient: Commande[] = CommandesByIdClientJson.content
// console.log(CommandesByIdClient)

//*******************************//
//*******ARTICLE-COMMANDE********//
// const ArticleCommandesToOpen: OpenArticleCommandeProp = openArticleCommandes();
// const ArticleCommandesJson: ArticleCommandeJson = ArticleCommandesToOpen.data
// const ArticleCommandes: ArticleCommande[] = ArticleCommandesJson.content
const [ArticleCommandes, setArticleCommandes] = useState<ArticleCommande[]>([arc0])
useEffect(() => {
  axios.get('http://localhost:1000/api/v1/articlecommandes').then(resp => {
    setArticleCommandes(ArticleCommandes.concat(resp.data.content));
  })
}, [])

//*******************************//
//************ARTICLE************//
// const ArticlesToOpen: OpenArticleProp = openArticles();
// const ArticleJson: ArticleJson = ArticlesToOpen.data
// const Articles: Article[] = ArticleJson.content
const [Articles, setArticles] = useState<Article[]>([art0])
useEffect(() => {
  axios.get('http://localhost:1000/api/v1/articlees').then(resp => {
    setArticles(Articles.concat(resp.data.content));
  })
}, [])

//*******************************//
//************ARTICLE************//
const CalculProductsToOpen: OpenCalculProductProp = openCalculProducts();
// const CalculProductsToOpenJson: CalculProductJson = CalculProductsToOpen.data
const CalculProducts: CalculProduct[] = CalculProductsToOpen.data;
const refetchCalcPro = CalculProductsToOpen.refetch;

// const [CalculProducts, setCalculProducts] = useState([cp0])
// useEffect(() => {
//   axios.get('http://localhost:1000/api/v1/calculProducts').then(resp => {
//     setCalculProducts(resp.data)
//   })
// }, [])
//*******************************//

const [isOpen, setIsOpen] = useState<boolean>(false);
const [pro, setPro] = useState<Product>(pro0);
const [disabled, setDisabled] = useState(false);
const [editDetail, setEditDetail] = useState(false);
const [detail, setDetail] = useState(false);
const [request, setRequest] = useState(REQUEST_SAVE);
const [quantiteState, setQuantiteState] = useState("");
const [art, setArt] = useState(art0);
//-----------------------------------
//-----------------------------------
const doneProduct = () => {
  if(pro.commeFait == false) 
  {
    const proCopy = {...pro, commeFait: true}
    //setPro({...pro, commeFait: true});
    console.log(proCopy);
    axios.put('http://localhost:1000/api/v1/products/'+pro.id, proCopy);


    axios.get('http://localhost:1000/api/v1/articlees/'+proCopy.idArticle).then(resp => {
      setArt(resp.data)
    })

    console.log(art.articleMatieres);
    art.articleMatieres.forEach((mp) => {
      const matPreCopy = {...mp.matiere, stock: parseFloat(mp.matiere.stock) - (parseFloat(mp.quantite) * parseFloat(proCopy.quantite))};
      axios.put('http://localhost:1000/api/v1/matieresPremiere/'+matPreCopy.id, matPreCopy);
      //console.log(matPreCopy);
    })
  }

};

//-----------------------------------
const [recherche, setRecherche] = useState('');
const [isRecherche, setIsRecherch] = useState(false);
//-----------------------------------
  const uniqueIds = new Set();
    const openAddPro = () => {
        setRequest(REQUEST_SAVE);
        setEditDetail(false)
        setIsOpen(true);
    }

    const closed = () => {
      setCommandeSelected("");
      setIdClient("");
      setIdArticle("");
      setPortion("");
      setIsOpen(false);
      setDetail(false);
      setCommandeSelected("");
      setPro(pro0);
      setDisabled(false);
    }
    const addPro = 
    <>
      <div className="float-left w-full text-xs">
          {/*@ts-ignore*/}
          <Form defaultValues={pro} onSubmit={request == REQUEST_SAVE ? saveProduct : request == REQUEST_EDIT ? editProduct : void _}>
              <div className="float-left w-full">
                  <div className="float-left w-1/2 pt-2">
                      <Field
                          label="Client *"
                          name="idClient"
                          optionKeyName="id"
                          optionLabelName="design"
                          options={Clients}
                          onClick={(e: any) => {setIdClient(e.target.value);}}
                          as="select"
                          disabled={disabled}
                          required={true}
                      />
                  </div>
                  <div className="float-left w-1/2 pt-2">
                      <Field
                          label="Commande *"
                          id="qte"
                          name="idCommande"
                          optionKeyName="id"
                          optionLabelName="nbc"
                          options={Commandes.filter(c => c.idClient == idClient || c.idClient == '')}
                          as="select"
                          disabled={disabled}
                          // required={true}
                          onClick={(e: any) => {setCommandeSelected(e.target.value)}}
                      />
                  </div>
                  <div className="float-left w-1/2 pt-2">
                      <Field
                          label="Article *"
                          name="idArticle"
                          optionKeyName="idArticlee"
                          optionLabelName="design"
                          options={ArticleCommandes.filter(ac => ac.idCommande === commandeSelected || ac.idCommande == '').filter(el => {const dup = uniqueIds.has(el.idArticlee);uniqueIds.add(el.idArticlee); return !dup})}
                          as="select"
                          onClick={(e: any) => {setIdArticle(e.target.value)}}
                          disabled={disabled}
                          required={true}
                      />
                  </div>
                  <div className="float-right w-1/2 pt-2">
                      <Field
                          label="Portion *"
                          name="portion"
                          optionKeyName="portion"
                          optionLabelName="portion"
                          options={ArticleCommandes.filter(ac => ac.idArticlee === idArticle || ac.idArticlee == '')}
                          as="select"
                          onClick={(e: any) => {setPortion(e.target.value)}}
                          disabled={disabled}
                          required={true}
                      />
                  </div>
                  {/* <Field name="idArticleCommande" value={ArticleCommandes.map(ac => {if(ac.idCommande === commandeSelected && ac.idArticlee === idArticle && ac.portion === portion)return ac.id}).filter(e => e)[0]} /> */}
                  <div className='rounded float-left px-4 mt-6 w-full border-2'>
                      <div className='float-left'>
                          <p className='p-2 ml-6 font-bold text-base'>Quantité à fabriquer: <span className='float-right pl-4 font-normal'>
                          {
                            ArticleCommandes?.map(ac => {if(ac.idCommande === commandeSelected && ac.idArticlee === idArticle && ac.portion === portion)return ac.qte})
                          }
                          </span></p>
                          <p className='p-2 ml-6 font-bold text-base'>Quantité en cours: <span className='float-right pl-4 font-normal'>
                          {//@ts-ignore
                            AllProducts?.map(p => {if(p.idCommande === commandeSelected && p.idArticle === idArticle && p.portion === portion && p.commeFait === false)return p.quantite})?.filter(e => e)?.reduce((acc, cur) => parseFloat(acc)+parseFloat(cur), 0) - (pro.commeFait == false && detail ? parseFloat(pro.quantite) : 0)
                          }
                          </span></p>
                          <p className='p-2 ml-6 font-bold text-base'>Quantité fabriquée: <span className='float-right pl-4 font-normal'>
                          {
                            CalculProducts?.map(cp => {if(cp.idCommande === commandeSelected && cp.idArticlee === idArticle && cp.portion === portion)return cp.qteProduit})
                          }
                          </span></p>
                          <p className='p-2 ml-6 font-bold text-base'>Quantité restante: <span className='float-right pl-4 font-normal'>
                          {//@ts-ignore
                            ArticleCommandes?.map(ac => {if(ac.idCommande === commandeSelected && ac.idArticlee === idArticle && ac.portion === portion)return ac.qte})?.filter(e => e)?.reduce((acc, cur) => parseFloat(acc)+parseFloat(cur) , 0) - 
                            AllProducts?.map(p => {if(p.idCommande === commandeSelected && p.idArticle === idArticle && p.portion === portion && p.commeFait === false)return p.quantite})?.filter(e => e)?.reduce((acc, cur) => parseFloat(acc)+parseFloat(cur), 0) - 
                            CalculProducts?.map(cp => {if(cp.idCommande === commandeSelected && cp.idArticlee === idArticle && cp.portion === portion)return cp.qteProduit})?.filter(e => e)?.reduce((acc, cur) => parseFloat(acc)+parseFloat(cur), 0)
                          }
                          </span></p>
                      </div>
                      <div className='float-right w-1/2'>
                          <div className="pt-4 w-full">
                              <Field
                                  id="quantite"
                                  label="Quantité *"
                                  name="quantite"
                                  disabled={disabled}
                                  required={true}
                                  onInput={(e: any)=> {setQuantiteState(e.target.value)}}
                              />
                          </div>
                          <div className="pt-4 w-full">
                              <Field
                                  label="Date Production *"
                                  name="dateProd"
                                  type="date"
                                  disabled={disabled}
                                  required={true}
                              />
                          </div>
                      </div>
                  </div>
              </div>

              {!detail &&
              <>
              <Bcyan
                  className="float-right m-4 px-4"
                  type="button"
                  onClick={() => {
                  if(request === REQUEST_EDIT){
                    setDetail(true);
                    setDisabled(true);
                  }else{
                    setQuantiteState("");
                    closed()
                  }
                  }}
              >
                  Annuler
              </Bcyan>
              {true && (
              <Bcyan
                  className="float-right m-4 px-4"
                  type="submit"
                  onClick={(e) => {/*@ts-ignore*/refetchProduct();
                    if(ArticleCommandes.map(ac => {if(ac.idCommande === commandeSelected && ac.idArticlee === idArticle && ac.portion === portion)return ac.qte}).filter(e => e)?.reduce((acc, cur) => parseFloat(acc)+parseFloat(cur) , 0) - 
                      AllProducts?.map(p => {if(p.idCommande === commandeSelected && p.idArticle === idArticle && p.portion === portion && p.commeFait === false)return p.quantite}).filter(e => e)?.reduce((acc, cur) => parseFloat(acc)+parseFloat(cur), 0) - parseFloat(quantiteState) - 
                      CalculProducts?.map(cp => {if(cp.idCommande === commandeSelected && cp.idArticlee === idArticle && cp.portion === portion)return cp.qteProduit}).filter(e => e)?.reduce((acc, cur) => parseFloat(acc)+parseFloat(cur), 0) < parseFloat(quantiteState)){
                        const rep = confirm("la quntité à fabriquer est supérieure à la quantité restante, voulez-vous continuer quant même");
                        if(rep == true){
                          setTimeout(() => {//@ts-ignore
                            closed();
                            setRequest(REQUEST_SAVE);
                            setQuantiteState("");
                            refetchProduct();
                            refetchCalcPro();
                          }, 500);
                    
                        }else{
                          e.preventDefault()
                        }
                    }
                  }
                }
              >
                  Sauvgarder
              </Bcyan>
              )}
              </>
              }
              {detail &&
              <>
                <Bcyan
                className="float-right m-4 px-4"
                type="button"
                onClick={() => {
                setDisabled(false);
                setRequest(REQUEST_EDIT);
                setQuantiteState("");
                setDetail(false);
                }}
                >
                  Modifier
                </Bcyan>
                <Bcyan
                    className="float-right m-4 px-4"
                    type='submit'
                    onClick={() => {//@ts-ignore
                      setTimeout(() => {
                      refetchProduct();
                      doneProduct();
                      refetchCalcPro();
                      //setRequest(REQUEST_EDIT);
                      setQuantiteState("");
                      closed();
                    }, 500);
                    }}
                >
                    Marqué comme fait
                </Bcyan>
              </>
              }
          </Form>
       </div>
       {editDetail && <MatieresForProduct idArticle={pro.idArticle} qte={pro.quantite}/>}
    </>
    
    const FromDetails = (product: Product) => {
      setPro(product);
      setIdClient(product.idClient);
      setCommandeSelected(product.idCommande)
      setIdArticle(product.idArticle);
      setPortion(product.portion);
      setDisabled(true);
      setEditDetail(true);
      setDetail(true);
      setIsOpen(true);
    };
    const FormAsUpdate = (product: Product) => {
      setPro(product);
      setIdClient(product.idClient);
      setCommandeSelected(product.idCommande)
      setIdArticle(product.idArticle);
      setPortion(product.portion);
      setIsOpen(true);
      setEditDetail(true);
      setRequest(REQUEST_EDIT);
      refetchProduct();
    };

  return (
    <>
    {/* {!isOpen &&  */}
    <Section>
          <Action
						id=''
						path='products'
						design=''
						type='la fiche'
						ref={del}
						action={DEL}
            refetch={refetchProduct}
					/>
          <Action
						id=''
						path='products'
						design=''
						type='la fiche'
						ref={archive}
						action={ARCHIVE}
            refetch={refetchProduct}
					/>
      <div className='float-left w-full'>
      <h1>Liste des fiches de production</h1>
                <button className='bg-[#2d2e2e] p-3 text-white border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left' onClick={openAddPro}>Nouvelle fiche</button>
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
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>N°</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Client</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>N° BC</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Code Article</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Désignation</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Portion</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Quantité</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '>Date</th>
                        <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 '></th>
                    </tr>}
            >
                    {!isRecherche && //@ts-ignore
                    Products?.map((p: Product, i:number) => {
                        return (
                            <Table.tr className='cursor-pointer h-20 text-xl' key={p.id}>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{(page*2+page)+i}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{Clients?.map(c => {if(c.id === p.idClient){return c.design}})}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{Commandes?.map(c => {if(c.id === p.idCommande){return c.nbc}})}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{Articles?.map(a => {if(a.id === p.idArticle){return a.codeArt}})}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{Articles?.map(a => {if(a.id === p.idArticle){return a.designation}})}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{p.portion}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{p.quantite}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{p.dateProd}</Table.td>
                                <Table.td className='cursor-pointer'><Mitems
                                  archive={() => {
                                              //@ts-ignore
                                              archive.current(p.id, page+i);
                                              refetchProduct();
                                            }}
                                            /*    restore={() => {
                                              //@ts-ignore
                                              restore.current(fournisseur.id,fournisseur.design);
                                            }} */
                                            del={() => {
                                              //@ts-ignore
                                              del.current(p.id, page+i);
                                              refetchProduct();
                                            }}
                                            edit={() => {
                                              FromDetails(p);
                                            }}
                                            obj={p}
                                            update={() => {
                                              FormAsUpdate(p);
                                            }}
                                /></Table.td>
                            </Table.tr>
                        )
                      
                    })}
                    {isRecherche && //@ts-ignore
                    AllProducts?.map((p: Product, i:number) => {
                      if(recherche.toLocaleLowerCase() == Clients?.map(c => {if(c.id === p.idClient){return c.design}}).filter(e=>e)[0]?.toLocaleLowerCase() || 
                        recherche.toLocaleLowerCase() == Articles?.map(a => {if(a.id === p.idArticle){return a.codeArt}}).filter(e=>e)[0]?.toLocaleLowerCase() ||
                        recherche.toLocaleLowerCase() == Articles?.map(a => {if(a.id === p.idArticle){return a.designation}}).filter(e=>e)[0]?.toLocaleLowerCase() ||//@ts-ignore
                        recherche.toLocaleLowerCase() == p.portion.toLocaleLowerCase() || recherche.toLocaleLowerCase() == p.dateProd.toLocaleLowerCase())
                        return (
                            <Table.tr className='cursor-pointer' key={p.id}>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{(page*2+page)+i}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{Clients?.map(c => {if(c.id === p.idClient){return c.design}})}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{Commandes?.map(c => {if(c.id === p.idCommande){return c.nbc}})}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{Articles?.map(a => {if(a.id === p.idArticle){return a.codeArt}})}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{Articles?.map(a => {if(a.id === p.idArticle){return a.designation}})}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{p.portion}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{p.quantite}</Table.td>
                                <Table.td onDoubleClick={() => {FromDetails(p)}}>{p.dateProd}</Table.td>
                                <Table.td className='cursor-pointer'><Mitems
                                  archive={() => {
                                              //@ts-ignore
                                              archive.current(p.id, page+i);
                                              refetchProduct();
                                            }}
                                            /*    restore={() => {
                                              //@ts-ignore
                                              restore.current(fournisseur.id,fournisseur.design);
                                            }} */
                                            del={() => {
                                              //@ts-ignore
                                              del.current(p.id, page+i);
                                              refetchProduct();
                                            }}
                                            edit={() => {
                                              FromDetails(p);
                                            }}
                                            obj={p}
                                            update={() => {
                                              FormAsUpdate(p);
                                            }}
                                /></Table.td>
                            </Table.tr>
                        )
                      
                    })}
            </Table>
            {!isRecherche && <Pagin load={loadPage} visible={Products?.length > 0} max={Products?.length} />}
    </Section>
    <Modal children={addPro} title={"Nouvelle fiche Production"} close={closed} show={isOpen} format={+classNames("5")}></Modal>
    </>
  )
}

export default FicheProduction

