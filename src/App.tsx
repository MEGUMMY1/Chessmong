import ChessPage from "./pages/ChessPage";
import Layout from "./components/Layout";
import Modal from "./components/Layout/Modal";
import "./reset.css";
import "./global.css";

export default function App() {
  return (
    <Layout>
      <ChessPage />
      <Modal />
    </Layout>
  );
}
