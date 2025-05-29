import { Route, Routes } from "react-router-dom";

import FormCategoriaProduto from "../views/categoria-produto/FormCategoriaProduto";
import ListCategoriaProduto from "../views/categoria-produto/ListCategoriaProduto";
import FormCliente from "../views/cliente/FormCliente";
import ListCliente from "../views/cliente/ListCliente";
import FormEntregador from "../views/entregador/FormEntregador";
import ListEntregador from "../views/entregador/ListEntregador";
import FormProduto from "../views/produto/FormProduto";
import ListProduto from "../views/produto/ListProduto";

import Home from "../views/home/Home";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form-cliente" element={<FormCliente />} />
        <Route path="list-cliente" element={<ListCliente />} />
        <Route path="form-produto" element={<FormProduto />} />
        <Route path="list-produto" element={<ListProduto />} />
        <Route path="form-categoria-produto" element={<FormCategoriaProduto />} />
        <Route path="list-categoria-produto" element={<ListCategoriaProduto />} />
        <Route path="form-entregador" element={<FormEntregador />} />
        <Route path="list-entregador" element={<ListEntregador />} />
      </Routes>
    </>
  );
}

export default Rotas;
