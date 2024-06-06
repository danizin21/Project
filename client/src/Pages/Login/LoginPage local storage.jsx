import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode"; // Corrigi a importação do jwtDecode
import "./LoginPage.css";
import Axios from "axios";
import Icon from "../../UI/Icons/1144760.png";
import erro from "../../UI/Icons/erro.png";
import { useNavigate } from "react-router-dom";

function Login() {
  // Obtendo dados do usuário
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    // Traduzir as informações pelo id com o decode
    const userObject = jwtDecode(response.credential);

    console.log(userObject);

    // Verifica se usuário é da UFRRJ
    if (userObject.hd === "ufrrj.br") {
      console.log("Usuário %s logado com sucesso", userObject.email);

      // Setar as informações do usuário no objeto
      setUser(userObject);

      // Guardar info do usuário no localStorage
      localStorage.setItem("_usuario_logado", JSON.stringify(userObject));
    } else {
      console.log("O email %s não pertence ao domínio da UFRRJ", userObject.email);
      setUser(userObject);
    }

    // Esconder botão
    document.getElementById("signInDiv").hidden = true;
  }

  // Função de logout
  function handleSignOut(event) {
    // Limpar usuário
    setUser({});
    localStorage.removeItem("_usuario_logado");

    // Reaparecer botão
    document.getElementById("signInDiv").hidden = false;
  }

  // Usuário logado com sucesso, prosseguir para próxima página
  function nextPage(event) {
    // Cria atributos com os valores do objeto
    const nomeUsuario = user.name;
    const emailUsuario = user.email;
    console.log("Ir para próxima página, %s", nomeUsuario);

    // Cadastro provisório
    Axios.post("http://localhost:3001/register", {
      email: emailUsuario,
      name: nomeUsuario,
    }).then((response) => {
      console.log(response);
    });

    // Carrega página de agendamento
    navigate(`AgendarHorario?nome=${nomeUsuario}&email=${emailUsuario}`);
  }

  useEffect(() => {
    // Carregar o e-mail armazenado quando o componente é montado
    const savedUser = localStorage.getItem("_usuario_logado");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    /* global google */
    google.accounts.id.initialize({
      client_id: "853325995754-9pe7828a2ma28l8teelef548n3dljfj2.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    // Botão de login
    // Se Não tiver usuário logado: mostrar botão de Login;
    // Se tiver usuário logado: mostrar botão de Log out;
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
        {/* Se usuário não tiver logado, pede para conectar */}
        <div id="Login">
          {Object.keys(user).length === 0 && (
            <h3>
              <img id="icon" src={Icon} alt="Icon"></img> <br></br>{" "}
              <div className="title">Login</div>
            </h3>
          )}
        </div>

        {/* Carrega o botão de login Google */}
        <div id="signInDiv"></div>
        {/* Botão de Log Out */}
        {Object.keys(user).length !== 0 && user.hd !== "ufrrj.br" && (
          <button id="Desconect" onClick={(e) => handleSignOut(e)}>
            DESCONECTAR
          </button>
        )}
        {/* Email não é da UFRRJ */}
        {Object.keys(user).length !== 0 && user.hd !== "ufrrj.br" && (
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

        {/* Usuário logado com sucesso */}
        {Object.keys(user).length !== 0 && user.hd === "ufrrj.br" && (
          <div className="loginResponse">
            <div className="saudacao">
              <img id="userPic" src={user.picture} alt="PicImage"></img> <br></br>
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

export default Login;
