module mathis {
    export module polymer {
        //import GrabberCamera = mathis.macamera.GrabberCamera;
        export function vulcaSimple() {



            let mathisFrame = new mathis.MathisFrame();



            let mamesh = new mathis.Mamesh();

            //Atomes de carbone de type -CH_2-CH_2-
            let C_unitaire: XYZ[]=[];

            //Atomes de carbone de type -CH=CH-
            let C_double: XYZ[]=[];

            //Atome de carbone de type -CHS-CHS- (ancien C_double)
            let C_affecte: XYZ[]=[];

            //Atomes de soufre
            let S: XYZ[]=[];

            //Places possilbes pour la soufre
            let S0: XYZ[]=[];





            let w1 = 20;
            let h1 = 20;
            let n = 3;
            let m = 5;



            /**check if a raw belongs to a matrix*/
            function contains(points: XYZ[], onePoint: XYZ) :boolean{
                for (let point of points){
                    if (geo.distance(point,onePoint)<0.0001) {
                        return true
                    }
                }
                return false
            }


            function containsN(points: number[], onePoint: number) :boolean{
                    if (onePoint in points) {
                        return true
                    }

                return false
            }





            // function that find index of a given value in a given array
            function findIndex (array: Vertex[], value: Vertex ): number{
                for (let i = 0; i< array.length; i++) {
                    if (array[i] == value) {
                        var res = i;
                    }
                }
                return res;
            }


            function findValue (array: XYZ[], index: number ): XYZ{
                let res
                for (let i = 0; i< array.length; i++) {
                    if (i=index){
                        res = array[index]

                    }

                }
                return res;
            }

            function findNeighbours (array: number[], value: number ) {
                for ( let possibles of array){

                    



                }
        }









            /**shuffles an array */
            function shuffle(array: XYZ[]) {
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


            let verticesS = [];
            let verticesS_done = [];

            let verticesC = [];
            let verticesCS = [];
            let verticesNon = [];


            // reseau initial (3 marcomolécule à 5 monomère)
            for (let j=0; j<n; j++) {
                let v_1_in = new mathis.Vertex().setPosition(1,3+ h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_in);
                verticesNon.push(v_1_in);

                for (let i = 0; i < m; i++) {

                    let v_1_C1 = new mathis.Vertex().setPosition(3 + w1 * i, 3 + h1 * j, 0);
                    let v_1_C2 = new mathis.Vertex().setPosition(6 + w1 * i, 3 + h1 * j, 0);
                    let v_1_C3 = new mathis.Vertex().setPosition(9 + w1 * i, 3 + h1 * j, 0);
                    let v_1_C4 = new mathis.Vertex().setPosition(12 + w1 * i, 3 + h1 * j, 0);


                    //C_unitaire.push(v_1_C1,v_1_C2);
                    //C_double.push(v_1_C3,v_1_C4);
                    mamesh.vertices.push(
                        v_1_C1, v_1_C2, v_1_C3, v_1_C4
                    );

                    verticesC.push(v_1_C1, v_1_C2)
                    verticesCS.push(v_1_C3, v_1_C4)
                }
                let v_1_out = new mathis.Vertex().setPosition(15 + w1*4, 3 + h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_out);

                verticesNon.push(v_1_out);
            }





            //Soufre Grille

            let hS = 2;
            let nS = 8;
            let mS = 5;





            for (let j=0; j<nS; j++) {
                for (let i = 0; i < mS; i++) {

                    let S1 = new mathis.Vertex().setPosition(3 + w1 * i, 6 + hS * j, 0);
                    let S2 = new mathis.Vertex().setPosition(6 + w1 * i, 6 + hS * j, 0);
                    let S3 = new mathis.Vertex().setPosition(9 + w1 * i, 6 + hS * j, 0);
                    let S4 = new mathis.Vertex().setPosition(12 + w1 * i, 6 + hS * j, 0);
                    mamesh.vertices.push(S1,S2,S3,S4);
                    verticesS.push(S1,S2,S3,S4);

                }
            }


            for (let j=0; j<nS; j++) {
                for (let i = 0; i < mS; i++) {

                    let S1 = new mathis.Vertex().setPosition(3 + w1 * i, 26 + hS * j, 0);
                    let S2 = new mathis.Vertex().setPosition(6 + w1 * i, 26 + hS * j, 0);
                    let S3 = new mathis.Vertex().setPosition(9 + w1 * i, 26 + hS * j, 0);
                    let S4 = new mathis.Vertex().setPosition(12 + w1 * i, 26 + hS * j, 0);
                    mamesh.vertices.push(S1,S2,S3,S4);
                    verticesS.push(S1,S2,S3,S4);


                }
            }



            /** Algo:
             0. creat a soufre grille?
             1. Choose randomly 2 odd vertexes in C_double
             2. Link them with a bridge of S of random lenght
             3. Take their left neighbours (which are pair) and [go (1)]

            */


            ///                let indexOfVertex = ALLc_new.indexOf( ALLc_new[randomVertex] );


            let min = -4;
            let max = 5;

            for (let i=0; i<3;i++){
                let indexesS = [];
                let values: XYZ[]=[];


                //Choose S chain lenght
                let bridgeS = Math.floor(Math.random() * (9 - 1)) + 1;

                //Choose a random vertex in CS by index
                let indexOfRandomVertex1inCS = Math.floor(Math.random() * (verticesCS.length-1 - 0)) + 0;

                let RandomVertex1inCS=  verticesCS[indexOfRandomVertex1inCS]
                cc('RandomVertex1inCS',RandomVertex1inCS)


               // let indexofRandomVertex1inMamesh=mamesh.vertices.indexOf(verticesCS[indexOfRandomVertex1inCS])
               // cc('indexofRandomVertex1inMamesh',indexofRandomVertex1inMamesh)


               // indexesS.push(indexofRandomVertex1inMamesh)

                let x0=RandomVertex1inCS.position.x
                let y0=RandomVertex1inCS.position.y
                let z0=RandomVertex1inCS.position.z


                let coordinates0 : XYZ = new XYZ(x0,y0,z0);
                let vertex0 = new mathis.Vertex();
                vertex0.position=coordinates0;

                values.push(coordinates0)
                mamesh.vertices.push(vertex0);


                let indexM = findIndex(mamesh.vertices, vertex0);

                indexesS.push(indexM)
                cc('indexM',indexM)

                cc('values',values)

                let Security:Vertex[] = mamesh.vertices;

                let ALLc_new:Vertex[]= mamesh.vertices;

                for (let j=1; j<bridgeS; j++){


                    let alea1 = Math.floor(Math.random() * (max - min)) + min;
                    let alea2 = Math.floor(Math.random() * (max - min)) + min;
                    let x = values[j-1].x+alea1;
                    let y = values[j-1].y+alea2;

                    let coordinates : XYZ = new XYZ(x,y,0);
                    let vertex = new mathis.Vertex();
                    vertex.position=coordinates;
                    cc('coordinates',coordinates);


                    //let randomS = Math.floor(Math.random() * (verticesS.length-1 - 0)) + 0;
                    //cc('RandomS',randomS );

                    if (!contains(S,coordinates)){
                       // mamesh.vertices.push(vertex)
                        S.push(coordinates)
                        verticesS_done.push(vertex)
                        values.push(coordinates)
                        ALLc_new.push(vertex)
                        mamesh.vertices.push(vertex)

                        let indexMM = findIndex(ALLc_new,vertex )
                        indexesS.push(indexMM)
                        cc('indexesS',indexesS);
                    }


                    else{
                        cc('Doublons! Start over:', coordinates);
                        mamesh.vertices = Security;

                        break;

                    }

                }
                cc('indexesS',indexesS );

                let randomVertex2 = Math.floor(Math.random() * (verticesCS.length-1 - 0)) + 0;
                let indexRandomVertex2=mamesh.vertices.indexOf(verticesCS[randomVertex2]);
                indexesS.push(indexRandomVertex2);
                cc('indexesS',indexesS );

                for (let i=1; i<indexesS.length-1; i++){
                        mamesh.vertices[indexesS[i]].setTwoOppositeLinks(mamesh.vertices[indexesS[i-1]], mamesh.vertices[indexesS[i+1]]);
                }

                mamesh.vertices[indexesS[0]].setOneLink(mamesh.vertices[indexesS[1]]);
                mamesh.vertices[indexesS.length - 1].setOneLink(mamesh.vertices[indexesS.length - 2]);

            }


            let x = 0;
            for (let k = 0; k<n; k++){
                mamesh.vertices[0+x].setOneLink(mamesh.vertices[x+1]);


                for (let j=0; j<m; j++) {
                    mamesh.vertices[x + 0 + 4 * j].setOneLink(mamesh.vertices[x + 1 + 4 * j]);
                    mamesh.vertices[x + 1 + 4 * j].setTwoOppositeLinks(mamesh.vertices[x + 0 + 4 * j], mamesh.vertices[x + 2 + 4 * j]);
                    mamesh.vertices[x + 2 + 4 * j].setTwoOppositeLinks(mamesh.vertices[x + 1 + 4 * j], mamesh.vertices[x + 3 + 4 * j]);
                    mamesh.vertices[x + 3 + 4 * j].setTwoOppositeLinks( mamesh.vertices[x + 2 + 4 * j],mamesh.vertices[x + 4 + 4 * j]);
                }
                x = x+22;
            }









            let verticesViewerS = new visu3d.VerticesViewer(verticesS, mathisFrame.scene);
            verticesViewerS.color = new mathis.Color(mathis.Color.names.lightyellow);
            verticesViewerS.radiusAbsolute = 0.3;
            verticesViewerS.go();

            let verticesViewerC = new visu3d.VerticesViewer(verticesC, mathisFrame.scene);
            verticesViewerC.color = new mathis.Color(mathis.Color.names.darkviolet);
            verticesViewerC.radiusAbsolute = 0.7;
            verticesViewerC.go();

            let verticesViewerCS = new visu3d.VerticesViewer(verticesCS, mathisFrame.scene);
            verticesViewerCS.color = new mathis.Color(mathis.Color.names.red);
            verticesViewerCS.radiusAbsolute = 0.9;
            verticesViewerCS.go();


            let verticesViewerSS = new visu3d.VerticesViewer(verticesS_done, mathisFrame.scene);
            verticesViewerSS.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewerSS.radiusAbsolute = 0.9;
            verticesViewerSS.go();


            let verticesViewerNon = new visu3d.VerticesViewer(verticesNon, mathisFrame.scene);
            //verticesViewerNon.go();







            let linkViewer = new visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.go();

        }
    }
}