import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate=useNavigate()

    const handlesubmit=()=>{
        navigate('/showallevent')
    }
    return(
        <>
            <h1>EVENT MANAGEMENT</h1><br />
            <button onClick={handlesubmit}>showEvents</button>
            <button onClick={()=>{navigate('/login')}}>Log In</button>
        </>
    )
}