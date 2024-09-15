import { InputMask } from "@react-input/mask";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import { Filters, Header, InputGroup, Main, Section } from "./styles";
import { ButtonIncon } from "../../components/button-icon";

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
        </Section>
      </Main>
    </>
  );
}
