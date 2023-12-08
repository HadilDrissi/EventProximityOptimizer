const events = require('./datasource.json')
console.log(events.events);

function toRad(x) {
    return x * Math.PI / 180;
}
function haversineDistance(lon1, lat1, lon2, lat2, isMiles) {
    var R = 6371; // km
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    if (isMiles) d /= 1.60934;

    return d;
}

let filteredEvents=events.events.filter((e) => {
    return e.isVisble == true
})
let mappedEvents = filteredEvents.map((e) => {
    let newEvent = e
    newEvent.distance = haversineDistance(9.630056,35.443342,e.long,e.lat,true)
    return newEvent
}
)
console.log (mappedEvents)
let sortedMapd = mappedEvents.sort((event1,event2)=>{return event1.distance - event2.distance})
console.log(sortedMapd)

