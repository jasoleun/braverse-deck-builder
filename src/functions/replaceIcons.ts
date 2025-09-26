const iconMap: Record<string, string> = {
  "{sk}": "/braverse-deck-builder/icons/202503_skil_sk.svg",
  "{da}": "/braverse-deck-builder/icons/202503_skil_da.png",
  "{B}": "/braverse-deck-builder/icons/blue_202502.png",
  "{G}": "/braverse-deck-builder/icons/green_202502.png",
  "{N}": "/braverse-deck-builder/icons/mix_202502.png",
  "{P}": "/braverse-deck-builder/icons/purple_202502.png",
  "{R}": "/braverse-deck-builder/icons/red_202502.png",
  "{Y}": "/braverse-deck-builder/icons/yellow_202502.png",
};

export default function replaceIcons(desc: string) {
  return Object.keys(iconMap).reduce(
    (result, key) =>
      result.replaceAll(
        key,
        `<img src="${iconMap[key]}" style="height:1em;display:inline;vertical-align: middle;" />`
      ),
    desc
  );
}
