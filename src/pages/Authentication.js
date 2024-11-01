import AuthForm from '../components/Auth/AuthForm';
import {json,redirect} from 'react-router-dom'
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;


// FUNKCIJA ZA LOG IN SMESTAM NEKI IZMISLJENI TOEKN NA LOCAL STORAGE I PROVERAM DA LI SU SIFRA I KORISNICKO MARKO 

export async function action({request}){
  
  // const searchParams=new URL(request.url).searchParams;
  // const mode = searchParams.get('mode') || 'login';

  // if (mode !== 'login' && mode!== 'signup'){
  //   throw json ({message:'Unsuported mode.'}, {status: 422});
  // }

  const data=await request.formData();
  const authData={
    username:data.get('username'),
    password:data.get('password'),
  };

  // const response= await fetch ('http://localhost:8080/'+ mode,{
  //   method: 'POST',
  //   headers:{
  //     'Content-Type':'application/json'
  //   },
  //   body: JSON.stringify(authData),
  // });

  // if (response.status === 422 || response.status ===401){

  //   return response
  // }

  // if (!response.ok){
  //   throw json ({message:'Bla bla'}, {status:500});
  // }

    // const resData= await response.json();
    // const token = resData.token;

    // localStorage.setItem('token', token)

 if (authData.username===localStorage.getItem('username') && authData.password===localStorage.getItem('password')){

  const token='login';
  localStorage.setItem('token', token)
  return redirect('/home');
 }
  else {
    throw   json ({message:'Wrong pasword or email'}, {status:500});
  }


}
