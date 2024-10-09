import { useCallback, useState } from "react";
import { Dialog } from "../dialog";
import { Button } from "../button";
import { Title } from "../title";
import { Input } from "../input";
import { Container } from "./style";
import { useForm } from "react-hook-form";
import { CreateCategoryData } from "../../validators/types";
import { theme } from "../../styles/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategorySchema } from "../../validators/schemas";
import { APIService } from "../../services/api";
import { useFetchAPI } from "../../hooks/useFetchAPI";

APIService.setupInterceptor();

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const { createCategory, fetchCategories } = useFetchAPI();

  const { register, handleSubmit } = useForm<CreateCategoryData>({
    defaultValues: {
      title: "",
      color: theme.colors.light,
    },
    resolver: zodResolver(createCategorySchema),
  });
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSubmit = useCallback(
    async (data: CreateCategoryData) => {
      await createCategory(data);
      handleClose();
      await fetchCategories();
    },
    [handleClose, createCategory, fetchCategories]
  );

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>Nova categoria</Button>}
    >
      <Container>
        <Title
          title="Nova categoria"
          subtitle="Crie uma nova categoria para suas transações"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Nome"
              placeholder="Nome da categoria..."
              {...register("title")}
            />
            <Input label="cor" type="color" {...register("color")} />
          </div>
          <footer>
            <Button onClick={handleClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit">Cadastrar</Button>
          </footer>
        </form>
      </Container>
    </Dialog>
  );
}
