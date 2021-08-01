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
        if(item.name === this._sulfuras) return;

        const qualityDegrade = 0;
        const sellInExpired = item.sellIn <= 0;

        if (item.name === this._agedBrie || item.name === this._backstagePasses) {
            this.adjustQuality(item, 1);
            if (item.name == this._backstagePasses) {
                if (item.sellIn < 11) {
                    this.adjustQuality(item, 1);
                }
                if (item.sellIn < 6) {
                    this.adjustQuality(item, 1);
                }
            }
        } else {
            this.adjustQuality(item, -1);
        }

        if (sellInExpired) {
            if (item.name === this._agedBrie) {
                this.adjustQuality(item, 1);
            } else {
                if (item.name === this._backstagePasses) {
                    item.quality = 0;
                } else {
                    this.adjustQuality(item, -1);
                }
            }
        }
        item.sellIn--;
    }

    adjustQuality(item : Item,adjustment : number) {
        let adjustedQuality = item.quality + adjustment;
        if(adjustedQuality>=0&&adjustedQuality<=50) {
            item.quality=adjustedQuality;
        }
    }
}
