import { Box, Stack, Text, Image, Button } from "@mantine/core";
import { useClicked } from "../contexts/ClickedContext";
import { getCard, getDesc, getImage } from "../functions/cardFunctions";
import type { Card } from "../types/Card";
import { useDeck } from "../contexts/DeckContext";

export function CardInfo() {
  const { clickedId: clickedId } = useClicked();
  const clickedCard: Card | undefined = getCard(clickedId);
  const { deckState, deckDispatch } = useDeck();

  return (
    <Stack bd="2px solid gray" bdrs="md" flex={1} p="sm">
      <Box flex={1}>
        <Text size="xl">{clickedCard?.title}</Text>
        <Text>{clickedCard?.field_cardNo_suyeowsc}</Text>
        <Button.Group flex={1} pt="md" pb="md">
          <Button variant="outline" size="md" flex={1}
            onClick={() =>
              deckDispatch({ type: "decrement", cardId: clickedId })
            }
          >
            -1
          </Button>
          <Button.GroupSection variant="outline" size="md" flex={2}> 
            {deckState.get(clickedId) ? deckState.get(clickedId) : 0} in deck
          </Button.GroupSection>
          <Button variant="outline" size="md" flex={1}
            onClick={() =>
              deckDispatch({ type: "increment", cardId: clickedId })
            }
          >
            +1
          </Button>
        </Button.Group>
        <Image src={getImage(clickedId)} />
        <Text>
          {clickedCard?.cardTypeTitle +
            " • " +
            clickedCard?.energyTypeTitle +
            "\n" +
            "Level " +
            clickedCard?.cardLevelTitle +
            " • " +
            clickedCard?.field_hp_zbxcocvx +
            " HP"}
        </Text>
        {getDesc(clickedId)}
      </Box>
    </Stack>
  );
}
