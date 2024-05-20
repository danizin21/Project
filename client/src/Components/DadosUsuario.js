// import { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// function DadosUsuario()
// {
//     return(
//         //obtendo dados do usuario
//   const [ user, setUser ] = useState({});

//   function handleCallbackResponse(response) {
//     //imprime o id do email 
//     console.log("Encoded JWT ID token: " + response.credential);

//     //traduzir as informações pelo id com o decode
//     var userObject = jwtDecode(response.credential);
//     console.log(userObject);
//     //setar as informaçoes do usuario no objeto
//     setUser(userObject);
//     //esconder botao
//     document.getElementById("signInDiv").hidden = true;
//     //Guardar info do usuario
//     localStorage.setItem('_usuario_logado', JSON.stringify(response.data) )
//   }
  
//   //funcao de logout
//   function handleSignOut(event)
//   {
//     //limpar usuario
//     setUser ({})
//     //reaparecer botao
//     document.getElementById("signInDiv").hidden = false;
//   }

//   useEffect(() => 
//   {
//     /* global google */
//     google.accounts.id.initialize(
//     {
//       client_id:
//         "853325995754-9pe7828a2ma28l8teelef548n3dljfj2.apps.googleusercontent.com",
//       callback: handleCallbackResponse,
//     });


//     //botao de login
//     //se Não tiver usuario logado: mostrar botão de Login;
//     //se tiver usuario logado: mostrar botão de Log out;
//     google.accounts.id.renderButton(document.getElementById("signInDiv"), 
//     {
//       theme: "outline",
//       size: "large",
//     });
//   }, []);


//     )
    
// }