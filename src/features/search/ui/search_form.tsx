import { Input, Button } from "antd";
import { useSearchModel } from "../hooks/useSearchModel";

import { Container, Form, Header } from "../styles";

export function SearchForm() {
  const { search, handleSearch, handleSubmitForm } = useSearchModel();

  return (
    <Container>
      <Header>Поиск дешевых авиабилетов</Header>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitForm();
        }}
      >
        <Input
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button htmlType="submit">Искать!</Button>
      </Form>
    </Container>
  );
}
