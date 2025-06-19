import axios from "axios";
import { useEffect, useState } from "react";
import MenuSistema from "../../components/MenuSistema";

import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  Table,
} from "semantic-ui-react";

import formatDate from "../../utils/formatDate";
import notify from "../../utils/toast";
import toCurrency from "../../utils/toCurrency";
import truncate from "../../utils/truncate";

export default function ListEntregador() {
  const [lista, setLista] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentEntregador, setCurrentEntregador] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

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

  function confirmaRemover(id) {
    setOpenModal(true)
    setIdRemover(id)
  }

  async function remover() {
    await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
      .then(() => {
        notify.success('Entregador removido com sucesso.')

        axios.get("http://localhost:8080/api/entregador")
          .then((response) => {
            setLista(response.data)
          })
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
    setOpenModal(false)
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
                                    readOnly
                                  />

                                  <Form.Input
                                    fluid
                                    label="CPF"
                                    maxLength="100"
                                    value={currentEntregador.cpf || "-"}
                                    readOnly
                                  />

                                  <Form.Input
                                    fluid
                                    label="RG"
                                    maxLength="100"
                                    value={currentEntregador.rg || "-"}
                                    readOnly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Data de Nascimento"
                                    maxLength="100"
                                    value={formatDate(currentEntregador.dataNascimento) || "-"}
                                    readOnly
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
                                    readOnly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Fone Fixo"
                                    maxLength="100"
                                    value={currentEntregador.foneFixo || "-"}
                                    readOnly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Valor Frete"
                                    maxLength="100"
                                    value={toCurrency(currentEntregador.valorFrete) || "-"}
                                    readOnly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Entregas Realizadas"
                                    maxLength="100"
                                    value={
                                      currentEntregador.qtdEntregasRealizadas || "-"
                                    }
                                    readOnly
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
                                    readOnly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Número"
                                    maxLength="100"
                                    value={
                                      currentEntregador.enderecoNumero || "-"
                                    }
                                    readOnly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Bairro"
                                    maxLength="100"
                                    value={
                                      currentEntregador.enderecoBairro || "-"
                                    }
                                    readOnly
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
                                    readOnly
                                  />

                                  <Form.Input
                                    fluid
                                    label="Estado"
                                    maxLength="100"
                                    value={
                                      currentEntregador.enderecoUf || "-"
                                    }
                                    readOnly
                                  />

                                  <Form.Input
                                    fluid
                                    label="CEP"
                                    maxLength="100"
                                    value={
                                      currentEntregador.enderecoCep || "-"
                                    }
                                    readOnly
                                  />
                                </Form.Group>

                                <Form.Group
                                  widths="equal"
                                >
                                  <Form.TextArea
                                    fluid
                                    label="Complemento"
                                    value={
                                      currentEntregador.enderecoComplemento || "-"
                                    }
                                    readOnly
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
                        color='green'
                        title='Clique aqui para editar os dados deste entregador'
                        icon
                      >
                        <Link
                          to="/form-entregador"
                          state={{
                            id: entregador.id
                          }}
                          style={{
                            color: 'green'
                          }}
                        >
                          <Icon
                            name='edit'
                          />
                        </Link>
                      </Button>

                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este entregador"
                        icon
                        onClick={() => confirmaRemover(entregador.id)}
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            {lista.length === 0 && (
              <div
                style={{
                  minWidth: '100%',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                <span>
                  Nenhum entregador cadastrado.
                </span>
              </div>
            )}
          </div>
        </Container>
      </div>
      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Header icon>
          <Icon name='trash' />
          <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
        </Header>
        <Modal.Actions
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
            <Icon name='remove' /> Não
          </Button>
          <Button color='green' inverted onClick={() => remover()}>
            <Icon name='checkmark' /> Sim
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
