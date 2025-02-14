import { useNavigate } from "react-router-dom";
import { Button, Group, Container, Title } from "@mantine/core";
import { useAppStore } from "../../store/app.store";
import { FC } from "react";

const Header: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAppStore();

  return (
    <Container fluid p="md" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ddd" }}>
      <Title order={3} style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        🚀 Starship Explorer
      </Title>

      <Group spacing="md">
        <Button variant="subtle" onClick={() => navigate("/")}>Home</Button>
        <Button variant="subtle" onClick={() => navigate("/dashboard")}>
          Dashboard
        </Button>

        {isAuthenticated ? (
          <Button color="red" onClick={logout}>Logout</Button>
        ) : (
          <Button color="#232F53" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Group>
    </Container>
  );
};

export default Header;
