/*This class is supposed to creat buttons in CHrome, but as my mesh is made of 5 submeshes, I have no idea how to exort them all
* al once*/

module mathis {
    export module polymer {
        export class vulcaSimple{

            n = 3; //molecules
            m = 5; //monomères

            nbOfChains = 3;


            verticesViewerC;
            verticesViewerCS;
            verticesViewerSS;
            verticesViewerNon;




            constructor(){
            }




            //*****************USEFULL FUNCTIONS************************//


            /**check if a raw belongs to a matrix for XYZ*/
            private contains(points: XYZ[], onePoint: XYZ): boolean {
                for (let point of points) {
                    if (geo.distance(point, onePoint) < 0.0001) {
                        return true
                    }
                }
                return false
            }

            /**check if a raw belongs to a matrix for number*/
            private containsN(points: number[], onePoint: number): boolean {
                if (onePoint in points) {
                    return true
                }

                return false
            }


            /**function that find
             *  of a given value in a given array*/
            private findIndex(array: Vertex[], value: Vertex): number {
                for (let i = 0; i < array.length; i++) {
                    if (array[i] == value) {
                        var res = i;
                    }
                }
                return res;
            }


            /**shuffles an array */
            private shuffle(array: XYZ[]) {
                let currentIndex = array.length, temporaryValue, randomIndex;

                while (0 !== currentIndex) {

                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            }


            /**Deletes a certain value from array */
            private rm(array: XYZ[], toDelete: XYZ) {
                for (let i = array.length - 1; i >= 0; i--) {
                    if (array[i] === toDelete) {
                        array.splice(i, 1)
                    }
                }
                return array;
            }


            /**Find a random neighbour */



            go():Mamesh{

                let mamesh = new mathis.Mamesh();
                let grilleS=[];
                let C_unitaire=[];
                let C_double=[];
                let S=[];
                let verticesNon=[];

                function possibleNeighbours_f(me: XYZ) {

                        let me_x1 = me.x + 3;
                        let me_x2 = me.x - 3;

                        let me_y1 = me.y + 2;
                        let me_y2 = me.y - 2;

                        let me_y11 = me.y + 3;
                        let me_y22 = me.y - 3;

                        let coordinates1: XYZ = new XYZ(me_x1, me_y1, 0);
                        let coordinates2: XYZ = new XYZ(me_x1, me_y2, 0);
                        let coordinates3: XYZ = new XYZ(me_x2, me_y1, 0);
                        let coordinates4: XYZ = new XYZ(me_x2, me_y2, 0);

                        let coordinates5: XYZ = new XYZ(me_x1, me.y, 0);
                        let coordinates6: XYZ = new XYZ(me_x2, me.y, 0);
                        let coordinates7: XYZ = new XYZ(me.x, me_y1, 0);
                        let coordinates8: XYZ = new XYZ(me.x, me_y2, 0);

                        let coordinates9: XYZ = new XYZ(me_x1, me_y11, 0);
                        let coordinates10: XYZ = new XYZ(me_x1, me_y22, 0);
                        let coordinates11: XYZ = new XYZ(me_x2, me_y11, 0);
                        let coordinates12: XYZ = new XYZ(me_x2, me_y22, 0);

                        let coordinates13: XYZ = new XYZ(me.x, me_y11, 0);
                        let coordinates14: XYZ = new XYZ(me.x, me_y22, 0);

                        let coordinates: XYZ[] = [];
                        coordinates.push(coordinates1, coordinates2, coordinates3, coordinates4,
                            coordinates5, coordinates6, coordinates7, coordinates8,
                            coordinates9, coordinates10, coordinates11, coordinates12,
                            coordinates13, coordinates14

                        );


                        let possibleNeighbours: XYZ[] = [];

                        for (let i = 0; i < coordinates.length; i++) {

                            if (this.contains(grilleS_XYZ, coordinates[i])) {
                                possibleNeighbours.push(coordinates[i]);
                                cc('coordinates  ok', coordinates[i])
                            }

                            else {
                                cc('coordinates not ok', coordinates[i])
                            }


                        }

                        return possibleNeighbours
                }




                //Atomes de carbone de type -CH_2-CH_2-
                let C_unitaire_XYZ: XYZ[] = []; //C_unitaire


                //Atomes de carbone de type -CH=CH-
                let C_double_XYZ: XYZ[] = []; //C_double


                //Atome de carbone de type -CHS-CHS- (ancien C_double)
                let C_affecte_XYZ: XYZ[] = [];
                let C_affecte = [];


                //Atomes de soufre
                let S_XYZ: XYZ[] = []; //verticesS


                //Places possilbes pour la soufre
                let grilleS_XYZ: XYZ[] = []; //grilleS



                let w1 = 20;
                let h1 = 20;



                //****************Building a grill************************//


                // reseau initial (3 marcomolécule à 5 monomère)

                for (let j = 0; j < this.n; j++) {
                    let v_1_in = new mathis.Vertex().setPosition(1, 3 + h1 * j, 0); //not visible
                    mamesh.vertices.push(v_1_in);
                    verticesNon.push(v_1_in);

                    for (let i = 0; i < this.m; i++) {

                        let v_1_C1 = new mathis.Vertex().setPosition(3 + w1 * i, 3 + h1 * j, 0);
                        let v_1_C2 = new mathis.Vertex().setPosition(6 + w1 * i, 3 + h1 * j, 0);
                        let v_1_C3 = new mathis.Vertex().setPosition(9 + w1 * i, 3 + h1 * j, 0);
                        let v_1_C4 = new mathis.Vertex().setPosition(12 + w1 * i, 3 + h1 * j, 0);


                        //C_unitaire.push(v_1_C1,v_1_C2);
                        //C_double.push(v_1_C3,v_1_C4);
                        mamesh.vertices.push(
                            v_1_C1, v_1_C2, v_1_C3, v_1_C4
                        );

                        C_unitaire.push(v_1_C1, v_1_C2)
                        C_double.push(v_1_C3, v_1_C4)
                    }
                    let v_1_out = new mathis.Vertex().setPosition(15 + w1 * 4, 3 + h1 * j, 0); //not visible
                    mamesh.vertices.push(v_1_out);

                    verticesNon.push(v_1_out);
                }

                //Soufre Grille

                let hS = 2;
                let nS = 8;
                let mS = 5;
                let p=0
                for (let k=0; k<this.n-1; k++){


                        for (let j = 0; j < nS; j++) {
                            for (let i = 0; i < mS; i++) {

                                let S1 = new mathis.Vertex().setPosition(3 + w1 * i, 6+p + hS * j, 0);
                                let S2 = new mathis.Vertex().setPosition(6 + w1 * i, 6+p + hS * j, 0);
                                let S3 = new mathis.Vertex().setPosition(9 + w1 * i, 6+p + hS * j, 0);
                                let S4 = new mathis.Vertex().setPosition(12 + w1 * i, 6+p + hS * j, 0);

                                mamesh.vertices.push(S1, S2, S3, S4);
                                grilleS.push(S1, S2, S3, S4);
                                grilleS_XYZ.push(S1.position, S2.position, S3.position, S4.position);

                            }
                        }

                    p =p+20
                }


                let test = [];
                for (let i=0; i<C_double.length; i++){
                    test.push(C_double[i])
                }





                for (let i = 0; i < this.nbOfChains; i++) {
                    let indexesInMamesh = [];
                    //Actual chain at i


                    let thisChain = [];
                    let thisChain_XYZ: XYZ[] = [];


                    //Choose S chain lenght
                    let bridgeS = Math.floor(Math.random() * (10 - 1)) + 1;

                    //Choose a random vertex in CS by index
                    let indexOfRandomVertex1 = Math.floor(Math.random() * (test.length - 1 - 0)) + 0;
                    let RandomVertex1inCS = test[indexOfRandomVertex1];
                    cc('RandomVertex1inCS', RandomVertex1inCS);

                    //add it to C_affected
                    C_affecte.push(RandomVertex1inCS);
                    //delete it from C_double
                    this.rm(test, RandomVertex1inCS);
                    //add it to thisChain
                    thisChain_XYZ.push(RandomVertex1inCS.position);


                    let indexRandomVertex1 = mamesh.vertices.indexOf(test[indexOfRandomVertex1]);
                    indexesInMamesh.push(indexRandomVertex1);

                    let Security: Vertex[] = mamesh.vertices;

                    for (let j = 1; j < bridgeS; j++) {


                        cc('thisChain_XYZ[j-1]', thisChain_XYZ[j - 1]);
                        let possible_Neighbours_list: XYZ[] = [];
                        possible_Neighbours_list = possibleNeighbours_f(thisChain_XYZ[j - 1]);
                        cc('possible_Neighbours_list', possible_Neighbours_list);


                        let randomNeighbour_index = Math.floor(Math.random() * (possible_Neighbours_list.length - 1 - 0)) + 0;
                        let random_Neighbour = possible_Neighbours_list[randomNeighbour_index];
                        cc('random_Neighbour', random_Neighbour);

                        if (!random_Neighbour) {
                            cc('thisChain_XYZ', thisChain_XYZ)
                            break;
                        }


                        if (!this.contains(S_XYZ, random_Neighbour)) {

                            S_XYZ.push(random_Neighbour);
                            let coordinates: XYZ = new XYZ(random_Neighbour.x, random_Neighbour.y, 0);
                            let vertex = new mathis.Vertex();
                            vertex.position = coordinates;
                            S.push(vertex)
                            mamesh.vertices.push(vertex);
                            cc('S added', coordinates);
                            let index = mamesh.vertices.indexOf(vertex);
                            indexesInMamesh.push(index);
                            thisChain_XYZ.push(random_Neighbour)
                            cc('grille', grilleS_XYZ)
                        }

                        else {
                            cc('Doublons! New chain');

                            mamesh.vertices = Security;
                            break;

                        }

                    }


                    cc('indexesS', indexesInMamesh);

                    let randomVertex2 = Math.floor(Math.random() * (test.length - 1 - 0)) + 0;
                    let indexRandomVertex2 = mamesh.vertices.indexOf(test[randomVertex2]);
                    C_affecte.push(test[randomVertex2]);
                    this.rm(test, test[randomVertex2]);

                    indexesInMamesh.push(indexRandomVertex2);

                    for (let i = 1; i < indexesInMamesh.length - 1; i++) {
                        mamesh.vertices[indexesInMamesh[i]].setTwoOppositeLinks(mamesh.vertices[indexesInMamesh[i - 1]], mamesh.vertices[indexesInMamesh[i + 1]]);
                    }

                    mamesh.vertices[indexesInMamesh[0]].setOneLink(mamesh.vertices[indexesInMamesh[1]]);
                    mamesh.vertices[indexesInMamesh.length - 1].setOneLink(mamesh.vertices[indexesInMamesh.length - 2]);

                }



                let x = 0;
                for (let k = 0; k < this.n; k++) {
                    mamesh.vertices[0 + x].setOneLink(mamesh.vertices[x + 1]);


                    for (let j = 0; j < this.m; j++) {
                        mamesh.vertices[x + 0 + 4 * j].setOneLink(mamesh.vertices[x + 1 + 4 * j]);
                        mamesh.vertices[x + 1 + 4 * j].setTwoOppositeLinks(mamesh.vertices[x + 0 + 4 * j], mamesh.vertices[x + 2 + 4 * j]);
                        mamesh.vertices[x + 2 + 4 * j].setTwoOppositeLinks(mamesh.vertices[x + 1 + 4 * j], mamesh.vertices[x + 3 + 4 * j]);
                        mamesh.vertices[x + 3 + 4 * j].setTwoOppositeLinks(mamesh.vertices[x + 2 + 4 * j], mamesh.vertices[x + 4 + 4 * j]);
                    }
                    x = x + 22;
                }


/*
                this.verticesViewerS = new visu3d.VerticesViewer(grilleS, mathisFrame.scene);
                verticesViewerS.color = new mathis.Color(mathis.Color.names.lightyellow);
                verticesViewerS.radiusAbsolute = 0.3;
                verticesViewerS.go();

                let verticesViewerC = new visu3d.VerticesViewer(C_unitaire, mathisFrame.scene);
                verticesViewerC.color = new mathis.Color(mathis.Color.names.darkviolet);
                verticesViewerC.radiusAbsolute = 0.7;
                verticesViewerC.go();

                let verticesViewerCS = new visu3d.VerticesViewer(C_double, mathisFrame.scene);
                verticesViewerCS.color = new mathis.Color(mathis.Color.names.red);
                verticesViewerCS.radiusAbsolute = 0.9;
                verticesViewerCS.go();*/


                return mamesh

            }
/*
            let verticesViewerSS = new visu3d.VerticesViewer(S, mathisFrame.scene);
                verticesViewerSS.color = new mathis.Color(mathis.Color.names.yellow);
                verticesViewerSS.radiusAbsolute = 0.9;
                verticesViewerSS.go();


                let verticesViewerNon = new visu3d.VerticesViewer(verticesNon, mathisFrame.scene);
                //verticesViewerNon.go();


                let linkViewer = new visu3d.LinksViewer(mamesh, mathisFrame.scene);
                linkViewer.go(); */

            }
        }
    }
