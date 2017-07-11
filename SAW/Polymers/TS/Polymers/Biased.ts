module mathis {
    export module polymer {
        export function static2() {

            let mathisFrame = new mathis.MathisFrame();
            let interpolationStyle = geometry.InterpolationStyle.none;
            let chainSize = 10;
            let mamesh = new mathis.Mamesh();


            /**check if a raw belongs to a matrix*/
            function contains(points: XYZ[], onePoint: XYZ): boolean {
                for (let point of points) {
                    if (geo.distance(point, onePoint) < 0.0001) {
                        return true
                    }
                }
                return false
            }


            let security = 100;
            let NOTfinished = true;
            let attempts = 0;


            // allJumps stores all possibles steps in 3D on [-1;1]- 0,0,0 ; 0,1,1; -1,0,1; etc
            let allJumps: XYZ[] = [];
            let none: XYZ = new XYZ(0, 0, 0);
            allJumps.push(none);

            for (let i = -1; i < 2; i = i + 2) {
                let coordinatesA: XYZ = new XYZ(i, i, i);
                let coordinatesB: XYZ = new XYZ(i, i, 0);
                let coordinatesC: XYZ = new XYZ(i, 0, i);
                let coordinatesD: XYZ = new XYZ(0, i, i);
                let coordinatesF: XYZ = new XYZ(i, 0, 0);
                let coordinatesG: XYZ = new XYZ(0, i, 0);
                let coordinatesH: XYZ = new XYZ(0, 0, i);


                allJumps.push(coordinatesA);
                allJumps.push(coordinatesB);
                allJumps.push(coordinatesC);
                allJumps.push(coordinatesD);
                allJumps.push(coordinatesF);
                allJumps.push(coordinatesG);
                allJumps.push(coordinatesH);
            }

            cc('allJumps', allJumps)
            cc('allJumps length', allJumps.length)


            while (NOTfinished && attempts < security) {

                //first vertex
                let x = 0;
                let y = 0;
                let z = 0;
                let coordinates0 : XYZ = new XYZ(x,y,z);


                // validatedVertexes stores all the validated vertexes
                var validatedVertexes: XYZ[] = [];

                //Updating mamesh.vertices
                let vertex0 = new mathis.Vertex();
                vertex0.position=coordinates0;
                mamesh.vertices.push(vertex0);




                for (let j = 1; j < chainSize; j++) {
                    validatedVertexes[0] = new XYZ(x, y, z);
                    //First, we must sort allJumps and choose those, that will not lead to intersection
                    //We'll keep them in availableJumps
                    let availableJumps: XYZ[] = [];

                    for (let i = 0; i < allJumps.length-1; i++) {
                        //Get the last validated vertex
                        let testJump = validatedVertexes[j - 1];
                        cc('validatedVertexes', validatedVertexes[j - 1])

                        cc('testJump', testJump)

                        //and jump in any direction (taken from allJumps) to a new potential vertex
                        testJump=testJump.add(allJumps[i]);
                        cc('testJump After', testJump)

                        //Check if this vertex is really new; if so - add to availableJumps
                        if (!contains(validatedVertexes, testJump)) {
                            availableJumps.push(testJump);
                        }

                    }
                    cc('availableJumps', availableJumps)



                    //Now we have a list of available jumps at step i that won't lead to self intersection.
                    if (availableJumps.length > 0) {

                            let newVertex = mamesh.vertices[mamesh.vertices.length - 1].position;
                            let randomStep = availableJumps[Math.floor(Math.random() * availableJumps.length)];
                            cc('randomStep', randomStep)
                            newVertex.add(randomStep);

                            validatedVertexes.push(newVertex);
                            let vertex = new mathis.Vertex();
                            vertex.position = newVertex;
                            mamesh.vertices.push(vertex);


                    }
                        //So if availableJumps is empty, then any jump will give intersection => Start over!
                    else {
                            attempts++;
                            cc('Cul de sac!');

                            while (mamesh.vertices.length > 0) {
                                mamesh.vertices.pop();
                            }
                            break
                    }

                }

                NOTfinished=(validatedVertexes.length<chainSize);


            }
            cc('validatedVertexes', validatedVertexes)
            cc('Attempts', attempts)


/*
            for (let i=0; i < ALLcoordinates.length; i++){
                let vertex = new mathis.Vertex();
                vertex.position = ALLcoordinates[i];
                mamesh.vertices.push(vertex);
            }


            for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
            }
            mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
            mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);


            let linkViewer =new visu3d.LinksViewer(mamesh,mathisFrame.scene);
           // linkViewer.go();

            var verticesViewer = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene);
           // verticesViewer.go();
*/



        }
    }
}