import { Button } from "../../components/button";
import { Header } from "./styles";

export function Home() {
  return (
    <Header>
      <h1>Finance control</h1>
      <div>
        <Button>Nova transação</Button>
        <Button>Nova categoria</Button>
      </div>
    </Header>
  );
}
