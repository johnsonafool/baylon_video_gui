// import createScene from "./package/Scene.js";
// const CreSce = createScene();

// import getTodaysDate from "./getDate.js";
// const date = getTodaysDate();

// BABYLON.VideoTexture.CreateFromWebCam(scene, function(videoTexture) {
// }, { maxWidth: 256, maxHeight: 256 });

// const videoSrc = "textures/test.mp4";

const videoSrc = [
  "./textures/test1.mp4",
  "./textures/test2.mp4",
  "./textures/test3.mp4",
  "./textures/test4.mp4",
];

var ranVideoSrc = videoSrc[Math.floor(Math.random() * videoSrc.length)];

var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};
const createScene = function () {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)

  var camera = new BABYLON.ArcRotateCamera(
    "arcR",
    -Math.PI / 2,
    Math.PI / 2,
    15,
    BABYLON.Vector3.Zero(),
    scene
  );

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // was using var instead const before //
  const planeOpts = {
    height: 10,
    width: 14,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
  };
  const ANote0Video = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    planeOpts,
    scene
  );
  const vidPos = new BABYLON.Vector3(0, 0, 3);
  ANote0Video.position = vidPos;
  const ANote0VideoMat = new BABYLON.StandardMaterial("m", scene);
  const ANote0VideoVidTex = new BABYLON.VideoTexture(
    "vidtex",
    ranVideoSrc
    // scene
  );
  // was using var instead const before //

  // const ANote0VideoVidTex = new BABYLON.VideoTexture(
  //   "vidtex",
  //   "textures/csl.mp4"
  // scene
  // );

  // const ANote0VideoVidTex = new BABYLON.VideoTexture.CreateFromWebCam(
  //   scene,
  //   function (videoTexture) {},
  //   { maxWidth: 256, maxHeight: 256 }
  // );

  ANote0VideoMat.diffuseTexture = ANote0VideoVidTex;
  ANote0VideoMat.roughness = 1;
  ANote0VideoMat.emissiveColor = new BABYLON.Color3.White();
  ANote0Video.material = ANote0VideoMat;
  scene.onPointerObservable.add(function (evt) {
    if (evt.pickInfo.pickedMesh === ANote0Video) {
      //console.log("picked");
      if (ANote0VideoVidTex.video.paused) ANote0VideoVidTex.video.play();
      else ANote0VideoVidTex.video.pause();
      console.log(ANote0VideoVidTex.video.paused ? "paused" : "playing");
    }
  }, BABYLON.PointerEventTypes.POINTERPICK);
  //console.log(ANote0Video);

  // GUI //
  var plane1 = BABYLON.Mesh.CreatePlane("plane", 2);
  // plane.parent = sphere;
  plane1.position.x = 2;
  plane1.position.y = 2;

  plane1.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

  var advancedTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane1);

  var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Pre");
  button1.width = 1;
  button1.height = 0.4;
  button1.color = "white";
  button1.fontSize = 125;
  button1.background = "green";
  button1.onPointerUpObservable.add(function () {
    // alert("you did it!");
    console.log("next");
  });
  advancedTexture.addControl(button1);

  var plane2 = BABYLON.Mesh.CreatePlane("plane", 2);
  // plane.parent = sphere;
  plane2.position.x = -2;
  plane2.position.y = 2;

  plane2.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

  var advancedTexture =
    BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane2);

  var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Nex");
  button2.width = 1;
  button2.height = 0.4;
  button2.color = "white";
  button2.fontSize = 125;
  button2.background = "red";
  button2.onPointerUpObservable.add(function () {
    // alert("you did it!");
    console.log("prev");
  });
  advancedTexture.addControl(button2);
  // GUI //

  return scene;
};
window.initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  window.engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";
  startRenderLoop(engine, canvas);
  window.scene = createScene();
};
initFunction().then(() => {
  sceneToRender = scene;
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
