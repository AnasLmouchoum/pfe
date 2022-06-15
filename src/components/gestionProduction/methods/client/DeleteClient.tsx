import { TrashIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { forwardRef, Ref, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { STYLE_ICON } from "tools/constStyle";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import { useDeleteClientMutation } from "../../../config/rtk";
import Modal from "../../../widgets/Modal";
type DeleteClientPorp = {
  id: string;
};
const DeleteClient = ({ id }: DeleteClientPorp, ref: Ref<void>) => {
  const [del] = useDeleteClientMutation();
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
    axios.delete("http://localhost:1000/api/v1/clients/" + id0).then(() => {});
  };
  return (
    <>
      <Modal title={"suppression"} show={showModal}>
        <div>
          <h2>suppression de client num: {id0}</h2>
          <form
            onSubmit={
              //@ts-ignore
              handleSubmit(delTemp)
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
              <TrashIcon
                className="h-8 w-8 text-[#fff] group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Bcyan>
            <Bred
              className="mt-2 float-right"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <XCircleIcon className={STYLE_ICON} aria-hidden="true" />
            </Bred>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default forwardRef(DeleteClient);
