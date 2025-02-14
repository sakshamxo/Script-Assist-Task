import { useAppStore } from "../../store/app.store";
import {
  Button,
  Center,
  Paper,
  TextInput,
  Title,
  Notification,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FC } from "react";
import { IconAlertCircle } from "@tabler/icons-react";

const Login: FC = () => {
  const { login } = useAppStore();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setter(event.target.value);
  };

  const validateForm = (): boolean => {
    if (!username.trim() || !password.trim()) {
      setError("Both fields are required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    if (username === "admin" && password === "password") {
      login();
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Center style={{ height: "100vh", backgroundColor: "#f3f4f6" }}>
      <Paper
        p="xl"
        shadow="xl"
        radius="lg"
        withBorder
        style={{ maxWidth: 400, width: "100%" }}
      >
        <Title
          align="center"
          mb="xl"
          style={{ fontFamily: "Poppins, sans-serif", color: "#232F53" }}
        >
          Welcome Back
        </Title>
        <Text size="sm" color="#232F53">
                Username: <strong>admin</strong> and Password: <strong>password</strong>
              </Text>
        {error && (
          <Notification
            color="red"
            icon={<IconAlertCircle />}
            onClose={() => setError("")}
          >
            {error}
          </Notification>
        )}
        <TextInput
          label="Username"
          placeholder="Enter username"
          value={username}
          onChange={handleInputChange(setUsername)}
          mb="md"
          size="md"
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handleInputChange(setPassword)}
          mb="md"
          size="md"
        />
        <Button
          fullWidth
          onClick={handleLogin}
          color="#232F53"
          size="md"
          radius="md"
          style={{ marginTop: "1rem" }}
        >
          Login
        </Button>
      </Paper>
    </Center>
  );
};

export default Login;
