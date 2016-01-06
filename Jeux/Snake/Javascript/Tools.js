function printObjectNow(object, detailed) {
    if (detailed) {
        console.log(JSON.stringify(object));
    }
    else {
        console.log($.extend({}, object));
    }
}