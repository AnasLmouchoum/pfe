import axios from "axios";
import { OpenMatiereProp, openMatieres } from "components/gestionProduction/rtk/RtkMatiere";
import { Matiere } from "components/gestionProduction/types";
import {
  useAddMatierePremiereMutation,
  useFetchMatierePremiereQuery,
} from "config/rtk";
import {
  OpenFournisseurProp,
  openFournisseurs,
} from "config/rtk/rtkFournisseur";
import React, { forwardRef, Ref, useEffect, useState } from "react";
// import { LIST_FAMILLE_MATIERE_PREMIERE, ORIGINE } from "tools/consts";
import { f0, Fournisseur, MatierePremiere, RawMaterial, rawMaterial0 } from "tools/types";
import { Field, Form } from "widgets";
import Bcancel from "widgets/Bcancel";
import Bcyan from "widgets/Bcyan";
import Bedit from "widgets/Bedit";
import Bsave from "widgets/Bsave";
import Bupdate from "widgets/Bupdate";
import Modal from "widgets/Modal";
import Required from "widgets/Required";

type MatierePremiereProps = {
  Matierep: MatierePremiere;
  disabled: boolean;
  refetch: () => void;
  fournisseurs: Fournisseur[];
  fournisseur: Fournisseur;
  setDisabled?: any;
};

const FormMatierePremiere = (
  {
    Matierep,
    disabled,
    setDisabled,
    refetch,
    fournisseurs,
    fournisseur,
  }: MatierePremiereProps,
  ref: Ref<void>
) => {
  const [showModal, setShowModal] = React.useState(false);
  const [matiere0, setMatiere0] = useState(Matierep);
  const [disabled0, setDisabled0] = useState(disabled);
  const [fournisseur0, setFournisseur0] = useState(fournisseur);
  const [save] = useAddMatierePremiereMutation();
  const openModal = (
    m: MatierePremiere,
    d: boolean,
    fournisseur: Fournisseur
  ) => {
    setMatiere0(m);
    setShowModal(true);
    setDisabled0(d);
    setFournisseur0(fournisseur);
  };
  const close = () => {
    setShowModal(false);
    setDisabled(false);
  };

  const AllmatierePremieresOpen: OpenMatiereProp = openMatieres();
	const refetchAll = AllmatierePremieresOpen.refetch;
  
/***************************************************************************************/
const [FamilleMatiere, setFamilleMatiere] = useState<RawMaterial[]>([rawMaterial0])
useEffect(() => {
  axios.get('http://localhost:1000/api/v1/rawMaterials').then(resp => {
    setFamilleMatiere(FamilleMatiere.concat(resp.data.content));
  })
}, []);
/***************************************************************************************/
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  });
  return (
    <Modal
      title={"Nouvelle Matiére premiére"}
      show={showModal}
      format={5}
      close={close}
    >{/*@ts-ignore*/}
      <Form defaultValues={matiere0} onSubmit={(data) => {save(data); setTimeout(() => { refetch(); refetchAll(); close();}, 1500);}}>
        <div className="mt-1">
        <Field label={<Required msg='Code' />} name="codeMat" disabled={disabled} required />
          {/* {matiere0.id != "" ? (
            <>
              <Field label="Fournisseur" value={fournisseur0?.design} disabled={disabled} />
            </>
          ) : ( */}
            <Field
              label="Fournisseur"
              name="idFournisseur"
              as="select"
              options={fournisseurs}
              optionLabelName="design"
              optionKeyName="id"
              disabled={disabled}
            />
          {/* )} */}
          <Field label={<Required msg='Designation' />} name="designation" disabled={disabled} required />
          <Field
            label= {<Required msg='Famille matière première' />}
            name="familleMatierePremiere"
            as="select"
            options={FamilleMatiere}
            optionLabelName="design"
            optionKeyName="design"
            disabled={disabled}
            required
          />
          <Field label={<Required msg='Prix' />} placeholder="Dirham" name="prixUnit" disabled={disabled} required />
          <Field label='Stock' name="stock" disabled={disabled} />
          <Field label="Origine" name="origine" disabled={disabled} /> {/*as="select" options={ORIGINE}*/}
          {/* <DatePicker className="border-[#f00]" selected={stsartDate} onChange={(date:any) => setStartDate(date)} /> */}
        </div>
        {!disabled &&
        <Bsave
          className="float-right mt-5 b-ajust-r"
          onClick={() => {
            // setTimeout(() => {
            //   refetch();
            //   refetchAll();
            //   close();
            // }, 1500);
          }}
        />}
      </Form>
      { disabled &&
        <Bupdate
          className="float-right mt-5 b-ajust-l"
          onClick={() => {
            setDisabled(false);
          }}
        />
      }
      {!disabled &&
      <Bcancel
        className="float-right mt-5 b-ajust"
        onClick={() => {
          // close();
          setDisabled(true);
        }}
      />}
    </Modal>
  );
};

export default forwardRef(FormMatierePremiere);
