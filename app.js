$(function() {
	var viewer = new Cesium.Viewer('cesiumContainer', {
	    scene3DOnly: true,
	    infoBox : false,
	    selectionIndicator : false
	});

	viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
	    url : 'https://assets.agi.com/stk-terrain/world',
	    requestWaterMask : true,
	    requestVertexNormals : true
	});






	function computeTestLaunchTrajectory(lon, lat, azimuth){
		// from a given long lat, at an azimuth, create a list of ten 
		// points which map a launch traj 
		// assume constant rate of ascent
		var data = [ ' some set of values for the position'];


		for (var i = data.length - 1; i >= 0; i--) {
			data[i]
		}



		var property = new Cesium.SampledPositionProperty();
		for (var i = 0; i <= 360; i += 45) {
		    var radians = Cesium.Math.toRadians(i);
		    var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
		    var position = Cesium.Cartesian3.fromDegrees(lon + (radius * 1.5 * Math.cos(radians)), lat + (radius * Math.sin(radians)), Cesium.Math.nextRandomNumber() * 500 + 1750);
		    property.addSample(time, position);

		    //Also create a point for each sample we generate.
		    viewer.entities.add({
		        position : position,
		        point : {
		            pixelSize : 8,
		            color : Cesium.Color.TRANSPARENT,
		            outlineColor : Cesium.Color.YELLOW,
		            outlineWidth : 3
		        }
		    });
		}
		return property;

	}


	function createModel(url, height) {
	    viewer.entities.removeAll();

	    var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height);
	    var heading = Cesium.Math.toRadians(135);
	    var pitch = 0;
	    var roll = 0;
	    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, heading, pitch, roll);

	    var entity = viewer.entities.add({
	        name : url,
	        position : position,
	        orientation : orientation,
	        model : {
	            uri : url,
	            minimumPixelSize : 128,
	            maximumScale : 20000
	        }
	    });
	    viewer.trackedEntity = entity;
	}

	createModel('Cesium-1.20/Apps/SampleData/models/CesiumAir/Cesium_Air.glb', 500.0);

	var options = [{
	    text : 'Aircraft',
	    onselect : function() {
	        createModel('../../SampleData/models/CesiumAir/Cesium_Air.glb', 5000.0);
	    }
	}, {
	    text : 'Ground vehicle',
	    onselect : function() {
	        createModel('../../SampleData/models/CesiumGround/Cesium_Ground.glb', 0);
	    }
	}, {
	    text : 'Milk truck',
	    onselect : function() {
	        createModel('../../SampleData/models/CesiumMilkTruck/CesiumMilkTruck-kmc.glb', 0);
	    }
	}, {
	    text : 'Skinned character',
	    onselect : function() {
	        createModel('../../SampleData/models/CesiumMan/Cesium_Man.glb', 0);
	    }
	}];
});


