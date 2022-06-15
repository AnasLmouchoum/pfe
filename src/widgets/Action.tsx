import { TrashIcon } from "@heroicons/react/outline";
import { ArchiveIcon, XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { forwardRef, Ref, useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setTimeout } from "timers";
import { STYLE_ICON } from "tools/constStyle";
import Bcancel from "widgets/Bcancel";
import Bcyan from "widgets/Bcyan";
import Bred from "widgets/Bred";
import { useArchiveClientMutation } from "config/rtk/RtkClient";
import Modal from "widgets/Modal";
import { Field, Form } from "widgets";
import { code0, IdsObject } from "tools/types";
import Barchive from "widgets/Barchive";
import ModalS from "widgets/ModalS";
import Box from "widgets/Box";
import { ARCHIVE, DEL, RESTORE } from "tools/consts";
import Brestore from "./Brestore";
import Bdel from "./Bdel";
//signature :abd 27/05-2022 08:57
type ArchiveClientPorp = {
  id: string;
  path: string;
  action: number;
  design: string;
  type: string;
  refetch?: any;
};
const Archive = (
  { id, design, type, path, action, refetch }: ArchiveClientPorp,
  ref: Ref<void>
) => {
  const [id0, setId0] = useState(id);
  const [design0, setDesign0] = useState(design);
  const [showModal, setShowModal] = React.useState(false);
  const openModal = (id: string, design: string) => {
    setId0(id);
    setDesign0(design);
    setShowModal(true);
  };
  const close = () => {
    setShowModal(false);
  };
  useEffect(() => {
    //@ts-ignore
    ref.current = openModal;
  });
  const archiveTemp = () => {
    // let act =
      action == ARCHIVE
        ? /*"archive"*/ axios.patch("http://localhost:1000/api/v1/"+path+"/" + id0 + "/archive").then(() => { })
        : action == RESTORE
        ? /*"restore"*/ axios.patch("http://localhost:1000/api/v1/"+path+"/" + id0 + "/restore").then(() => { })
        : action == DEL
        ? /*"del"*/ axios.delete("http://localhost:1000/api/v1/"+path+"/" + id0).then(() => { })
        : "";
        refetch()
    // axios
    //   .patch(process.env.NEXT_PUBLIC_URL + "/" + path + "/" + id0 + "/" + act)
    //   .then(() => {});
  };
  const style = "float-right mt-5 b-ajust-r bg-rose-900 border-rose-800";
  let verbe =
    action == ARCHIVE
      ? "archiver"
      : action == RESTORE
      ? "restorer"
      : action == DEL
      ? "supprimer"
      : "";

  return (
    <>
      <Box title={"archivage"} show={showModal} action={action} close={close}>
        {
          //@ts-ignore
          <h2>
            vous vouler {verbe} {type}: {design0} ?
          </h2>
        }
        <Form defaultValues={code0} onSubmit={archiveTemp}>
          <Field type="hidden" name="id" />

          {action == ARCHIVE ? (
            <Barchive
              type="submit"
              className={style}
              onClick={() => {
                setTimeout(() => {
                  close();
                }, 500);
              }}
            />
          ) : action == RESTORE ? (
            <Brestore
              type="submit"
              className={style}
              onClick={() => {
                setTimeout(() => {
                  close();
                }, 500);
              }}
            />
          ) : action == DEL ? (
            <Bdel
              type="submit"
              className={style}
              onClick={() => {
                setTimeout(() => {
                  close();
                }, 500);
              }}
            />
          ) : (
            <></>
          )}
        </Form>
        <Bcancel
          className=" float-right mt-5 b-ajust bg-[#ffffff] text-rose-900 border-rose-900 "
          onClick={() => {
            close();
          }}
        />
      </Box>
    </>
  );
};

export default forwardRef(Archive);
