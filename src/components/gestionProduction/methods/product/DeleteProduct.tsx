import axios from "axios";
import classNames from "classnames";
import React, { forwardRef, Ref, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import { useDeleteProductMutation } from "config/rtk";
import Modal from "widgets/Modal";
type DeleteProductPorp = {
  id: string;
  refetch: () => void
};
const DeleteProduct = ({ id, refetch }: DeleteProductPorp, ref: Ref<void>) => {
  const [del] = useDeleteProductMutation();
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
    axios.delete("http://localhost:1000/api/v1/products/" + id0).then(() => { });
  };
  return (
    <>
      <Modal title={"suppression"} close={()=>{setShowModal(false)}} show={showModal} format={+classNames("5")}>
        <div>
          <h2>suppression de production num: {id0}</h2>
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

export default forwardRef(DeleteProduct);