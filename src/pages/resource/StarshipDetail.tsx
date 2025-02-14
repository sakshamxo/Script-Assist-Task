import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Title,
  Text,
  Card,
  Loader,
  Group,
  Badge,
  Flex,
  Paper,
  Divider,
  Tooltip,
} from "@mantine/core";


const useQueryParams = () => {
  const query = new URLSearchParams(useLocation().search);
  return query;
};


const cache = new Map<string, any>();


setInterval(() => {
  cache.clear();
  console.log("Cache cleared to prevent memory issues");
}, 600000);


const fetchStarshipDetails = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const id = queryKey[1];
  if (!/^[0-9]+$/.test(id)) throw new Error("Invalid starship ID format");
  try {
    const res = await fetch(`https://swapi.dev/api/starships/${id}/`);
    if (!res.ok) throw new Error("Failed to fetch starship details");
    const data = await res.json();
    if (!data || !data.name) throw new Error("Invalid data structure received");
    return data;
  } catch (error) {
    console.error("Failed to fetch starship details", error);
    throw new Error("Network error occurred while fetching starship details");
  }
};


const fetchAdditionalData = async (urls: string[]) => {
  if (!urls || urls.length === 0) return [];
  try {
    const responses = await Promise.all(
      urls.map(async (url) => {
        if (cache.has(url)) return cache.get(url);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch data from ${url}`);
        const data = await res.json();
        if (!data || Object.keys(data).length === 0)
          throw new Error(`Invalid data structure from ${url}`);
        cache.set(url, data);

       
        if (cache.size > 100) {
          const firstKey = cache.keys().next().value;
          cache.delete(firstKey);
        }

        return data;
      })
    );
    return responses;
  } catch (error) {
    console.error("Failed to fetch additional data", error);
    throw new Error("Network error occurred while fetching additional data");
  }
};

const StarshipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const query = useQueryParams();

  const showPilots = query.get("showPilots")?.toLowerCase() === "true" || true;
  const showFilms = query.get("showFilms")?.toLowerCase() === "true" || true;

  if (!id) {
    return <Text color="red">Error: Missing or invalid starship ID</Text>;
  }


  const {
    data: starship,
    isLoading,
    isError,
    error,
  } = useQuery(["starship", id], fetchStarshipDetails);

 
  const { data: pilots, isLoading: pilotsLoading } = useQuery(
    ["pilots", id],
    () => fetchAdditionalData(starship?.pilots || []),
    {
      enabled: showPilots && !!starship,
    }
  );

  const { data: films, isLoading: filmsLoading } = useQuery(
    ["films", id],
    () => fetchAdditionalData(starship?.films || []),
    {
      enabled: showFilms && !!starship,
    }
  );

  if (isLoading)
    return (
      <Container size="md" mt="xl">
        <Flex align="center" justify="center">
          <Loader size="xl" mt="md" color="blue" />
        </Flex>
      </Container>
    );
  if (isError)
    return <Text color="red">Error: {(error as Error).message}</Text>;

  return (
    <Container size="lg" mt="xl" style={{ backgroundColor: "#e6f7ff" }}>
      <Paper
        shadow="xl"
        padding="lg"
        radius="lg"
        withBorder
        sx={{ backgroundColor: "#f0f2f5" }}
      >
        <Title order={1} align="center" color="blue" mb="lg">
          {starship.name}
        </Title>

        <Text size="lg" color="dimmed" align="center" mb="xl">
          {starship.model} - {starship.manufacturer}
        </Text>

        <Group
          position="center"
          spacing="xl"
          mt="md"
          mb="md"
          sx={(theme) => ({
            transition: "all 0.3s",
            cursor: "pointer",
            "&:hover": { backgroundColor: theme.colors.blue[1] },
          })}
        >
          <Tooltip label="The cost in galactic credits">
            <Badge color="teal" size="lg">
              Cost: {starship.cost_in_credits} Credits
            </Badge>
          </Tooltip>
          <Tooltip label="Number of crew members required">
            <Badge color="grape" size="lg">
              Crew: {starship.crew}
            </Badge>
          </Tooltip>
          <Tooltip label="Maximum number of passengers">
            <Badge color="orange" size="lg">
              Passengers: {starship.passengers}
            </Badge>
          </Tooltip>
        </Group>

        <Divider my="lg" />

        <Group
          position="center"
          spacing="xl"
          sx={(theme) => ({
            transition: "background-color 0.3s",
            "&:hover": { backgroundColor: theme.colors.blue[1] },
          })}
        >
          <Tooltip label="Starship length in meters">
            <Text>
              <strong>Length:</strong> {starship.length} meters
            </Text>
          </Tooltip>
          <Tooltip label="Hyperdrive performance rating">
            <Text>
              <strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}
            </Text>
          </Tooltip>
          <Tooltip label="Maximum atmospheric speed">
            <Text>
              <strong>Max Speed:</strong> {starship.max_atmosphering_speed}
            </Text>
          </Tooltip>
          <Tooltip label="Starship classification">
            <Text>
              <strong>Class:</strong> {starship.starship_class}
            </Text>
          </Tooltip>
        </Group>

        {showPilots && (
          <div style={{ marginTop: "20px" }}>
            <Title order={4} mt="lg">
              Pilots
            </Title>
            {pilotsLoading ? (
              <Loader size="sm" color="blue" />
            ) : Array.isArray(pilots) && pilots.length > 0 ? (
              pilots.map((pilot: { name: string }, index: number) => (
                <Tooltip key={index} label="Pilot details">
                  <Text>{pilot.name} </Text>
                </Tooltip>
              ))
            ) : (
              <Text color="gray">No pilots available</Text>
            )}
          </div>
        )}

        {showFilms && (
          <div style={{ marginTop: "20px" }}>
            <Title order={4} mt="lg">
              Films
            </Title>
            {filmsLoading ? (
              <Loader size="sm" color="blue" />
            ) : Array.isArray(films) && films.length > 0 ? (
              films.map((film: { title: string }, index: number) => (
                <Tooltip key={index} label="Film details">
                  <Text>{film.title}</Text>
                </Tooltip>
              ))
            ) : (
              <Text color="gray">No films available</Text>
            )}
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default StarshipDetail;
