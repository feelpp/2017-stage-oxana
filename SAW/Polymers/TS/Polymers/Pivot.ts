module mathis {
    export module polymer {
        export function pivot() {

            let mathisFrame = new mathis.MathisFrame();
            let mamesh = new mathis.Mamesh();

            let mamesh2 = new mathis.Mamesh();

            //A given SAW
            let vertex0 = new mathis.Vertex().setPosition(0, 0, 0);  //0
            let vertex1 = new mathis.Vertex().setPosition(-1, 0, 1); //1
            let vertex2 = new mathis.Vertex().setPosition(0, 0, 1);  //2
            let vertex3 = new mathis.Vertex().setPosition(1, 0, 1);  //3
            let vertex4 = new mathis.Vertex().setPosition(1, 1, 0);  //4
            let vertex5 = new mathis.Vertex().setPosition(2, 2, 0);  //5
            let vertex6 = new mathis.Vertex().setPosition(2, 3, -1); //6
            let vertex7 = new mathis.Vertex().setPosition(3, 3, -2); //7
            let vertex8 = new mathis.Vertex().setPosition(3, 4, -3); //8
            let vertex9 = new mathis.Vertex().setPosition(3, 5, -2); //9


            mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9);


            // function that checks the list of used coordinates
            function contains(points: XYZ[], onePoint: XYZ) :boolean{
                for (let point of points){
                    if (geo.distance(point,onePoint)<0.0001) {
                        return true
                    }
                }
                return false
            }

            // function that replaces a value 1 at i by value 2
            function replaceValue(array: XYZ[], valueToReplace: XYZ, newValue: XYZ):void {
                for (let i = 0; i< array.length; i++) {
                    if (array[i] == valueToReplace) {
                        array[i]=newValue;
                    }
                }
            }


            // function that find index of a given value in a given array
            function findIndex (array: XYZ[], value: XYZ ): number{
                for (let i = 0; i< array.length; i++) {
                    if (array[i] == value) {
                        var res = i;
                    }
                }
                return res;
            }





            //All initial the coordinates are stocked in ALLc (XYZ)
            let ALLc: XYZ[] = [mamesh.vertices[0].position , mamesh.vertices[1].position,mamesh.vertices[2].position,
                mamesh.vertices[3].position,mamesh.vertices[4].position,mamesh.vertices[5].position,
                mamesh.vertices[6].position,mamesh.vertices[7].position,mamesh.vertices[8].position,
                mamesh.vertices[9].position];


            //Counter for unsuccessful attempts
            let attempts = 1;

            //Nb of chains generated (=nb of operations)
            let chain = 1;

            //pre-chain is not validated subchain (Let subchain length e equal to 4, so prechain becomes subchain when prechain = 4)
            let prechain = 0;


            let NOTfinished = true;

            // All modified coordinates are stored in ALLc_new
            let ALLc_new: XYZ[] = ALLc;

            while (NOTfinished) {

                let ALLc_prenew: XYZ[] = ALLc_new;

                // Choose a random vertex (by index) in ALLc
                let randomVertex = Math.floor(Math.random() * (ALLc_new.length-1 - 0)) + 0;
                cc('Random Vertex in ALLc_new', ALLc_new[randomVertex]);

                //Learn its index
                let indexOfVertex = ALLc_new.indexOf( ALLc_new[randomVertex] );
                let myIndex = findIndex(ALLc_new, ALLc_new[randomVertex]);
                cc('Index of the chosen vertex', indexOfVertex);
                //cc('MyIndex', myIndex);


                // Choose randomly one of 7 operations of refletion (over x,y,z,xy,xz,yz or xyz plane)
                let randomOperation = Math.floor(Math.random() * (7 - 0)) + 0;
                //let randomOperation= 0;
                cc('Chosen reflexion operation', randomOperation);

                // Choose randomly a subchain
                let subChain: XYZ [] = [];
                subChain =  ALLc_new;

                let randomSubChain = Math.floor(Math.random() * (2 - 0)) + 0;
                if (randomSubChain == 0) {
                    subChain=subChain.slice(0,myIndex+1);
                    cc('Chosen subChain: from head to random vertex ', subChain);

                }
                else{
                    subChain=subChain.slice(myIndex,ALLc_new.length);
                    cc('Chosen subChain:  from random vertex to tail ', subChain);
                }


                if (randomOperation == 0) {
                    for (let i = 0; i < subChain.length; i++) {
                        let x = mamesh.vertices[i].position.x;
                        let y = mamesh.vertices[i].position.y;
                        let z = mamesh.vertices[i].position.z;
                        let coordinateOld: XYZ = new XYZ(x, y, z);


                        let x_s = mamesh.vertices[randomVertex].position.x;
                        let x_n = x_s + ( x_s - x);

                        let coordinateNew: XYZ = new XYZ(x_n, y, z);
                        //cc('New x,y,z', x_n, y_n, z_n);

                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain=0;
                            //ALLc_new=ALLc;
                            break;
                        }


                    }
                    ALLc_new=ALLc_prenew;
                    chain= chain + prechain;
                    cc('Validated steps so far', chain);
                }

                else if (randomOperation == 1) {
                    for (let i = 0; i < subChain.length; i++) {
                        let x = mamesh.vertices[i].position.x;
                        let y = mamesh.vertices[i].position.y;
                        let z = mamesh.vertices[i].position.z;
                        let coordinateOld: XYZ = new XYZ(x, y, z);


                        let y_s = mamesh.vertices[randomVertex].position.y;
                        let y_n = y_s + (y_s - y);
                        let coordinateNew: XYZ = new XYZ(x, y_n, z);

                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain=0;
                            //ALLc_new=ALLc;
                            break;
                        }


                    }
                    ALLc_new=ALLc_prenew;
                    chain= chain + prechain;
                    cc('Validated steps so far', chain);
                }

                else if (randomOperation == 2) {
                    for (let i = 0; i < subChain.length; i++) {
                        let x = mamesh.vertices[i].position.x;
                        let y = mamesh.vertices[i].position.y;
                        let z = mamesh.vertices[i].position.z;
                        let coordinateOld: XYZ = new XYZ(x, y, z);


                        let z_s = mamesh.vertices[randomVertex].position.z;
                        let z_n = z_s + ( z_s - z);
                        let coordinateNew: XYZ = new XYZ(x, y, z_n);

                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain=0;
                            //ALLc_new=ALLc;
                            break;
                        }


                    }
                    ALLc_new=ALLc_prenew;
                    chain= chain + prechain;
                    cc('Validated steps so far', chain);
                }

                else if (randomOperation == 3) {
                    for (let i = 0; i < subChain.length; i++) {
                        let x = mamesh.vertices[i].position.x;
                        let y = mamesh.vertices[i].position.y;
                        let z = mamesh.vertices[i].position.z;
                        let coordinateOld: XYZ = new XYZ(x, y, z);


                        let x_s = mamesh.vertices[randomVertex].position.x;
                        let x_n = x_s + ( x_s - x);
                        let y_s = mamesh.vertices[randomVertex].position.y;
                        let y_n = y_s + (y_s - y);
                        let coordinateNew: XYZ = new XYZ(x_n, y_n, z);

                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain=0;
                            //ALLc_new=ALLc;
                            break;
                        }


                    }
                    ALLc_new=ALLc_prenew;
                    chain= chain + prechain;
                    cc('Validated steps so far', chain);
                }

                else if (randomOperation == 4) {
                    for (let i = 0; i < subChain.length; i++) {
                        let x = mamesh.vertices[i].position.x;
                        let y = mamesh.vertices[i].position.y;
                        let z = mamesh.vertices[i].position.z;
                        let coordinateOld: XYZ = new XYZ(x, y, z);

                        let x_s = mamesh.vertices[randomVertex].position.x;
                        let x_n = x_s + ( x_s - x);
                        let z_s = mamesh.vertices[randomVertex].position.z;
                        let z_n = z_s + ( z_s - z);
                        let coordinateNew: XYZ = new XYZ(x_n, y, z_n);

                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain=0;
                            //ALLc_new=ALLc;
                            break;
                        }


                    }
                    ALLc_new=ALLc_prenew;
                    chain= chain + prechain;
                    cc('Validated steps so far', chain);
                }

                else if (randomOperation == 5) {
                    for (let i = 0; i < subChain.length; i++) {
                        let x = mamesh.vertices[i].position.x;
                        let y = mamesh.vertices[i].position.y;
                        let z = mamesh.vertices[i].position.z;
                        let coordinateOld: XYZ = new XYZ(x, y, z);


                        let y_s = mamesh.vertices[randomVertex].position.y;
                        let y_n = y_s + (y_s - y);
                        let z_s = mamesh.vertices[randomVertex].position.z;
                        let z_n = z_s + ( z_s - z);
                        let coordinateNew: XYZ = new XYZ(x, y_n, z_n);

                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain=0;
                            //ALLc_new=ALLc;
                            break;
                        }


                    }
                    ALLc_new=ALLc_prenew;
                    chain= chain + prechain;
                    cc('Validated steps so far', chain);

                }

                else if (randomOperation == 6) {
                    for (let i = 0; i < subChain.length; i++) {
                        let x = mamesh.vertices[i].position.x;
                        let y = mamesh.vertices[i].position.y;
                        let z = mamesh.vertices[i].position.z;
                        let coordinateOld: XYZ = new XYZ(x, y, z);
                        //cc('Old x,y,z', x, y, z);


                        let x_s = mamesh.vertices[randomVertex].position.x;
                        let x_n = x_s + ( x_s - x);
                        let y_s = mamesh.vertices[randomVertex].position.y;
                        let y_n = y_s + (y_s - y);
                        let z_s = mamesh.vertices[randomVertex].position.z;
                        let z_n = z_s + ( z_s - z);
                        let coordinateNew: XYZ = new XYZ(x_n, y_n, z_n);
                        //cc('New x,y,z', x_n, y_n, z_n);

                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain=0;
                            //ALLc_new=ALLc;
                            break;
                        }


                    }
                    ALLc_new=ALLc_prenew;
                    chain= chain + prechain;
                    cc('How many chains are generated?:', chain);
                }

                NOTfinished = (chain < 2);
            }
            cc('Chain is done!:', ALLc_new);
            cc('Attempts:',attempts);





            for (let i=0; i < ALLc_new.length; i++){
                let vertex = new mathis.Vertex();
                vertex.position = ALLc_new[i];
                mamesh2.vertices.push(vertex);
            }

            let verticesViewer2 = new mathis.visu3d.VerticesViewer(mamesh2, mathisFrame.scene);
            verticesViewer2.radiusAbsolute = 0.3;
            verticesViewer2.go();

            for (let i = 1; i < mamesh2.vertices.length - 1; i++) {
                mamesh2.vertices[i].setTwoOppositeLinks(mamesh2.vertices[i - 1], mamesh2.vertices[i + 1]);
            }

            mamesh2.vertices[0].setOneLink(mamesh2.vertices[1]);
            mamesh2.vertices[mamesh2.vertices.length - 1].setOneLink(mamesh2.vertices[mamesh2.vertices.length - 2]);

            let linkViewer2 = new visu3d.LinksViewer(mamesh2, mathisFrame.scene);
            linkViewer2.radiusAbsolute=0.01;
            linkViewer2.go();


            for (let i = 1; i < mamesh.vertices.length - 1; i++) {
                mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
            }

            mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
            mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);


            let linkViewer = new visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.color=new mathis.Color(mathis.Color.names.yellow);
            linkViewer.radiusAbsolute=0.01;
            linkViewer.go();


            let verticesViewer = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            verticesViewer.color = new mathis.Color(mathis.Color.names.blueviolet);
            verticesViewer.radiusAbsolute = 0.1;
            verticesViewer.go();




        }
    }
}
