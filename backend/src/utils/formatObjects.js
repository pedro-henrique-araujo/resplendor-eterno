function snakeToCamel(str) {
    let output = str.replace(/_[a-z]/g, group => 
        group.toUpperCase().replace('_', '')
    );
    return output;
}

function cameliseFromSnakeCaseSingleObject(object) {
    let output = {};
    for (let key in object) {
        let camelCaseKey = snakeToCamel(key);
        output[camelCaseKey] = object[key];
    }
    return output;
}


module.exports = {
    cameliseFromSnakeCase(objectToFormat) {
        if (Array.isArray(objectToFormat)) {
            return objectToFormat.map(cameliseFromSnakeCaseSingleObject);
        }

        return cameliseFromSnakeCaseSingleObject(objectToFormat);
    }
}