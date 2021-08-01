import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('should_degrade_quality_by_one_every_day_when_selling_date_not_passed', function() {
        const items = [new Item("+5 Dexterity Vest", 10, 20)];
        const gildedRose = new GildedRose(items);
        const days = items[0].sellIn-1;
        let previousQuality = items[0].quality;
        for(let day = 1;day<=days;day++) {
            const updatedItems = gildedRose.updateQuality();
            expect(updatedItems[0].quality).to.equal(previousQuality-1);
            previousQuality = updatedItems[0].quality;
        }
    });

    it('should_degrade_quality_by_two_every_day_when_selling_date_passed', function() {
        const items = [new Item("+5 Dexterity Vest", 10, 20)];
        const gildedRose = new GildedRose(items);
        const days = items[0].sellIn;
        for(let day = 1;day<=days;day++) {
            gildedRose.updateQuality();
        }
        let previousQuality = items[0].quality;
        for(let dayAfterSellIn = 1;dayAfterSellIn<=2;dayAfterSellIn++) {
            const updatedItems = gildedRose.updateQuality();
            expect(updatedItems[0].quality).to.equal(previousQuality-2);
            previousQuality = updatedItems[0].quality;
        }
    });

    it('should_not_degrade_quality_to_less_than_zero', function() {
        const items = [new Item("+5 Dexterity Vest", 10, 10)];
        const gildedRose = new GildedRose(items);
        const days = items[0].sellIn;
        for(let day = 1;day<=days;day++) {
            gildedRose.updateQuality();
        }

        for(let dayAfterSellIn = 1;dayAfterSellIn<=2;dayAfterSellIn++) {
            const updatedItems = gildedRose.updateQuality();
            expect(updatedItems[0].quality).to.not.be.lessThan(0);
        }
    });

    it('should_increment_quality_by_when_for_Aged_Brie', function() {
        const items = [new Item("Aged Brie", 2, 0)];
        const gildedRose = new GildedRose(items);
        const days = items[0].sellIn;
        let previousQuality = items[0].quality;
        for(let day = 1;day<=days;day++) {
            const updatedItems = gildedRose.updateQuality();
            expect(updatedItems[0].quality).to.equal(previousQuality+1);
            previousQuality = updatedItems[0].quality;
        }
    });

    it('should_increment_quality_to_more_than_50_when_for_Aged_Brie', function() {
        const items = [new Item("Aged Brie", 10, 45)];
        const gildedRose = new GildedRose(items);
        const days = items[0].sellIn;
        for(let day = 1;day<=days;day++) {
            const updatedItems = gildedRose.updateQuality();
            expect(updatedItems[0].quality).to.be.lessThan(51);
        }
    });

    it('should_not_change_quality_or_sellIn_for_Sulfuras', function() {
        const items = [new Item("Sulfuras, Hand of Ragnaros", 2, 5)];
        const gildedRose = new GildedRose(items);
        const days = items[0].sellIn;
        let previousQuality = items[0].quality;
        let previousSellIn = items[0].sellIn;
        for(let day = 1;day<=days;day++) {
            const updatedItems = gildedRose.updateQuality();
            expect(updatedItems[0].quality).to.equal(previousQuality);
            expect(updatedItems[0].sellIn).to.equal(previousSellIn);
        }
    });

    it('should_not_change_quality_or_sellIn_for_Sulfuras', function() {
        const items = [new Item("Sulfuras, Hand of Ragnaros", 2, 5)];
        const gildedRose = new GildedRose(items);
        const days = items[0].sellIn;
        let previousQuality = items[0].quality;
        let previousSellIn = items[0].sellIn;
        for(let day = 1;day<=days;day++) {
            const updatedItems = gildedRose.updateQuality();
            expect(updatedItems[0].quality).to.equal(previousQuality);
            expect(updatedItems[0].sellIn).to.equal(previousSellIn);
        }
    });

    it('should_change_quality_according_to_Backstage_passes', function() {
        const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 5)];
        const gildedRose = new GildedRose(items);
        const days = items[0].sellIn + 2;
        let previousQuality = items[0].quality;
        let previousSellIn = items[0].sellIn;
        for(let day = 1;day<=days;day++) {
            const updatedItems = gildedRose.updateQuality();
            if(previousSellIn<=0) {
                expect(updatedItems[0].quality).to.equal(0);
            } else if(previousSellIn<=5) {
                expect(updatedItems[0].quality).to.equal(previousQuality + 3);
            } else if(previousSellIn<=10) {
                expect(updatedItems[0].quality).to.equal(previousQuality + 2);
            }
            previousQuality = updatedItems[0].quality;
            previousSellIn = updatedItems[0].sellIn;
        }
    });

    it('should_degrade_quality_by_2_every_day_when_for_Conjured', function() {
        const items = [new Item("Conjured", 10, 23)];
        const gildedRose = new GildedRose(items);
        const days = items[0].sellIn-1;
        let previousQuality = items[0].quality;
        for(let day = 1;day<=days;day++) {
            const updatedItems = gildedRose.updateQuality();
            expect(updatedItems[0].quality).to.equal(previousQuality-2);
            previousQuality = updatedItems[0].quality;
        }
    });


});
