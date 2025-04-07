import { randomInt } from "crypto"

export default function Login(){
    let random=randomInt(2)
    if (random === 1) {
        throw new Error("Something went wrong while loading the login page.");
      }
    
    return(
        <>
        <h1>Login page</h1>
        </>
    )
}