<template>
  <div class="box">
    <div id="cesiumContainer"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: "Map",
  data() {
    return {
      positions: [],
      satelliteEntity: [],
      v: null,
    };
  },
  methods: {
    init() {
      const Cesium = this.cesium;
      const viewer = new Cesium.Viewer("cesiumContainer", {
        //UI控制
        baseLayerPicker: false, //右上角的图层选择按钮
        animation: true, //左下角的动画仪表盘
        infoBox: true, //点击要素之后显示的信息
        geocoder: false, //搜索框
        homeButton: false, //home按钮
        sceneModePicker: true, //模式切换按钮
        timeline: true, //底部的时间轴
        fullscreenButton: true, //右下角的全屏按钮
        shouldAnimate: true,
        navigationHelpButton: false, //右上角的帮助按钮，
        selectionIndicator: false, //原生绿色选框
        terrainProvider: new Cesium.createWorldTerrain({
          requestWaterMask: true,
          requestVertexNormals: true,
        }),
        sceneMode: Cesium.SceneMode.SCENE2D,
      });
      //不显示太阳、关闭版权信息
      {
        //viewer.scene.globe.enableLighting = true;
        //viewer.shadows = false;
        viewer.scene.sun.show = false; //不显示太阳
        viewer._cesiumWidget._creditContainer.style.display = "none"; //关闭底下的版权信息
        viewer._cesiumWidget._creditContainer.style.display = "none";

        viewer.clock.onTick.addEventListener(function () {
          if (viewer.camera.pitch > 0) {
            viewer.scene.screenSpaceCameraController.enableTilt = false;
          }
        });
      }

      //开启抗锯齿
      {
        if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
          //判断是否支持图像渲染像素化处理
          viewer.resolutionScale = window.devicePixelRatio;
        }
        viewer.scene.fxaa = true;
        viewer.scene.postProcessStages.fxaa.enabled = true;
      }

      //开启地面深度检测，这样地下的就看不到了
      viewer.scene.globe.depthTestAgainstTerrain = true;
      this.v = viewer;
    },
    fileRead() {
      var that = this;
      this.$axios
        .get("/CircularSat_LLA_Position.txt")
        .then((result) => {
          var reader = new FileReader();
          reader.readAsText(new Blob([result.data]));
          reader.onload = function (e) {
            if (e.target) {
              var fileContent = e.target.result;
              fileContent = String(fileContent);
              var lines = fileContent.split("\n");
              for (var i = 4; i < lines.length; i++) {
                var line = lines[i];
                var numbers = line.match(/-?\d+\.\d+/g);
                if (numbers !== null) {
                  var lat = parseFloat(numbers[1]);
                  var lon = parseFloat(numbers[2]);
                  var alt = parseFloat(numbers[3]);
                  that.positions.push({ lon: lon, lat: lat, alt: alt });
                }
              }
            }
          };
          setTimeout(function () {
            console.log(this.positions.length);
          }, 1000);
          // 卫星绘制
          this.drawSatellite();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drawSatellite() {
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
    },
  },
  mounted() {
    // 初始化
    this.init();
    // txt测试数据读取
    this.fileRead();
  },
};
</script>

<style>
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.box {
  height: 100%;
}
</style>
