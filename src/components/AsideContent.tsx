import {
  Button,
  Grid,
  Group,
  Image,
  ScrollArea,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import cardData from "../assets/card.json";
import { useState } from "react";

export default function AsideContent() {
  type Card = {
    id: number;
    elementId: number;
    title: string;
    field_artistTitle: string;
    field_productTitle: string;
    field_cardDesc: string;
    field_rare_tzsrperf: string;
    field_hp_zbxcocvx: string | null;
    field_cardNo_suyeowsc: string;
    field_grade: string;
    cardImage: string;
    productCategory: string;
    productCategoryTitle: string;
    postDate: number;
    cardType?: string;
    cardTypeTitle?: string;
    energyType: string;
    energyTypeTitle: string;
    cardLevel?: string;
    cardLevelTitle?: string;
  };
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Card[]>([]);

  const handleChange = (value: string) => {
    setInput(value);
  };

  const beginSearch = (value: string) => {
    fetchData(value);
  };

  const fetchData = (value: string) => {
    const result = cardData.filter((card) => {
      return card.title.toLowerCase().includes(value.toLowerCase());
    });
    console.log(result);
    setResults(result);
  };

  const cardImages = results.map((card) => (
    <Grid.Col span={3} key={card.id}>
      <Image
        src={
          "/braverse-deck-builder/cards/" +
          card.field_cardNo_suyeowsc.replace("-", "_") +
          ".png.webp"
        }
      />
    </Grid.Col>
  ));

  return (
    <Tabs defaultValue="Search">
      <Tabs.List>
        <Tabs.Tab value="Search">Card Search</Tabs.Tab>
        <Tabs.Tab value="Favorites">Favorites</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="Search">
        <Group grow preventGrowOverflow={false} wrap="nowrap">
          <TextInput
            size="lg"
            style={{ flexGrow: 1 }}
            value={input}
            onChange={(e) => handleChange(String(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                beginSearch(String(input));
              }
            }}
          />
          <Button
            size="lg"
            style={{ flexGrow: 0 }}
            onClick={(e) => beginSearch(String(input))}
          >
            Search
          </Button>
        </Group>
        <ScrollArea style={{ height: "100vh" }} type="auto">
          <Grid>{cardImages}</Grid>
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value="Favorites">Favs</Tabs.Panel>
    </Tabs>
  );
}
