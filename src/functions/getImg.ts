  export default function getImg(URL: string | undefined) {
    const imgName = URL?.replace(
      "https://assets.cookierunbraverse.com/braverse/images/card_webp/card/en/",
      ""
    );
    return "/braverse-deck-builder/cards/" + imgName;
  }