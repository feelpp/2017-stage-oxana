module mathis {
    export module epi {
        import GrabberCamera = mathis.macamera.GrabberCamera;
        export function epi1() {



            /*INITIAL ASSUMPTIONS:

            * W - World, where :
            * S = W-i - Sucseptible
            * I = i - Infected
            * R = 0 - Immuned
            *
            * a) Every infected person creats its own SAW tree of infected persons, that can't intersect ni itself, ni others
                     "If alredy infected, can't get more sick"
            * b) Infection rate is to be fixed in nb of neighbours that CAN get infected ( i.e.  [0;2] neighbours)
            * c) Recovery rate (if needed) is to be fixed in times steps (i.e. 7)
            * d) Recovered person get immuned from future infecton
            * e) 1 infected -> All infected -> All recovered
            *
            *
            * We use SIMPLE STATIC method




            /**check if a raw belongs to a matrix*/
            function contains(points: XYZ[], onePoint: XYZ) :boolean{
                for (let point of points){
                    if (geo.distance(point,onePoint)<0.0001) {
                        return true
                    }
                }
                return false
            }


            //shuffles an array
            function shuffleA (arrayToShuffle: XYZ[]){
                for (let i=arrayToShuffle.length;i;i--){
                    let j = Math.floor(Math.random()*i);
                    [arrayToShuffle[i-1], arrayToShuffle[j]] = [arrayToShuffle[j], arrayToShuffle[i-1]];
                }
            }

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


            let mathisFrame = new mathis.MathisFrame();
            let mamesh = new mathis.Mamesh();
            // We consider a domain W=NxN, where all not taken spots are healthy people */
            let N=10;
            let camera=mathisFrame.getGrabberCamera()
            camera.changePosition(new XYZ(5,0,-30))

            //Initial SIR
            let S: XYZ[]=[];
            let I: XYZ[]=[];
            let R: XYZ[]=[];

            //First infected person
            I[0]=new XYZ(0,0,0);
            I[1]=new XYZ(10,10,10);
            I[2]=new XYZ(10,-10,10);

            //I[2]=new XYZ(-4,6,-3);

            let vertex0 = new mathis.Vertex();
            vertex0.position=I[0];
            let vertex1 = new mathis.Vertex();
            vertex1.position=I[1];
            let vertex2 = new mathis.Vertex();
            vertex2.position=I[2];


            mamesh.vertices.push(vertex0,vertex1,vertex2);


            //All jumps  (3^3=27)
            let allJumps: XYZ[]=[];

            let allJumpsCheck = true;
            let min = -1;
            let max = 2;

            while (allJumpsCheck) {

                let alea1 = Math.floor(Math.random() * (max - min)) + min;
                let alea2 = Math.floor(Math.random() * (max - min)) + min;
                let alea3 = Math.floor(Math.random() * (max - min)) + min;

                let coordinates: XYZ = new XYZ(alea1, alea2, alea3);

                if (!contains(allJumps, coordinates)) {
                    allJumps.push(coordinates)
                }

                allJumpsCheck = (allJumps.length<27)
            }

            cc('allJumps',allJumps);


            function outbreak(N,b) {
                let max_t = 20;
                let I = 1;
                let S = N-1;
                let incidence = [];
                for (let t = 1; t < max_t; t++) {
                    let p_inf = 1.0-Math.exp(-b*I/N);
                    let new_I = 0;
                    for (let i = 0; i < S; i++) {
                        if (Math.random() < p_inf) {
                            new_I++;
                        }
                    }
                    if (new_I == 0) {
                        break;
                    }
                    incidence.push({t:t, I:new_I});
                    S -= new_I;
                    I = new_I;
                }
                return(incidence);
            }




            /*
            for (let j=0; j<I.length;j++){
                for (let i=0; i< allJumps.length; i++){
                    cc('I[j]',I[j]);
                    let test = new XYZ(I[j].x +allJumps[i].x ,I[j].y + allJumps[i].y, I[j].z+ allJumps[i].z );
                    cc('test',test);
                    if (!(contains(I,test))){
                        I_delta_i.push(I[j])
                    }
                    else {
                        cc('No more healthy neighbours', I[j]);
                    }
                }
            }
            */



            let notEpidemy = true;
            let newlyInfected=0;
            let I_test: XYZ[]=[];
            I_test[0]=new XYZ(0,0,0);
            I_test[1]=new XYZ(10,10,10);
            I_test[2]=new XYZ(10,-10,10);



            let I_delta_step: XYZ[]=[];
            I_delta_step[0]=new XYZ(0,0,0);
            I_delta_step[1]=new XYZ(10,10,10);
            I_delta_step[2]=new XYZ(10,-10,10);





            let t = 0;


            let action = new mathis.PeriodicAction(function () {

                t += 1;

                //while (notEpidemy) {

                    for (let j = 0; j < I_test.length; j++) {
                        for (let i = 0; i < allJumps.length; i++) {
                            let test = new XYZ(I_test[j].x + allJumps[i].x, I_test[j].y + allJumps[i].y, I_test[j].z + allJumps[i].z);
                            let personsToInfect = Math.floor(Math.random() * (100 - 1)) + 1;
                            if (!(contains(I_delta_step, test)) && (personsToInfect == 3)) {
                                I_delta_step.push(test);
                                let vertex = new mathis.Vertex();
                                vertex.position = test;
                                mamesh.vertices.push(vertex);
                                newlyInfected++;
                                cc('one more infected', personsToInfect);
                            }

                            else {
                                cc('already infected', test);
                            }

                        }

                    }
                    cc('New LOOP');
                    notEpidemy = (newlyInfected < 150 )
                    I_test = I_delta_step;
                    shuffle(I_test);

                //}


                cc('notEpidemy !!', newlyInfected);
                cc('vertices !!', mamesh.vertices.length);


                for (let i = 1; i < mamesh.vertices.length - 1; i++) {
                    mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
                }
                mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);

                let linkViewer = new visu3d.LinksViewer(mamesh, mathisFrame.scene);
                linkViewer.color = new mathis.Color(mathis.Color.names.silver);
                //linkViewer.go();

                //INFECTED
                let verticesViewer = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
                verticesViewer.vertices = [mamesh.vertices[0], mamesh.vertices[1], mamesh.vertices[2]];
                verticesViewer.color = new mathis.Color(mathis.Color.names.red);
                verticesViewer.radiusAbsolute = 1;
                verticesViewer.go();

                let verticesViewer1 = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
                verticesViewer1.color = new mathis.Color(mathis.Color.names.black);
                verticesViewer1.radiusAbsolute = 0.3;
                verticesViewer1.go();



            });

            //action.frameInterval = 5;
            action.nbTimesThisActionMustBeFired = 50;

            // mathisFrame.cleanAllPeriodicActions();
            mathisFrame.pushPeriodicAction(action);
        }
    }
}