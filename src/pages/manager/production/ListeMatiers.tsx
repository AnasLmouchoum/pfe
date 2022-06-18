import { OpenMatiereProp, openMatieres } from 'components/gestionProduction/rtk/RtkMatiere'
import React, { useEffect, useState } from 'react'
import { mat0, Matiere, MatiereJson } from 'components/gestionProduction/types'
import { Field, Form } from 'widgets'
import Bcyan from 'widgets/Bcyan'
import Table from 'widgets/Table'
import axios from 'axios'

type Props = {
    matieres?: any; 
    setMatiers?: any;
    detail?: any;
}

const ListeMatiers = ({matieres, setMatiers, detail}: Props) => {

    //----------------MATIERE-----------------
    const MatieresToOpen: OpenMatiereProp = openMatieres();
    const MatiereJson: MatiereJson = MatieresToOpen.data
    const Matieres: Matiere[] = MatiereJson.content
    //---------------------------------------------------------

    const [mats, setMats] = useState(['']);

    useEffect(() => {
        axios.get("http://localhost:1000/api/v1/matieresPremiere")
          .then((rep) => {
            // setClient(rep.data);
            setMats(mats.concat(rep.data.content));
          })
      }, [])

    const startFields: any = {
        code: "",
        designation: "Ajouter ligne",
        uniteDeMesure: "",
        quantite: "",
        prixUnitaire: "",
        action: ""
    }

    const [addMat, setAddMat] = useState<any>(startFields);
    // const [matieres, setMatiers] = useState<Matiere[]>([]);
    
    const ajtMat = (data: any) => {
        // const matCopy = matieres;
        // matCopy.push(data);
        //@ts-ignore
        let matAdded: Matiere = mats.filter(m => m.id === data.designation)[0];
        setMatiers(matieres.concat({
            matiere: matAdded,
            quantite: data.quantite,
        }));
        setAddMat(startFields);
    }

    const addMatiere = () => {
        if(addMat.code === startFields.code) {
            setAddMat({
                // code: <Field className="sm:grid-cols-1 sm:gap-1" name="code" disabled={false} />,
                designation: <Field className="sm:grid-cols-1 sm:gap-1" as="select" optionKeyName="id" optionLabelName="designation" options={mats} name="designation" disabled={false} />,
                // uniteDeMesure: <Field className="sm:grid-cols-1 sm:gap-1" name="uniteDeMesure" disabled={false} />,
                quantite: <Field className="sm:grid-cols-1 sm:gap-1" type="number" name="quantite" disabled={false} />,
                // prixUnitaire: <Field className="sm:grid-cols-1 sm:gap-1" name="prixUnitaire" disabled={false} />,
                action: <><Bcyan className="px-4 w-20" type="submit">Ajouter</Bcyan> <Bcyan className="px-4 w-20" onClick={()=>setAddMat(startFields)}>Annuler</Bcyan></>
            });
        }
    }

  return (
    <Form onSubmit={ajtMat}>
        <Table className="tab-list float-left w-full"
            thead={
                <tr>
                    <Table.th>Désignation</Table.th>
                    <Table.th>Quantité</Table.th>
                    <Table.th>Code</Table.th>
                    <Table.th>Unité de mesure</Table.th>
                    <Table.th>Prix Unitaire</Table.th>
                    <Table.th></Table.th>
                </tr>
            }
        >
            {matieres.map((m: any) => {
                if(m !== mat0)
                return (
                    <tr key={Math.random()}>
                        <Table.td>{m.matiere.designation}</Table.td>
                        <Table.td>{m.quantite}</Table.td>
                        <Table.td>{m.matiere.codeMat}</Table.td>
                        <Table.td>{m.matiere.unitMesure}</Table.td>
                        <Table.td>{m.matiere.prixUnit}</Table.td>
                        {/*@ts-ignore*/}
                        <Table.td>{!detail && <Bcyan className="px-4 w-24" onClick={()=>{setMatiers(matieres.filter((e) => e.matiere.codeMat != m.matiere.codeMat))}}>Supprimer</Bcyan>}</Table.td>
                    </tr>
                )}
            )}

            {!detail &&
            <tr key={Math.random()}>
                <Table.td className='w-1/6'><p className='text-gray-700 cursor-pointer' onClick={addMatiere}>{addMat.designation}</p></Table.td>
                <Table.td className='w-1/6'>{addMat.quantite}</Table.td>
                <Table.td className='w-1/6'>{addMat.code}</Table.td>
                <Table.td className='w-1/6'>{addMat.uniteDeMesure}</Table.td>
                <Table.td className='w-1/6'>{addMat.prixUnitaire}</Table.td>
                <Table.td className='w-1/6'>{addMat.action}</Table.td>
            </tr>}
        </Table>
    </Form>
  )
}

export default ListeMatiers