import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('decreasing sellin normal item', function() {
        const gildedRose = new GildedRose([ new Item('foo', 10, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(9);
    });

    it('decreasing quality normal item', function() {
        const gildedRose = new GildedRose([ new Item('foo', 10, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(9);
    });

    it('increasing quality brie', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 10, 10) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(11);
    });

    it('quality can never be negative', function() {
        const gildedRose = new GildedRose([ new Item('foo', 10, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(9);
    });

    it('quality capped to 50', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 10, 49) ]);
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
        expect(items[0].sellIn).to.equal(6);
    });

    it('quality degrades twice as fast once sellIn has passed', function() {
        const gildedRose = new GildedRose([ new Item('foo', -1, 40) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(38);
        expect(items[0].sellIn).to.equal(-2);
    });

    it('Sulfuras doesnt decrease in quality or time', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 100, 100) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(100);
        expect(items[0].sellIn).to.equal(100);
    });

    it('Backstage passes increase in quality +1', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 50, 40) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(41);
        expect(items[0].sellIn).to.equal(49);
    });

    it('Backstage passes increase in quality +2', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 9, 40) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(42);
        expect(items[0].sellIn).to.equal(8);
    });

    it('Backstage passes increase in quality +3', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 4, 40) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(43);
        expect(items[0].sellIn).to.equal(3);
    });

    it('Backstage passes drop to 0 after selling time', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 40) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[0].sellIn).to.equal(-1);
    });



});
