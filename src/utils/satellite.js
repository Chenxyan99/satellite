export function drawSatellite() {
    console.log(this.positions.length);
    const Cesium = this.cesium;
    var positionProperty = new Cesium.SampledPositionProperty();
    var TimeInterval = 60;
    for (var i = 0; i < this.positions.length; i++) {
      var time = Cesium.JulianDate.addSeconds(
        this.v.clock.currentTime,
        i * TimeInterval,
        new Cesium.JulianDate()
      );
      var position = this.positions[i];
      positionProperty.addSample(time, position);
    }

    var satelliteEntity = new Cesium.Entity({
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: this.v.clock.currentTime,
          stop: Cesium.JulianDate.addSeconds(
            this.v.clock.currentTime,
            60 * 60 * 24,
            new Cesium.JulianDate()
          ),
        }),
      ]),
      position: positionProperty,
      orientation: new Cesium.VelocityOrientationProperty(positionProperty),
      // 卫星模型
      model: {
        uri: "./wx3.glb",
        scale: 300,
      },
      path: {
        resolution: 1,
        material: Cesium.Color.WHITE,
        width: 0.5,
      },
    });

    // 插值器
    satelliteEntity.position.setInterpolationOptions({
      interpolationDegree: 5,
      interpolationAlgorithm: Cesium.LagrangePolynomialApproximation,
    });

    // 将卫星实体添加到Cesium的Viewer中显示
    this.v.entities.add(satelliteEntity);
    return  
  }