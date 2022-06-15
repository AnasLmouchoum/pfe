import axios from "axios";
import classNames from "classnames";
import { useArchiveProductMutation } from "config/rtk";
import React, { forwardRef, Ref, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setTimeout } from "timers";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import Modal from "widgets/Modal";

type ArchiveProductPorp = {
  id: string;
};
const ArchiverProduct = ({ id }: ArchiveProductPorp, ref: Ref<void>) => {
  const [id0, setId0] = useState(id);
  //@ts-ignore
  const { register, handleSubmit } = useForm<string>({
    defaultValues: { id0 },
  });
  const [archive] = useArchiveProductMutation();
  const [showModal, setShowModal] = React.useState(false);
  const openModal = (i: string) => {
    setId0(i);
    setShowModal(true);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  });
  // const archiveTemp = () => {
  //   axios
  //     .patch("http://localhost:1000/api/v1/products/" + id0 + "/archive")
  //     .then(() => {});
  // };
  return (
    <>
      <Modal title={"archivage"} close={()=>{setShowModal(false)}} show={showModal} format={+classNames("5")}>
        <div>
          <h2>archivage de production num: {id0}</h2>
          <form onSubmit={//@ts-ignore
            handleSubmit(archive)
          }>
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
                  setShowModal(false);
                }, 500);
              }}
            >
              Archiver
            </Bred>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default forwardRef(ArchiverProduct);