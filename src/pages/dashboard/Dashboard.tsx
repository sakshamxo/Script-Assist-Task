import { Table, Container, Loader, TextInput, Group, Pagination, Button, NumberInput, Select, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IconSearch, IconSortAscending, IconSortDescending } from '@tabler/icons-react';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  crew: string;
  url: string;
}

const fetchAllStarships = async () => {
  let allData: Starship[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
    const data = await res.json();
    allData = [...allData, ...data.results];
    hasMore = data.next !== null;
    page++;
  }

  return allData;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "asc");
  const [manufacturer, setManufacturer] = useState(searchParams.get("manufacturer") || "");
  const [crewSize, setCrewSize] = useState(Number(searchParams.get("crewSize")) || "");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery(["starships"], fetchAllStarships);

  useEffect(() => {
    setSearchParams({ search, sort: sortOrder, manufacturer, crewSize: crewSize.toString() });
    setPage(1);
  }, [search, sortOrder, manufacturer, crewSize]);

  if (isLoading) {
    return (
      <Container size="md" mt="xl">
        <Flex align="center" justify="center">
          <Loader size="xl" mt="md" />
        </Flex>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container size="md" mt="xl">
        <p>Error fetching data. Try again later.</p>
      </Container>
    );
  }

  // Filter the results
  let filteredData = data.filter((ship: Starship) =>
    ship.name.toLowerCase().includes(search.toLowerCase()) &&
    (manufacturer ? ship.manufacturer === manufacturer : true) &&
    (crewSize ? Number(ship.crew) >= crewSize : true)
  );

  // Sort the results
  if (sortOrder === "asc") {
    filteredData.sort((a: Starship, b: Starship) => a.name.localeCompare(b.name));
  } else {
    filteredData.sort((a: Starship, b: Starship) => b.name.localeCompare(a.name));
  }

  // Pagination setup
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const uniqueManufacturers = [...new Set(data.map((ship: Starship) => ship.manufacturer))];

  return (
    <Container size="lg" mt="xl">
      <Group position="apart" mb="md">
        <TextInput
          placeholder="Search Starships..."
          icon={<IconSearch />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          leftIcon={sortOrder === "asc" ? <IconSortAscending /> : <IconSortDescending />}
        >
          Sort by Name
        </Button>
      </Group>

      <Group grow mb="md">
        <Select
          label="Filter by Manufacturer"
          placeholder="Select Manufacturer"
          data={uniqueManufacturers}
          clearable
          value={manufacturer}
          onChange={setManufacturer}
        />

        <NumberInput
          label="Minimum Crew Size"
          placeholder="Enter crew size"
          value={crewSize}
          onChange={(value) => setCrewSize(Number(value))}
          min={1}
        />
      </Group>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Crew</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((ship: Starship, index: number) => (
            <tr
              key={index}
              onClick={() => navigate(`/starship/${ship.url.match(/\/(\d+)\/$/)[1]}?name=${encodeURIComponent(ship.name)}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{ship.name}</td>
              <td>{ship.model}</td>
              <td>{ship.manufacturer}</td>
              <td>{ship.crew}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Group position="center" mt="md">
        <Pagination total={totalPages} value={page} onChange={setPage} />
      </Group>
    </Container>
  );
};

export default Dashboard;