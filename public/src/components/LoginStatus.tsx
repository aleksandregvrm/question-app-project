import { useReduxSelector } from '../store';

const LoginStatus = () => {
    const {isLoading,message} = useReduxSelector((store)=>store.user)
    if(isLoading){
      return <p>{isLoading && "Loading..."}</p>
    }
    if(message){
      return <p>{message}</p>
    }
  return (
    <p></p>
  )
}

export default LoginStatus