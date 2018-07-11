
function initializeMap() {
    // Leaflet map and base layer creation
    const map = L.map('map').setView([40.3600019617025, -111.89497947692871], 12);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);

    // Event handling
    map.on('click', e => {
        alert('clicked on map at ' + e.latlng);
    });

    return map;
}

function createMarker(map, latitude, longitude) {
    // Create and add a marker
    const marker = new L.Marker([latitude, longitude]).addTo(map);

    // Label
    marker.bindTooltip('Text', {
        permanent: true,
        direction: 'right'
    });

    marker.on('click', e => {
        alert('clicked on marker at ' + e.latlng);
    });
}

const map = initializeMap();
let lat = 40.3601491164367;
let long = -111.89167499542236;

for (let i = 0; i < 5; i++) {
    createMarker(map, lat + 0.01*i, long);
}



// Sample data for testing - device 1
/*
[{"timestamp":13887000,"latitude":40.36014911643671,"longitude":-111.89167499542236,"estimatedRemainingTime":1704.3},{"timestamp":13888000,"latitude":40.3637788315356,"longitude":-111.89176082611084,"estimatedRemainingTime":1703.1},{"timestamp":13889000,"latitude":40.363811530783344,"longitude":-111.88652515411377,"estimatedRemainingTime":1702.2},{"timestamp":13890000,"latitude":40.36054152749099,"longitude":-111.886568069458,"estimatedRemainingTime":1701.5}]
*/

// Sample data for testing - device 2
/*
[{"timestamp":16412000,"latitude":40.36214384892374,"longitude":-111.88892841339111,"estimatedRemainingTime":264.3},{"timestamp":16413000,"latitude":40.36632932522642,"longitude":-111.8915033340454,"estimatedRemainingTime":262.3},{"timestamp":16414000,"latitude":40.36191494819362,"longitude":-111.89377784729004,"estimatedRemainingTime":261.4}]
*/
