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
    private readonly _backstagePasses = 'Backstage passes to a TAFKAL80ETC concert';
    private readonly _sulfuras = 'Sulfuras, Hand of Ragnaros';
    private readonly _conjured = "Conjured";

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        this.items.forEach((item) => this.updateItemQuality(item));
        return this.items;
    }

    private updateItemQuality(item: Item) {
        if (this.isSulfuras(item)) return;
        const sellInExpired = item.sellIn <= 0;
        let qualityAdjustment = sellInExpired ? -2 : -1;
        if(this.isConjured(item)) {
            qualityAdjustment*=2;
        }
        if (this.isAgedBrie(item)) {
            qualityAdjustment = sellInExpired ? 2 : 1;
        }
        if (this.isBackstagePasses(item)) {
            qualityAdjustment = sellInExpired ? -item.quality : (item.sellIn <= 5 ? 3 : item.sellIn <= 10 ? 2 : 0);
        }
        this.adjustQuality(item, qualityAdjustment);
        item.sellIn--;
    }

    private isBackstagePasses(item: Item) {
        return item.name === this._backstagePasses;
    }

    private isAgedBrie(item: Item) {
        return item.name === this._agedBrie;
    }

    private isConjured(item: Item) {
        return item.name === this._conjured;
    }

    private isSulfuras(item: Item) {
        return item.name === this._sulfuras;
    }

    private adjustQuality(item: Item, adjustment: number) {
        let adjustedQuality = item.quality + adjustment;
        if (adjustedQuality >= 0 && adjustedQuality <= 50) {
            item.quality = adjustedQuality;
        }
    }
}
