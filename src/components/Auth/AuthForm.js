
import { Form, Link, useSearchParams,useActionData, useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';


//FORMA ZA LOGIN

function AuthForm() {
  
  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

 
  const data =useActionData();
  const navigation = useNavigation();
  // const isSubmitting = navigation.state === 'submitting '

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{'Log in'}</h1>
        {data && data.errors && (<ul>
          {Object.values(data.errors).map((err)=>(
            <li key= {err}>{err}</li>
          ))}
          </ul>
          )}
          {data && data.message  && <p>{data.message}</p>}
        <p>
          <label htmlFor="username">Username</label>
          <input id="username" type="username" name="username" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
           {/* <button onClick={switchAuthHandler} type="button">
            {'Login'}
          </button>  */}
            
          <button className={classes.login_but}>{'Login'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
 