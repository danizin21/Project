import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./LoginPage.css";
import Axios from "axios";
import Cookies from 'js-cookie'

import Icon from "../../UI/Icons/1144760.png";
import erro from "../../UI/Icons/erro.png";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
function Login() {
  //obtendo dados do usuario
  var [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    //imprime o id do email
    // console.log("Encoded JWT ID token: " + response.credential);

    //traduzir as informações pelo id com o decode
    var userObject = jwtDecode(response.credential);

    console.log(userObject);

    //verifica se usuario é da rural
    if (userObject.hd === "ufrrj.br") {
      console.log("Usuario %s logado com sucesso", userObject.email);
    } else if (userObject.hd !== "ufrrj.br") {
      console.log(
        "O email %s não pertence ao dominio da UFRRJ",
        userObject.email
      );
    }

    //setar as informaçoes do usuario no objeto
    setUser((user) => {
      return { ...user, ...userObject };
    });
    //esconder botao
    document.getElementById("signInDiv").hidden = true;
    //Guardar info do usuario
    localStorage.setItem("_usuario_logado", JSON.stringify(userObject));
    console.log(userObject.name);
  }

  //funcao de logout
  function handleSignOut(event) {
    //limpar usuario
    setUser({});

    //reaparecer botao
    document.getElementById("signInDiv").hidden = false;
  }
  

  //usuario logado com sucesso, prosseguir pra proxima pagina
  function nextPage(event) {
    //cria atributos com os valores do objeto
    const nomeUsuario = user.name;
    const emailUsuario = user.email;
    console.log("ir para próxima página, %s", nomeUsuario);


    //cadastro provisorio
    Axios.post("http://localhost:3001/register", {
      email: emailUsuario,
      name: nomeUsuario,
    }).then((response) => {
      Cookies.set('sada',emailUsuario);
      //Cookies.set("token", response.data.token,{expires: ''});
      navigate("/");
      console.log(response)
    });
  

    //carrega pagina de agendamento
    navigate('AgendarHorario${nomeUsuario}${emailUsuario}');
  }

const navigate = useNavigate();
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "853325995754-9pe7828a2ma28l8teelef548n3dljfj2.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    //botao de login
    //se Não tiver usuario logado: mostrar botão de Login;
    //se tiver usuario logado: mostrar botão de Log out;
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      type: "standard",
      shape: "pill",
      text: "continue_with",
      logo_alignment: "left",
      width: "300",
    });
  }, []);

  return (
    <>
      <div className="Login">
        {/* Se usuario nao tiver, logado, pede p conectar */}
        <div id="Login">
          {Object.keys(user).length === 0 && (
            <h3>
              <img id="icon" src={Icon} alt="Icon"></img> <br></br>{" "}
              <div className="title">Login</div>
            </h3>
          )}
        </div>

        {/* carrega o botao de login google*/}
        <div id="signInDiv"></div>
        {/* Botao de Log Out */}
        {Object.keys(user).length !== 0 && user.hd !== "ufrrj.br" && (
          <button id="Desconect" onClick={(e) => handleSignOut(e)}>
            DESCONECTAR
          </button>
        )}
        {/* Email nao é da UFRRJ */}
        {Object.keys(user).length !== 0 && user.hd === "ufrrj.br" && (
          <div className="loginResponse">
            <div className="loginNegado">
              <img src={erro} alt="erroImage"></img> <br></br>
              Este Email não pertence à UFRRJ
            </div>

            <button id="limparEmail" onClick={(e) => handleSignOut(e)}>
              VOLTAR
            </button>
          </div>
        )}

        {/* Usuario logado com sucesso */}
        {Object.keys(user).length !== 0 && user.hd !== "ufrrj.br" && (
          <div className="loginResponse">
            <div className="saudacao">
              <img id="userPic" src={user.picture} alt="PicImage"></img>{" "}
              <br></br>
              Ola, {user.name}!
            </div>

            <button id="prosseguirLog" onClick={(e) => nextPage(e)}>
              PROSSEGUIR
            </button>
          </div>
        )}
        <p className="lowText">
          Desenvolvido por<strong className="bold">: Alunos de C.COMP</strong>
        </p>
      </div>
    </>
  );
}

export default Login;