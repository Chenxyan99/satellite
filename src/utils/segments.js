// 六色选择
var colors = [
    Cesium.Color.ORANGE,
    Cesium.Color.PINK,
    Cesium.Color.YELLOW,
    Cesium.Color.AQUA,
    Cesium.Color.GREEN,
    Cesium.Color.PURPLE,
];

export function createSegments(Cesium, viewer, segments) {
    var segments_entities = [];
    for (var i = 0; i < segments.length; i++) {
        var positions = [];
        segments[i].forEach((position) => {
            positions.push(Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.alt));
        })
        var polyline = new Cesium.PolylineGraphics({
            positions: positions,
            width: 5,
            material: colors[i],
        })

        viewer.entities.add({
            polyline: polyline,
        })
        segments_entities.push(polyline);
    }
    return;
}