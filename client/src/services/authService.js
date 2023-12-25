export const handleLogin = (e,email,password)=>{
    e.preventDefault();
    try{
        console.log(e,email,password);
    }
    catch(error){
        console.log(error);
    }
;}

export const handleSignup = (e,email,password,role,name,organisationName,hospitalName,website,address,phone)=>{
    e.preventDefault();
    try{
        console.log(e,email,password,role,name,organisationName,hospitalName,website,address,phone);
    }
    catch(error){
        console.log(error);
    }

};