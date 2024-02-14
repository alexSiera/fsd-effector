import { Input, Button } from "antd";
import { styled } from "@linaria/react";
import { useState, FormEvent, useEffect } from "react";

import { sendEvent } from "../analytics/lib";

enum EventTypes {
  SEARCH_STARTED = "seacrh_started",
  FORM_SHOWN = "form_shown",
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 64px;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
`;

const Header = styled.h1``;

export function SearchForm() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    sendEvent({ name: EventTypes.FORM_SHOWN, payload: {} });
  }, []);

  useEffect(() => {
    sendEvent({ name: EventTypes.SEARCH_STARTED, payload: { search } });
  }, [search]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Start logic
    console.log("Search started!!!", search);
    // End logic
    setSearch("");
    sendEvent({ name: EventTypes.SEARCH_STARTED, payload: { search } });
  };

  return (
    <Container>
      <Header>Поиск дешевых авиабилетов</Header>
      <Form onSubmit={handleSearch}>
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button htmlType="submit">Искать!</Button>
      </Form>
    </Container>
  );
}
