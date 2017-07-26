module mathis {


    export module display {
        import GrabberCamera = mathis.macamera.GrabberCamera;

        export function show() {



            let mathisFrame = new mathis.MathisFrame();
            let mamesh = new mathis.Mamesh();
            let y = 10;
            let x=14;
            let camera:GrabberCamera=mathisFrame.getGrabberCamera()
            //camera.setFreeDisplacementMode()
            camera.changePosition(new XYZ(0,0,-20))


            //bottom

            let vertexH0 = new mathis.Vertex().setPosition(2,1,0); //0
            let vertexH1 = new mathis.Vertex().setPosition(2,3,0); //1
            let vertexH2 = new mathis.Vertex().setPosition(4,5,0); //2
            let vertexH3 = new mathis.Vertex().setPosition(12,1,0); //3
            let vertexH4 = new mathis.Vertex().setPosition(12,3,0); //4
            let vertexH5 = new mathis.Vertex().setPosition(10,5,0); //5
            let vertexC0 = new mathis.Vertex().setPosition(3,2,0);  //6
            let vertexC1 = new mathis.Vertex().setPosition(11,2,0); //7
            let vertexC2 = new mathis.Vertex().setPosition(5,4,0); //8
            let vertexC3 = new mathis.Vertex().setPosition(9,4,0); //9
            let vertexOUT1 = new mathis.Vertex().setPosition(0,2,0); //10
            let vertexH0i = new mathis.Vertex().setPosition(2+x,1,0); //11
            let vertexH1i = new mathis.Vertex().setPosition(2+x,3,0); //12
            let vertexH2i = new mathis.Vertex().setPosition(4+x,5,0); //13
            let vertexH3i = new mathis.Vertex().setPosition(12+x,1,0); //14
            let vertexH4i = new mathis.Vertex().setPosition(12+x,3,0); //15
            let vertexH5i = new mathis.Vertex().setPosition(10+x,5,0); //16
            let vertexC0i = new mathis.Vertex().setPosition(3+x,2,0); //17
            let vertexC1i = new mathis.Vertex().setPosition(11+x,2,0); //18
            let vertexC2i = new mathis.Vertex().setPosition(5+x,4,0); //19
            let vertexC3i = new mathis.Vertex().setPosition(9+x,4,0); //20
            let vertexOUT2 = new mathis.Vertex().setPosition(14+x,2,0); //21


            //top

            let vertex2H0 = new mathis.Vertex().setPosition(2,1+y,0); //22
            let vertex2H1 = new mathis.Vertex().setPosition(2,3+y,0); //23
            let vertex2H2 = new mathis.Vertex().setPosition(4,5+y,0); //24
            let vertex2H3 = new mathis.Vertex().setPosition(12,1+y,0); //25
            let vertex2H4 = new mathis.Vertex().setPosition(12,3+y,0); //26
            let vertex2H5 = new mathis.Vertex().setPosition(10,5+y,0); //27
            let vertex2C0 = new mathis.Vertex().setPosition(3,2+y,0);  //28
            let vertex2C1 = new mathis.Vertex().setPosition(11,2+y,0); //29
            let vertex2C2 = new mathis.Vertex().setPosition(5,4+y,0);  //30
            let vertex2C3 = new mathis.Vertex().setPosition(9,4+y,0); //31
            let vertex2OUT1 = new mathis.Vertex().setPosition(0,2+y,0); //32
            let vertex2H0i = new mathis.Vertex().setPosition(2+x,1+y,0); //33
            let vertex2H1i = new mathis.Vertex().setPosition(2+x,3+y,0); //34
            let vertex2H2i = new mathis.Vertex().setPosition(4+x,5+y,0); //35
            let vertex2H3i = new mathis.Vertex().setPosition(12+x,1+y,0); //36
            let vertex2H4i = new mathis.Vertex().setPosition(12+x,3+y,0); //37
            let vertex2H5i = new mathis.Vertex().setPosition(10+x,5+y,0); //38
            let vertex2C0i = new mathis.Vertex().setPosition(3+x,2+y,0); //39
            let vertex2C1i = new mathis.Vertex().setPosition(11+x,2+y,0); //40
            let vertex2C2i = new mathis.Vertex().setPosition(5+x,4+y,0); //41
            let vertex2C3i = new mathis.Vertex().setPosition(9+x,4+y,0); //42
            let vertex2OUT2 = new mathis.Vertex().setPosition(14+x,2+y,0); //43

            //soufre
/*
            let s1 =  new mathis.Vertex().setPosition(5,7,0); //44
            let s2 =  new mathis.Vertex().setPosition(5,11,0); //45
            let s3 =  new mathis.Vertex().setPosition(19,9,0); //46
            let s11 =  new mathis.Vertex().setPosition(9,1,0); //47
            let s22 =  new mathis.Vertex().setPosition(9,17,0); //48
            let s33 =  new mathis.Vertex().setPosition(19,1,0); //49
            let s44 =  new mathis.Vertex().setPosition(23,17,0); //50
*/
/*
            var v1 = new mathis.Vertex().setPosition(2,1,0); //0
            var v2= new mathis.Vertex().setPosition(2,3,0); //1
            var v3 = new mathis.Vertex().setPosition(4,5,0); //2
            var v4 = new mathis.Vertex().setPosition(12,1,0); //3
            var v5 = new mathis.Vertex().setPosition(12,3,0); //4
            var v6 = new mathis.Vertex().setPosition(10,5,0); //5
            var v7 = new mathis.Vertex().setPosition(3,2,0);  //6
            var v8 = new mathis.Vertex().setPosition(11,2,0); //7
            var v9 = new mathis.Vertex().setPosition(5,4,0); //8
            var v10 = new mathis.Vertex().setPosition(9,4,0); //9

*/
            mamesh.vertices.push(
               vertexH0,vertexH1,vertexH2,vertexH3,vertexH4,vertexH5,vertexC0,vertexC1,vertexC2,vertexC3, vertexOUT1,
               vertexH0i,vertexH1i,vertexH2i,vertexH3i,vertexH4i,vertexH5i,vertexC0i,vertexC1i,vertexC2i,vertexC3i, vertexOUT2,
               vertex2H0,vertex2H1,vertex2H2,vertex2H3,vertex2H4,vertex2H5,vertex2C0,vertex2C1,vertex2C2,vertex2C3, vertex2OUT1,
               vertex2H0i,vertex2H1i,vertex2H2i,vertex2H3i,vertex2H4i,vertex2H5i,vertex2C0i,vertex2C1i,vertex2C2i,vertex2C3i, vertex2OUT2,
              //  s1,s2,s3,s11,s22,s33,s44);
            );
                //mamesh.vertices.push(v1,v2,v3,v4,v5,v6,v7,v8,v9,v10);


            // pour Carbone

            mamesh.vertices[0].setOneLink(mamesh.vertices[6]);
            mamesh.vertices[1].setOneLink(mamesh.vertices[6]);
            mamesh.vertices[6].setTwoOppositeLinks(mamesh.vertices[0],mamesh.vertices[8]);
            mamesh.vertices[2].setOneLink(mamesh.vertices[8]);
            mamesh.vertices[8].setTwoOppositeLinks(mamesh.vertices[6],mamesh.vertices[9]);
            mamesh.vertices[9].setOneLink(mamesh.vertices[5]);
            mamesh.vertices[7].setTwoOppositeLinks(mamesh.vertices[9],mamesh.vertices[3]);
            mamesh.vertices[7].setOneLink(mamesh.vertices[4]);
            mamesh.vertices[7].setOneLink(mamesh.vertices[3]);
            mamesh.vertices[10].setOneLink(mamesh.vertices[6]);


            let a =11;
            mamesh.vertices[7].setOneLink(mamesh.vertices[6+a]);

            mamesh.vertices[0+a].setOneLink(mamesh.vertices[6+a]);
            mamesh.vertices[1+a].setOneLink(mamesh.vertices[6+a]);
            mamesh.vertices[6+a].setTwoOppositeLinks(mamesh.vertices[0+a],mamesh.vertices[8+a]);
            mamesh.vertices[2+a].setOneLink(mamesh.vertices[8+a]);
            mamesh.vertices[8+a].setTwoOppositeLinks(mamesh.vertices[6+a],mamesh.vertices[9+a]);
            mamesh.vertices[9+a].setOneLink(mamesh.vertices[5+a]);
            mamesh.vertices[7+a].setTwoOppositeLinks(mamesh.vertices[9+a],mamesh.vertices[3+a]);
            mamesh.vertices[7+a].setOneLink(mamesh.vertices[4+a]);
            mamesh.vertices[7+a].setOneLink(mamesh.vertices[3+a]);
            mamesh.vertices[10+a].setOneLink(mamesh.vertices[7+a]);


            a = 22;

            mamesh.vertices[0+a].setOneLink(mamesh.vertices[6+a]);
            mamesh.vertices[1+a].setOneLink(mamesh.vertices[6+a]);
            mamesh.vertices[6+a].setTwoOppositeLinks(mamesh.vertices[0+a],mamesh.vertices[8+a]);
            mamesh.vertices[2+a].setOneLink(mamesh.vertices[8+a]);
            mamesh.vertices[8+a].setTwoOppositeLinks(mamesh.vertices[6+a],mamesh.vertices[9+a]);
            mamesh.vertices[9+a].setOneLink(mamesh.vertices[5+a]);
            mamesh.vertices[7+a].setTwoOppositeLinks(mamesh.vertices[9+a],mamesh.vertices[3+a]);
            mamesh.vertices[7+a].setOneLink(mamesh.vertices[4+a]);
            mamesh.vertices[7+a].setOneLink(mamesh.vertices[3+a]);
            mamesh.vertices[10+a].setOneLink(mamesh.vertices[6+a]);



            a = 33;
            mamesh.vertices[7+22].setOneLink(mamesh.vertices[6+a]);

            mamesh.vertices[0+a].setOneLink(mamesh.vertices[6+a]);
            mamesh.vertices[1+a].setOneLink(mamesh.vertices[6+a]);
            mamesh.vertices[6+a].setTwoOppositeLinks(mamesh.vertices[0+a],mamesh.vertices[8+a]);
            mamesh.vertices[2+a].setOneLink(mamesh.vertices[8+a]);
            mamesh.vertices[8+a].setTwoOppositeLinks(mamesh.vertices[6+a],mamesh.vertices[9+a]);
            mamesh.vertices[9+a].setOneLink(mamesh.vertices[5+a]);
            mamesh.vertices[7+a].setTwoOppositeLinks(mamesh.vertices[9+a],mamesh.vertices[3+a]);
            mamesh.vertices[7+a].setOneLink(mamesh.vertices[4+a]);
            mamesh.vertices[7+a].setOneLink(mamesh.vertices[3+a]);
            mamesh.vertices[10+a].setOneLink(mamesh.vertices[7+a]);

            //pour Soufre
/*
            mamesh.vertices[44].setTwoOppositeLinks(mamesh.vertices[8],mamesh.vertices[45]);
            mamesh.vertices[45].setTwoOppositeLinks(mamesh.vertices[44],mamesh.vertices[30]);
            mamesh.vertices[46].setTwoOppositeLinks(mamesh.vertices[19],mamesh.vertices[42]);
            mamesh.vertices[47].setOneLink(mamesh.vertices[9]);
            mamesh.vertices[48].setOneLink(mamesh.vertices[31]);
            mamesh.vertices[49].setOneLink(mamesh.vertices[20]);
            mamesh.vertices[50].setOneLink(mamesh.vertices[41]);  */

            /*
             let verticesViewer2 = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //C
             verticesViewer2.vertices= [mamesh.vertices[6], mamesh.vertices[7], mamesh.vertices[8], mamesh.vertices[9]]
             verticesViewer2.color = new mathis.Color(mathis.Color.names.red);
             verticesViewer2.radiusAbsolute = 1;
             verticesViewer2.go();
             */

            let verticesViewer2 = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //C
            verticesViewer2.vertices= [
                mamesh.vertices[6], mamesh.vertices[7], mamesh.vertices[8], mamesh.vertices[9],
                mamesh.vertices[6+11], mamesh.vertices[7+11], mamesh.vertices[8+11], mamesh.vertices[9+11],
                mamesh.vertices[6+22], mamesh.vertices[7+22], mamesh.vertices[8+22], mamesh.vertices[9+22],
                mamesh.vertices[6+33], mamesh.vertices[7+33], mamesh.vertices[8+33], mamesh.vertices[9+33]];
            verticesViewer2.color = new mathis.Color(mathis.Color.names.red);
            verticesViewer2.radiusAbsolute = 1;
            verticesViewer2.go();

            let verticesViewer = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //H
            verticesViewer.vertices= [
                mamesh.vertices[0], mamesh.vertices[1], mamesh.vertices[2], mamesh.vertices[3], mamesh.vertices[4],mamesh.vertices[5],
                mamesh.vertices[0+11], mamesh.vertices[1+11], mamesh.vertices[2+11], mamesh.vertices[3+11], mamesh.vertices[4+11],mamesh.vertices[5+11],
                mamesh.vertices[0+22], mamesh.vertices[1+22], mamesh.vertices[2+22], mamesh.vertices[3+22], mamesh.vertices[4+22],mamesh.vertices[5+22],
                mamesh.vertices[0+33], mamesh.vertices[1+33], mamesh.vertices[2+33], mamesh.vertices[3+33], mamesh.vertices[4+33],mamesh.vertices[5+33]];
            verticesViewer.radiusAbsolute = 0.6;
            verticesViewer.color = new mathis.Color(mathis.Color.names.blue);
            verticesViewer.go();

/*            let verticesViewerS = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //S visible
            verticesViewerS.vertices= [mamesh.vertices[44],mamesh.vertices[45], mamesh.vertices[46]];
            verticesViewerS.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewerS.radiusAbsolute = 0.8;
            verticesViewerS.go();
*/
            let verticesViewerS2 = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //S non visible
            verticesViewerS2.vertices= [mamesh.vertices[47], mamesh.vertices[48], mamesh.vertices[49], mamesh.vertices[50]];
            verticesViewerS2.color = new mathis.Color(mathis.Color.names.yellow);
            //verticesViewerS.go();


            let verticesViewer1 = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //Prochain monomère non visible
            verticesViewer1.vertices= [mamesh.vertices[10],mamesh.vertices[21], mamesh.vertices[32], mamesh.vertices[43]];
            verticesViewer1.color = new mathis.Color(mathis.Color.names.black);
            //verticesViewer1.go();


            function contains(oneVertex: Vertex, listOfVertexes: Vertex[]){
                for (let v of listOfVertexes){
                    if (geo.distance(v.position,oneVertex.position)<0.0001) {
                        return true
                    }
                }
                return false
            }


/*
            let verticesViewer = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //H
            verticesViewer.vertices= [mamesh.vertices[0], mamesh.vertices[1], mamesh.vertices[2], mamesh.vertices[3], mamesh.vertices[4],mamesh.vertices[5]];
            verticesViewer.radiusAbsolute = 0.6;
            verticesViewer.color = new mathis.Color(mathis.Color.names.blue);
            verticesViewer.go();
*/

            let linkViewer =new visu3d.LinksViewer(mamesh,mathisFrame.scene);


            let model;
            let model1 = BABYLON.Mesh.CreateCylinder("", 1,1,1,12,12,mathisFrame.scene);
            model1.position.x +=1.5;
            model1.bakeCurrentTransformIntoVertices();
            let model2 = BABYLON.Mesh.CreateCylinder("", 1,1,1,12,12,mathisFrame.scene);
            model2.position.x -=1.5;
            model2.bakeCurrentTransformIntoVertices();
            model = BABYLON.Mesh.MergeMeshes([model1, model2]);


            linkViewer.meshModel= model;
            linkViewer.color = new mathis.Color(mathis.Color.names.blue);

            let segmentOrientationFunction;

            linkViewer.color = new mathis.Color(mathis.Color.names.blue);
            var material = new BABYLON.StandardMaterial("", mathisFrame.scene);
            material.diffuseColor = new BABYLON.Color3(0, 0, 0);
            model.material = material;


            let doubles: Vertex[]= [];
            doubles=[mamesh.vertices[8],mamesh.vertices[9],mamesh.vertices[19],mamesh.vertices[20], mamesh.vertices[30],mamesh.vertices[31],mamesh.vertices[41],mamesh.vertices[42]];


            segmentOrientationFunction =  (v1:Vertex, v2: Vertex)=> {

                if ((!contains(v1, doubles)) || (!(contains(v2, doubles))))   {
                    return 0;
                }

                else {
                    return 1;
                }

            };

            linkViewer.segmentOrientationFunction = segmentOrientationFunction;
            linkViewer.go();




            let linkViewer1 =new visu3d.LinksViewer(mamesh,mathisFrame.scene);



            segmentOrientationFunction =  (v1:Vertex, v2: Vertex)=> {

                if ((contains(v1, doubles)) && ((contains(v2, doubles))))  {

                    return 0;
                }

                else {

                    return 1;
                }

            };

            linkViewer1.segmentOrientationFunction = segmentOrientationFunction;
            linkViewer1.color = new mathis.Color(mathis.Color.names.black);
            linkViewer1.go();


        }
    }
}