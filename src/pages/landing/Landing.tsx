import { FC } from "react";
import { useAppStore } from "../../store/app.store";
import { Container, Title, Text, Button, Image, Stack, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Landing: FC = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAppStore();
  return (
		<Container size="lg" style={{ textAlign: "center", paddingTop: "5rem", paddingBottom: "5rem" }}>
		<Stack align="center" spacing="lg">
			<Title order={2} style={{ fontSize: "2.5rem", fontWeight: 700 }}>
				Welcome to Our Awesome Platform 🚀
			</Title>
			<Text size="lg" color="gray">
				Discover amazing content and features tailored just for you. Sign in to get started!
			</Text>
			<Image src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Tech Image" radius="md" />
			<Group>
				<Button size="lg" onClick={() => {isAuthenticated ? (navigate('/dashboard')):(navigate('/login'))}} variant="filled" color="#232F53">
					Get Started
				</Button>
				<Button size="lg" onClick={() => window.open("https://portfolio-zeta-opal-71.vercel.app", "_blank", "noopener,noreferrer")} variant="outline" color="#232F53">
					Learn More
				</Button>
			</Group>
		</Stack>
	</Container>
  );
};

export default Landing;
