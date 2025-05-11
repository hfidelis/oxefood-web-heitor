import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputMask from "comigo-tech-react-input-mask";
import MenuSistema from "../../components/MenuSistema";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";

export default function FormEntregador() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foneCelular, setFoneCelular] = useState("");
  const [foneFixo, setFoneFixo] = useState("");
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState("");
  const [valorFrete, setValorFrete] = useState("");
  const [enderecoRua, setEnderecoRua] = useState("");
  const [enderecoComplemento, setEnderecoComplemento] = useState("");
  const [enderecoNumero, setEnderecoNumero] = useState("");
  const [enderecoBairro, setEnderecoBairro] = useState("");
  const [enderecoCidade, setEnderecoCidade] = useState("");
  const [enderecoCep, setEnderecoCep] = useState("");
  const [enderecoUf, setEnderecoUf] = useState("");

  function salvar() {
    const entregadorRequest = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas: parseInt(qtdEntregasRealizadas, 10),
      valorFrete: parseFloat(valorFrete),
      enderecoRua: enderecoRua,
      enderecoComplemento: enderecoComplemento,
      enderecoNumero: enderecoNumero,
      enderecoBairro: enderecoBairro,
      enderecoCidade: enderecoCidade,
      enderecoCep: enderecoCep,
      enderecoUf: enderecoUf,
    };

    axios
      .post("http://localhost:8080/api/entregador", entregadorRequest)
      .then((response) => {
        console.log("Entregador cadastrado com sucesso.");
      })
      .catch((error) => {
        console.log("Erro ao incluir o entregador.");
      });
  }

  return (
    <div>
      <MenuSistema tela={"entregador"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Entregador &nbsp;
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
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Form.Input required fluid label="CPF">
                  <InputMask
                    required
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Input>
                <Form.Input
                  required
                  fluid
                  label="RG"
                  maxLength="20"
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input required fluid label="Data de Nascimento">
                  <InputMask
                    mask="99/99/9999"
                    placeholder="Ex: 20/03/1985"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>
                <Form.Input fluid label="Fone Celular">
                  <InputMask
                    mask="(99) 99999-9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>
                <Form.Input fluid label="Fone Fixo">
                  <InputMask
                    mask="(99) 9999-9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Quantidade de Entregas Realizadas"
                  type="number"
                  value={qtdEntregasRealizadas}
                  onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Valor do Frete"
                  type="number"
                  step="0.01"
                  value={valorFrete}
                  onChange={(e) => setValorFrete(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Endereço - Rua"
                  value={enderecoRua}
                  onChange={(e) => setEnderecoRua(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Número"
                  value={enderecoNumero}
                  onChange={(e) => setEnderecoNumero(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Complemento"
                  value={enderecoComplemento}
                  onChange={(e) => setEnderecoComplemento(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Bairro"
                  value={enderecoBairro}
                  onChange={(e) => setEnderecoBairro(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Cidade"
                  value={enderecoCidade}
                  onChange={(e) => setEnderecoCidade(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="CEP"
                >
                  <InputMask
                    mask="99999-999"
                    value={enderecoCep}
                    onChange={(e) => setEnderecoCep(e.target.value)}
                  />
                </Form.Input>
                <Form.Input
                  fluid
                  label="UF"
                  maxLength="2"
                  value={enderecoUf}
                  onChange={(e) => setEnderecoUf(e.target.value.toUpperCase())}
                />
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link
                to={"/list-entregador"}
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
