import { InputMask } from "@react-input/mask";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import { Balance, Filters, Header, InputGroup, Main, Section } from "./styles";
import { ButtonIncon } from "../../components/button-icon";
import { Card } from "../../components/card";

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
            <InputGroup>
              <InputMask
                component={Input}
                mask="dd/mm/yyyy"
                replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                variant="dark"
                label="Início"
                placeholder="dd/mm/yyyy"
              />
              <InputMask
                component={Input}
                mask="dd/mm/yyyy"
                replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/yyyy"
              />
              <ButtonIncon />
            </InputGroup>
          </Filters>
          <Balance>
            <Card title="Saldo" amount={1000000} />
            <Card title="Saldo" amount={1000000} variant="incomes" />
            <Card title="Saldo" amount={1000000} variant="expenses" />
          </Balance>
        </Section>
      </Main>
    </>
  );
}
