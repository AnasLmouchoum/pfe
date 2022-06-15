import axios, { Axios } from 'axios'
import { openOneUser } from 'config/rtk/RtkUser'
import React, { useEffect, useState } from 'react'
import { User } from 'tools/types'
import { Field, Form } from 'widgets'
import Bcyan from 'widgets/Bcyan'
import Box from 'widgets/Box'
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
        setPassword('');setConf('');
    }
    const onSubmit = (e: any) => {
        // axios.get(`http://localhost:1000/api/v1/users/changePsd/${dataUser.id}/${password}`)
        // console.log('http://localhost:1000/api/v1/users/changePsd/'+{id}+'/'+{password})
        console.log(dataUser.id)
        
        if(conf == password && password !== ''){
            axios.get(`http://localhost:1000/api/v1/users/changePsd/${dataUser.id}/${password}`)
            close();
            console.log("Password Changed");
        }else{
            e.preventDefault();
            alert("Le mot de passe doit être plus de 5 caracteres")
        }
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
                    onChange={(e:any)=>setConf(e.target.value)}
                    />
                </div>
            </div>   
            <div className=''>
                <Bcyan label="Annuler" onClick={()=>close()} className="float-right mr-11" />
                <Bcyan label="Sauvgarder"  onClick={(e)=>onSubmit(e)} className="float-right mr-11" />

            </div>  
                                
            </Form>   
        </Modal>
    </div>
  )
}

export default ChangerMdp