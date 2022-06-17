import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
// import { Article, article0, ArticleJson } from "tools/types";
import {
  ARCHIVE,
  DEL,
  REQUEST_EDIT,
  REQUEST_SAVE,
  RESTORE,
} from "tools/consts";
import { Form, Field, Button } from "widgets";
import Modal from "widgets/Modal";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import Pagin from "widgets/Pagin";
import Icon from "widgets/Icon";
// import { openArticles, OpenArticleProp } from "config/rtk/rtkArticle";
import Bsave from "widgets/Bsave";
import BsavEndNew from "widgets/BsavEndNew";
import Bcancel from "widgets/Bcancel";
import ModalS from "widgets/ModalS";
import Required from "widgets/Required";
import Action from "widgets/Action";
import MitemsRef from "widgets/MitemsRef";
import { OpenFamilleArticleProp, openFamilleArticles, openPaginFamilleArticles } from "components/gestionProduction/rtk/RtkFamilleArticle";
import { famArt0, FamilleArticle, FamilleArticleJson } from "components/gestionProduction/types";
import { XIcon } from "@heroicons/react/solid";

type FormArticleProps = {
  article: FamilleArticle;
};
const FormArticle = ({ article }: FormArticleProps, ref: Ref<void>) => {
  const articlesToOpen: OpenFamilleArticleProp = openFamilleArticles();
  const articleJson: FamilleArticleJson = articlesToOpen.data;
  const articles: FamilleArticle[] = articleJson.content;
  const refetchArticle: () => void = articlesToOpen.refetch;
  const saveArticle = articlesToOpen.save;
  const editArticle = articlesToOpen.edit;

  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetchArticle();
    paginRef();
  };

  const paginFamArt: FamilleArticle[] = openPaginFamilleArticles(page).data.content;
  const paginRef = openPaginFamilleArticles(page).refetch;

  //const { data = [], isFetching, refetch } = usePaginationArticlesQuery(0);
  const [article1, setArticle1] = useState<FamilleArticle>(famArt0);
  const [request, setRequest] = useState(REQUEST_SAVE);

  //const [save] = useAddArticleMutation();

  const [form, setForm] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const [show, setShow] = useState(false);
  const open = (a: FamilleArticle) => {
    setArticle1(a);
    setShow(true);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = open;
  });

  const closed = () => {
    setShow(false);
    setDisabled(true);
  };

  const showFormulaire = (article: FamilleArticle) => {
    setArticle1(article);
    setForm(true);
    setRequest(REQUEST_EDIT);
  };

  const FormAsEdit = (article: FamilleArticle) => {
    setDisabled(true);
    showFormulaire(article);
  };
  const FormAsUpdate = (article: FamilleArticle) => {
    setDisabled(false);
    open(article);
  };

  const void_ = () => {};

  const [recherche, setRecherche] = useState('');
  const [isRecherche, setIsRecherch] = useState(false);

  //const [updateArticle] = useEditArticleMutation();

  return (
    <>
      {!form && (
        <section className="bg-white float-left w-full h-full mp-8 shadow-lg">
          <Action
            id=""
            path="articles"
            design=""
            type="L'article"
            ref={del}
            action={DEL}
            refetch={refetchArticle}
          />
          <Action
            id=""
            path="articles"
            design=""
            type="L'article"
            ref={archive}
            action={ARCHIVE}
            refetch={refetchArticle}
          />
          <h1>Familles Article</h1>
          <div className="float-left w-full">
            <button
              className="bg-[#2d2e2e] p-3 text-white rounded border border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left"
              onClick={() => {
                setDisabled(false);
                open(famArt0);
              }}
            >
              Nouvelle Famille Article
            </button>
            <div className='w-full'>
							<div className='float-right'>
								<button className='bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg' onClick={() => {if(recherche != ""){ setIsRecherch(true); }}}>
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
          </div>
          <Table
            className="tab-list float-left w-full mt-8 tab-list float-left w-full"
            thead={
              <tr>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Désignation
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Nomenclature
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ">
                  Taux de perte
                </th>
                <th></th>
              </tr>
            }
          >
            {!isRecherche &&
              //@ts-ignore
              paginFamArt?.map((article: Article) => {
                return (
                  //@ts-ignore
                  <tr className='cursor-pointer h-20 text-xl' key={article.id}>
                    <Table.td>{article.design}</Table.td>
                    <Table.td>{article.nomenclature}</Table.td>
                    <Table.td>
                      {article.tauxPertes}
                      {"%"}
                    </Table.td>

                    <Table.td className="cursor-pointer">
                      <MitemsRef
                        archive={() => {
                          //@ts-ignore
                          archive.current(article.id, article.design);
                        }}
                        /*   restore={() => {
                        //@ts-ignore
                        restore.current(client.id,client.design);
                      }} */
                        del={() => {
                          //@ts-ignore
                          del.current(article.id, article.design);
                        }}
                        obj={article}
                        update={() => {
                          FormAsUpdate(article);
                        }}
                      />
                    </Table.td>
                  </tr>
                );
              })
            }
            {isRecherche &&
              articles?.map((article: FamilleArticle) => {
              if(recherche.toLocaleLowerCase() == article.design.toLocaleLowerCase() ||
                recherche.toLocaleLowerCase() == article.nomenclature.toLocaleLowerCase())
                return (
                  //@ts-ignore
                  <tr className='cursor-pointer h-20 text-xl' key={article.id}>
                    <Table.td>{article.design}</Table.td>
                    <Table.td>{article.nomenclature}</Table.td>
                    <Table.td>
                      {article.tauxPertes}
                      {"%"}
                    </Table.td>

                    <Table.td className="cursor-pointer">
                      <MitemsRef
                        archive={() => {
                          //@ts-ignore
                          archive.current(article.id, article.design);
                        }}
                        /*   restore={() => {
                        //@ts-ignore
                        restore.current(client.id,client.design);
                      }} */
                        del={() => {
                          //@ts-ignore
                          del.current(article.id, article.design);
                        }}
                        obj={article}
                        update={() => {
                          FormAsUpdate(article);
                        }}
                      />
                    </Table.td>
                  </tr>
                );
              })
            }
          </Table>
          <Pagin
            load={loadPage}
            max={paginFamArt?.length}
            visible={paginFamArt?.length > 0 ? true : false}
          />
        </section>
      )}
      <Modal
        show={show}
        title={
          article1.id == ""
            ? "Nouvelle Famille Article"
            : "Modifier Famille Article"
        }
        format={4}
        close={closed}
      >
        <div className="float-left w-full text-sm">
          <Form
            defaultValues={article1}
            onSubmit={(data) => {
              request == REQUEST_SAVE
                ? saveArticle(data)
                : request == REQUEST_EDIT
                ? editArticle(data)
                : void_;
                setTimeout(() => {
                  refetchArticle();
                  closed();
                }, 500);
            }}
          >
            <div className=" float-left w-1/2">
              <Field
                label={<Required msg="Désignation" />}
                name="design"
                disabled={disabled} required
              />
            </div>
            <div className="float-left w-full">
              <div className="float-left w-1/2">
                <Field
                  label={<Required msg="Nomenclature" />}
                  name="nomenclature"
                  disabled={disabled} required
                />
              </div>
              <div className="float-right w-1/2">
                <Field
                  label={<Required msg="Taux de perte" />}
                  name="tauxPertes"
                  disabled={disabled} required
                />
              </div>
            </div>

            <div className="mt-5 b-ajust-r">
              <Bsave
                className="float-right"
                onClick={() => {
                  // setTimeout(() => {
                  //   refetchArticle();
                  //   closed();
                  // }, 500);
                }}
              />
              {article1.id == "" && (
                <BsavEndNew
                  className="ml-10 mr-2"
                  onClick={() => {
                    setTimeout(() => {
                      refetchArticle();
                    }, 500);
                  }}
                />
              )}
            </div>
          </Form>
          <Bcancel
            className="float-right mt-5 b-ajust"
            onClick={() => {
              setDisabled(false);
              setShow(false);
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default forwardRef(FormArticle);
