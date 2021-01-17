/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    let new_collection = cloneCollection(collection);
    for (let i = 1; i < arguments.length; ++i) {
        if (arguments[i].name === 'filterIn') {
            let func = arguments[i];
            new_collection = func(new_collection);
        }
    }
    for (let i = 1; i < arguments.length; ++i) {
        if (arguments[i].name === 'select') {
            let func = arguments[i];
            new_collection = func(new_collection);
        }
    }
    return new_collection;
}

/**
 * @params {String[]}
 */
function select() {
    let properties = Array.prototype.slice.call(arguments);
    return function select(collection) {
        return collection.map(function (item) {
            let cur_properties = Object.keys(item);
            for (let i = 0; i < cur_properties.length; ++i) {
                let cur_property = cur_properties[i];
                if (properties.indexOf(cur_property) === -1) {
                    delete item[cur_property];
                }
            }
            return item;
        })
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return function filterIn(collection) {
        return collection.filter(function (item) {
            let value = item[property];
            return values.indexOf(value) !== -1;
        })
    }
}

function cloneCollection(collection) {
    return collection.map(function (item) {
        let properties = Object.keys(item);
        let newItem = {};
        for (let i = 0; i < properties.length; ++i) {
            let property = properties[i];
            newItem[property] = item[property];
        }
        return newItem;
    });
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
