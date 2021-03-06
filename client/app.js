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

class DevicesMarker {
    constructor(map) {
        this.__map = map;
        this.__markers = [];
        this.__delta = 0.0001;
    }

    fetch() {
        fetch('http://127.0.0.1:8001/api')
            .then(res => res.json())
            .then(data => {
                this.removeMarkers();
                data.forEach(this.createMarker.bind(this));
            })
            .catch((error) => {
                console.log(`failed to fetch ${error}`)
            });
    }

    createMarker(device) {
        // Create and add a marker
        const marker = new L.Marker([device.latitude, device.longitude])
            .addTo(this.__map);

        // Label
        // marker.bindTooltip('text', {
        //     permanent: true,
        //     direction: 'right'
        // });

        marker.on('click', () => {
            const minutes = Math.floor(device.estimatedRemainingTime / 60);
            alert(`The device estimated remaining time is ${minutes} minutes.`);
        });
        //
        this.__markers.push(marker);
    }

    removeMarkers() {
        this.__markers.forEach(marker => {
            marker.remove();
        });
        this.__markers = [];
    }

    run(intervalSeconds = 1) {

        this.fetch();

        setInterval(this.run.bind(this), intervalSeconds * 1000,
            intervalSeconds);
    }
}

const map = initializeMap();
const devices = new DevicesMarker(map);
devices.run(5);

// Sample data for testing - device 1
/*
[{"timestamp":13887000,"latitude":40.36014911643671,"longitude":-111.89167499542236,"estimatedRemainingTime":1704.3},{"timestamp":13888000,"latitude":40.3637788315356,"longitude":-111.89176082611084,"estimatedRemainingTime":1703.1},{"timestamp":13889000,"latitude":40.363811530783344,"longitude":-111.88652515411377,"estimatedRemainingTime":1702.2},{"timestamp":13890000,"latitude":40.36054152749099,"longitude":-111.886568069458,"estimatedRemainingTime":1701.5}]
*/

// Sample data for testing - device 2
/*
[{"timestamp":16412000,"latitude":40.36214384892374,"longitude":-111.88892841339111,"estimatedRemainingTime":264.3},{"timestamp":16413000,"latitude":40.36632932522642,"longitude":-111.8915033340454,"estimatedRemainingTime":262.3},{"timestamp":16414000,"latitude":40.36191494819362,"longitude":-111.89377784729004,"estimatedRemainingTime":261.4}]
*/
