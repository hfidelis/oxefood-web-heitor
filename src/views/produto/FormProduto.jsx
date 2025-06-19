import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuSistema from "../../components/MenuSistema";

import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import notify from "../../utils/toast";

export default function FormProduto() {
  const [codigo, setCodigo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState("");
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState("");
  const [listaCategoria, setListaCategoria] = useState([]);
  const [idCategoria, setIdCategoria] = useState();

  const { state } = useLocation();
  const [idProduto, setidProduto] = useState();

  function salvar() {
    const produtoRequest = {
      idCategoria: idCategoria,
      codigo: codigo,
      titulo: titulo,
      descricao: descricao,
      valorUnitario: parseFloat(valorUnitario),
      tempoEntregaMinimo: parseInt(tempoEntregaMinimo, 10),
      tempoEntregaMaximo: parseInt(tempoEntregaMaximo, 10),
    };

    if (idProduto != null) {
      axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
        .then(() => {
          notify.success('Produto alterado com sucesso.')
        })
        .catch((error) => {
          if (error.response.data.errors != undefined) {
            for (let i = 0; i < error.response.data.errors.length; i++) {
              notify.error(error.response.data.errors[i].defaultMessage)
            }
          } else {
            notify.error(error.response.data.message)
          }
        })
    } else {
      axios.post("http://localhost:8080/api/produto", produtoRequest)
        .then(() => {
          notify.success('Produto cadastrado com sucesso.')
        })
        .catch((error) => {
          if (error.response.data.errors != undefined) {
            for (let i = 0; i < error.response.data.errors.length; i++) {
              notify.error(error.response.data.errors[i].defaultMessage)
            }
          } else {
            notify.error(error.response.data.message)
          }
        })
    }
  }

  useEffect(() => {
    if (state != null && state.id != null) {
      axios.get("http://localhost:8080/api/produto/" + state.id)
        .then((response) => {
          setidProduto(response.data.id)
          setCodigo(response.data.codigo)
          setTitulo(response.data.titulo)
          setDescricao(response.data.descricao)
          setValorUnitario(response.data.valorUnitario)
          setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
          setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
          setIdCategoria(response.data.categoria.id)
        })
    }

    axios.get("http://localhost:8080/api/categoria-produto")
      .then((response) => {
        const dropDownCategorias = response.data.map(c => ({ text: c.descricao, value: c.id }));
        setListaCategoria(dropDownCategorias);
      })
  }, [state])

  return (
    <div>
      <MenuSistema tela={"produto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Produto &nbsp;
              <Icon name="angle double right" size="small" />
            </span>
            Cadastro
          </h2>
          <Divider />
          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Código"
                  maxLength="50"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label="Título"
                  maxLength="100"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <Form.Select
                  required
                  fluid
                  tabIndex='3'
                  placeholder='Selecione'
                  label='Categoria'
                  options={listaCategoria}
                  value={idCategoria}
                  onChange={(e, { value }) => {
                    setIdCategoria(value)
                  }}
                />
              </Form.Group>
              <Form.TextArea
                label="Descrição"
                placeholder="Descreva o produto..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Valor Unitário"
                  type="number"
                  step="0.01"
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label="Tempo Entrega Mínimo"
                  type="number"
                  value={tempoEntregaMinimo}
                  onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                />
                <Form.Input
                  required
                  fluid
                  label="Tempo Entrega Máximo"
                  type="number"
                  value={tempoEntregaMaximo}
                  onChange={(e) => setTempoEntregaMaximo(e.target.value)}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link
                to={"/list-produto"}
              >
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  Voltar
                </Button>
              </Link>
              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
