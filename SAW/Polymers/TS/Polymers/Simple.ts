module mathis {
    export module polymer {
        export function static1() {

            var mathisFrame = new mathis.MathisFrame();
            var interpolationStyle = geometry.InterpolationStyle.none;
            var chainSize = 10;
            var dims = 3;
            var mamesh = new mathis.Mamesh();


            //
            // for (var i = 0; i < dims; i++) {
            //     ALLcoordinates[i] = [];
            //     for (var j = 0; j < chainSize; j++) {
            //         ALLcoordinates[i][j] = 0;
            //     }
            // }


            /**check if a raw belongs to a matrix*/
            function contains(points: XYZ[], onePoint: XYZ) :boolean{
                for (let point of points){
                    if (geo.distance(point,onePoint)<0.0001) {
                        return true
                    }
                }
                return false
            }


            var min = -1;
            var max = 2;
            var security=100;
            var NOTfinished = true;
            var attempts = 0;


            while (NOTfinished && attempts<security){
                var x = 0;
                var y = 0;
                var z = 0;

                var ALLcoordinates: XYZ[]=[];
                ALLcoordinates[0]=new XYZ(x,y,z);

                for (var i = 1; i < chainSize; i++) {

                    let alea1 = Math.floor(Math.random() * (max - min)) + min;
                    let alea2 = Math.floor(Math.random() * (max - min)) + min;
                    let alea3 = Math.floor(Math.random() * (max - min)) + min;

                    cc('aleas:', alea1,alea2,alea3);
                    x=alea1+x;
                    y=alea2+y;
                    z=alea3+z;
                    //initialisation?
                    var coordinates : XYZ = new XYZ(x,y,z);
                    cc('coordinates',coordinates);

                    if (!contains(ALLcoordinates, coordinates) ) {
                        var vertex = new mathis.Vertex();
                        vertex.position=coordinates;
                        ALLcoordinates.push(coordinates);
                        mamesh.vertices.push(vertex);
                    }

                    else {
                        cc('This one is already taken!', coordinates);
                        attempts++;
                        while (mamesh.vertices.length > 0 ) {
                            mamesh.vertices.pop();
                        }

                        break;
                    }
                }

                NOTfinished=(ALLcoordinates.length<chainSize);
            }

            if (attempts==security) {
                mathisFrame.messageDiv.append("Chain IS NOT FINISHED)");
                logger.c('CHAIN IS NOT FINISHED');
            }



            for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
            }
            mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
            mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);


            console.log(mamesh.toString());
            cc('ALLcoordinates',ALLcoordinates);

            mathisFrame.messageDiv.append("Chain size:" + chainSize);
            mathisFrame.messageDiv.append("Attempts before success:" + (attempts));





            /*
                         var distances = new mathis.graph.DistancesBetweenAllVertices(mamesh.vertices);
                         distances.go();
                         mathisFrame.messageDiv.append("Chain size:" + chainSize);
                         mathisFrame.messageDiv.append("Nb vertexes:" + mamesh.vertices.length);

                        //distance en pas
                         mathisFrame.messageDiv.append("distance between origin and end(steps):" + distances.OUT_distance(mamesh.vertices[0], mamesh.vertices[mamesh.vertices.length - 1]));
                         //distance absolut
                         mathisFrame.messageDiv.append("distance between origin and end(real):" + (geo.distance(mamesh.vertices[mamesh.vertices.length - 1].position, mamesh.vertices[0].position)));


                         mathisFrame.messageDiv.append("Attempts before success:" + (attempts));
                         //mathisFrame.messageDiv.append("Coordinates :"+(ALLcoordinates[i]) );
            */


            let linkViewer =new visu3d.LinksViewer(mamesh,mathisFrame.scene);
            linkViewer.color = new mathis.Color(mathis.Color.names.silver);
            linkViewer.go();

            //let vertexViewer=new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            //vertexViewer.go();

            cc('Attempts before success:',attempts);

               //first vertex
             var verticesViewer0 = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene);
             verticesViewer0.vertices = [mamesh.vertices[0]];
             verticesViewer0.color = new mathis.Color(mathis.Color.names.blueviolet);
             verticesViewer0.go();

             //others
             var verticesViewer1 = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene);
//             verticesViewer1.vertices = [];
             verticesViewer1.go();

        }
    }
}