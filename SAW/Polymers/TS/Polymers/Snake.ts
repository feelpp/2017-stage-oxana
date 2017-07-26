module mathis {
    export module polymer {
        import GrabberCamera = mathis.macamera.GrabberCamera;
        export function snake() {

            let mathisFrame = new mathis.MathisFrame();
            let mamesh = new mathis.Mamesh();
            let camera:GrabberCamera=mathisFrame.getGrabberCamera();
            camera.changePosition(new XYZ(0,0,-35));

            //A given SAW

            let vertex0 = new mathis.Vertex().setPosition(0, 0, 0);  //0
            let vertex1 = new mathis.Vertex().setPosition(-1, 0, 1); //1
            let vertex2 = new mathis.Vertex().setPosition(0, 0, 1);  //2
            let vertex3 = new mathis.Vertex().setPosition(1, 0, 1);  //3
            let vertex4 = new mathis.Vertex().setPosition(1, 1, 0);  //4
            let vertex5 = new mathis.Vertex().setPosition(2, 2, 0);  //5
            let vertex6 = new mathis.Vertex().setPosition(2, 3, -1); //6
            let vertex7 = new mathis.Vertex().setPosition(3, 3, 0);  //7
            let vertex8 = new mathis.Vertex().setPosition(3, 4, 0);  //8
            let vertex9 = new mathis.Vertex().setPosition(3, 5, -1); //9


            mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9);


            // function that checks thes list of used coordinates

            function contains(points: XYZ[], onePoint: XYZ) :boolean{
                for (let point of points){
                    if (geo.distance(point,onePoint)<0.0001) {
                        return true
                    }
                }
                return false
            }

            //All the coordinates are stocked in ALLc

            let ALLc: XYZ[] = [mamesh.vertices[0].position , mamesh.vertices[1].position,mamesh.vertices[2].position,
                mamesh.vertices[3].position,mamesh.vertices[4].position,mamesh.vertices[5].position,
                mamesh.vertices[6].position,mamesh.vertices[7].position,mamesh.vertices[8].position,
                mamesh.vertices[9].position];

            //Counter for unsuccessful attempts
            let attempts = 0;

            //Nb of generated chains  (=nb of operations)
            let chain = 0;


            let t = 0;

            let test = mamesh.vertices;
            let action = new mathis.PeriodicAction(function () {
                 //   let NOTfinished = true;

                    let max = 2;
                    let min = 0;
                //for (let y=0; y<chain; y++){
                //while (NOTfinished) {
                    t += 0.1;

                    // Choose randomly the end to delete:
                    let choice = Math.floor(Math.random() * (max - min)) + min;
                {
                    //delete head, go to tail
                    if (choice == 0) {

                        let x = test[test.length - 1].position.x;
                        let y = test[test.length - 1].position.y;
                        let z = test[test.length - 1].position.z;
                        let alea_x = Math.floor(Math.random() * (max - min)) + min;
                        let alea_y = Math.floor(Math.random() * (max - min)) + min;
                        let alea_z = Math.floor(Math.random() * (max - min)) + min;
                        cc('TAIL-xyz old:', x, y, z);
                        let xN = alea_x + x;
                        let yN = alea_y + y;
                        let zN = alea_z + z;
                        cc('TAIL-xyz new:', xN, yN, zN);
                        let coordinate: XYZ = new XYZ(xN, yN, zN);

                        if (!contains(ALLc, coordinate)) {
                            test.shift();
                            ALLc.shift();
                            let vertex = new mathis.Vertex();
                            vertex.position = coordinate;
                            test.push(vertex);
                            ALLc.push(coordinate);
                            chain++;
                        }


                        else {
                            cc('This one is already taken- go back!', coordinate);
                            attempts++;

                        }
                    }

                    //delete tail, go head
                    else {

                        let x = test[0].position.x;
                        let y = test[0].position.y;
                        let z = test[0].position.z;
                        let alea_x = Math.floor(Math.random() * (max - min)) + min;
                        let alea_y = Math.floor(Math.random() * (max - min)) + min;
                        let alea_z = Math.floor(Math.random() * (max - min)) + min;
                        cc('HEAD-xyz old:', x, y, z);
                        let xN = alea_x + x;
                        let yN = alea_y + y;
                        let zN = alea_z + z;
                        cc('HEAD xyz new:', xN, yN, zN);
                        let coordinate: XYZ = new XYZ(xN, yN, zN);
                        if (!contains(ALLc, coordinate)) {
                            let vertex = new mathis.Vertex();
                            test.pop();
                            ALLc.pop();
                            vertex.position = coordinate;
                            test.unshift(vertex);
                            ALLc.unshift(coordinate);
                            chain++;
                        }

                        else {
                            cc('This one is already taken- go back!', coordinate);
                            attempts++

                        }


                    }


                }
                    //NOTfinished = (chain < 10);
               // }

                    mamesh.vertices = test;


                    for (let i = 1; i < mamesh.vertices.length - 1; i++) {
                        mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
                    }

                    mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                    mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);


                    let linkViewer = new visu3d.LinksViewer(mamesh, mathisFrame.scene);
                    linkViewer.radiusAbsolute=0.01;
                    linkViewer.go();


                    let verticesViewer = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
                    verticesViewer.radiusAbsolute = 0.1;
                    verticesViewer.go();

                cc('t',t);




            });

            action.frameInterval = 5;
            action.nbTimesThisActionMustBeFired = 20;

           // mathisFrame.cleanAllPeriodicActions();
            mathisFrame.pushPeriodicAction(action);



            cc('atempts:',attempts);
            cc('How many chains are generated?:', chain);




        }
    }
}
