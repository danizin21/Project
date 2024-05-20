import AppRoutes from "./Routes/routes";
import "./App.css";


function App() {
  // const usuarioLogadoString = localStorage.getItem("_usuario_logado");
  // const usuarioLogado = JSON.parse(usuarioLogadoString);
  // console.log(usuarioLogado);

  //HTML ABAIXO
  return (
    <>
      {/* <h1>App diz: ola, {usuarioLogado.name}, bem vindo!</h1> */}
      <AppRoutes />

      {/* <Home /> */}
    </>
  );
}

export default App;
