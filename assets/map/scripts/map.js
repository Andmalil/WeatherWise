
maptilersdk.config.apiKey = key;
var map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.STREET,
    center: [-90.96, -0.47],
    zoom: 1
})
function add_marker(map, coordinate) {
    // add a marker on the map
    var features = []
    for (let i = 0; i < coordinate.length; i++) {
        features.push(
            {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'Point',
                    'coordinates': coordinate[i]
                }
            }
        )
    }
    
    map.addSource('points', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': features
        }
    })
    // Add a symbol layer
    map.addLayer({
        'id': 'symbols',
        'type': 'symbol',
        'source': 'points',
        'layout': {
            'icon-image': 'custom-marker'
        }
    });

}



map.on('load', async function () {
    map.getCanvas().style.cursor = 'pointer';
    // Add an image to use as a custom marker
    // const image = await map.loadImage('https://docs.maptiler.com/sdk-js/assets/custom_marker.png')
    // map.addImage('custom-marker', image.data)

    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.on('click', 'symbols', function (e) {
        map.flyTo({
            center: e.features[0].geometry.coordinates,
            zoom: 7.5
        });
    });

   
    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter', 'symbols', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'symbols', function () {
        map.getCanvas().style.cursor = '';
    });
    const gc = new maptilersdkMaptilerGeocoder.GeocodingControl({});

    map.addControl(gc, 'top-left');
});
