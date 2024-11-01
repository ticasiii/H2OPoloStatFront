import { Outlet, useNavigation, useSubmit } from 'react-router-dom';
import { useEffect } from 'react';

import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const token = useLoaderDate();
  // const submit = useSubmit();
  // const navigation = useNavigation();
// useEffect(()=>{
// if (!token){
//   return;
// }

// const tokenDuration = getTokenDuration();

// if(token=='EXPIRED'){
//   submit (null,{action:'/logout', methode:'post'})
//   return
// }

// setTimeout(()=>{
// submit (null,{action:'/logout', methode:'post'})
// }, tokenDuration);
// },[token, submit])

  return (
    <>
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
