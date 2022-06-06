import React, { useState } from "react";
// import Section from "../../../widgets/Section"
import { MinusIcon, XIcon } from "@heroicons/react/solid";
import { Field, Form } from "widgets";
import Bsave from "widgets/Bsave";
import Bcancel from "widgets/Bcancel";
import { paletteM } from "tools/types";
import Modal from "widgets/Modal";
import Table from "widgets/Table";
type NouvellePaletteProps = {
  showModalE: boolean;
  setShowModalE: (b: boolean) => void;
};
function ModifPalette({ showModalE, setShowModalE }: NouvellePaletteProps) {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const close = () => {
    setShowModalE(false);
  };
  const [listPret, setListPret] = useState([
    {
      code: 1,
      designation: "vvvvvvv",
      nCmd: 100,
      saison: 4,
      portion: "Maroc",
      nColis: 20,
    },
  ]);

  return (
    <Modal
      title={"Nouvelle Palette"}
      show={showModalE}
      format={5}
      close={close}
    >
      <Form defaultValues={paletteM} onSubmit={onSubmit}>
        <div className="grid grid-rows-6">
          <div className="grid  row-span-4">
            <div className="m-auto">
              <div className="flex my-5 w-full ">
                <div className="flex items-center ml-5">
                  <Field
                    label="N° Palette"
                    name="NPalette"
                    type="number"
                    className="w-96"
                    placeholder="1"
                  />
                </div>
                <div className="flex items-center ml-5">
                  <Field label="Remarque" name="Remarque" className="w-96" />
                </div>
              </div>
              <div className="flex my-5">
                <div className="flex items-center ">
                  <Field
                    label="Nombre de colis"
                    name="Nombrecolis"
                    type="number"
                    className="w-96"
                    placeholder="20"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-1">
            {/* <div className='' onClick={()=>setSaveNew(true)}>
                <Bcyan label='Sauvgarder et Nouveau' type='submit'  className="    float-left mr-10 w-1/5 "  />
            </div> */}
            <div className="">
              <Bcancel className="float-right mr-10" onClick={close} />
              <Bsave type="submit" className="    float-right mr-10 " />
            </div>
          </div>
        </div>
      </Form>
      <div className="">
        <div className="m-5">
          <Table
            className="tab-list my-8 px-1 tab-list float-left"
            thead={
              <Table.tr>
                <Table.th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Code Article
                </Table.th>
                <Table.th className=" top-0 z-10    py-5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Designation
                </Table.th>
                <Table.th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ">
                  Nº Commande
                </Table.th>
                <Table.th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ">
                  Saison
                </Table.th>
                <Table.th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ">
                  Portion
                </Table.th>
                <Table.th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 ">
                  N°Colis
                </Table.th>
                <Table.th className=" top-0 z-10    py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "></Table.th>
              </Table.tr>
            }
          >
            {listPret.map((p: any) => {
              return (
                <Table.tr key={p.code}>
                  <Table.td>{p.code}</Table.td>
                  <Table.td>{p.designation}</Table.td>
                  <Table.td>{p.nCmd}</Table.td>
                  <Table.td>{p.saison}</Table.td>
                  <Table.td>{p.portion}</Table.td>
                  <Table.td>{p.nColis}</Table.td>
                  <Table.td className="cursor-pointer">
                    <MinusIcon className="w-7 h-7 border-2 rounded-full border-black text-black " />
                  </Table.td>
                </Table.tr>
              );
            })}
          </Table>
        </div>
      </div>
    </Modal>
  );
}

export default ModifPalette;
