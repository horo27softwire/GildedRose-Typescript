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

    decreaseQuality(item: Item) {
        if (item.quality > 0) {
            if(item.name === "Conjured Mana Cake")
                item.quality--;
            item.quality = item.quality - 1
        }
    }

    increaseQuality(item: Item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1
            if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                if (item.sellIn < 11) {
                    item.quality = item.quality + 1
                }
                if (item.sellIn < 6) {
                    item.quality = item.quality + 1
                }
            }
        }
    }

    decreaseSellIn(item: Item) {
        item.sellIn = item.sellIn - 1;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {

            if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') continue;

            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                this.decreaseQuality(this.items[i]);
            } else {
                this.increaseQuality(this.items[i]);
            }

            this.decreaseSellIn(this.items[i]);

            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                    this.decreaseQuality(this.items[i]);
                } else {
                    if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
                        this.items[i].quality = 0;
                    } else if(this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}
