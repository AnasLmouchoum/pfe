
import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import { Article, article0, BureauDouane, bureauDouane0, Declarant, declarant0, PayementMode, payementMode0, RegimeDouanier, regimeDouanier0, UnitMeasure, unitMeasure0 } from "tools/types";
import { DECIMAL, REQUEST_EDIT, REQUEST_SAVE, VILLE } from "tools/consts";
import { Form, Field } from "widgets";
import Modal from "widgets/Modal";
import Bcyan from "widgets/Bcyan";
import { useAddArticleMutation, useArchiveArticleMutation, useDeleteArticleMutation, useEditArticleMutation, useFetchOneArticleQuery, useRestoreArticleMutation, useFetchArticlesQuery, useFetchBureauDouanesQuery, useFetchOneBureauDouaneQuery, useEditBureauDouaneMutation, useDeleteBureauDouaneMutation, useArchiveBureauDouaneMutation, useRestoreBureauDouaneMutation, useFetchDeclarantsQuery, useAddDeclarantMutation, useEditDeclarantMutation, useDeleteDeclarantMutation, useArchiveDeclarantMutation, useRestoreDeclarantMutation, useFetchPayementModesQuery, useAddPayementModeMutation, useEditPayementModeMutation, useArchivePayementModeMutation, useRestorePayementModeMutation, useDeletePayementModeMutation, useFetchRegimeDouaniersQuery, useAddRegimeDouanierMutation, useEditRegimeDouanierMutation, useDeleteRegimeDouanierMutation, useArchiveRegimeDouanierMutation, useRestoreRegimeDouanierMutation, useFetchUnitMeasuresQuery, useEditUnitMeasureMutation, useArchiveUnitMeasureMutation, useRestoreUnitMeasureMutation, useDeleteUnitMeasureMutation, useAddUnitMeasureMutation } from "config/rtk";
import classNames from "classnames";
import Table from "widgets/Table";
import { MenuItems } from 'widgets/TypeWidgets';
import Mitems from 'widgets/Mitems';
import { ArchiveIcon, ClipboardListIcon, PencilAltIcon, ReplyIcon, TrashIcon } from "@heroicons/react/outline";
import DeleteUnitMeasure from "./Methods/DeleteUnitMeasure";
import ArchiveUnitMeasure from "./Methods/ArchiveUnitMeasure";
import RestoreUnitMeasure from "./Methods/RestoreUnitMeasure";
import Pagin from "widgets/Pagin";

/*
git add . 
git commit -m "un commontaire"
git push
*/
type FormUnitMeasureProps = {
    unitMeasure: UnitMeasure;
    disable: boolean;
};
const FormUnitMeasure = ({
    unitMeasure,
    disable,
}: FormUnitMeasureProps, ref: Ref<void>) => {
    const { data = [], isFetching, refetch } = useFetchUnitMeasuresQuery()
    const [unitMeasure1, setUnitMeasure1] = useState<UnitMeasure>(unitMeasure0);
    const [request, setRequest] = useState(REQUEST_SAVE)

    const [save] = useAddUnitMeasureMutation();

    const [form, setForm] = useState(false);

    const [disabled, setDisabled] = useState(true);

    const [show, setShow] = useState(false);
    const open = (u: UnitMeasure) => {
        setUnitMeasure1(u);
        setShow(true);
    }
    useEffect(() => {
        //@ts-ignore
        ref.current = open;
    });

    const closed = () => {
        setShow(false);
        setDisabled(false);
    }

    const del = useRef(null);
    const archive = useRef(null);
    const restore = useRef(null);


    const [page, setPage] = useState(0);
    const loadPage = (p: number) => {
        setPage(p);
        refetch();
    };

    const showFormulaire = (unitMeasure: UnitMeasure) => {
        setUnitMeasure1(unitMeasure);
        setForm(true);
        setRequest(REQUEST_EDIT);
    };

    const FormAsEdit = (regimeDouanier: RegimeDouanier) => {
        setDisabled(true);
        showFormulaire(unitMeasure);
    };



    const void_ = () => { }

    const [updateUnitMeasure] = useEditUnitMeasureMutation();



    const menu = (unitMeasure: UnitMeasure): MenuItems[] => {
        return ([
            {
                icon: (
                    <ClipboardListIcon
                        className="mr-3 h-8 w-8 text-green-300 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Détail",
                //@ts-ignore
                action: () => { open(unitMeasure); setRequest(REQUEST_EDIT); setDisabled(true) },
            },
            {
                icon: (
                    <PencilAltIcon
                        className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Modifier",
                action: () => { open(unitMeasure); setRequest(REQUEST_EDIT); setDisabled(false) },
            },
            {
                icon: (
                    <TrashIcon
                        className="mr-3 h-8 w-8 text-rose-900 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Supprimer",
                action: () => {
                    //@ts-ignore
                    del.current(unitMeasure.id);
                },
            },
            {
                icon: (
                    <ArchiveIcon
                        className="mr-3 h-8 w-8 text-gray-800 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Archiver",
                action: () => {
                    //@ts-ignore
                    archive.current(unitMeasure.id);
                },
            },
            {
                icon: (
                    <ReplyIcon
                        className="mr-3 h-8 w-8 text-green-900 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                ),
                text: "Restorer",
                action: () => {
                    //@ts-ignore
                    restore.current(unitMeasure.id);
                },
            },
        ]);

    };

    return (

        <>
            {!form && (
                <section className='bg-white float-left w-full h-full mp-8 shadow-lg'>
                    <DeleteUnitMeasure id={""} ref={del} refetch={refetch} />
                    <ArchiveUnitMeasure id={""} ref={archive} />
                    <RestoreUnitMeasure id={""} ref={restore} />
                    <h1>Nouvelle Unité de Mesure Régime </h1>
                    <div className='float-left w-full'>
                        <button className='bg-cyan-800 p-3 text-white rounded border border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left' onClick={() => { open(unitMeasure0) }}>Nouvelle Unité de Mesure Régime</button>
                        <div className='float-right'>
                            <button className='bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg'>
                                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                            <input type="text" className='py-3 border outline-[#ddd] border-[#ddd] float-left border-l-0 rounded-r-lg w-96' placeholder='Recherche' />
                            {/* <button>icon</button> */}
                        </div>
                    </div>
                    <Table className='tab-list float-left w-full mt-8 tab-list float-left w-full'
                        thead={
                            <tr>
                                <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Designation</th>
                                <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Symbole</th>
                                <th className=' top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900'>Decimal</th>
                                <th></th>


                            </tr>}
                    >
                        {//@ts-ignore
                            data.content?.map((unitMeasure: UnitMeasure) => {
                                return (
                                    //@ts-ignore
                                    <tr key={unitMeasure.id}>
                                        <Table.td>{unitMeasure.design}</Table.td>
                                        <Table.td>{unitMeasure.symbole}</Table.td>
                                        <Table.td>{unitMeasure.decimal}</Table.td>
                                        <Table.td className='cursor-pointer'><Mitems menu={menu(unitMeasure)} /></Table.td>
                                    </tr>
                                )
                            })
                        }
                    </Table>
                    <Pagin load={loadPage} />
                </section>
            )}

            <Modal show={show} title="Nouveau Régime Douanier" format={classNames("5")} close={closed}>
                <div className="float-left w-full">
                    <Form defaultValues={unitMeasure1} onSubmit={request == REQUEST_SAVE ? save : request == REQUEST_EDIT ? updateUnitMeasure : void_}>
                        <div className="float-left w-full">
                            <Field label="Designation" name="design" disabled={disabled} required="required" />

                            <div className="float-left w-full">
                                <div className="float-left w-1/2">
                                    <Field label="Symbole" name="symbole" disabled={disabled} required="required" />
                                    <Field
                                        label="Decimal"
                                        name="decimal"
                                        options={DECIMAL}
                                        as="select"
                                        disabled={disabled}
                                        required="required"
                                    />

                                </div>
                            </div>
                        </div>
                        {!disabled && <><Bcyan onClick={() => {
                            setShow(true);
                        }}>
                            Sauvegarder et Nouveau
                        </Bcyan>

                            <Bcyan
                                type="submit"
                                onClick={() => {
                                    setTimeout(() => {
                                        refetch()
                                        closed();
                                    }, 500);
                                }}
                            >
                                Sauvegarder
                            </Bcyan></>}
                    </Form>

                    <div>
                        {disabled && <Bcyan className="float-right"
                            onClick={() => {
                                setDisabled(false)
                            }}>
                            modifier
                        </Bcyan>}
                        {!disabled && <Bcyan className="float-right"
                            onClick={() => {
                                setDisabled(false);
                                setShow(false);
                            }}>
                            Annuler
                        </Bcyan>}
                    </div>
                </div>
            </Modal>
        </>
    );

};





export default forwardRef(FormUnitMeasure);



































