// import { useParams } from 'react-router-dom'

import { useParams } from "next/navigation";

function ClientFunct() {
    let {id} = useParams();
  return  id
}

export default ClientFunct