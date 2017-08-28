module mathis {
    export module polymer {
        export class SAW_Init {

            chainSize = 10;

            constructor() {
            }

            go(): Mamesh {

                cc('Init');


                let mamesh = new mathis.Mamesh();


                //A given SAW

                let vertex0 = new mathis.Vertex().setPosition(0, -1, 0);  //0
                let vertex1 = new mathis.Vertex().setPosition(-1, 0, 1); //1
                let vertex2 = new mathis.Vertex().setPosition(0, 0, 1);  //2
                let vertex3 = new mathis.Vertex().setPosition(1, 0, 1);  //3
                let vertex4 = new mathis.Vertex().setPosition(1, 1, 0);  //4
                let vertex5 = new mathis.Vertex().setPosition(2, 2, 0);  //5
                let vertex6 = new mathis.Vertex().setPosition(2, 3, -1); //6
                let vertex7 = new mathis.Vertex().setPosition(3, 3, 0);  //7
                let vertex8 = new mathis.Vertex().setPosition(3, 4, 0);  //8
                let vertex9 = new mathis.Vertex().setPosition(3, 5, -1); //9

                let vertex10 = new mathis.Vertex().setPosition(4, 5, 0);  //0
                let vertex11 = new mathis.Vertex().setPosition(4, 4, 1); //1
                let vertex12 = new mathis.Vertex().setPosition(4, 5, 2);  //2
                let vertex13 = new mathis.Vertex().setPosition(5, 5, 2);  //3
                let vertex14 = new mathis.Vertex().setPosition(5, 6, 1);  //4
                let vertex15 = new mathis.Vertex().setPosition(6, 6, 2);  //5
                let vertex16 = new mathis.Vertex().setPosition(6, 5, 3); //6
                let vertex17 = new mathis.Vertex().setPosition(7, 4, 3);  //7
                let vertex18 = new mathis.Vertex().setPosition(6, 3, 4);  //8
                let vertex19 = new mathis.Vertex().setPosition(7, 2, 5); //9

                let vertex20 = new mathis.Vertex().setPosition(8, 3, 5);  //0
                let vertex21 = new mathis.Vertex().setPosition(9, 3, 5); //1
                let vertex22 = new mathis.Vertex().setPosition(9, 3, 4);  //2
                let vertex23 = new mathis.Vertex().setPosition(8, 4, 4);  //3
                let vertex24 = new mathis.Vertex().setPosition(7, 3, 5);  //4
                let vertex25 = new mathis.Vertex().setPosition(6, 4, 6);  //5
                let vertex26 = new mathis.Vertex().setPosition(7, 5, 6); //6
                let vertex27 = new mathis.Vertex().setPosition(8, 5, 5);  //7
                let vertex28 = new mathis.Vertex().setPosition(8, 5, 6);  //8
                let vertex29 = new mathis.Vertex().setPosition(9, 5, 7); //9

                let vertex30 = new mathis.Vertex().setPosition(10, 5, 7);  //0
                let vertex31 = new mathis.Vertex().setPosition(10, 6, 6); //1
                let vertex32 = new mathis.Vertex().setPosition(10, 7, 6);  //2
                let vertex33 = new mathis.Vertex().setPosition(10, 7, 5);  //3
                let vertex34 = new mathis.Vertex().setPosition(9, 7, 5);  //4
                let vertex35 = new mathis.Vertex().setPosition(10, 6, 6);  //5
                let vertex36 = new mathis.Vertex().setPosition(11, 5, 7); //6
                let vertex37 = new mathis.Vertex().setPosition(12, 5, 8);  //7
                let vertex38 = new mathis.Vertex().setPosition(11, 6, 9);  //8
                let vertex39 = new mathis.Vertex().setPosition(12, 5, 10); //9

                let vertex40 = new mathis.Vertex().setPosition(11, 4, 10);  //0
                let vertex41 = new mathis.Vertex().setPosition(12, 4, 11); //1
                let vertex42 = new mathis.Vertex().setPosition(13, 3, 11);  //2
                let vertex43 = new mathis.Vertex().setPosition(13, 2, 11);  //3
                let vertex44 = new mathis.Vertex().setPosition(12, 1, 10);  //4
                let vertex45 = new mathis.Vertex().setPosition(11, 2, 10);  //5
                let vertex46 = new mathis.Vertex().setPosition(11, 3, 11); //6
                let vertex47 = new mathis.Vertex().setPosition(12, 3, 10);  //7
                let vertex48 = new mathis.Vertex().setPosition(13, 4, 10);  //8
                let vertex49 = new mathis.Vertex().setPosition(14, 5, 9); //9



                if (this.chainSize == 5) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4);
                }


                else if (this.chainSize == 10) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9)
                }

                else if (this.chainSize == 20) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9,
                        vertex10, vertex11, vertex12, vertex13, vertex14, vertex15, vertex16, vertex17, vertex18, vertex19
                    );
                }

                else {
                    mamesh.vertices.push(
                        vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9,
                        vertex10, vertex11, vertex12, vertex13, vertex14, vertex15, vertex16, vertex17, vertex18, vertex19,
                        vertex20, vertex21, vertex22, vertex23, vertex24, vertex25, vertex26, vertex27, vertex28, vertex29,
                        vertex30, vertex31, vertex32, vertex33, vertex34, vertex35, vertex36, vertex37, vertex38, vertex39,
                        vertex40, vertex41, vertex42, vertex43, vertex44, vertex45, vertex46, vertex47, vertex48, vertex49
                    );
                }



                for (let i = 1; i < mamesh.vertices.length - 1; i++) {
                    mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
                }

                mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);


                return mamesh

                }
            }
        }
    }
