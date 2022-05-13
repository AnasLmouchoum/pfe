import { BriefcaseIcon, SaveIcon, XCircleIcon } from "@heroicons/react/solid";
import { useAddCommandeMutation, useFetchClientsQuery } from "config/rtk";
import React, { forwardRef, Ref, useEffect, useState } from "react";
import { STYLE_ICON, style_icon, style_span } from "tools/constStyle";
import { AdressLiv, Client, Commande, getClient } from "tools/types";
import { Field, Form } from "widgets";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import Modal from "widgets/Modal";
import NavTabs from "widgets/NavTabs";
import { MenuNavTabs } from "widgets/TypeWidgets";
import ArticlesCommande from "./ArticlesCommande";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
type CommandProps = {
  command: Commande;
};

const FormCommande = ({ command }: CommandProps, ref: Ref<void>) => {
  const [showModal, setShowModal] = React.useState(false);
  const [command0, setCommand0] = useState(command);
  const { data = [], isFetching, refetch } = useFetchClientsQuery();
  //@ts-ignore
  const [clients, setClients] = useState(data?.content);
  //@ts-ignore
  const [idClients, setidClients] = useState(clients?.map((x) => x.design));
  const [save] = useAddCommandeMutation();
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e: Date) => {
    // alert(e)
    setStartDate(e);
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 1000);
  };
  const openModal = (c: Commande) => {
    setCommand0(c);
    setShowModal(true);
  };
  useEffect(() => {
    /*  setAdressLivs(client.adressLivs) */
    //@ts-ignore
    ref.current = openModal;
  });
  const commanndes: MenuNavTabs[] = [
    {
      id: 1,
      name: (
        <>
          <BriefcaseIcon className={style_icon} aria-hidden="true" />
          <span className={style_span}>Articles de la commande</span>
        </>
      ),
      featured: <ArticlesCommande commande={command0} />,
    },
  ];
  return (
    <Modal title={command0.id===""?"Nouvelle commande":"Mise à jour de la commande"} show={showModal} format={5}>
      <Form defaultValues={command0} onSubmit={save}>
        {({ watch }) => {
          //@ts-ignore
          const idClient = watch("idClient");
          const client1: Client | undefined =
            command0.client.id != ""
              ? command0.client
              : getClient(idClient, clients);
          const adressLivs1: string[] | undefined = client1?.adressLivs?.map(
            (x) => x.adress
          );
          console.log(idClient);
          return (
            <>
              <div className="float-left w-1/2">
                <Field type="hidden" name="idClient" />
                {command0.client.id != "" ? (
                  <>
                    <Field type="hidden" name="idClient" />
                    <Field label="Client" value={command0.client.design} />
                  </>
                ) : (
                  <Field
                    label="Client"
                    name="idClient"
                    as="select"
                    options={clients}
                    optionLabelName="design"
                  />
                )}
                <Field label="Date Commande" name="date" type="date"  />
               {/*  <Field
                  label="Date de commande"
                  name="dateo"
                  value={startDate}
                  onFocus={() => {
                    setIsOpen(true);
                  }}
                  onBlur={() => {
                    setIsOpen(false);
                  }}
                /> */}
                {/* <div className="float-left w-full relative">
{isOpen && <DatePicker selected={startDate} onChange={()=>{handleChange(startDate)}} inline />}
</div> */}
              </div>
              <div className="float-left w-1/2">
                <Field
                  label="Adress de livraison"
                  name="adrLiv"
                  as="select"
                  options={adressLivs1}
                />
                <Field label="Saison" name="season" />
              </div>
              <Bcyan className="float-right mt-2">
                <SaveIcon className={STYLE_ICON} aria-hidden="true" />
              </Bcyan>
            </>
          );
        }}
      </Form>
      <Bred
        className="float-right mt-2"
        onClick={() => {
          setShowModal(false);
        }}
      >
        <XCircleIcon className={STYLE_ICON} aria-hidden="true" />
      </Bred>
      {command0.id!="" && <NavTabs tab={commanndes} />}      
    </Modal>
  );
};

export default forwardRef(FormCommande);
