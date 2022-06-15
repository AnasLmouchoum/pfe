import axios from "axios";
import classNames from "classnames";
import React, { forwardRef, Ref, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import { useDeleteArticleMutation } from "config/rtk";
import Modal from "widgets/Modal";
type DeleteArticlePorp = {
  id: string;
  refetch: () => void
};
const DeleteArticle = ({ id, refetch }: DeleteArticlePorp, ref: Ref<void>) => {
  const [del] = useDeleteArticleMutation();
  const [id0, setId0] = useState(id);
  //@ts-ignore
  const { register, handleSubmit } = useForm<string>({
    defaultValues: { id0 },
  });
  const openModal = (i: string) => {
    setId0(i);
    setShowModal(true);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  });
  const [showModal, setShowModal] = React.useState(false);
  const delTemp = () => {
    axios.delete("http://localhost:1000/api/v1/articlees/" + id0).then(() => { });
  };
  return (
    <>
      <Modal title={"suppression"} close={()=>{setShowModal(false)}} show={showModal} format={+classNames("5")}>
        <div>
          <h2>suppression d'article num: {id0}</h2>
          <form
            onSubmit={
              //@ts-ignore
              handleSubmit(delTemp)
            }
          >
            {" "}
            <input type="hidden" {...register("id")} />
            <Bcyan
              className="mt-2 float-right"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Annuler
            </Bcyan>
            <Bred
              type="submit"
              className="mt-2 float-right"
              onClick={() => {
                setTimeout(() => {
                    refetch()
                    setShowModal(false);
                  }, 500);
              }}
            >
              Supprimer
            </Bred>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default forwardRef(DeleteArticle);