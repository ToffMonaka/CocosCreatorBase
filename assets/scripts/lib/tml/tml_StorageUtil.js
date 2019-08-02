function getEscapeString(str) {
    return (str.replace(/\//g, '"/"'));
};

function getUnescapeString(str) {
    return (str.replace(/"\/"/g, '/'));
};

module.exports = {
    getEscapeString: getEscapeString,
    getUnescapeString: getUnescapeString
};
