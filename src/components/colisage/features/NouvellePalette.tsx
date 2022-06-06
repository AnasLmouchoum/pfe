import React from "react";
import { Field, Form } from "widgets";
import Bsave from "widgets/Bsave";
import Bcancel from "widgets/Bcancel";
import { palette0 } from "../tools/types";
import Modal from "widgets/Modal";
type NouvellePaletteProps = {
  showModal: boolean;
  setShowModal: (b: boolean) => void;
};
function NouvelPalette({ showModal, setShowModal }: NouvellePaletteProps) {
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const close = () => {
    setShowModal(false);
  };

  return (
    <Modal title={"Nouvelle Palette"} show={showModal} format={5} close={close}>
      <Form defaultValues={palette0} onSubmit={onSubmit}>
        <div className="grid grid-rows-6">
          <div className="grid  row-span-4">
            <div className="m-auto">
              <div className="flex my-5 w-full ">
                <div className="flex items-center ml-5">
                  <Field
                    label="N° Palette"
                    name="NPalette"
                    type="number"
                    className="w-96"
                    placeholder="1"
                  />
                </div>
                <div className="flex items-center ml-5">
                  <Field label="Remarque" name="Remarque" className="w-96" />
                </div>
              </div>
              <div className="flex my-5">
                <div className="flex items-center ">
                  <Field
                    label="Nombre de colis"
                    name="Nombrecolis"
                    type="number"
                    className="w-96"
                    placeholder="20"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row-span-1">
            {/* <div className='' onClick={()=>setSaveNew(true)}>
                <Bcyan label='Sauvgarder et Nouveau' type='submit'  className="    float-left mr-10 w-1/5 "  />
            </div> */}
            <div className="">
              <Bcancel className="float-right mr-10" onClick={close} />
              <Bsave type="submit" className="    float-right mr-10 " />
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default NouvelPalette;
