import chalk from "chalk"

const prices = []
const priceArrayLength = 7

for (let index = 0; index < priceArrayLength; index++) {
    let price = Math.round(Math.random() * 200)
    prices.push(price)
}

let lot = 0
let validation = false
let money = 0
let lotPrice = 0
let totalProfit = 0

const buy = (day, money, buyPrice) => {
    lotPrice = buyPrice
    lot = money / buyPrice
    validation = true
    console.log(`${day}. gün satın alım, fiyat: ${chalk.blue.bold.inverse(buyPrice)} TL , alınan adet: ${lot.toFixed(2)} lot`) 
}

const sell = (day, sellPrice, buyPrice) => {
    validation = false
    let profit = (sellPrice - buyPrice) * lot
    money === buyPrice ? money = profit : money += profit
    console.log(`${day}. gün satış, fiyat: ${chalk.yellow.bold.inverse(sellPrice)} TL , satılan adet ${lot.toFixed(2)} lot`)
    totalProfit += profit
    console.log(`kâr: ${profit.toFixed(2)}`)
}

for (let index = 0; index < priceArrayLength; index++) {
    if(prices[index] < prices[index + 1] && !validation) {
        buy(index + 1, money === 0 ? prices[index] : money, prices[index])
    }

    if(prices[index] > prices[index + 1] && validation) {
        sell(index + 1, prices[index], lotPrice)
    }

    if(index === priceArrayLength - 1 && validation) {
        sell(index + 1, prices[index], lotPrice)
    }
}

console.log(chalk.bold.bgGreen(`Toplam kâr: ${totalProfit.toFixed(2)} TL`))

console.log(prices)

// Yazdığım algoritmayı daha seri test edebilmek adına dizideki elemanları rastgele sayılarla oluşturdum,
// Lot sayısının ondalıklı olmasının sebebi, sayılar birbirinin tam katı olmadığındandır. toFixed() kullanarak 
// sayıları düzenli ondalıklı sayılar haline getirdim. Aksi taktirde alış ve satış fiyatları arasında %100'e 
// yakın bir fark olsa bile, yeni alınan lot sayısı değişmeyecekti.