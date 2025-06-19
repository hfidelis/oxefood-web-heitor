import axios from "axios";
import { useEffect, useState } from "react";
import MenuSistema from "../../components/MenuSistema";

import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from "semantic-ui-react";

import notify from "../../utils/toast";
import toCurrency from '../../utils/toCurrency';
import truncate from '../../utils/truncate';

export default function ListProduto() {
  const [lista, setLista] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/produto").then((response) => {
      setLista(response.data);
    });
  }

  function confirmaRemover(id) {
    setOpenModal(true)
    setIdRemover(id)
  }

  async function remover() {
    await axios.delete('http://localhost:8080/api/produto/' + idRemover)
      .then(() => {
        notify.success('Produto removido com sucesso.')

        axios.get("http://localhost:8080/api/produto")
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
      <MenuSistema tela={"produto"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Produto </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-produto"
              style={{ marginBottom: "4%" }}
            />

            <Table color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    Código
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Categoria
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Título
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Descrição
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Valor Un.
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Tempo Entrega Mín.
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Tempo Entrega Max.
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Ações
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((produto) => (
                  <Table.Row key={produto.id}>
                    <Table.Cell>
                      {produto.codigo || '-'}
                    </Table.Cell>
                    <Table.Cell>
                      {produto.categoria.descricao || '-'}
                    </Table.Cell>
                    <Table.Cell>
                      {truncate(produto.titulo, 40) || '-'}
                    </Table.Cell>
                    <Table.Cell>
                      {truncate(produto.descricao, 40) || '-'}
                    </Table.Cell>
                    <Table.Cell>
                      {toCurrency(produto.valorUnitario) || '-'}
                    </Table.Cell>
                    <Table.Cell>
                      {produto.tempoEntregaMinimo ? `${produto.tempoEntregaMinimo} min.` : '-'}
                    </Table.Cell>
                    <Table.Cell>
                      {produto.tempoEntregaMaximo ? `${produto.tempoEntregaMaximo} min.` : '-'}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color='green'
                        title='Clique aqui para editar os dados deste produto'
                        icon
                      >
                        <Link
                          to="/form-produto"
                          state={{
                            id: produto.id
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
                        title="Clique aqui para remover este produto"
                        icon
                        onClick={() => { confirmaRemover(produto.id) }}
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
                  Nenhum produto cadastrado.
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
