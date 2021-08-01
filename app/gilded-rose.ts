export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    private readonly _agedBrie = 'Aged Brie';

    private readonly _backstagePasses = 'Backstage passes';

    private readonly _sulfuras = 'Sulfuras';

    updateQuality(): Array<Item> {
        this.items.forEach((item) => this.updateItemQuality(item));
        return this.items;
    }

    private updateItemQuality(item: Item) {
        if (item.name != this._agedBrie && item.name != this._backstagePasses) {
            if (item.quality > 0) {
                if (item.name != this._sulfuras) {
                    item.quality = item.quality - 1
                }
            }
        } else {
            if (item.quality < 50) {
                item.quality = item.quality + 1
                if (item.name == this._backstagePasses) {
                    if (item.sellIn < 11) {
                        if (item.quality < 50) {
                            item.quality = item.quality + 1
                        }
                    }
                    if (item.sellIn < 6) {
                        if (item.quality < 50) {
                            item.quality = item.quality + 1
                        }
                    }
                }
            }
        }
        if (item.name != this._sulfuras) {
            item.sellIn = item.sellIn - 1;
        }
        if (item.sellIn < 0) {
            if (item.name != this._agedBrie) {
                if (item.name != this._backstagePasses) {
                    if (item.quality > 0) {
                        if (item.name != this._sulfuras) {
                            item.quality = item.quality - 1
                        }
                    }
                } else {
                    item.quality = item.quality - item.quality
                }
            } else {
                if (item.quality < 50) {
                    item.quality = item.quality + 1
                }
            }
        }
    }
}
