import { Interweave, Matcher } from "interweave";
import type { MatchResponse, Node, ChildrenNode } from "interweave";
import Cards from "../assets/card.json";
import type { Card } from "../types/Card";

export function getImage(id: number): string | undefined {
  const imgURL: string | undefined = Cards.find((card) => {
    return card.id == id;
  })?.cardImage;
  return imgURL?.replace(
    "https://assets.cookierunbraverse.com/braverse/images/card_webp/card/en/",
    "braverse-deck-builder/cards/"
  );
}

export function filterByTitle(query: string): number[] {
  const resultCards: Card[] = Cards.filter((card) => {
    return card.title.toLowerCase().includes(query);
  });
  return resultCards.map((card) => card.id);
}

export function getCard(id: number): Card | undefined {
  return Cards.find((card) => {
    return card.id === id;
  });
}

const iconMap: Record<string, string> = {
  "{sk}": "202503_skil_sk.svg",
  "{mt}": "202503_skil_mt.svg",
  "{da}": "202503_skil_da.png",
  "{B}": "blue_202502.png",
  "{G}": "green_202502.png",
  "{N}": "mix_202502.png",
  "{P}": "purple_202502.png",
  "{R}": "red_202502.png",
  "{Y}": "yellow_202502.png",
};

class CustomMatcher extends Matcher<Object> {
  match(string: string): MatchResponse<{ extraProp: string }> | null {
    return this.doMatch(string, /\{(R|G|B|Y|P|N|sk|da|mt)\}/, (matches) => ({
      extraProp: matches[0],
      src: "braverse-deck-builder/icons/" + iconMap[matches[0]],
      void: true,
    }));
  }

  replaceWith(_children: ChildrenNode, props: Object): Node {
    return (
      <img {...props} style={{ height: "1em", verticalAlign: "middle" }} />
    );
  }

  asTag(): string {
    return "img";
  }
}

const matcher = new CustomMatcher("foo");

export function getDesc(id: number) {
  const desc: string | undefined = Cards.find((card) => {
    return card.id === id;
  })?.field_cardDesc;

  return desc ? <Interweave matchers={[matcher]} content={desc} /> : "";
}
