import { SearchResult, Shop } from "./types";

export function filterItemsFromShops(shops: Shop[], param: string): Shop[] {
  return shops.map((shop) => ({
    ...shop,
    items: shop.items.filter((item) => item.name.toLowerCase().includes(param)),
  }));
}

export function mapDataToItems(shops: Shop[]): SearchResult[] {
  return shops
    .map((shop) => {
      return shop.items.map((item) => ({
        shopId: shop.id,
        vendorId: shop.char_id,
        vendorName: shop.char_name,
        location: shop.mapname,
        shopName: shop.shop_name,
        item: item,
      }));
    })
    .flat();
}
