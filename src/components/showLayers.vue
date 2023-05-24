<template>
    <div id="entities">
        <el-dropdown trigger="click">
            <el-button type="primary">
                显示/隐藏图层<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-checkbox id="checkbox" v-model="checked1" label="卫星" @change="showSatellite(checked1)"></el-checkbox>
                <el-checkbox id="checkbox" v-model="checked2" label="轨迹" @change="showOrbit(checked2)"></el-checkbox>
            </el-dropdown-menu>
        </el-dropdown>

    </div>
</template>

<script>
export default {
    name: "showLayers",
    props: {
        satellite_entities: Array,
    },
    data() {
        return {
            checked1: true,
            checked2: true
        }
    },
    methods: {
        showSatellite(check) {
            if (check) {
                this.satellite_entities.forEach((element) => {
                    element.model.show = true;
                });
            } else {
                this.satellite_entities.forEach((element) => {
                    element.model.show = false;
                });
            }
        },
        showOrbit(check) {
            if (check) {
                this.satellite_entities.forEach((element) => {
                    element.show = true;
                });
            } else {
                this.satellite_entities.forEach((element) => {
                    element.show = false;
                });
            }
        },
    }
}
</script>
<style>
#entities {
    top: 50px;
    left: 50px;
    position: absolute;
    opacity: 0.8;
}

#checkbox {
    margin-left: 8px;
    margin-top: 10px;
}

.el-dropdown {
    vertical-align: top;
}

.el-dropdown+.el-dropdown {
    margin-left: 15px;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.el-dropdown-menu {
    background-color: rgb(238, 238, 238, 0.8);
    width: 130px;
}
</style>