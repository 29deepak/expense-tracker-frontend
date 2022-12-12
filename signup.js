async function signup(e){
    try{
        e.preventDefault()
       const signupDetails ={
        name:  e.target.name.value,
        email: e.target.email.value,
        password:e.target.password.value
       }
       const response=await axios.post("http://localhost:4000/user/signup",signupDetails)
       .then(response=>{
        console.log(response)
        const obj=response.data.message
        document.body.innerHTML+=obj
       })
    }
    catch(err){
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`
    }
}