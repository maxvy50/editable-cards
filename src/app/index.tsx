import "./styles/index.css"
import { withProviders } from "./providers";
import { Routing } from "pages";

function App() {
  return (
      //header
      <Routing />
  )
}

export default withProviders(App)
