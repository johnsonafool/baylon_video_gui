export const createScene = function () {
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

  var planeOpts = {
    height: 5.4762,
    width: 7.3967,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
  };
  var ANote0Video = BABYLON.MeshBuilder.CreatePlane("plane", planeOpts, scene);
  var vidPos = new BABYLON.Vector3(0, 0, 0.1);
  ANote0Video.position = vidPos;
  var ANote0VideoMat = new BABYLON.StandardMaterial("m", scene);
  // var ANote0VideoVidTex = new BABYLON.VideoTexture(
  //   "vidtex",
  //   "textures/csl.mp4",
  //   // scene
  // );
  const ANote0VideoVidTex = new BABYLON.VideoTexture(
    "vidtex",
    "textures/csl.mp4"
    // scene
  );

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

  var button1 = BABYLON.GUI.Button.CreateSimpleButton("but1", "Click Me");
  button1.width = 1;
  button1.height = 0.4;
  button1.color = "white";
  button1.fontSize = 50;
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

  var button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Click you");
  button2.width = 1;
  button2.height = 0.4;
  button2.color = "white";
  button2.fontSize = 50;
  button2.background = "red";
  button2.onPointerUpObservable.add(function () {
    // alert("you did it!");
    console.log("prev");
  });
  advancedTexture.addControl(button2);
  // GUI //

  return scene;
};
