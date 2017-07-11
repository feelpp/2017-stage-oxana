module mathis {
    export module polymer {
        export function vulca2D() {



            let mathisFrame = new mathis.MathisFrame();

            let mamesh = new mathis.Mamesh();
            let w1 = 12;
            let h1 = 20;
            let n = 5;
            let m = 5;



            //***********Type1 xxoo***************

            //Previous Monomer (not visible)  : v _ type 1 _ out

          //  let v_1_in = new mathis.Vertex().setPosition(1,3,0);

          //  mamesh.vertices.push(v_1_in);

            //C


            for (let j=0; j<n; j++) {

                let v_1_in = new mathis.Vertex().setPosition(1,3+ h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_in);

                for (let i = 0; i < m; i++) {


                    let v_1_C1 = new mathis.Vertex().setPosition(3 + w1 * i, 3 + h1 * j, 0); //DOUBLE
                    let v_1_C2 = new mathis.Vertex().setPosition(6 + w1 * i, 3 + h1 * j, 0); //DOUBLE
                    let v_1_C3 = new mathis.Vertex().setPosition(9 + w1 * i, 3 + h1 * j, 0);
                    let v_1_C4 = new mathis.Vertex().setPosition(12 + w1 * i, 3 + h1 * j, 0);

                    //H

                    let v_1_H1 = new mathis.Vertex().setPosition(3 + w1 * i, 1 + h1 * j, 0); //4
                    let v_1_H2 = new mathis.Vertex().setPosition(3 + w1 * i, 5 + h1 * j, 0);
                    let v_1_H3 = new mathis.Vertex().setPosition(6 + w1 * i, 1 + h1 * j, 0);
                    let v_1_H4 = new mathis.Vertex().setPosition(6 + w1 * i, 5 + h1 * j, 0);
                    let v_1_H5 = new mathis.Vertex().setPosition(9 + w1 * i, 5 + h1 * j, 0);
                    let v_1_H6 = new mathis.Vertex().setPosition(12 + w1 * i, 1 + h1 * j, 0);


                    mamesh.vertices.push(
                        v_1_C1, v_1_C2, v_1_C3, v_1_C4,
                        v_1_H1, v_1_H2, v_1_H3, v_1_H4, v_1_H5, v_1_H6
                    );



                }


              //  mamesh.vertices[4 + 10 * j].setTwoOppositeLinks(mamesh.vertices[3+ 10 * j], mamesh.vertices[11 + 10*j]);


                let v_1_out = new mathis.Vertex().setPosition(15 + w1*4, 3 + h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_out);
            }


            let x = 0;
            for (let k = 0; k<m; k++){
                mamesh.vertices[0+x].setOneLink(mamesh.vertices[x+1]);

                for (let j=0; j<n; j++) {

                    mamesh.vertices[x + 1 + 10 * j].setTwoOppositeLinks(mamesh.vertices[x + 5 + 10 * j], mamesh.vertices[x + 6 + 10 * j]);
                    mamesh.vertices[x + 2 + 10 * j].setTwoOppositeLinks(mamesh.vertices[x + 7 + 10 * j], mamesh.vertices[x + 8 + 10 * j]);
                    mamesh.vertices[x + 2 + 10 * j].setTwoOppositeLinks(mamesh.vertices[x + 1 + 10 * j], mamesh.vertices[x + 3 + 10 * j]);
                    mamesh.vertices[x + 3 + 10 * j].setTwoOppositeLinks(mamesh.vertices[x + 2 + 10 * j], mamesh.vertices[x + 4 + 10 * j]);
                    mamesh.vertices[x + 3 + 10 * j].setOneLink(mamesh.vertices[x + 9 + 10 * j]);
                    mamesh.vertices[x + 4 + 10 * j].setOneLink(mamesh.vertices[x + 10 + 10 * j]);
                    mamesh.vertices[x + 4 + 10 * j].setTwoOppositeLinks(mamesh.vertices[x + 3+ 10 * j], mamesh.vertices[x + 11 + 10*j]);

                }
                x = x+52;
            }




            let verticesViewerNon = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //Not visible
            verticesViewerNon.vertices = [mamesh.vertices[0],mamesh.vertices[51],mamesh.vertices[52],mamesh.vertices[103],
                mamesh.vertices[104],mamesh.vertices[155],mamesh.vertices[156],mamesh.vertices[207],mamesh.vertices[208],
                mamesh.vertices[259]];
            //verticesViewerNon.go();

            let xx = 0;
            let verticesViewerC = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //Carbone
            for (let i=0;i<n; i++){
                for (let j=0; j<5; j++){
                    verticesViewerC.vertices.push(mamesh.vertices[3+10*j+xx]);
                    verticesViewerC.vertices.push(mamesh.vertices[4+10*j+xx]);
                }
                xx = xx+52;
            }
            verticesViewerC.color = new mathis.Color(mathis.Color.names.green);
            verticesViewerC.go();

            let yy=0;
            let verticesViewerH = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene); //H
            for (let i=0;i<n; i++){
                for (let j=0; j<5; j++){
                    verticesViewerH.vertices.push(mamesh.vertices[5+10*j+yy], mamesh.vertices[6+10*j+yy],mamesh.vertices[7+10*j+yy],
                        mamesh.vertices[8+10*j+yy], mamesh.vertices[9+10*j+yy], mamesh.vertices[10+10*j+yy]);
                }
                yy = yy+52;
            }
            verticesViewerH.color = new mathis.Color(mathis.Color.names.blue);
            verticesViewerH.go();



            let linkViewer = new visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.go();



           /*

            //***********Type1 ooxx***************


            //Previous Monomer (not visible)  : v _ type 2 _ out

            let v_2_out = new mathis.Vertex().setPosition(1, 3, 0);

            //C

            let v_2_C1 = new mathis.Vertex().setPosition(3 + w2 * n, 3, 0);
            let v_2_C2 = new mathis.Vertex().setPosition(6 + w2 * n, 3, 0);
            let v_2_C3 = new mathis.Vertex().setPosition(9 + w2 * n, 3, 0);
            let v_2_C4 = new mathis.Vertex().setPosition(12 + w2 * n, 3, 0);

            //H

            let v_2_H1 = new mathis.Vertex().setPosition(3 + w2 * n, 5, 0);
            let v_2_H2 = new mathis.Vertex().setPosition(6 + w2 * n, 1, 0);
            let v_2_H3 = new mathis.Vertex().setPosition(9 + w2 * n, 1, 0);
            let v_2_H4 = new mathis.Vertex().setPosition(9 + w2 * n, 5, 0);
            let v_2_H5 = new mathis.Vertex().setPosition(12 + w2 * n, 1, 0);
            let v_2_H6 = new mathis.Vertex().setPosition(12 + w2 * n, 1, 0);

            mamesh.vertices.push(
                v_2_out,
                v_2_C1,v_2_C2,v_2_C3,v_2_C4,
                v_2_H1,v_2_H2,v_2_H3,v_2_H4,v_2_H5,v_1_H6
            );


            */






        }
    }
}