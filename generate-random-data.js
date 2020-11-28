const Chance = require('chance')

let chance = new Chance()

const generateRandomData = () => {
    return {
        'id': chance.integer({min: 0, max: 200}),
        'product_name': chance.string({length: 50, alpha: true}),
        'brand': chance.string({alpha: true}),
        'price': chance.integer({min: 0, max: 200}),
        'isAvailable': chance.bool(),
        'color(s)': [chance.string({length: 10}), chance.string({length: 10})],
        'size': {
            'height': chance.integer({min: 0, max: 200}),
            'width': chance.integer({min: 0, max: 200}),
            'diameter': chance.integer({min: 0, max: 200})
        }
    }
}

module.exports = generateRandomData
