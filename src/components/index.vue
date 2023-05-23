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
    },
  },
  mounted() {
    this.init();
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
