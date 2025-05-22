import MenuSistema from "../../components/MenuSistema";

import { Container, Grid, Image } from "semantic-ui-react";

export default function Home() {
  return (
    <div>
      <MenuSistema tela={"home"} />

      <div style={{ marginTop: "5%" }}>
        <Container>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Image src="/logo-IFPE.png" size="large" />
              </Grid.Column>
              <Grid.Column>
                Bem vindo ao sistema <strong>OxeFood</strong> ! <br />
                Este sistema foi desenvolvido na disciplina de Desenvolvimento
                para WEB IV. <br /> <br />
                Para acessar o código da <strong>API</strong> do sistema,
                acesse:
                <br />
                <a
                  href="https://github.com/hfidelis/oxefood-api-heitor"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://github.com/hfidelis/oxefood-api-heitor
                </a>{" "}
                <br /> <br />
                Para acessar o código do <strong>Módulo WEB</strong>, acesse:
                <br />
                <a
                  href="https://github.com/hfidelis/oxefood-web-heitor"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://github.com/hfidelis/oxefood-web-heitor
                </a>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
