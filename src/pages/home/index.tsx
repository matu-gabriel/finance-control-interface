import { InputMask } from "@react-input/mask";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Title } from "../../components/title";
import {
  Aside,
  Balance,
  ChartAction,
  ChartContainer,
  ChartContent,
  Filters,
  Header,
  InputGroup,
  Main,
  SearchTransaction,
  Section,
  TransactionGroup,
} from "./styles";
import { ButtonIncon } from "../../components/button-icon";
import { Card } from "../../components/card";
import { Transaction } from "../../components/transaction";
import { Dialog } from "../../components/dialog";

export function Home() {
  return (
    <>
      <Header>
        <h1>Finance control</h1>
        <div>
          {/* <Button>Nova transação</Button> */}
          <Dialog trigger={<Button>Nova transação</Button>}>Ola</Dialog>
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
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Início"
                placeholder="dd/mm/aaaa"
              />
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
              />
              <ButtonIncon />
            </InputGroup>
          </Filters>
          <Balance>
            <Card title="Saldo" amount={1000000} />
            <Card title="Saldo" amount={1000000} variant="incomes" />
            <Card title="Saldo" amount={1000000} variant="expenses" />
          </Balance>
          <ChartContainer>
            <header>
              <Title
                title="Gastos"
                subtitle="Despesas por categorias no período"
              />
            </header>
            <ChartContent></ChartContent>
          </ChartContainer>
          <ChartContainer>
            <header>
              <Title
                title="Evolução financeira"
                subtitle="Saldo, Receitas e Gastos no ano"
              />
              <ChartAction>
                <InputMask
                  component={Input}
                  mask="dd/mm/aaaa"
                  replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                  variant="black"
                  label="ano"
                  placeholder="aaaa"
                />
                <ButtonIncon />
              </ChartAction>
            </header>
            <ChartContent></ChartContent>
          </ChartContainer>
        </Section>
        <Aside>
          <header>
            <Title title="Transações" subtitle="Receita e Gastos no período" />
            <SearchTransaction>
              <Input variant="black" placeholder="Procurar transação" />
              <ButtonIncon />
            </SearchTransaction>
          </header>
          <TransactionGroup>
            <Transaction
              id={1}
              title="Mercado"
              amount={20000}
              date="09/09/2024"
              category={{ title: "Alimentação", color: "#0f0f" }}
            />
            <Transaction
              id={1}
              title="Mercado"
              amount={20000}
              date="09/09/2024"
              category={{ title: "Alimentação", color: "#0f0f" }}
            />
            <Transaction
              id={1}
              title="Mercado"
              amount={20000}
              date="09/09/2024"
              category={{ title: "Alimentação", color: "#0f0f" }}
            />
            <Transaction
              id={1}
              title="Mercado"
              amount={20000}
              date="09/09/2024"
              category={{ title: "Alimentação", color: "#0f0f" }}
            />
          </TransactionGroup>
        </Aside>
      </Main>
    </>
  );
}
