// ============================================================
// 3D SUV RACING GAME
// CRASH + RESTART VERSION
// ============================================================

let THREE = null;


// ============================================================
// LOAD THREE.JS
// ============================================================

async function loadThree() {

    try {

        THREE = await import(
            "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js"
        );

        return true;

    } catch (error) {

        console.error(
            "Three.js failed to load:",
            error
        );

        return false;
    }
}


// ============================================================
// MAIN GAME
// ============================================================

async function startGame() {

    const loaded =
        await loadThree();


    if (!loaded) {

        const loading =
            document.getElementById("loading");

        if (loading) {

            loading.innerHTML =
                "3D ENGINE LOAD FAILED<br><br>PLEASE REFRESH";

        }

        return;
    }


    // ========================================================
    // SCENE
    // ========================================================

    const scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(
            0x86bfd9
        );


    scene.fog =
        new THREE.Fog(
            0x86bfd9,
            90,
            600
        );


    // ========================================================
    // CAMERA
    // ========================================================

    const camera =
        new THREE.PerspectiveCamera(
            67,
            window.innerWidth /
            window.innerHeight,
            0.1,
            2000
        );


    camera.position.set(
        0,
        6.4,
        22
    );


    // ========================================================
    // RENDERER
    // ========================================================

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.shadowMap.enabled =
        true;


    renderer.shadowMap.type =
        THREE.PCFSoftShadowMap;


    renderer.outputColorSpace =
        THREE.SRGBColorSpace;


    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;


    renderer.toneMappingExposure =
        1.15;


    const game =
        document.getElementById(
            "game"
        );


    game.appendChild(
        renderer.domElement
    );


    // ========================================================
    // LIGHTS
    // ========================================================

    const skyLight =
        new THREE.HemisphereLight(
            0xe8f7ff,
            0x294b27,
            2.5
        );


    scene.add(
        skyLight
    );


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            3.5
        );


    sun.position.set(
        -100,
        150,
        100
    );


    sun.castShadow =
        true;


    sun.shadow.mapSize.width =
        2048;


    sun.shadow.mapSize.height =
        2048;


    sun.shadow.camera.left =
        -160;


    sun.shadow.camera.right =
        160;


    sun.shadow.camera.top =
        160;


    sun.shadow.camera.bottom =
        -160;


    scene.add(
        sun
    );


    // ========================================================
    // WORLD
    // ========================================================

    const world =
        new THREE.Group();


    scene.add(
        world
    );


    // ========================================================
    // GRASS
    // ========================================================

    const grass =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                900,
                2400
            ),

            new THREE.MeshStandardMaterial({
                color: 0x3f7c35,
                roughness: 1
            })

        );


    grass.rotation.x =
        -Math.PI / 2;


    grass.position.set(
        0,
        -0.16,
        -1150
    );


    grass.receiveShadow =
        true;


    world.add(
        grass
    );


    // ========================================================
    // ROAD
    // ========================================================

    const road =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                30,
                2400
            ),

            new THREE.MeshStandardMaterial({
                color: 0x292d31,
                roughness: 0.94
            })

        );


    road.rotation.x =
        -Math.PI / 2;


    road.position.set(
        0,
        0,
        -1150
    );


    road.receiveShadow =
        true;


    world.add(
        road
    );


    // ========================================================
    // ROAD EDGES
    // ========================================================

    const edgeMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5
        });


    function createEdge(x) {

        const edge =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.32,
                    0.08,
                    2400
                ),

                edgeMaterial
            );


        edge.position.set(
            x,
            0.05,
            -1150
        );


        world.add(edge);
    }


    createEdge(-14.4);
    createEdge(14.4);


    // ========================================================
    // ROAD LINES
    // ========================================================

    const roadLines = [];


    const lineMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        });


    for (
        let z = 20;
        z > -2400;
        z -= 20
    ) {

        const line =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    0.18,
                    0.06,
                    9
                ),

                lineMaterial
            );


        line.position.set(
            0,
            0.07,
            z
        );


        world.add(line);

        roadLines.push(line);
    }


    // ========================================================
    // TREES
    // ========================================================

    const trees = [];


    function createTree(
        x,
        z,
        scale
    ) {

        const tree =
            new THREE.Group();


        const trunk =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.25,
                    0.42,
                    3.2,
                    8
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x604028
                })
            );


        trunk.position.y =
            1.6;


        trunk.castShadow =
            true;


        tree.add(trunk);


        const leaves =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    2.1,
                    16,
                    12
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x24632c,
                    roughness: 1
                })
            );


        leaves.position.y =
            4.2;


        leaves.castShadow =
            true;


        tree.add(leaves);


        tree.position.set(
            x,
            0,
            z
        );


        tree.scale.setScalar(
            scale
        );


        world.add(tree);

        trees.push(tree);
    }


    for (
        let z = 0;
        z > -2100;
        z -= 40
    ) {

        createTree(
            -22 -
            Math.random() * 24,
            z,
            0.7 +
            Math.random() * 0.65
        );


        createTree(
            22 +
            Math.random() * 24,
            z - 20,
            0.7 +
            Math.random() * 0.65
        );
    }


    // ========================================================
    // SUV CREATOR
    // ========================================================

    function createSUV(bodyColor) {

        const suv =
            new THREE.Group();


        const bodyMaterial =
            new THREE.MeshPhysicalMaterial({

                color: bodyColor,

                metalness: 0.65,

                roughness: 0.22,

                clearcoat: 1,

                clearcoatRoughness: 0.08
            });


        const blackMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x101010,

                metalness: 0.15,

                roughness: 0.55
            });


        const glassMaterial =
            new THREE.MeshPhysicalMaterial({

                color: 0x17232b,

                metalness: 0.05,

                roughness: 0.08,

                transmission: 0.04,

                transparent: true,

                opacity: 0.88,

                clearcoat: 1
            });


        const chromeMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xbfc4c7,

                metalness: 0.9,

                roughness: 0.18
            });


        // BODY

        const body =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.75,
                    0.95,
                    4.85
                ),
                bodyMaterial
            );


        body.position.y =
            0.92;


        body.castShadow =
            true;


        suv.add(body);


        // LOWER BODY

        const lowerBody =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.82,
                    0.38,
                    4.45
                ),
                blackMaterial
            );


        lowerBody.position.y =
            0.50;


        suv.add(lowerBody);


        // HOOD

        const hood =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.55,
                    0.22,
                    1.25
                ),
                bodyMaterial
            );


        hood.position.set(
            0,
            1.40,
            -1.55
        );


        suv.add(hood);


        // CABIN

        const cabin =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.42,
                    1.25,
                    2.65
                ),
                bodyMaterial
            );


        cabin.position.set(
            0,
            1.65,
            0.30
        );


        suv.add(cabin);


        // FRONT GLASS

        const windshield =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.22,
                    0.82,
                    0.08
                ),
                glassMaterial
            );


        windshield.position.set(
            0,
            1.88,
            -1.05
        );


        windshield.rotation.x =
            -0.16;


        suv.add(windshield);


        // REAR GLASS

        const rearGlass =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.22,
                    0.82,
                    0.08
                ),
                glassMaterial
            );


        rearGlass.position.set(
            0,
            1.88,
            1.65
        );


        rearGlass.rotation.x =
            0.12;


        suv.add(rearGlass);


        // SIDE WINDOWS

        const sideWindowGeometry =
            new THREE.BoxGeometry(
                0.08,
                0.82,
                2.15
            );


        const leftWindows =
            new THREE.Mesh(
                sideWindowGeometry,
                glassMaterial
            );


        leftWindows.position.set(
            -1.215,
            1.86,
            0.30
        );


        suv.add(leftWindows);


        const rightWindows =
            new THREE.Mesh(
                sideWindowGeometry,
                glassMaterial
            );


        rightWindows.position.set(
            1.215,
            1.86,
            0.30
        );


        suv.add(rightWindows);


        // ROOF

        const roof =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.38,
                    0.12,
                    2.45
                ),
                bodyMaterial
            );


        roof.position.set(
            0,
            2.30,
            0.30
        );


        suv.add(roof);


        // ROOF RAILS

        [-0.88, 0.88].forEach(
            x => {

                const rail =
                    new THREE.Mesh(
                        new THREE.BoxGeometry(
                            0.08,
                            0.10,
                            2.50
                        ),
                        blackMaterial
                    );


                rail.position.set(
                    x,
                    2.42,
                    0.30
                );


                suv.add(rail);
            }
        );


        // GRILLE

        const grille =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    1.72,
                    0.72,
                    0.12
                ),
                blackMaterial
            );


        grille.position.set(
            0,
            0.98,
            -2.47
        );


        suv.add(grille);


        // GRILLE BARS

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            const bar =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        1.55,
                        0.055,
                        0.05
                    ),
                    chromeMaterial
                );


            bar.position.set(
                0,
                0.72 +
                i * 0.13,
                -2.55
            );


            suv.add(bar);
        }


        // FRONT BUMPER

        const frontBumper =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.72,
                    0.35,
                    0.28
                ),
                blackMaterial
            );


        frontBumper.position.set(
            0,
            0.48,
            -2.40
        );


        suv.add(frontBumper);


        // HEADLIGHTS

        const headlightMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xffffff,

                emissive: 0xffffff,

                emissiveIntensity: 5
            });


        [-0.91, 0.91].forEach(
            x => {

                const headlight =
                    new THREE.Mesh(
                        new THREE.BoxGeometry(
                            0.68,
                            0.20,
                            0.10
                        ),
                        headlightMaterial
                    );


                headlight.position.set(
                    x,
                    1.32,
                    -2.50
                );


                suv.add(headlight);
            }
        );


        // MIRRORS

        [-1, 1].forEach(
            side => {

                const mirror =
                    new THREE.Mesh(
                        new THREE.BoxGeometry(
                            0.28,
                            0.18,
                            0.42
                        ),
                        bodyMaterial
                    );


                mirror.position.set(
                    side * 1.42,
                    1.72,
                    -0.82
                );


                suv.add(mirror);
            }
        );


        // WHEELS

        const wheelGeometry =
            new THREE.CylinderGeometry(
                0.55,
                0.55,
                0.42,
                32
            );


        const tyreMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x070707,
                roughness: 0.90
            });


        const rimMaterial =
            new THREE.MeshStandardMaterial({
                color: 0xa8adb0,
                metalness: 0.9,
                roughness: 0.18
            });


        const wheelPositions = [

            [-1.43, 0.58, -1.55],
            [1.43, 0.58, -1.55],
            [-1.43, 0.58, 1.55],
            [1.43, 0.58, 1.55]

        ];


        wheelPositions.forEach(
            position => {

                const wheel =
                    new THREE.Mesh(
                        wheelGeometry,
                        tyreMaterial
                    );


                wheel.rotation.z =
                    Math.PI / 2;


                wheel.position.set(
                    position[0],
                    position[1],
                    position[2]
                );


                suv.add(wheel);


                const rim =
                    new THREE.Mesh(
                        new THREE.CylinderGeometry(
                            0.31,
                            0.31,
                            0.44,
                            20
                        ),
                        rimMaterial
                    );


                rim.rotation.z =
                    Math.PI / 2;


                rim.position.set(
                    position[0],
                    position[1],
                    position[2]
                );


                suv.add(rim);
            }
        );


        // RUNNING BOARDS

        [-1, 1].forEach(
            side => {

                const board =
                    new THREE.Mesh(
                        new THREE.BoxGeometry(
                            0.18,
                            0.16,
                            3.25
                        ),
                        blackMaterial
                    );


                board.position.set(
                    side * 1.48,
                    0.42,
                    0.20
                );


                suv.add(board);
            }
        );


        // TAIL LIGHTS

        const tailMaterial =
            new THREE.MeshStandardMaterial({

                color: 0xff1010,

                emissive: 0xff0000,

                emissiveIntensity: 2.5
            });


        [-0.92, 0.92].forEach(
            x => {

                const tail =
                    new THREE.Mesh(
                        new THREE.BoxGeometry(
                            0.55,
                            0.42,
                            0.10
                        ),
                        tailMaterial
                    );


                tail.position.set(
                    x,
                    1.24,
                    2.50
                );


                suv.add(tail);
            }
        );


        // REAR BUMPER

        const rearBumper =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    2.72,
                    0.35,
                    0.25
                ),
                blackMaterial
            );


        rearBumper.position.set(
            0,
            0.50,
            2.43
        );


        suv.add(rearBumper);


        return suv;
    }


    // ========================================================
    // PLAYER
    // ========================================================

    const player =
        createSUV(0xf0f0ee);


    player.position.set(
        0,
        0,
        8
    );


    scene.add(player);


    // ========================================================
    // NITRO LIGHT
    // ========================================================

    const nitroLight =
        new THREE.PointLight(
            0x00d9ff,
            0,
            16
        );


    nitroLight.position.set(
        0,
        0.55,
        2.8
    );


    player.add(nitroLight);


    // ========================================================
    // TRAFFIC
    // ========================================================

    const traffic = [];


    const trafficColors = [

        0x111111,
        0x174f91,
        0x9c1d1d,
        0x777777,
        0xe7e7e7,
        0x244d32,
        0xb68a27

    ];


    const lanes = [
        -9,
        -4.5,
        4.5,
        9
    ];


    function createTrafficSUV(index) {

        const car =
            createSUV(
                trafficColors[
                    index %
                    trafficColors.length
                ]
            );


        car.scale.setScalar(
            0.88
        );


        car.position.x =
            lanes[
                Math.floor(
                    Math.random() *
                    lanes.length
                )
            ];


        car.position.z =
            -90 -
            index * 130;


        scene.add(car);


        traffic.push({

            mesh: car,

            speed:
                15 +
                Math.random() * 22

        });
    }


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        createTrafficSUV(i);
    }


    // ========================================================
    // KEYS
    // ========================================================

    const keys = {};


    window.addEventListener(
        "keydown",
        event => {

            const key =
                event.key.toLowerCase();


            keys[key] = true;


            if (
                event.code === "Space"
            ) {

                keys.space = true;

                event.preventDefault();
            }
        }
    );


    window.addEventListener(
        "keyup",
        event => {

            const key =
                event.key.toLowerCase();


            keys[key] = false;


            if (
                event.code === "Space"
            ) {

                keys.space = false;
            }
        }
    );


    // ========================================================
    // MOBILE BUTTON
    // ========================================================

    function connectButton(
        id,
        key
    ) {

        const button =
            document.getElementById(id);


        if (!button) {
            return;
        }


        button.addEventListener(
            "pointerdown",
            event => {

                event.preventDefault();

                keys[key] = true;
            }
        );


        button.addEventListener(
            "pointerup",
            () => {

                keys[key] = false;
            }
        );


        button.addEventListener(
            "pointercancel",
            () => {

                keys[key] = false;
            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                keys[key] = false;
            }
        );
    }


    connectButton(
        "leftBtn",
        "a"
    );


    connectButton(
        "rightBtn",
        "d"
    );


    connectButton(
        "brakeBtn",
        "s"
    );


    connectButton(
        "nitroBtn",
        "space"
    );


    // ========================================================
    // HUD
    // ========================================================

    const speedUI =
        document.getElementById(
            "speed"
        );


    const nitroFill =
        document.getElementById(
            "nitroFill"
        );


    const nitroText =
        document.getElementById(
            "nitroText"
        );


    const timeUI =
        document.getElementById(
            "time"
        );


    const messageUI =
        document.getElementById(
            "raceMessage"
        );


    const restartButton =
        document.getElementById(
            "restartBtn"
        );


    // ========================================================
    // GAME VARIABLES
    // ========================================================

    let speed = 0;

    let nitro = 100;

    let raceTime = 0;

    let running = true;

    let crashed = false;

    let crashTime = 0;

    let crashDirection = 1;

    let crashCooldown = 0;


    // ========================================================
    // COLLISION
    // ========================================================

    function checkCollision(
        first,
        second
    ) {

        const box1 =
            new THREE.Box3()
                .setFromObject(first);


        const box2 =
            new THREE.Box3()
                .setFromObject(second);


        return box1.intersectsBox(
            box2
        );
    }


    // ========================================================
    // CRASH
    // ========================================================

    function triggerCrash(
        trafficCar
    ) {

        if (crashed) {
            return;
        }


        crashed = true;

        running = false;

        crashTime = 0;

        speed = 0;

        nitroLight.intensity = 0;


        if (
            player.position.x <=
            trafficCar.position.x
        ) {

            crashDirection = -1;

        } else {

            crashDirection = 1;
        }


        trafficCar.position.z += 3;


        if (messageUI) {

            messageUI.textContent =
                "💥 CRASHED!";

            messageUI.style.opacity =
                "1";
        }


        document.body.classList.add(
            "crash-shake"
        );


        setTimeout(
            () => {

                document.body.classList.remove(
                    "crash-shake"
                );

            },
            500
        );


        setTimeout(
            () => {

                if (restartButton) {

                    restartButton.style.display =
                        "block";
                }

            },
            1100
        );
    }


    // ========================================================
    // RESTART
    // ========================================================

    if (restartButton) {

        restartButton.addEventListener(
            "click",
            () => {

                window.location.reload();

            }
        );
    }


    // ========================================================
    // CLOCK
    // ========================================================

    const clock =
        new THREE.Clock();


    // ========================================================
    // GAME LOOP
    // ========================================================

    function animate() {

        requestAnimationFrame(
            animate
        );


        const delta =
            Math.min(
                clock.getDelta(),
                0.05
            );


        // ====================================================
        // CRASH ANIMATION
        // ====================================================

        if (crashed) {

            crashTime += delta;


            player.rotation.z =
                THREE.MathUtils.lerp(
                    player.rotation.z,
                    crashDirection * 0.72,
                    0.12
                );


            player.rotation.y =
                THREE.MathUtils.lerp(
                    player.rotation.y,
                    crashDirection * 0.38,
                    0.10
                );


            player.position.x +=
                Math.sin(
                    crashTime * 42
                ) * 0.025;


            player.position.z +=
                Math.sin(
                    crashTime * 20
                ) * 0.018;


            player.position.y =
                Math.max(
                    0,
                    Math.sin(
                        crashTime * 15
                    ) * 0.08
                );


            // Camera shake

            camera.position.x +=
                Math.sin(
                    crashTime * 50
                ) * 0.015;


            camera.position.y +=
                Math.cos(
                    crashTime * 43
                ) * 0.012;


            const target =
                new THREE.Vector3(
                    player.position.x * 0.15,
                    1.0,
                    -48
                );


            camera.lookAt(target);


            renderer.render(
                scene,
                camera
            );


            return;
        }


        // ====================================================
        // NORMAL GAME
        // ====================================================

        if (running) {

            raceTime += delta;

            crashCooldown -= delta;


            // =================================================
            // ACCELERATION
            // =================================================

            if (
                keys.w ||
                keys.arrowup
            ) {

                speed +=
                    55 * delta;

            } else if (
                keys.s ||
                keys.arrowdown
            ) {

                speed -=
                    90 * delta;

            } else {

                speed -=
                    6 * delta;
            }


            // =================================================
            // NITRO
            // =================================================

            if (
                keys.space &&
                nitro > 0 &&
                speed > 5
            ) {

                speed +=
                    125 * delta;

                nitro -=
                    32 * delta;

                nitroLight.intensity =
                    12;

            } else {

                nitro +=
                    7 * delta;

                nitroLight.intensity =
                    0;
            }


            nitro =
                THREE.MathUtils.clamp(
                    nitro,
                    0,
                    100
                );


            speed =
                THREE.MathUtils.clamp(
                    speed,
                    0,
                    100
                );


            // =================================================
            // STEERING
            // =================================================

            let steering = 0;


            if (
                keys.a ||
                keys.arrowleft
            ) {

                steering = -1;
            }


            if (
                keys.d ||
                keys.arrowright
            ) {

                steering = 1;
            }


            const steeringPower =
                8 +
                speed * 0.10;


            player.position.x +=
                steering *
                steeringPower *
                delta;


            player.position.x =
                THREE.MathUtils.clamp(
                    player.position.x,
                    -10.8,
                    10.8
                );


            // =================================================
            // BODY LEAN
            // =================================================

            player.rotation.z =
                THREE.MathUtils.lerp(
                    player.rotation.z,
                    -steering * 0.055,
                    0.12
                );


            player.rotation.y =
                THREE.MathUtils.lerp(
                    player.rotation.y,
                    -steering * 0.035,
                    0.10
                );


            // =================================================
            // WORLD
            // =================================================

            const movement =
                speed * delta;


            roadLines.forEach(
                line => {

                    line.position.z +=
                        movement;


                    if (
                        line.position.z > 35
                    ) {

                        line.position.z -=
                            2400;
                    }
                }
            );


            trees.forEach(
                tree => {

                    tree.position.z +=
                        movement;


                    if (
                        tree.position.z > 45
                    ) {

                        tree.position.z =
                            -1900 -
                            Math.random() * 250;
                    }
                }
            );


            // =================================================
            // TRAFFIC
            // =================================================

            traffic.forEach(
                trafficObject => {

                    const trafficCar =
                        trafficObject.mesh;


                    trafficCar.position.z +=
                        (
                            speed +
                            trafficObject.speed
                        ) * delta;


                    // RECYCLE

                    if (
                        trafficCar.position.z > 45
                    ) {

                        trafficCar.position.z =
                            -500 -
                            Math.random() * 1000;


                        trafficCar.position.x =
                            lanes[
                                Math.floor(
                                    Math.random() *
                                    lanes.length
                                )
                            ];


                        trafficObject.speed =
                            15 +
                            Math.random() * 25;
                    }


                    // COLLISION

                    if (
                        !crashed &&
                        crashCooldown <= 0 &&
                        checkCollision(
                            player,
                            trafficCar
                        )
                    ) {

                        crashCooldown = 9999;

                        triggerCrash(
                            trafficCar
                        );
                    }
                }
            );


            // =================================================
            // CAMERA
            // =================================================

            const targetCameraX =
                player.position.x *
                0.40;


            camera.position.x +=
                (
                    targetCameraX -
                    camera.position.x
                ) * 0.08;


            camera.position.y +=
                (
                    6.5 -
                    camera.position.y
                ) * 0.08;


            camera.position.z +=
                (
                    22 -
                    camera.position.z
                ) * 0.08;


            const target =
                new THREE.Vector3(

                    player.position.x *
                    0.15,

                    1.0,

                    -48
                );


            camera.lookAt(
                target
            );


            // =================================================
            // SPEED
            // =================================================

            if (speedUI) {

                speedUI.textContent =
                    Math.round(
                        speed * 3.6
                    );
            }


            // =================================================
            // NITRO
            // =================================================

            if (nitroFill) {

                nitroFill.style.width =
                    nitro + "%";
            }


            if (nitroText) {

                nitroText.textContent =
                    Math.round(
                        nitro
                    ) + "%";
            }


            // =================================================
            // TIMER
            // =================================================

            if (timeUI) {

                const minutes =
                    Math.floor(
                        raceTime / 60
                    );


                const seconds =
                    Math.floor(
                        raceTime % 60
                    );


                timeUI.textContent =
                    String(minutes)
                        .padStart(2, "0") +
                    ":" +
                    String(seconds)
                        .padStart(2, "0");
            }
        }


        // ====================================================
        // RENDER
        // ====================================================

        renderer.render(
            scene,
            camera
        );
    }


    // ========================================================
    // RESIZE
    // ========================================================

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );
        }
    );


    // ========================================================
    // HIDE LOADING
    // ========================================================

    const loading =
        document.getElementById(
            "loading"
        );


    if (loading) {

        setTimeout(
            () => {

                loading.style.display =
                    "none";

            },
            1000
        );
    }


    // ========================================================
    // START
    // ========================================================

    animate();
}


// ============================================================
// START GAME
// ============================================================

startGame();
