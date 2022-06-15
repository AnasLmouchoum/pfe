import { TrashIcon } from "@heroicons/react/outline";
import { ArchiveIcon, XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { forwardRef, Ref, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setTimeout } from "timers";
import { STYLE_ICON } from "tools/constStyle";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import { useArchiveClientMutation } from "../../../config/rtk";
import Modal from "../../../widgets/Modal";
type ArchiveClientPorp = {
  id: string;
};
const ArchiveClient = ({ id }: ArchiveClientPorp, ref: Ref<void>) => {
  const [id0, setId0] = useState(id);
  //@ts-ignore
  const { register, handleSubmit } = useForm<string>({
    defaultValues: { id0 },
  });
  const [archive] = useArchiveClientMutation();
  const [showModal, setShowModal] = React.useState(false);
  const openModal = (i: string) => {
    setId0(i);
    setShowModal(true);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  });
  const archiveTemp = () => {
    axios
      .patch("http://localhost:1000/api/v1/clients/" + id0 + "/archive")
      .then(() => {});
  };
  return (
    <>
      <Modal title={"archivage"} show={showModal}>
        <div>
          <h2>archivage du client num: {id0}</h2>
          <form
            onSubmit={
              //@ts-ignore
              handleSubmit(archiveTemp)
            }
          >
            {" "}
            <input type="hidden" {...register("id")} />
            <Bcyan
              type="submit"
              className="mt-2 float-right"
              onClick={() => {
                setTimeout(() => {
                  setShowModal(false);
                }, 500);
              }}
            >
              <ArchiveIcon
                className="h-8 w-8 text-[#fff] group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Bcyan>
          </form>
          <Bred
            className="mt-2 float-right"
            onClick={() => {
              setShowModal(false);
            }}
          >
            <XCircleIcon className={STYLE_ICON} aria-hidden="true" />
          </Bred>
        </div>
      </Modal>
    </>
  );
};

export default forwardRef(ArchiveClient);
