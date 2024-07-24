import {  useState} from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'



export function useSignup() {

    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    const signup = async (name,place,age,phone,email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/signup',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name,place,age,phone,email, password})
            }
        )
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            alert("User Registration Successful");
            navigate('/login');
        }
 
    }


  return { signup, isLoading, error}
}


