import axios, { Axios } from 'axios'
import { openOneUser } from 'config/rtk/RtkUser'
import React, { useEffect, useState } from 'react'
import { User } from 'tools/types'
import { Field, Form } from 'widgets'
import Bcyan from 'widgets/Bcyan'
import Bsave from 'widgets/Bsave'
import Modal from 'widgets/Modal'

type ChangerMdpProps = {
    visibilite:boolean;
    setVisibilite:(b:boolean)=> void;
    dataUser:User
}

function ChangerMdp({visibilite,setVisibilite,dataUser}:ChangerMdpProps) {
    const [password,setPassword] = useState("")
    const [conf,setConf] = useState("")
    const [id,setId] = useState(dataUser.id)


    const close = () => {
        setVisibilite(false)
    }
    const onSubmit = () => {
        // axios.get(`http://localhost:1000/api/v1/users/changePsd/${dataUser.id}/${password}`)
        // console.log('http://localhost:1000/api/v1/users/changePsd/'+{id}+'/'+{password})
        console.log(dataUser.id)
        axios.get(`http://localhost:1000/api/v1/users/changePsd/${dataUser.id}/${password}`)
        
        console.log("Password Changed")
        close()
    }

  return (
    <div>
            <Modal title={"Changer le mot de passe"} show={visibilite} format={1} close={close} >
            <Form >
                <div className='w-3/4'>
                 <div className="flex items-center mt-10 mb-5  ">
                    <Field 
                    label="Password"  
                    type="password"
                    name="password" 
                    value={password} 
                    className=""
                    onChange={(e:any)=>setPassword(e.target.value)}
                    
                    />
                </div>
                <div className="flex items-center mt-10 mb-5  ">
                    <Field 
                    label="confirmation "   
                    type="password"  
                    value={conf}
                    name="confirmation"
                    className=""
                    />
                </div>
            </div>   
            <div className=''>
                <Bcyan label="Annuler" onClick={()=>close()} className="float-right mr-11" />
                <Bcyan label="Sauvgarder"  onClick={()=>onSubmit()} className="float-right mr-11" />

            </div>  
                                
            </Form>   
        </Modal>
    </div>
  )
}

export default ChangerMdp