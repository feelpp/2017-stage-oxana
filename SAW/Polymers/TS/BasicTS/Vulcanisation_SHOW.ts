module mathis {
    export module polymer {
        import GrabberCamera = mathis.macamera.GrabberCamera;
        export function vulca2D() {



            let mathisFrame = new mathis.MathisFrame();
            let camera:GrabberCamera=mathisFrame.getGrabberCamera()
            camera.setFreeDisplacementMode()
            camera.changePosition(new XYZ(0,0,-100))


            let mamesh = new mathis.Mamesh();
            let w1 = 12;
            let h1 = 20;
            let n = 5;
            let m = 5;



            //***********Type1 xxoo***************



            for (let j=0; j<n; j++) {

                let v_1_in = new mathis.Vertex().setPosition(1,3+ h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_in);

                for (let i = 0; i < m; i++) {


                    let v_1_C1 = new mathis.Vertex().setPosition(3 + w1 * i, 3 + h1 * j, 0); //DOUBLE
                    let v_1_C2 = new mathis.Vertex().setPosition(6 + w1 * i, 3 + h1 * j, 0); //DOUBLE
                    let v_1_C3 = new mathis.Vertex().setPosition(9 + w1 * i, 3 + h1 * j, 0);
                    let v_1_C4 = new mathis.Vertex().setPosition(12 + w1 * i, 3 + h1 * j, 0);

                    //H

                    let v_1_H1 = new mathis.Vertex().setPosition(3 + w1 * i, 2 + h1 * j, 0); //4
                    let v_1_H2 = new mathis.Vertex().setPosition(3 + w1 * i, 4 + h1 * j, 0);
                    let v_1_H3 = new mathis.Vertex().setPosition(6 + w1 * i, 2 + h1 * j, 0);
                    let v_1_H4 = new mathis.Vertex().setPosition(6 + w1 * i, 4 + h1 * j, 0);
                    let v_1_H5 = new mathis.Vertex().setPosition(9 + w1 * i, 4 + h1 * j, 0);
                    let v_1_H6 = new mathis.Vertex().setPosition(12 + w1 * i, 2 + h1 * j, 0);


                    mamesh.vertices.push(
                        v_1_C1, v_1_C2, v_1_C3, v_1_C4,
                        v_1_H1, v_1_H2, v_1_H3, v_1_H4, v_1_H5, v_1_H6
                    );



                }



                let v_1_out = new mathis.Vertex().setPosition(15 + w1*4, 3 + h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_out);
            }



            //Soufre vertices:

            //nonVisible
            let sN1 = new mathis.Vertex().setPosition(10, -1, 0);
            let sN2 = new mathis.Vertex().setPosition(26, -1, 0);
            let sN3 = new mathis.Vertex().setPosition(35, -1, 0);
            let sN4 = new mathis.Vertex().setPosition(48, -1, 0);
            let sN5 = new mathis.Vertex().setPosition(50, -1, 0);


            //reseaux level 1

            //265-267

            let s3_66_a = new mathis.Vertex().setPosition(15, 7, 0);
            let s3_66_b = new mathis.Vertex().setPosition(18, 10, 0);
            let s3_66_c = new mathis.Vertex().setPosition(20, 15, 0);


            //268-273
            let s13_55_a = new mathis.Vertex().setPosition(19, 7, 0);
            let s13_55_b = new mathis.Vertex().setPosition(17, 10, 0);
            let s13_55_c = new mathis.Vertex().setPosition(13, 12, 0);
            let s13_55_d = new mathis.Vertex().setPosition(11, 15, 0);
            let s13_55_f = new mathis.Vertex().setPosition(10, 16, 0);
            let s13_55_g = new mathis.Vertex().setPosition(9, 18, 0);

            //274-277
            let s24_76_a = new mathis.Vertex().setPosition(36, 7, 0);
            let s24_76_b = new mathis.Vertex().setPosition(36, 10, 0);
            let s24_76_c = new mathis.Vertex().setPosition(36, 15, 0);
            let s24_76_d = new mathis.Vertex().setPosition(36, 18, 0);


            //278
            let s43_96_a = new mathis.Vertex().setPosition(59, 14, 0);

            //reseaux level 2

            //279-281
            let s56_107_a = new mathis.Vertex().setPosition(12, 27, 0);
            let s56_107_b = new mathis.Vertex().setPosition(10, 30, 0);
            let s56_107_c = new mathis.Vertex().setPosition(9, 33, 0);

            //282-289
            let s66_137_a = new mathis.Vertex().setPosition(25, 27, 0);
            let s66_137_b = new mathis.Vertex().setPosition(29, 28, 0);
            let s66_137_c = new mathis.Vertex().setPosition(30, 29, 0);
            let s66_137_d = new mathis.Vertex().setPosition(32, 30, 0);
            let s66_137_f = new mathis.Vertex().setPosition(35, 31, 0);
            let s66_137_g = new mathis.Vertex().setPosition(39, 32, 0);
            let s66_137_h = new mathis.Vertex().setPosition(42, 33, 0);
            let s66_137_i = new mathis.Vertex().setPosition(45, 35, 0);

            //290
            let s75_117_a = new mathis.Vertex().setPosition(25, 30, 0);

            //291-293
            let s85_128_a = new mathis.Vertex().setPosition(44, 29, 0);
            let s85_128_b = new mathis.Vertex().setPosition(41, 33, 0);
            let s85_128_c = new mathis.Vertex().setPosition(38, 35, 0);

            //294-296
            let s95_147_a = new mathis.Vertex().setPosition(61, 29, 0);
            let s95_147_b = new mathis.Vertex().setPosition(59, 33, 0);
            let s95_147_c = new mathis.Vertex().setPosition(60, 35, 0);


            //nonVisible
            //297-301

            let sN6 = new mathis.Vertex().setPosition(10, 45, 0);
            let sN7 = new mathis.Vertex().setPosition(26, 45, 0);
            let sN8 = new mathis.Vertex().setPosition(35, 45, 0);
            let sN9 = new mathis.Vertex().setPosition(48, 45, 0);
            let sN10 = new mathis.Vertex().setPosition(50, 45, 0);

            //302-304

            let s33_86_a = new mathis.Vertex().setPosition(45, 7, 0);
            let s33_86_b = new mathis.Vertex().setPosition(51, 12, 0);
            let s33_86_c = new mathis.Vertex().setPosition(48, 17, 0);



            mamesh.vertices.push(sN1,sN2,sN3,sN4,sN5);
            mamesh.vertices[4].setOneLink(mamesh.vertices[260]);
            mamesh.vertices[14].setOneLink(mamesh.vertices[261]);
            mamesh.vertices[23].setOneLink(mamesh.vertices[262]);
            mamesh.vertices[34].setOneLink(mamesh.vertices[263]);
            mamesh.vertices[44].setOneLink(mamesh.vertices[264]);



            mamesh.vertices.push(s3_66_a,s3_66_b, s3_66_c);
            mamesh.vertices[265].setTwoOppositeLinks(mamesh.vertices[3], mamesh.vertices[266]);
            mamesh.vertices[266].setTwoOppositeLinks(mamesh.vertices[265], mamesh.vertices[267]);
            mamesh.vertices[267].setTwoOppositeLinks(mamesh.vertices[266], mamesh.vertices[65]);


            mamesh.vertices.push(s13_55_a,s13_55_b,s13_55_c,s13_55_d,s13_55_f,s13_55_g);
            mamesh.vertices[268].setTwoOppositeLinks(mamesh.vertices[13], mamesh.vertices[269]);
            mamesh.vertices[269].setTwoOppositeLinks(mamesh.vertices[268], mamesh.vertices[270]);
            mamesh.vertices[270].setTwoOppositeLinks(mamesh.vertices[269], mamesh.vertices[271]);
            mamesh.vertices[271].setTwoOppositeLinks(mamesh.vertices[270], mamesh.vertices[272]);
            mamesh.vertices[272].setTwoOppositeLinks(mamesh.vertices[271], mamesh.vertices[273]);
            mamesh.vertices[273].setTwoOppositeLinks(mamesh.vertices[272], mamesh.vertices[55]);

            mamesh.vertices.push( s24_76_a,s24_76_b,s24_76_c,s24_76_d);
            mamesh.vertices[274].setTwoOppositeLinks(mamesh.vertices[24], mamesh.vertices[275]);
            mamesh.vertices[275].setTwoOppositeLinks(mamesh.vertices[274], mamesh.vertices[276]);
            mamesh.vertices[276].setTwoOppositeLinks(mamesh.vertices[275], mamesh.vertices[277]);
            mamesh.vertices[277].setTwoOppositeLinks(mamesh.vertices[276], mamesh.vertices[76]);






            mamesh.vertices.push(s43_96_a);
            mamesh.vertices[278].setTwoOppositeLinks(mamesh.vertices[43], mamesh.vertices[96]);

            mamesh.vertices.push(s56_107_a,s56_107_b,s56_107_c);
            mamesh.vertices[279].setTwoOppositeLinks(mamesh.vertices[56], mamesh.vertices[280]);
            mamesh.vertices[280].setTwoOppositeLinks(mamesh.vertices[279], mamesh.vertices[281]);
            mamesh.vertices[281].setTwoOppositeLinks(mamesh.vertices[280], mamesh.vertices[107]);


            mamesh.vertices.push(s66_137_a, s66_137_b,s66_137_c,s66_137_d,s66_137_f,s66_137_g, s66_137_h,s66_137_i);
            mamesh.vertices[282].setTwoOppositeLinks(mamesh.vertices[66], mamesh.vertices[283]);
            mamesh.vertices[283].setTwoOppositeLinks(mamesh.vertices[282], mamesh.vertices[284]);
            mamesh.vertices[284].setTwoOppositeLinks(mamesh.vertices[283], mamesh.vertices[285]);
            mamesh.vertices[285].setTwoOppositeLinks(mamesh.vertices[284], mamesh.vertices[286]);
            mamesh.vertices[286].setTwoOppositeLinks(mamesh.vertices[285], mamesh.vertices[287]);
            mamesh.vertices[287].setTwoOppositeLinks(mamesh.vertices[286], mamesh.vertices[288]);
            mamesh.vertices[288].setTwoOppositeLinks(mamesh.vertices[287], mamesh.vertices[289]);
            mamesh.vertices[289].setTwoOppositeLinks(mamesh.vertices[288], mamesh.vertices[137]);


            mamesh.vertices.push(s75_117_a);
            mamesh.vertices[290].setTwoOppositeLinks(mamesh.vertices[75], mamesh.vertices[117]);

            mamesh.vertices.push(s85_128_a,s85_128_b,s85_128_c);
            mamesh.vertices[291].setTwoOppositeLinks(mamesh.vertices[85], mamesh.vertices[292]);
            mamesh.vertices[292].setTwoOppositeLinks(mamesh.vertices[291], mamesh.vertices[293]);
            mamesh.vertices[293].setTwoOppositeLinks(mamesh.vertices[292], mamesh.vertices[128]);



            mamesh.vertices.push(s95_147_a,s95_147_b,s95_147_c);
            mamesh.vertices[294].setTwoOppositeLinks(mamesh.vertices[95], mamesh.vertices[295]);
            mamesh.vertices[295].setTwoOppositeLinks(mamesh.vertices[294], mamesh.vertices[296]);
            mamesh.vertices[296].setTwoOppositeLinks(mamesh.vertices[295], mamesh.vertices[147]);



            mamesh.vertices.push(sN6,sN7,sN8,sN9,sN10);
            mamesh.vertices[108].setOneLink(mamesh.vertices[297]);
            mamesh.vertices[118].setOneLink(mamesh.vertices[298]);
            mamesh.vertices[127].setOneLink(mamesh.vertices[299]);
            mamesh.vertices[138].setOneLink(mamesh.vertices[300]);
            mamesh.vertices[148].setOneLink(mamesh.vertices[301]);

            mamesh.vertices.push(s33_86_a,s33_86_b,s33_86_c);

            mamesh.vertices[302].setTwoOppositeLinks(mamesh.vertices[33], mamesh.vertices[303]);
            mamesh.vertices[303].setTwoOppositeLinks(mamesh.vertices[302], mamesh.vertices[304]);
            mamesh.vertices[304].setTwoOppositeLinks(mamesh.vertices[303], mamesh.vertices[86]);

            let x = 0;
            for (let k = 0; k<n; k++){
                mamesh.vertices[0+x].setOneLink(mamesh.vertices[x+1]);

                for (let j=0; j<m; j++) {

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


            let mine: number[] = [];
            mine = [0,51,52,103,104,155, 156, 207, 208,259]



            let verticesNon = [mamesh.vertices[0],mamesh.vertices[51],mamesh.vertices[52],mamesh.vertices[103],
                mamesh.vertices[104],mamesh.vertices[155],mamesh.vertices[156],mamesh.vertices[207],mamesh.vertices[208],
                mamesh.vertices[259],
                mamesh.vertices[260],mamesh.vertices[261],mamesh.vertices[262],mamesh.vertices[263],mamesh.vertices[264],
                mamesh.vertices[297],mamesh.vertices[298],mamesh.vertices[299],mamesh.vertices[300],mamesh.vertices[301]
            ];
            let verticesViewerNon = new mathis.visu3d.VerticesViewer(verticesNon,mathisFrame.scene); //Not visible
            //verticesViewerNon.go();


            let verticesC = [];
            let xx = 0; //Carbone
            for (let i=0;i<n; i++){
                for (let j=0; j<5; j++){

                    mine.push(1+10*j+xx);
                    mine.push(2+10*j+xx);
                    mine.push(3+10*j+xx);
                    mine.push(4+10*j+xx);


                    verticesC.push(mamesh.vertices[1+10*j+xx]);
                    verticesC.push(mamesh.vertices[2+10*j+xx]);
                    verticesC.push(mamesh.vertices[3+10*j+xx]);
                    verticesC.push(mamesh.vertices[4+10*j+xx]);
                }
                xx = xx+52;
            }

            let verticesViewerC = new mathis.visu3d.VerticesViewer(verticesC,mathisFrame.scene);
            verticesViewerC.color = new mathis.Color(mathis.Color.names.red);
            verticesViewerC.radiusAbsolute = 1.0;
            verticesViewerC.go();




            let verticesH = [];
            let yy=0;
            for (let i=0;i<n; i++){
                for (let j=0; j<5; j++){

                    mine.push(5+10*j+yy,6+10*j+yy,7+10*j+yy,8+10*j+yy, 9+10*j+yy, 10+10*j+yy);

                    verticesH.push(mamesh.vertices[5+10*j+yy]);
                    verticesH.push(mamesh.vertices[6+10*j+yy]);
                    verticesH.push(mamesh.vertices[7+10*j+yy]);
                    verticesH.push(mamesh.vertices[8+10*j+yy]);
                    verticesH.push(mamesh.vertices[9+10*j+yy]);
                    verticesH.push(mamesh.vertices[10+10*j+yy]);

                }
                yy = yy+52;
            }
            let verticesViewerH = new mathis.visu3d.VerticesViewer(verticesH, mathisFrame.scene); //H
            verticesViewerH.color = new mathis.Color(mathis.Color.names.blue);
            verticesViewerH.radiusAbsolute = 0.4;
            verticesViewerH.go();


            let verticesS = [mamesh.vertices[265],mamesh.vertices[266],mamesh.vertices[267],
                mamesh.vertices[268],mamesh.vertices[269],mamesh.vertices[270],mamesh.vertices[271],
                mamesh.vertices[272],mamesh.vertices[273],
                mamesh.vertices[274],mamesh.vertices[275],mamesh.vertices[276],mamesh.vertices[277],
                mamesh.vertices[278],
                mamesh.vertices[279],mamesh.vertices[280],mamesh.vertices[281],
                mamesh.vertices[282],mamesh.vertices[283],mamesh.vertices[284],mamesh.vertices[285],
                mamesh.vertices[286],mamesh.vertices[287],mamesh.vertices[288],mamesh.vertices[289],
                mamesh.vertices[290],
                mamesh.vertices[291],mamesh.vertices[292],mamesh.vertices[293],
                mamesh.vertices[294],mamesh.vertices[295],mamesh.vertices[296],
                mamesh.vertices[302],mamesh.vertices[303],mamesh.vertices[304]

            ];


            let verticesViewerS = new mathis.visu3d.VerticesViewer(verticesS, mathisFrame.scene); //S
            verticesViewerS.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewerS.radiusAbsolute = 0.6;
            verticesViewerS.go();



            mine.sort(function(a,b){return a-b});
            cc('mine',mine );
            cc('vertices',mamesh.vertices );





            let linkViewer = new visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.color = new mathis.Color(mathis.Color.names.black);
            linkViewer.go();



        }
    }
}