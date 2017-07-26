module mathis {
    export module polymer {
        export class SAW_Creator_static_Biased{
            chainSize = 10;

            constructor(){
            }

            private contains(points: XYZ[], onePoint: XYZ): boolean {
            for (let point of points) {
                if (geo.distance(point, onePoint) < 0.0001) {
                    return true
                }
            }
            return false
            }


            go():Mamesh {
                let start = new Date().getTime();
                cc('BIASED STATIC METHOD');

                let security = 10;
                let NOTfinished = true;
                let attempts = 0;
                let min = -1;
                let max = 2;


                let mamesh = new mathis.Mamesh();


                /**check if a raw belongs to a matrix*/



                    // allJumps stores all possibles steps in 3D on [-1;1]- 0,0,0 ; 0,1,1; -1,0,1; etc
                let allJumps: XYZ[] = [];
                let none: XYZ = new XYZ(0, 0, 0);
                allJumps.push(none);

                while (allJumps.length < 27) {

                    let alea1 = Math.floor(Math.random() * (max - min)) + min;
                    let alea2 = Math.floor(Math.random() * (max - min)) + min;
                    let alea3 = Math.floor(Math.random() * (max - min)) + min;

                    let coordinates: XYZ = new XYZ(alea1, alea2, alea3);

                    if (!this.contains(allJumps, coordinates)) {
                        allJumps.push(coordinates)
                    }


                }


                //cc('allJumps', allJumps)
                //cc('allJumps length', allJumps.length)

                //first vertex
                let x = 0;
                let y = 0;
                let z = 0;
                let origin: XYZ = new XYZ(x, y, z);

                //Updating mamesh.vertices
                let vertex0 = new mathis.Vertex();
                vertex0.position = origin;
                mamesh.vertices.push(vertex0);


                // validatedVertexes stores all the validated vertexes
                let validatedVertexes: XYZ[] = [];


                validatedVertexes[0] = new XYZ(x, y, z);
                cc('validatedVertexes[0]', validatedVertexes[0]);

                while (NOTfinished && attempts < security) {

                    for (let j = 1; j < this.chainSize - 1; j++) {

                        //First, we must sort allJumps and choose those, that will not lead to intersection
                        //We'll keep them in availableJumps
                        let availableJumps: XYZ[] = [];

                        for (let i = 0; i < allJumps.length; i++) {
                            //Get the last validated vertex  , check if this vertex is really new; if so - add to availableJumps

                            let testJump = new XYZ(validatedVertexes[j - 1].x + allJumps[i].x, validatedVertexes[j - 1].y + allJumps[i].y, validatedVertexes[j - 1].z + allJumps[i].z);

                            if (!this.contains(validatedVertexes, testJump)) {
                                availableJumps.push(allJumps[i]);
                            }

                            else {
                                cc('testJump=testJump.add(allJumps[i]) NOT OK', testJump);
                            }

                        }
                        cc('availableJumps', availableJumps);


                        //Now we have a list of available jumps at step i that won't lead to self intersection.
                        if (availableJumps.length > 0) {

                            let randomStep = availableJumps[Math.floor(Math.random() * availableJumps.length)];

                            cc('validatedVertexes[j-1]', validatedVertexes[j - 1]);
                            cc('randomStep', randomStep);


                            let newVertex = new XYZ(validatedVertexes[j - 1].x + randomStep.x, validatedVertexes[j - 1].y + randomStep.y, validatedVertexes[j - 1].z + randomStep.z);


                            validatedVertexes.push(newVertex);
                            let vertex = new mathis.Vertex();
                            vertex.position = newVertex;
                            mamesh.vertices.push(vertex);
                            cc('We add ', newVertex);

                            if (validatedVertexes.length > this.chainSize) {
                                break;
                            }


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

                    NOTfinished = (validatedVertexes.length < this.chainSize);


                }
                cc('validatedVertexes', validatedVertexes);
                cc('Attempts', attempts)


                for (let i = 1; i < mamesh.vertices.length - 1; i++) {
                    mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
                }
                mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);


                let end = new Date().getTime();
                cc('Execution Time in sec', (end-start)*1000)

                return mamesh
            }
        }
    }
}