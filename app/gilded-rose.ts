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
    private readonly _agedBrie = 'Aged Brie';
    private readonly _backstagePasses = 'Backstage passes';
    private readonly _sulfuras = 'Sulfuras';

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        this.items.forEach((item) => this.updateItemQuality(item));
        return this.items;
    }

    private updateItemQuality(item: Item) {
        if (item.name === this._sulfuras) return;
        const sellInExpired = item.sellIn <= 0;
        let qualityAdjustment = sellInExpired ? -2 : -1;
        if (item.name === this._agedBrie) {
            qualityAdjustment = sellInExpired ? 2 : 1;
        }
        if (item.name === this._backstagePasses) {
            qualityAdjustment = sellInExpired ? -item.quality : (item.sellIn <= 5 ? 3 : item.sellIn <= 10 ? 2 : 0);
        }
        this.adjustQuality(item, qualityAdjustment);
        item.sellIn--;
    }

    private adjustQuality(item: Item, adjustment: number) {
        let adjustedQuality = item.quality + adjustment;
        if (adjustedQuality >= 0 && adjustedQuality <= 50) {
            item.quality = adjustedQuality;
        }
    }
}
