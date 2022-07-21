export function casitems(item1, item2) {
  return [(Math.floor(item1 / 10000) * 10000).toString(), item1, item2];
}
