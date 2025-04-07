export default async function Register(){
    await new Promise((resolve)=>{
        setTimeout(() => {
            resolve("intentional delay")
        }, 2000);
    })
    return(
        <>
        <h1>Register page</h1>
        </>
    )
}