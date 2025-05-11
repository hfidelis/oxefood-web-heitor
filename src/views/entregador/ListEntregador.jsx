import axios from "axios";
import React, { useEffect, useState } from "react";
import MenuSistema from "../../components/MenuSistema";

import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  Form,
  ModalHeader,
  ModalActions,
  ModalContent,
  ModalDescription,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import truncate from "../utils/truncate";
import toCurrency from "../utils/toCurrency";
import formatDate from "../utils/formatDate";

export default function ListEntregador() {
  const [lista, setLista] = useState([]);

  const [open, setOpen] = useState(false);
  const [currentEntregador, setCurrentEntregador] = useState({});

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/entregador").then((response) => {
      setLista(response.data);
    });
  }

  function handleModal(open, entregador) {
    setOpen(open);
    setCurrentEntregador(entregador);
  }

  return (
    <div>
      <MenuSistema tela={"entregador"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Entregador </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-entregador"
              style={{ marginBottom: "4%" }}
            />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>RG</Table.HeaderCell>
                  <Table.HeaderCell>Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell>Entregas</Table.HeaderCell>
                  <Table.HeaderCell>Valor Frete</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((entregador) => (
                  <Table.Row key={entregador.id}>
                    <Table.Cell>
                      {truncate(entregador.nome, 40) || "-"}
                    </Table.Cell>
                    <Table.Cell>{entregador.cpf || "-"}</Table.Cell>
                    <Table.Cell>{entregador.rg || "-"}</Table.Cell>
                    <Table.Cell>
                      {formatDate(entregador.dataNascimento) || "-"}
                    </Table.Cell>
                    <Table.Cell>{entregador.foneCelular || "-"}</Table.Cell>
                    <Table.Cell>{entregador.foneFixo || "-"}</Table.Cell>
                    <Table.Cell>
                      {entregador.qtdEntregasRealizadas || "-"}
                    </Table.Cell>
                    <Table.Cell>
                      {toCurrency(entregador.valorFrete) || "-"}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                    <Modal
                        onOpen={() => handleModal(true, entregador)}
                        onClose={() => handleModal(false, {})}
                        open={open}
                        trigger={
                          <Button
                            inverted
                            circular
                            color="blue"
                            title="Clique aqui para visualizar os dados deste entregador"
                            icon
                          >
                            <Icon name="eye" />
                          </Button>
                        }
                      >
                        <ModalHeader>Dados do Entregador</ModalHeader>
                        <ModalContent>
                          <ModalDescription>
                            <div
                              style={{
                                pointerEvents: "none",
                              }}
                            >
                              <Form>
                                <Form.Group
                                  widths="equal"
                                >
                                  <Form.Input
                                    fluid
                                    label="Nome"
                                    maxLength="100"
                                    value={currentEntregador.nome || "-"}
                                    readonly
                                  />

                                  <Form.Input
                                    fluid
                                    label="CPF"
                                    maxLength="100"
                                    value={currentEntregador.cpf || "-"}
                                    readonly
                                  />

                                  <Form.Input
                                    fluid
                                    label="RG"
                                    maxLength="100"
                                    value={currentEntregador.rg || "-"}
                                    readonly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Data de Nascimento"
                                    maxLength="100"
                                    value={formatDate(currentEntregador.dataNascimento) || "-"}
                                    readonly
                                  />
                                </Form.Group>

                                <Form.Group
                                  widths="equal"
                                >
                                  <Form.Input
                                    fluid
                                    label="Fone Celular"
                                    maxLength="100"
                                    value={currentEntregador.foneCelular || "-"}
                                    readonly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Fone Fixo"
                                    maxLength="100"
                                    value={currentEntregador.foneFixo || "-"}
                                    readonly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Valor Frete"
                                    maxLength="100"
                                    value={toCurrency(currentEntregador.valorFrete) || "-"}
                                    readonly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Entregas Realizadas"
                                    maxLength="100"
                                    value={
                                      currentEntregador.qtdEntregasRealizadas || "-"
                                    }
                                    readonly
                                  />
                                </Form.Group>

                                <Form.Group
                                  widths="equal"
                                >
                                  <Form.Input
                                    fluid
                                    label="Rua"
                                    maxLength="100"
                                    value={
                                      currentEntregador.enderecoRua || "-"
                                    }
                                    readonly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Número"
                                    maxLength="100"
                                    value={
                                      currentEntregador.enderecoNumero || "-"
                                    }
                                    readonly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Bairro"
                                    maxLength="100"
                                    value={
                                      currentEntregador.enderecoBairro || "-"
                                    }
                                    readonly
                                  />
                                </Form.Group>

                                <Form.Group
                                  widths="equal"
                                >
                                  <Form.Input
                                    fluid
                                    label="Cidade"
                                    maxLength="100"
                                    value={
                                      currentEntregador.enderecoCidade || "-"
                                    }
                                    readonly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Estado"
                                    maxLength="100"
                                    value={
                                      currentEntregador.enderecoUf || "-"
                                    }
                                    readonly
                                  />

                                  <Form.Input
                                    fluid
                                    label="CEP"
                                    maxLength="100"
                                    value={
                                      currentEntregador.enderecoCep || "-"
                                    }
                                    readonly
                                  />
                                </Form.Group>
                              </Form>
                            </div>
                          </ModalDescription>
                        </ModalContent>
                        <ModalActions>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              color="black"
                              onClick={() => handleModal(false, {})}
                            >
                              Fechar
                            </Button>
                          </div>
                        </ModalActions>
                      </Modal>

                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste entregador"
                        icon
                      >
                        <Icon name="edit" />
                      </Button>

                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este entregador"
                        icon
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
    </div>
  );
}
