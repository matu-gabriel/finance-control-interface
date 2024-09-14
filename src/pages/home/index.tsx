import { Button } from "../../components/button";
import { Title } from "../../components/title";
import { Filters, Header, Main, Section } from "./styles";

export function Home() {
  return (
    <>
      <Header>
        <h1>Finance control</h1>
        <div>
          <Button>Nova transação</Button>
          <Button>Nova categoria</Button>
        </div>
      </Header>
      <Main>
        <Section>
          <Filters>
            <Title title="Saldo" subtitle="Receita e despesas dos período" />
          </Filters>
        </Section>
      </Main>
    </>
  );
}
