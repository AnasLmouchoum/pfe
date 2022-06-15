import axios from "axios";
import classNames from "classnames";
import React, { forwardRef, Ref, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import { useRestoreArticleMutation } from "config/rtk";
import Modal from "widgets/Modal";
type RestoreArticlePorp = {
  id: string;
};
const RestoreArticle = ({ id }: RestoreArticlePorp, ref: Ref<void>) => {
  const [id0, setId0] = useState(id);
  //@ts-ignore
  const { register, handleSubmit } = useForm<string>({
    defaultValues: { id0 },
  });
  const [restore] = useRestoreArticleMutation();
  const [showModal, setShowModal] = React.useState(false);
  const openModal = (i: string) => {
    setId0(i);
    setShowModal(true);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  });
  // const restoreTemp = () => {
  //   axios
  //     .patch("http://localhost:1000/api/v1/articlees/" + id0 + "/restore")
  //     .then(() => { });
  // };
  return (
    <>
      <Modal title={"restoration"} close={()=>{setShowModal(false)}} show={showModal} format={+classNames("5")}>
        <div>
          <h2>restoration d'article num: {id0}</h2>
          <form
            onSubmit={
              //@ts-ignore
              handleSubmit(restore)
            }
          >
            {" "}
            <input type="hidden" {...register("id")} />
            <Bcyan
              type="submit"
              className="mt-2 float-right"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Annuler
            </Bcyan>
            <Bred
              className="mt-2 float-right"
              onClick={() => {
                setTimeout(() => {
                  setShowModal(false);
                }, 500);
              }}
            >
              Restorer
            </Bred>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default forwardRef(RestoreArticle);