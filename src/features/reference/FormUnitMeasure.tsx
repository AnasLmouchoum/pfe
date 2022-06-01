import React, { forwardRef, Ref, useEffect, useRef, useState } from "react";
import { UnitMeasure, unitMeasure0, UnitMeasureJson } from "tools/types";
import { ARCHIVE, DECIMAL, DEL, REQUEST_EDIT, REQUEST_SAVE, RESTORE, VILLE } from "tools/consts";
import { Form, Field } from "widgets";
import Modal from "widgets/Modal";
import Bcyan from "widgets/Bcyan";
import classNames from "classnames";
import Table from "widgets/Table";
import { MenuItems } from "widgets/TypeWidgets";
import Mitems from "widgets/Mitems";
import Pagin from "widgets/Pagin";
import { openUnitMeasures, OpenUnitMeasureProp} from "config/rtk/rtkUnitMeasure";
import Bcyanxl from "widgets/Bcyanxl";
import Bsave from "widgets/Bsave";
import Bcancel from "widgets/Bcancel";
import BsavEndNew from "widgets/BsavEndNew";
import ModalS from "widgets/ModalS";
import Required from "widgets/Required";
import Action from "widgets/Action";
import MitemsRef from "widgets/MitemsRef";

type FormUnitMeasureProps = {
  unitMeasure: UnitMeasure;
};
const FormUnitMeasure = (
  { unitMeasure }: FormUnitMeasureProps,
  ref: Ref<void>
) => {
  const unitMeasuresToOpen: OpenUnitMeasureProp = openUnitMeasures();
  const unitMeasureJson: UnitMeasureJson = unitMeasuresToOpen.data;
  const unitMeasures: UnitMeasure[] = unitMeasureJson.content;
  const refetchUnitMeasure: () => void = unitMeasuresToOpen.refetch;
  const saveUnitMeasure = unitMeasuresToOpen.save;
  const editUnitMeasure = unitMeasuresToOpen.edit;

  //const { data = [], isFetching, refetch } = usePaginationUnitMeasuresQuery(0);
  const [unitMeasure1, setUnitMeasure1] = useState<UnitMeasure>(unitMeasure0);
  const [request, setRequest] = useState(REQUEST_SAVE);

  //const [save] = useAddUnitMeasureMutation();

  const [form, setForm] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const [show, setShow] = useState(false);
  const open = (u: UnitMeasure) => {
    setUnitMeasure1(u);
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

  const del = useRef(null);
  const archive = useRef(null);
  const restore = useRef(null);

  const [page, setPage] = useState(0);
  const loadPage = (p: number) => {
    setPage(p);
    refetchUnitMeasure();
  };

  const showFormulaire = (unitMeasure: UnitMeasure) => {
    setUnitMeasure1(unitMeasure);
    setForm(true);
    setRequest(REQUEST_EDIT);
  };

  const FormAsUpdate = (unitMeasure: UnitMeasure) => {
    setDisabled(false);
    open(unitMeasure);
  };

  const void_ = () => {};

  //const [updateUnitMeasure] = useEditUnitMeasureMutation();


  return (
    <>
      {!form && (
        <section className="bg-white float-left w-full h-full mp-8 shadow-lg">
          <Action id="" path="unitMeasures" design="" type="Unité de Mesure" ref={del} action={DEL}/>
          <Action id="" path="unitMeasures" design="" type="Unité de Mesure" ref={archive} action={ARCHIVE}/>
          <Action id="" path="unitMeasures" design="" type="Unité de Mesure" ref={restore} action={RESTORE}/>
          <h1>Unités de Mesure</h1>
          <div className="float-left w-full">
            <button
              className="bg-sky-900 p-3 text-white rounded border border-cyan-900py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-left"
              onClick={() => {
                setDisabled(false);
                open(unitMeasure0);
              }}
            >
              Nouvelle Unité de Mesure
            </button>
            <div className="float-right">
              <button className="bg-white float-left border border-[#ddd] border-r-0 p-3 rounded-l-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
              <input
                type="text"
                className="py-3 border outline-[#ddd] border-[#ddd] float-left border-l-0 rounded-r-lg w-96"
                placeholder="Recherche"
              />
              {/* <button>icon</button> */}
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
                  Symbole
                </th>
                <th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Décimal
                </th>
                <th></th>
              </tr>
            }
          >
            {
              //@ts-ignore
              unitMeasures?.map((unitMeasure: UnitMeasure) => {
                return (
                  //@ts-ignore
                  <tr key={unitMeasure.id}>
                    <Table.td>{unitMeasure.design}</Table.td>
                    <Table.td>{unitMeasure.symbole}</Table.td>
                    <Table.td>{unitMeasure.decimal}</Table.td>
                    <Table.td className="cursor-pointer">
                    <MitemsRef
                      archive={() => {
                        //@ts-ignore
                        archive.current(unitMeasure.id,unitMeasure.design);
                      }}
                    /*   restore={() => {
                        //@ts-ignore
                        restore.current(client.id,client.design);
                      }} */
                      del={() => {
                        //@ts-ignore
                        del.current(unitMeasure.id,unitMeasure.design);
                      }}
                      obj={unitMeasure}
                      update={() => {
                        FormAsUpdate(unitMeasure);
                      }}
                    />
                    </Table.td>
                  </tr>
                );
              })
            }
          </Table>
          <Pagin load={loadPage} max={unitMeasures?.length}
            visible={unitMeasures?.length > 0 ? true : false}
          />
        </section>
      )}

      <ModalS
        show={show}
        title={unitMeasure1.id==""?"Nouvelle Unité de Mesure":"Modifier Unité de Mesure"}
        format={+classNames("5")}
        close={closed}
     >
             <div className="float-left w-full">
        
         <Form
            defaultValues={unitMeasure1}
            onSubmit={
              request == REQUEST_SAVE
                ? saveUnitMeasure
                : request == REQUEST_EDIT
                ? editUnitMeasure
                : void_
            }
          >
           <div className=" float-left w-1/2">
                <Field
                  label={<Required msg="Désignation"/>}
                  name="design"
                  disabled={disabled}//required={true}
                  
                />
              </div>
            
              <div className="float-left w-full">
              <div className="float-left w-1/2">
              <Field
                  label={<Required msg="Symbole"/>}
                  name="symbole"
                  disabled={disabled}//required={true}
                  
                />
              </div>
              <div className="float-right w-1/2">
                <Field
                  label={<Required msg="Décimal"/>}
                  name="decimal"
                  options={DECIMAL}
                  as="select"
                  disabled={disabled}//required={true}
                  
                />
              </div>
           </div>
              <div className=" mt-5 b-ajust-r">
                     <Bsave
            className="float-right"
            onClick={() => {
              setTimeout(() => {
                refetchUnitMeasure();
                closed();
              }, 500);
            }}
          />
          {unitMeasure1.id=="" &&<BsavEndNew
                  className="ml-10 mr-2"
                  onClick={() => {
                    setTimeout(() => {
                      refetchUnitMeasure();
                      }, 500);
                  }}
                />}
               
              </div>
        
          </Form>
      
          

               <Bcancel
               className="float-right mt-5 b-ajust"
               onClick={() => {
                 setDisabled(false)
                 setShow(false);
               }}
             />
                </div> 
      </ModalS>
    </>
  );
};

export default forwardRef(FormUnitMeasure);
