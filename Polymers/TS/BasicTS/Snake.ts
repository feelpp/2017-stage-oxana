module mathis {
    export module polymer {
        export class SAW_dynamic_Snake {

            chainSize = 10;

            constructor() {
            }

            // function that checks the list of used coordinates
            private contains(points: XYZ[], onePoint: XYZ): boolean {
                for (let point of points) {
                    if (geo.distance(point, onePoint) < 0.0001) {
                        return true
                    }
                }
                return false
            }

            // function that replaces a value 1 at i by value 2
            private replaceValue(array: XYZ[], valueToReplace: XYZ, newValue: XYZ): void {
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == valueToReplace) {
                        array[i] = newValue;
                    }
                }
            }


            // function that find index of a given value in a given array
            private findIndex(array: XYZ[], value: XYZ): number {
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == value) {
                        var res = i;
                    }
                }
                return res;
            }


            go(): Mamesh {

                cc('DYNAMIC SNAKE STATIC METHOD');
                let start = new Date().getTime();


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

                    //All the coordinates are stocked in ALLc
                    let ALLc: XYZ[] = [];
                    for (let i = 0; i < mamesh.vertices.length; i++) {
                        ALLc.push(mamesh.vertices[i].position)

                    }


                    //Counter for unsuccessful attempts
                    let attempts = 0;

                    //Nb of generated chains  (=nb of operations)
                    let chain = 0;


                    let t = 0;

                    let test = mamesh.vertices;
                    let NOTfinished = true;

                    let max = 2;
                    let min = 0;
                    //for (let y=0; y<chain; y++){
                    while (NOTfinished) {
                        t += 0.1;

                        // Choose randomly the end to delete:
                        let choice = Math.floor(Math.random() * (max - min)) + min;

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

                            if (!this.contains(ALLc, coordinate)) {
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
                            if (!this.contains(ALLc, coordinate)) {
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


                        NOTfinished = (chain < 1);
                    }

                    mamesh.vertices = test;


                    for (let i = 1; i < mamesh.vertices.length - 1; i++) {
                        mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
                    }

                    mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                    mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);

                    let end = new Date().getTime();
                    cc('Execution Time in sec', (end-start))
                    cc('Attempts', attempts)
                    cc('chainSize',this.chainSize)
                    return mamesh

                }
            }
        }
    }

