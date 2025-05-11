import axios from "axios";
import React, { useEffect, useState } from "react";
import MenuSistema from "../../components/MenuSistema";

import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from "semantic-ui-react";

import formatDate from '../utils/formatDate';

export default function ListCliente() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/cliente").then((response) => {
      setLista(response.data);
    });
  }

  return (
    <div>
      <MenuSistema tela={"cliente"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Cliente </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-cliente"
              style={{ marginBottom: "4%" }}
            />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    Nome
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    CPF
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Data de Nascimento
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Fone Celular
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Fone Fixo
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Ações
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((cliente) => (
                  <Table.Row key={cliente.id}>
                    <Table.Cell>
                      {cliente.nome || '-'}
                    </Table.Cell>
                    <Table.Cell>
                      {cliente.cpf || '-'}
                    </Table.Cell>
                    <Table.Cell>
                      {formatDate(cliente.dataNascimento) || '-'}
                    </Table.Cell>
                    <Table.Cell>
                      {cliente.foneCelular || '-'}
                    </Table.Cell>
                    <Table.Cell>
                      {cliente.foneFixo || '-'}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste cliente"
                        icon
                      >
                        <Icon name="edit" />
                      </Button>

                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este cliente"
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
