module mathis {
    export module display {
        export function tests() {



            let mathisFrame = new mathis.MathisFrame();

            let mamesh = new mathis.Mamesh();

            function outbreak(N,b) {
                let max_t = 20;
                let I = 1;
                let S = N-1;
                let incidence = [{t:0, I:I}];
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








            let N=20;
            let b = 0.01;
            let t = 1;
            let max_t = 20;
            let I = 1;
            let S = N-1;
            let incidence = [];
            let action = new mathis.PeriodicAction(function () {
                t += 0.1;
                let p_inf = 1.0-Math.exp(-b*I/N);
                let new_I = 0;

                for (let i = 0; i < S; i++) {
                    if (Math.random() < p_inf) {
                            new_I++;
                    }
                }

                incidence.push(new_I);

                for (let i=0; i<new_I;i++){

                }




                S -= new_I;
                I = new_I;

                let vertex = new mathis.Vertex();
                vertex.position = test;
                mamesh.vertices.push(vertex);


                cc('I',I)

            });


            action.frameInterval = 5;
            action.nbTimesThisActionMustBeFired = 20;

            mathisFrame.cleanAllPeriodicActions();
            mathisFrame.pushPeriodicAction(action);


        }
    }
}







