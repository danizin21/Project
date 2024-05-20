// import { useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import "./RegisterPage.css";
// import Icon from "../../UI/Icons/1144760.png";

// function Register() {
//   //obtendo dados do usuario
//   var [user, setUser] = useState({});

//   function handleCallbackResponse(response) {
//     //imprime o id do email
//     // console.log("Encoded JWT ID token: " + response.credential);

//     //traduzir as informações pelo id com o decode
//     var userObject = jwtDecode(response.credential);

//     console.log(userObject);

    

//     //setar as informaçoes do usuario no objeto
//     setUser((user) => {
//       return { ...user, ...userObject };
//     });
   
//     //Guardar info do usuario
//     localStorage.setItem("_usuario_logado", JSON.stringify(userObject));
//     console.log(userObject.name);
//   }

  

//   return (
//     <>
//       <div className="registro">
//         {/* Se usuario nao tiver, logado, pede p conectar */}
//         <div id="registro">
//           {Object.keys(user).length === 0 && (
//             <h3 id="reg">
//               <img id="iconReg" src={Icon} alt="Icon"></img> <br></br> <div className="title">Cadastro</div>
//             </h3>
//           )}
//         </div>

       


        
//       <p className="lowText">Desenvolvido por<strong className="bold">: Alunos de C.COMP</strong></p>
//       </div>
//     </>
//   );
// }

// export default Register;
