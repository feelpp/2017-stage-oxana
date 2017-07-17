var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function static2() {
            var mathisFrame = new mathis.MathisFrame();
            var interpolationStyle = mathis.geometry.InterpolationStyle.none;
            var chainSize = 10;
            var mamesh = new mathis.Mamesh();
            /**check if a raw belongs to a matrix*/
            function contains(points, onePoint) {
                for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                    var point = points_1[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            }
            var security = 10;
            var NOTfinished = true;
            var attempts = 0;
            var min = -1;
            var max = 2;
            // allJumps stores all possibles steps in 3D on [-1;1]- 0,0,0 ; 0,1,1; -1,0,1; etc
            var allJumps = [];
            var none = new mathis.XYZ(0, 0, 0);
            allJumps.push(none);
            while (allJumps.length < 27) {
                var alea1 = Math.floor(Math.random() * (max - min)) + min;
                var alea2 = Math.floor(Math.random() * (max - min)) + min;
                var alea3 = Math.floor(Math.random() * (max - min)) + min;
                var coordinates = new mathis.XYZ(alea1, alea2, alea3);
                if (!contains(allJumps, coordinates)) {
                    allJumps.push(coordinates);
                }
            }
            //cc('allJumps', allJumps)
            //cc('allJumps length', allJumps.length)
            //first vertex
            var x = 0;
            var y = 0;
            var z = 0;
            var origin = new mathis.XYZ(x, y, z);
            //Updating mamesh.vertices
            var vertex0 = new mathis.Vertex();
            vertex0.position = origin;
            mamesh.vertices.push(vertex0);
            // validatedVertexes stores all the validated vertexes
            var validatedVertexes = [];
            validatedVertexes[0] = new mathis.XYZ(x, y, z);
            cc('validatedVertexes[0]', validatedVertexes[0]);
            while (NOTfinished && attempts < security) {
                for (var j = 1; j < chainSize - 1; j++) {
                    //First, we must sort allJumps and choose those, that will not lead to intersection
                    //We'll keep them in availableJumps
                    var availableJumps = [];
                    for (var i = 0; i < allJumps.length; i++) {
                        //Get the last validated vertex  , check if this vertex is really new; if so - add to availableJumps
                        var testJump = new mathis.XYZ(validatedVertexes[j - 1].x + allJumps[i].x, validatedVertexes[j - 1].y + allJumps[i].y, validatedVertexes[j - 1].z + allJumps[i].z);
                        if (!contains(validatedVertexes, testJump)) {
                            availableJumps.push(allJumps[i]);
                        }
                        else {
                            cc('testJump=testJump.add(allJumps[i]) NOT OK', testJump);
                        }
                    }
                    cc('availableJumps', availableJumps);
                    //Now we have a list of available jumps at step i that won't lead to self intersection.
                    if (availableJumps.length > 0) {
                        var randomStep = availableJumps[Math.floor(Math.random() * availableJumps.length)];
                        cc('validatedVertexes[j-1]', validatedVertexes[j - 1]);
                        cc('randomStep', randomStep);
                        var newVertex = new mathis.XYZ(validatedVertexes[j - 1].x + randomStep.x, validatedVertexes[j - 1].y + randomStep.y, validatedVertexes[j - 1].z + randomStep.z);
                        validatedVertexes.push(newVertex);
                        var vertex = new mathis.Vertex();
                        vertex.position = newVertex;
                        mamesh.vertices.push(vertex);
                        cc('We add ', newVertex);
                        if (validatedVertexes.length > chainSize) {
                            break;
                        }
                    }
                    else {
                        attempts++;
                        cc('Cul de sac!');
                        while (mamesh.vertices.length > 0) {
                            mamesh.vertices.pop();
                        }
                        break;
                    }
                }
                NOTfinished = (validatedVertexes.length < chainSize);
            }
            cc('validatedVertexes', validatedVertexes);
            cc('Attempts', attempts);
            for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
            }
            mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
            mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.go();
            var verticesViewer = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            verticesViewer.go();
        }
        polymer.static2 = static2;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var epi;
    (function (epi) {
        function epi1() {
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
            function contains(points, onePoint) {
                for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
                    var point = points_2[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            }
            //shuffles an array
            function shuffleA(arrayToShuffle) {
                for (var i = arrayToShuffle.length; i; i--) {
                    var j = Math.floor(Math.random() * i);
                    _a = [arrayToShuffle[j], arrayToShuffle[i - 1]], arrayToShuffle[i - 1] = _a[0], arrayToShuffle[j] = _a[1];
                }
                var _a;
            }
            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            }
            var mathisFrame = new mathis.MathisFrame();
            var mamesh = new mathis.Mamesh();
            // We consider a domain W=NxN, where all not taken spots are healthy people */
            var N = 10;
            //Initial SIR
            var S = [];
            var I = [];
            var R = [];
            //First infected person
            I[0] = new mathis.XYZ(0, 0, 0);
            I[1] = new mathis.XYZ(10, 10, 10);
            //I[2]=new XYZ(-4,6,-3);
            var vertex0 = new mathis.Vertex();
            vertex0.position = I[0];
            var vertex1 = new mathis.Vertex();
            vertex1.position = I[1];
            //var vertex2 = new mathis.Vertex();
            //vertex2.position=I[2];
            mamesh.vertices.push(vertex0, vertex1);
            //All jumps  (3^3=27)
            var allJumps = [];
            var allJumpsCheck = true;
            var min = -1;
            var max = 2;
            while (allJumpsCheck) {
                var alea1 = Math.floor(Math.random() * (max - min)) + min;
                var alea2 = Math.floor(Math.random() * (max - min)) + min;
                var alea3 = Math.floor(Math.random() * (max - min)) + min;
                var coordinates = new mathis.XYZ(alea1, alea2, alea3);
                if (!contains(allJumps, coordinates)) {
                    allJumps.push(coordinates);
                }
                allJumpsCheck = (allJumps.length < 27);
            }
            cc('allJumps', allJumps);
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
            var notEpidemy = true;
            var newlyInfected = 0;
            var I_test = [];
            I_test[0] = new mathis.XYZ(0, 0, 0);
            I_test[1] = new mathis.XYZ(7, 6, 7);
            var I_delta_step = [];
            I_delta_step[0] = new mathis.XYZ(0, 0, 0);
            I_delta_step[1] = new mathis.XYZ(7, 6, 7);
            while (notEpidemy) {
                for (var j = 0; j < I_test.length; j++) {
                    for (var i = 0; i < allJumps.length; i++) {
                        var test = new mathis.XYZ(I_test[j].x + allJumps[i].x, I_test[j].y + allJumps[i].y, I_test[j].z + allJumps[i].z);
                        var personsToInfect = Math.floor(Math.random() * (100 - 1)) + 1;
                        if (!(contains(I_delta_step, test)) && (personsToInfect == 3)) {
                            I_delta_step.push(test);
                            var vertex = new mathis.Vertex();
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
                notEpidemy = (newlyInfected < 55);
                I_test = I_delta_step;
                shuffle(I_test);
                //*******HERE COMES THE BUG****if more than 5/
            }
            cc('notEpidemy !!', newlyInfected);
            cc('vertices !!', mamesh.vertices.length);
            for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
            }
            mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
            mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.color = new mathis.Color(mathis.Color.names.silver);
            //linkViewer.go();
            var verticesViewer = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            verticesViewer.vertices = [mamesh.vertices[0], mamesh.vertices[1]];
            verticesViewer.color = new mathis.Color(mathis.Color.names.red);
            verticesViewer.radiusAbsolute = 1;
            verticesViewer.go();
            var verticesViewer1 = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            verticesViewer1.color = new mathis.Color(mathis.Color.names.black);
            verticesViewer1.radiusAbsolute = 0.3;
            verticesViewer1.go();
        }
        epi.epi1 = epi1;
    })(epi = mathis.epi || (mathis.epi = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function pivot() {
            var mathisFrame = new mathis.MathisFrame();
            var mamesh = new mathis.Mamesh();
            var mamesh2 = new mathis.Mamesh();
            //A given SAW
            var vertex0 = new mathis.Vertex().setPosition(0, 0, 0); //0
            var vertex1 = new mathis.Vertex().setPosition(-1, 0, 1); //1
            var vertex2 = new mathis.Vertex().setPosition(0, 0, 1); //2
            var vertex3 = new mathis.Vertex().setPosition(1, 0, 1); //3
            var vertex4 = new mathis.Vertex().setPosition(1, 1, 0); //4
            var vertex5 = new mathis.Vertex().setPosition(2, 2, 0); //5
            var vertex6 = new mathis.Vertex().setPosition(2, 3, -1); //6
            var vertex7 = new mathis.Vertex().setPosition(3, 3, -2); //7
            var vertex8 = new mathis.Vertex().setPosition(3, 4, -3); //8
            var vertex9 = new mathis.Vertex().setPosition(3, 5, -2); //9
            mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9);
            // function that checks the list of used coordinates
            function contains(points, onePoint) {
                for (var _i = 0, points_3 = points; _i < points_3.length; _i++) {
                    var point = points_3[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            }
            // function that replaces a value 1 at i by value 2
            function replaceValue(array, valueToReplace, newValue) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == valueToReplace) {
                        array[i] = newValue;
                    }
                }
            }
            // function that find index of a given value in a given array
            function findIndex(array, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == value) {
                        var res = i;
                    }
                }
                return res;
            }
            //All initial the coordinates are stocked in ALLc (XYZ)
            var ALLc = [mamesh.vertices[0].position, mamesh.vertices[1].position, mamesh.vertices[2].position,
                mamesh.vertices[3].position, mamesh.vertices[4].position, mamesh.vertices[5].position,
                mamesh.vertices[6].position, mamesh.vertices[7].position, mamesh.vertices[8].position,
                mamesh.vertices[9].position];
            //Counter for unsuccessful attempts
            var attempts = 1;
            //Nb of chains generated (=nb of operations)
            var chain = 1;
            //pre-chain is not validated subchain (Let subchain length e equal to 4, so prechain becomes subchain when prechain = 4)
            var prechain = 0;
            var NOTfinished = true;
            // All modified coordinates are stored in ALLc_new
            var ALLc_new = ALLc;
            while (NOTfinished) {
                var ALLc_prenew = ALLc_new;
                // Choose a random vertex (by index) in ALLc
                var randomVertex = Math.floor(Math.random() * (ALLc_new.length - 1 - 0)) + 0;
                cc('Random Vertex in ALLc_new', ALLc_new[randomVertex]);
                //Learn its value
                var indexOfVertex = ALLc_new.indexOf(ALLc_new[randomVertex]);
                var myIndex = findIndex(ALLc_new, ALLc_new[randomVertex]);
                cc('Index of the chosen vertex', indexOfVertex);
                //cc('MyIndex', myIndex);
                // Choose randomly one of 7 operations of refletion (over x,y,z,xy,xz,yz or xyz plane)
                var randomOperation = Math.floor(Math.random() * (7 - 0)) + 0;
                //let randomOperation= 0;
                cc('Chosen reflexion operation', randomOperation);
                // Choose randomly a subchain
                var subChain = [];
                subChain = ALLc_new;
                var randomSubChain = Math.floor(Math.random() * (2 - 0)) + 0;
                if (randomSubChain == 0) {
                    subChain = subChain.slice(0, myIndex + 1);
                    cc('Chosen subChain: from head to random vertex ', subChain);
                }
                else {
                    subChain = subChain.slice(myIndex, ALLc_new.length);
                    cc('Chosen subChain:  from random vertex to tail ', subChain);
                }
                if (randomOperation == 0) {
                    for (var i = 0; i < subChain.length; i++) {
                        var x = mamesh.vertices[i].position.x;
                        var y = mamesh.vertices[i].position.y;
                        var z = mamesh.vertices[i].position.z;
                        var coordinateOld = new mathis.XYZ(x, y, z);
                        var x_s = mamesh.vertices[randomVertex].position.x;
                        var x_n = x_s + (x_s - x);
                        var coordinateNew = new mathis.XYZ(x_n, y, z);
                        //cc('New x,y,z', x_n, y_n, z_n);
                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain = 0;
                            //ALLc_new=ALLc;
                            break;
                        }
                    }
                    ALLc_new = ALLc_prenew;
                    chain = chain + prechain;
                    cc('Validated steps so far', chain);
                }
                else if (randomOperation == 1) {
                    for (var i = 0; i < subChain.length; i++) {
                        var x = mamesh.vertices[i].position.x;
                        var y = mamesh.vertices[i].position.y;
                        var z = mamesh.vertices[i].position.z;
                        var coordinateOld = new mathis.XYZ(x, y, z);
                        var y_s = mamesh.vertices[randomVertex].position.y;
                        var y_n = y_s + (y_s - y);
                        var coordinateNew = new mathis.XYZ(x, y_n, z);
                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain = 0;
                            //ALLc_new=ALLc;
                            break;
                        }
                    }
                    ALLc_new = ALLc_prenew;
                    chain = chain + prechain;
                    cc('Validated steps so far', chain);
                }
                else if (randomOperation == 2) {
                    for (var i = 0; i < subChain.length; i++) {
                        var x = mamesh.vertices[i].position.x;
                        var y = mamesh.vertices[i].position.y;
                        var z = mamesh.vertices[i].position.z;
                        var coordinateOld = new mathis.XYZ(x, y, z);
                        var z_s = mamesh.vertices[randomVertex].position.z;
                        var z_n = z_s + (z_s - z);
                        var coordinateNew = new mathis.XYZ(x, y, z_n);
                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain = 0;
                            //ALLc_new=ALLc;
                            break;
                        }
                    }
                    ALLc_new = ALLc_prenew;
                    chain = chain + prechain;
                    cc('Validated steps so far', chain);
                }
                else if (randomOperation == 3) {
                    for (var i = 0; i < subChain.length; i++) {
                        var x = mamesh.vertices[i].position.x;
                        var y = mamesh.vertices[i].position.y;
                        var z = mamesh.vertices[i].position.z;
                        var coordinateOld = new mathis.XYZ(x, y, z);
                        var x_s = mamesh.vertices[randomVertex].position.x;
                        var x_n = x_s + (x_s - x);
                        var y_s = mamesh.vertices[randomVertex].position.y;
                        var y_n = y_s + (y_s - y);
                        var coordinateNew = new mathis.XYZ(x_n, y_n, z);
                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain = 0;
                            //ALLc_new=ALLc;
                            break;
                        }
                    }
                    ALLc_new = ALLc_prenew;
                    chain = chain + prechain;
                    cc('Validated steps so far', chain);
                }
                else if (randomOperation == 4) {
                    for (var i = 0; i < subChain.length; i++) {
                        var x = mamesh.vertices[i].position.x;
                        var y = mamesh.vertices[i].position.y;
                        var z = mamesh.vertices[i].position.z;
                        var coordinateOld = new mathis.XYZ(x, y, z);
                        var x_s = mamesh.vertices[randomVertex].position.x;
                        var x_n = x_s + (x_s - x);
                        var z_s = mamesh.vertices[randomVertex].position.z;
                        var z_n = z_s + (z_s - z);
                        var coordinateNew = new mathis.XYZ(x_n, y, z_n);
                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain = 0;
                            //ALLc_new=ALLc;
                            break;
                        }
                    }
                    ALLc_new = ALLc_prenew;
                    chain = chain + prechain;
                    cc('Validated steps so far', chain);
                }
                else if (randomOperation == 5) {
                    for (var i = 0; i < subChain.length; i++) {
                        var x = mamesh.vertices[i].position.x;
                        var y = mamesh.vertices[i].position.y;
                        var z = mamesh.vertices[i].position.z;
                        var coordinateOld = new mathis.XYZ(x, y, z);
                        var y_s = mamesh.vertices[randomVertex].position.y;
                        var y_n = y_s + (y_s - y);
                        var z_s = mamesh.vertices[randomVertex].position.z;
                        var z_n = z_s + (z_s - z);
                        var coordinateNew = new mathis.XYZ(x, y_n, z_n);
                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain = 0;
                            //ALLc_new=ALLc;
                            break;
                        }
                    }
                    ALLc_new = ALLc_prenew;
                    chain = chain + prechain;
                    cc('Validated steps so far', chain);
                }
                else if (randomOperation == 6) {
                    for (var i = 0; i < subChain.length; i++) {
                        var x = mamesh.vertices[i].position.x;
                        var y = mamesh.vertices[i].position.y;
                        var z = mamesh.vertices[i].position.z;
                        var coordinateOld = new mathis.XYZ(x, y, z);
                        //cc('Old x,y,z', x, y, z);
                        var x_s = mamesh.vertices[randomVertex].position.x;
                        var x_n = x_s + (x_s - x);
                        var y_s = mamesh.vertices[randomVertex].position.y;
                        var y_n = y_s + (y_s - y);
                        var z_s = mamesh.vertices[randomVertex].position.z;
                        var z_n = z_s + (z_s - z);
                        var coordinateNew = new mathis.XYZ(x_n, y_n, z_n);
                        //cc('New x,y,z', x_n, y_n, z_n);
                        if (!contains(ALLc_new, coordinateNew)) {
                            replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                            prechain++;
                        }
                        else {
                            cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                            attempts++;
                            prechain = 0;
                            //ALLc_new=ALLc;
                            break;
                        }
                    }
                    ALLc_new = ALLc_prenew;
                    chain = chain + prechain;
                    cc('How many chains are generated?:', chain);
                }
                NOTfinished = (chain < 2);
            }
            cc('Chain is done!:', ALLc_new);
            cc('Attempts:', attempts);
            for (var i = 0; i < ALLc_new.length; i++) {
                var vertex = new mathis.Vertex();
                vertex.position = ALLc_new[i];
                mamesh2.vertices.push(vertex);
            }
            var verticesViewer2 = new mathis.visu3d.VerticesViewer(mamesh2, mathisFrame.scene);
            verticesViewer2.radiusAbsolute = 0.3;
            verticesViewer2.go();
            for (var i = 1; i < mamesh2.vertices.length - 1; i++) {
                mamesh2.vertices[i].setTwoOppositeLinks(mamesh2.vertices[i - 1], mamesh2.vertices[i + 1]);
            }
            mamesh2.vertices[0].setOneLink(mamesh2.vertices[1]);
            mamesh2.vertices[mamesh2.vertices.length - 1].setOneLink(mamesh2.vertices[mamesh2.vertices.length - 2]);
            var linkViewer2 = new mathis.visu3d.LinksViewer(mamesh2, mathisFrame.scene);
            linkViewer2.radiusAbsolute = 0.01;
            linkViewer2.go();
            for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
            }
            mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
            mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.color = new mathis.Color(mathis.Color.names.yellow);
            linkViewer.radiusAbsolute = 0.01;
            linkViewer.go();
            var verticesViewer = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            verticesViewer.color = new mathis.Color(mathis.Color.names.blueviolet);
            verticesViewer.radiusAbsolute = 0.1;
            verticesViewer.go();
        }
        polymer.pivot = pivot;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var display;
    (function (display) {
        function show() {
            var mathisFrame = new mathis.MathisFrame();
            var mamesh = new mathis.Mamesh();
            var y = 10;
            var x = 14;
            //bottom
            var vertexH0 = new mathis.Vertex().setPosition(2, 1, 0); //0
            var vertexH1 = new mathis.Vertex().setPosition(2, 3, 0); //1
            var vertexH2 = new mathis.Vertex().setPosition(4, 5, 0); //2
            var vertexH3 = new mathis.Vertex().setPosition(12, 1, 0); //3
            var vertexH4 = new mathis.Vertex().setPosition(12, 3, 0); //4
            var vertexH5 = new mathis.Vertex().setPosition(10, 5, 0); //5
            var vertexC0 = new mathis.Vertex().setPosition(3, 2, 0); //6
            var vertexC1 = new mathis.Vertex().setPosition(11, 2, 0); //7
            var vertexC2 = new mathis.Vertex().setPosition(5, 4, 0); //8
            var vertexC3 = new mathis.Vertex().setPosition(9, 4, 0); //9
            var vertexOUT1 = new mathis.Vertex().setPosition(0, 2, 0); //10
            var vertexH0i = new mathis.Vertex().setPosition(2 + x, 1, 0); //11
            var vertexH1i = new mathis.Vertex().setPosition(2 + x, 3, 0); //12
            var vertexH2i = new mathis.Vertex().setPosition(4 + x, 5, 0); //13
            var vertexH3i = new mathis.Vertex().setPosition(12 + x, 1, 0); //14
            var vertexH4i = new mathis.Vertex().setPosition(12 + x, 3, 0); //15
            var vertexH5i = new mathis.Vertex().setPosition(10 + x, 5, 0); //16
            var vertexC0i = new mathis.Vertex().setPosition(3 + x, 2, 0); //17
            var vertexC1i = new mathis.Vertex().setPosition(11 + x, 2, 0); //18
            var vertexC2i = new mathis.Vertex().setPosition(5 + x, 4, 0); //19
            var vertexC3i = new mathis.Vertex().setPosition(9 + x, 4, 0); //20
            var vertexOUT2 = new mathis.Vertex().setPosition(14 + x, 2, 0); //21
            //top
            var vertex2H0 = new mathis.Vertex().setPosition(2, 1 + y, 0); //22
            var vertex2H1 = new mathis.Vertex().setPosition(2, 3 + y, 0); //23
            var vertex2H2 = new mathis.Vertex().setPosition(4, 5 + y, 0); //24
            var vertex2H3 = new mathis.Vertex().setPosition(12, 1 + y, 0); //25
            var vertex2H4 = new mathis.Vertex().setPosition(12, 3 + y, 0); //26
            var vertex2H5 = new mathis.Vertex().setPosition(10, 5 + y, 0); //27
            var vertex2C0 = new mathis.Vertex().setPosition(3, 2 + y, 0); //28
            var vertex2C1 = new mathis.Vertex().setPosition(11, 2 + y, 0); //29
            var vertex2C2 = new mathis.Vertex().setPosition(5, 4 + y, 0); //30
            var vertex2C3 = new mathis.Vertex().setPosition(9, 4 + y, 0); //31
            var vertex2OUT1 = new mathis.Vertex().setPosition(0, 2 + y, 0); //32
            var vertex2H0i = new mathis.Vertex().setPosition(2 + x, 1 + y, 0); //33
            var vertex2H1i = new mathis.Vertex().setPosition(2 + x, 3 + y, 0); //34
            var vertex2H2i = new mathis.Vertex().setPosition(4 + x, 5 + y, 0); //35
            var vertex2H3i = new mathis.Vertex().setPosition(12 + x, 1 + y, 0); //36
            var vertex2H4i = new mathis.Vertex().setPosition(12 + x, 3 + y, 0); //37
            var vertex2H5i = new mathis.Vertex().setPosition(10 + x, 5 + y, 0); //38
            var vertex2C0i = new mathis.Vertex().setPosition(3 + x, 2 + y, 0); //39
            var vertex2C1i = new mathis.Vertex().setPosition(11 + x, 2 + y, 0); //40
            var vertex2C2i = new mathis.Vertex().setPosition(5 + x, 4 + y, 0); //41
            var vertex2C3i = new mathis.Vertex().setPosition(9 + x, 4 + y, 0); //42
            var vertex2OUT2 = new mathis.Vertex().setPosition(14 + x, 2 + y, 0); //43
            //soufre
            var s1 = new mathis.Vertex().setPosition(5, 7, 0); //44
            var s2 = new mathis.Vertex().setPosition(5, 11, 0); //45
            var s3 = new mathis.Vertex().setPosition(19, 9, 0); //46
            var s11 = new mathis.Vertex().setPosition(9, 1, 0); //47
            var s22 = new mathis.Vertex().setPosition(9, 17, 0); //48
            var s33 = new mathis.Vertex().setPosition(19, 1, 0); //49
            var s44 = new mathis.Vertex().setPosition(23, 17, 0); //50
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
            mamesh.vertices.push(vertexH0, vertexH1, vertexH2, vertexH3, vertexH4, vertexH5, vertexC0, vertexC1, vertexC2, vertexC3, vertexOUT1, vertexH0i, vertexH1i, vertexH2i, vertexH3i, vertexH4i, vertexH5i, vertexC0i, vertexC1i, vertexC2i, vertexC3i, vertexOUT2, vertex2H0, vertex2H1, vertex2H2, vertex2H3, vertex2H4, vertex2H5, vertex2C0, vertex2C1, vertex2C2, vertex2C3, vertex2OUT1, vertex2H0i, vertex2H1i, vertex2H2i, vertex2H3i, vertex2H4i, vertex2H5i, vertex2C0i, vertex2C1i, vertex2C2i, vertex2C3i, vertex2OUT2, s1, s2, s3, s11, s22, s33, s44);
            //mamesh.vertices.push(v1,v2,v3,v4,v5,v6,v7,v8,v9,v10);
            // pour Carbone
            mamesh.vertices[0].setOneLink(mamesh.vertices[6]);
            mamesh.vertices[1].setOneLink(mamesh.vertices[6]);
            mamesh.vertices[6].setTwoOppositeLinks(mamesh.vertices[0], mamesh.vertices[8]);
            mamesh.vertices[2].setOneLink(mamesh.vertices[8]);
            mamesh.vertices[8].setTwoOppositeLinks(mamesh.vertices[6], mamesh.vertices[9]);
            mamesh.vertices[9].setOneLink(mamesh.vertices[5]);
            mamesh.vertices[7].setTwoOppositeLinks(mamesh.vertices[9], mamesh.vertices[3]);
            mamesh.vertices[7].setOneLink(mamesh.vertices[4]);
            mamesh.vertices[7].setOneLink(mamesh.vertices[3]);
            mamesh.vertices[10].setOneLink(mamesh.vertices[6]);
            var a = 11;
            mamesh.vertices[7].setOneLink(mamesh.vertices[6 + a]);
            mamesh.vertices[0 + a].setOneLink(mamesh.vertices[6 + a]);
            mamesh.vertices[1 + a].setOneLink(mamesh.vertices[6 + a]);
            mamesh.vertices[6 + a].setTwoOppositeLinks(mamesh.vertices[0 + a], mamesh.vertices[8 + a]);
            mamesh.vertices[2 + a].setOneLink(mamesh.vertices[8 + a]);
            mamesh.vertices[8 + a].setTwoOppositeLinks(mamesh.vertices[6 + a], mamesh.vertices[9 + a]);
            mamesh.vertices[9 + a].setOneLink(mamesh.vertices[5 + a]);
            mamesh.vertices[7 + a].setTwoOppositeLinks(mamesh.vertices[9 + a], mamesh.vertices[3 + a]);
            mamesh.vertices[7 + a].setOneLink(mamesh.vertices[4 + a]);
            mamesh.vertices[7 + a].setOneLink(mamesh.vertices[3 + a]);
            mamesh.vertices[10 + a].setOneLink(mamesh.vertices[7 + a]);
            a = 22;
            mamesh.vertices[0 + a].setOneLink(mamesh.vertices[6 + a]);
            mamesh.vertices[1 + a].setOneLink(mamesh.vertices[6 + a]);
            mamesh.vertices[6 + a].setTwoOppositeLinks(mamesh.vertices[0 + a], mamesh.vertices[8 + a]);
            mamesh.vertices[2 + a].setOneLink(mamesh.vertices[8 + a]);
            mamesh.vertices[8 + a].setTwoOppositeLinks(mamesh.vertices[6 + a], mamesh.vertices[9 + a]);
            mamesh.vertices[9 + a].setOneLink(mamesh.vertices[5 + a]);
            mamesh.vertices[7 + a].setTwoOppositeLinks(mamesh.vertices[9 + a], mamesh.vertices[3 + a]);
            mamesh.vertices[7 + a].setOneLink(mamesh.vertices[4 + a]);
            mamesh.vertices[7 + a].setOneLink(mamesh.vertices[3 + a]);
            mamesh.vertices[10 + a].setOneLink(mamesh.vertices[6 + a]);
            a = 33;
            mamesh.vertices[7 + 22].setOneLink(mamesh.vertices[6 + a]);
            mamesh.vertices[0 + a].setOneLink(mamesh.vertices[6 + a]);
            mamesh.vertices[1 + a].setOneLink(mamesh.vertices[6 + a]);
            mamesh.vertices[6 + a].setTwoOppositeLinks(mamesh.vertices[0 + a], mamesh.vertices[8 + a]);
            mamesh.vertices[2 + a].setOneLink(mamesh.vertices[8 + a]);
            mamesh.vertices[8 + a].setTwoOppositeLinks(mamesh.vertices[6 + a], mamesh.vertices[9 + a]);
            mamesh.vertices[9 + a].setOneLink(mamesh.vertices[5 + a]);
            mamesh.vertices[7 + a].setTwoOppositeLinks(mamesh.vertices[9 + a], mamesh.vertices[3 + a]);
            mamesh.vertices[7 + a].setOneLink(mamesh.vertices[4 + a]);
            mamesh.vertices[7 + a].setOneLink(mamesh.vertices[3 + a]);
            mamesh.vertices[10 + a].setOneLink(mamesh.vertices[7 + a]);
            //pour Soufre
            mamesh.vertices[44].setTwoOppositeLinks(mamesh.vertices[8], mamesh.vertices[45]);
            mamesh.vertices[45].setTwoOppositeLinks(mamesh.vertices[44], mamesh.vertices[30]);
            mamesh.vertices[46].setTwoOppositeLinks(mamesh.vertices[19], mamesh.vertices[42]);
            mamesh.vertices[47].setOneLink(mamesh.vertices[9]);
            mamesh.vertices[48].setOneLink(mamesh.vertices[31]);
            mamesh.vertices[49].setOneLink(mamesh.vertices[20]);
            mamesh.vertices[50].setOneLink(mamesh.vertices[41]);
            /*
             let verticesViewer2 = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //C
             verticesViewer2.vertices= [mamesh.vertices[6], mamesh.vertices[7], mamesh.vertices[8], mamesh.vertices[9]]
             verticesViewer2.color = new mathis.Color(mathis.Color.names.red);
             verticesViewer2.radiusAbsolute = 1;
             verticesViewer2.go();
             */
            var verticesViewer2 = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene); //C
            verticesViewer2.vertices = [
                mamesh.vertices[6], mamesh.vertices[7], mamesh.vertices[8], mamesh.vertices[9],
                mamesh.vertices[6 + 11], mamesh.vertices[7 + 11], mamesh.vertices[8 + 11], mamesh.vertices[9 + 11],
                mamesh.vertices[6 + 22], mamesh.vertices[7 + 22], mamesh.vertices[8 + 22], mamesh.vertices[9 + 22],
                mamesh.vertices[6 + 33], mamesh.vertices[7 + 33], mamesh.vertices[8 + 33], mamesh.vertices[9 + 33]
            ];
            verticesViewer2.color = new mathis.Color(mathis.Color.names.red);
            verticesViewer2.radiusAbsolute = 1;
            verticesViewer2.go();
            var verticesViewer = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene); //H
            verticesViewer.vertices = [
                mamesh.vertices[0], mamesh.vertices[1], mamesh.vertices[2], mamesh.vertices[3], mamesh.vertices[4], mamesh.vertices[5],
                mamesh.vertices[0 + 11], mamesh.vertices[1 + 11], mamesh.vertices[2 + 11], mamesh.vertices[3 + 11], mamesh.vertices[4 + 11], mamesh.vertices[5 + 11],
                mamesh.vertices[0 + 22], mamesh.vertices[1 + 22], mamesh.vertices[2 + 22], mamesh.vertices[3 + 22], mamesh.vertices[4 + 22], mamesh.vertices[5 + 22],
                mamesh.vertices[0 + 33], mamesh.vertices[1 + 33], mamesh.vertices[2 + 33], mamesh.vertices[3 + 33], mamesh.vertices[4 + 33], mamesh.vertices[5 + 33]
            ];
            verticesViewer.radiusAbsolute = 0.6;
            verticesViewer.color = new mathis.Color(mathis.Color.names.blue);
            verticesViewer.go();
            var verticesViewerS = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene); //S visible
            verticesViewerS.vertices = [mamesh.vertices[44], mamesh.vertices[45], mamesh.vertices[46]];
            verticesViewerS.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewerS.radiusAbsolute = 0.8;
            verticesViewerS.go();
            var verticesViewerS2 = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene); //S non visible
            verticesViewerS2.vertices = [mamesh.vertices[47], mamesh.vertices[48], mamesh.vertices[49], mamesh.vertices[50]];
            verticesViewerS2.color = new mathis.Color(mathis.Color.names.yellow);
            //verticesViewerS.go();
            var verticesViewer1 = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene); //Prochain monomère non visible
            verticesViewer1.vertices = [mamesh.vertices[10], mamesh.vertices[21], mamesh.vertices[32], mamesh.vertices[43]];
            verticesViewer1.color = new mathis.Color(mathis.Color.names.black);
            //verticesViewer1.go();
            /*
                        let verticesViewer = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //H
                        verticesViewer.vertices= [mamesh.vertices[0], mamesh.vertices[1], mamesh.vertices[2], mamesh.vertices[3], mamesh.vertices[4],mamesh.vertices[5]];
                        verticesViewer.radiusAbsolute = 0.6;
                        verticesViewer.color = new mathis.Color(mathis.Color.names.blue);
                        verticesViewer.go();
            */
            /*            let linkViewer =new visu3d.LinksViewer(mamesh,mathisFrame.scene);
                        let model;
                        let model1 = BABYLON.Mesh.CreateCylinder("", 1,1,1,12,12,mathisFrame.scene);
                        model1.position.x +=1;
                        model1.bakeCurrentTransformIntoVertices();
                        let model2 = BABYLON.Mesh.CreateCylinder("", 1,1,1,12,12,mathisFrame.scene);
                        model2.position.x -=1;
                        model2.bakeCurrentTransformIntoVertices();
                        model = BABYLON.Mesh.MergeMeshes([model1, model2]);
                        linkViewer.color = new mathis.Color(mathis.Color.names.green);
                        linkViewer.meshModel= model;
                        let segmentOrientationFunction;
            
                        function contains(oneVertex: Vertex, listOfVertexes: Vertex[]){
                            for (let v of listOfVertexes){
                                if (geo.distance(v.position,oneVertex.position)<0.0001) {
                                    return true
                                }
                            }
                            return false
                        }
            
                        let doubles: Vertex[]= [];
                        doubles=[mamesh.vertices[8],mamesh.vertices[9],mamesh.vertices[19],mamesh.vertices[20], mamesh.vertices[30],mamesh.vertices[31],mamesh.vertices[41],mamesh.vertices[42]];
            
                        //let doubles1: Vertex[]= [];
                        //let doubles2: Vertex[]= [];
                        //doubles1=[mamesh.vertices[6],mamesh.vertices[7]];
                        //doubles2 = [mamesh.vertices[8],mamesh.vertices[9]];
            
            
            
            
                        segmentOrientationFunction =  (v1:Vertex, v2: Vertex)=> {
            
                            if ((!contains(v1, doubles)) || (!(contains(v2, doubles))))   {
                                return 0;
                            }
            
                            else {
                                return 1;
                            }
            
                        };
            
                        linkViewer.segmentOrientationFunction = segmentOrientationFunction;
                        //linkViewer.go();
            
            
            
            
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
                        //linkViewer1.go();
            */
            var linkViewer0 = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer0.color = new mathis.Color(mathis.Color.names.black);
            linkViewer0.go();
        }
        display.show = show;
    })(display = mathis.display || (mathis.display = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        var SAW_Creator_static = (function () {
            function SAW_Creator_static() {
                this.chainSize = 10;
            }
            /**check if a raw belongs to a matrix*/
            SAW_Creator_static.prototype.contains = function (points, onePoint) {
                for (var _i = 0, points_4 = points; _i < points_4.length; _i++) {
                    var point = points_4[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            };
            SAW_Creator_static.prototype.go = function () {
                var NOTfinished = true;
                var security = 100;
                var attempts = 0;
                var min = -1;
                var max = 2;
                var mamesh = new mathis.Mamesh();
                while (NOTfinished && attempts < security) {
                    var x = 0;
                    var y = 0;
                    var z = 0;
                    var ALLcoordinates = [];
                    ALLcoordinates[0] = new mathis.XYZ(x, y, z);
                    for (var i = 1; i < this.chainSize; i++) {
                        var alea1 = Math.floor(Math.random() * (max - min)) + min;
                        var alea2 = Math.floor(Math.random() * (max - min)) + min;
                        var alea3 = Math.floor(Math.random() * (max - min)) + min;
                        cc('aleas:', alea1, alea2, alea3);
                        x = alea1 + x;
                        y = alea2 + y;
                        z = alea3 + z;
                        //initialisation?
                        var coordinates = new mathis.XYZ(x, y, z);
                        cc('coordinates', coordinates);
                        if (!this.contains(ALLcoordinates, coordinates)) {
                            var vertex = new mathis.Vertex();
                            vertex.position = coordinates;
                            ALLcoordinates.push(coordinates);
                            mamesh.vertices.push(vertex);
                        }
                        else {
                            cc('This one is already taken!', coordinates);
                            attempts++;
                            while (mamesh.vertices.length > 0) {
                                mamesh.vertices.pop();
                            }
                            break;
                        }
                    }
                    NOTfinished = (ALLcoordinates.length < this.chainSize);
                }
                for (var i_1 = 1; i_1 < mamesh.vertices.length - 1; i_1++) {
                    mamesh.vertices[i_1].setTwoOppositeLinks(mamesh.vertices[i_1 - 1], mamesh.vertices[i_1 + 1]);
                }
                mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
                return mamesh;
            };
            return SAW_Creator_static;
        }());
        polymer.SAW_Creator_static = SAW_Creator_static;
        function static1() {
            var mathisFrame = new mathis.MathisFrame();
            var interpolationStyle = mathis.geometry.InterpolationStyle.none;
            var chainSize = 10;
            var dims = 3;
            var mamesh = new mathis.Mamesh();
            /**check if a raw belongs to a matrix*/
            function contains(points, onePoint) {
                for (var _i = 0, points_5 = points; _i < points_5.length; _i++) {
                    var point = points_5[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            }
            var min = -1;
            var max = 2;
            var security = 100;
            var NOTfinished = true;
            var attempts = 0;
            while (NOTfinished && attempts < security) {
                var x = 0;
                var y = 0;
                var z = 0;
                var ALLcoordinates = [];
                ALLcoordinates[0] = new mathis.XYZ(x, y, z);
                for (var i = 1; i < chainSize; i++) {
                    var alea1 = Math.floor(Math.random() * (max - min)) + min;
                    var alea2 = Math.floor(Math.random() * (max - min)) + min;
                    var alea3 = Math.floor(Math.random() * (max - min)) + min;
                    cc('aleas:', alea1, alea2, alea3);
                    x = alea1 + x;
                    y = alea2 + y;
                    z = alea3 + z;
                    //initialisation?
                    var coordinates = new mathis.XYZ(x, y, z);
                    cc('coordinates', coordinates);
                    if (!contains(ALLcoordinates, coordinates)) {
                        var vertex = new mathis.Vertex();
                        vertex.position = coordinates;
                        ALLcoordinates.push(coordinates);
                        mamesh.vertices.push(vertex);
                    }
                    else {
                        cc('This one is already taken!', coordinates);
                        attempts++;
                        while (mamesh.vertices.length > 0) {
                            mamesh.vertices.pop();
                        }
                        break;
                    }
                }
                NOTfinished = (ALLcoordinates.length < chainSize);
            }
            if (attempts == security) {
                mathisFrame.messageDiv.append("Chain IS NOT FINISHED)");
                mathis.logger.c('CHAIN IS NOT FINISHED');
            }
            for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
            }
            mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
            mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
            console.log(mamesh.toString());
            cc('ALLcoordinates', ALLcoordinates);
            //mathisFrame.messageDiv.append("Chain size:" + chainSize);
            //mathisFrame.messageDiv.append("Attempts before success:" + (attempts));
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
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.color = new mathis.Color(mathis.Color.names.silver);
            linkViewer.go();
            //let vertexViewer=new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            //vertexViewer.go();
            cc('Attempts before success:', attempts);
            //first vertex
            var verticesViewer0 = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            verticesViewer0.vertices = [mamesh.vertices[0]];
            verticesViewer0.color = new mathis.Color(mathis.Color.names.blueviolet);
            verticesViewer0.go();
            //others
            var verticesViewer1 = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            //             verticesViewer1.vertices = [];
            verticesViewer1.go();
        }
        polymer.static1 = static1;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function snake() {
            var mathisFrame = new mathis.MathisFrame();
            var mamesh = new mathis.Mamesh();
            //A given SAW
            var vertex0 = new mathis.Vertex().setPosition(0, 0, 0); //0
            var vertex1 = new mathis.Vertex().setPosition(-1, 0, 1); //1
            var vertex2 = new mathis.Vertex().setPosition(0, 0, 1); //2
            var vertex3 = new mathis.Vertex().setPosition(1, 0, 1); //3
            var vertex4 = new mathis.Vertex().setPosition(1, 1, 0); //4
            var vertex5 = new mathis.Vertex().setPosition(2, 2, 0); //5
            var vertex6 = new mathis.Vertex().setPosition(2, 3, -1); //6
            var vertex7 = new mathis.Vertex().setPosition(3, 3, 0); //7
            var vertex8 = new mathis.Vertex().setPosition(3, 4, 0); //8
            var vertex9 = new mathis.Vertex().setPosition(3, 5, -1); //9
            mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9);
            // function that checks thes list of used coordinates
            function contains(points, onePoint) {
                for (var _i = 0, points_6 = points; _i < points_6.length; _i++) {
                    var point = points_6[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            }
            //All the coordinates are stocked in ALLc
            var ALLc = [mamesh.vertices[0].position, mamesh.vertices[1].position, mamesh.vertices[2].position,
                mamesh.vertices[3].position, mamesh.vertices[4].position, mamesh.vertices[5].position,
                mamesh.vertices[6].position, mamesh.vertices[7].position, mamesh.vertices[8].position,
                mamesh.vertices[9].position];
            //Counter for unsuccessful attempts
            var attempts = 0;
            //Nb of generated chains  (=nb of operations)
            var chain = 0;
            var NOTfinished = true;
            var max = 2;
            var min = 0;
            while (NOTfinished) {
                // Choose randomly the end to delete:
                var choice = Math.floor(Math.random() * (max - min)) + min;
                //delete head, go to tail
                if (choice == 0) {
                    var x = mamesh.vertices[mamesh.vertices.length - 1].position.x;
                    var y = mamesh.vertices[mamesh.vertices.length - 1].position.y;
                    var z = mamesh.vertices[mamesh.vertices.length - 1].position.z;
                    var alea_x = Math.floor(Math.random() * (max - min)) + min;
                    var alea_y = Math.floor(Math.random() * (max - min)) + min;
                    var alea_z = Math.floor(Math.random() * (max - min)) + min;
                    cc('TAIL-xyz old:', x, y, z);
                    var xN = alea_x + x;
                    var yN = alea_y + y;
                    var zN = alea_z + z;
                    cc('TAIL-xyz new:', xN, yN, zN);
                    var coordinate = new mathis.XYZ(xN, yN, zN);
                    if (!contains(ALLc, coordinate)) {
                        mamesh.vertices.shift();
                        ALLc.shift();
                        var vertex = new mathis.Vertex();
                        vertex.position = coordinate;
                        mamesh.vertices.push(vertex);
                        ALLc.push(coordinate);
                        chain++;
                    }
                    else {
                        cc('This one is already taken- go back!', coordinate);
                        attempts++;
                    }
                }
                else {
                    var x = mamesh.vertices[0].position.x;
                    var y = mamesh.vertices[0].position.y;
                    var z = mamesh.vertices[0].position.z;
                    var alea_x = Math.floor(Math.random() * (max - min)) + min;
                    var alea_y = Math.floor(Math.random() * (max - min)) + min;
                    var alea_z = Math.floor(Math.random() * (max - min)) + min;
                    cc('HEAD-xyz old:', x, y, z);
                    var xN = alea_x + x;
                    var yN = alea_y + y;
                    var zN = alea_z + z;
                    cc('HEAD xyz new:', xN, yN, zN);
                    var coordinate = new mathis.XYZ(xN, yN, zN);
                    if (!contains(ALLc, coordinate)) {
                        var vertex = new mathis.Vertex();
                        mamesh.vertices.pop();
                        ALLc.pop();
                        vertex.position = coordinate;
                        mamesh.vertices.unshift(vertex);
                        ALLc.unshift(coordinate);
                        chain++;
                    }
                    else {
                        cc('This one is already taken- go back!', coordinate);
                        attempts++;
                    }
                }
                NOTfinished = (chain < 10);
            }
            cc('atempts:', attempts);
            cc('How many chains are generated?:', chain);
            for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
            }
            mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
            mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.radiusAbsolute = 0.01;
            linkViewer.go();
            var verticesViewer = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            verticesViewer.radiusAbsolute = 0.1;
            verticesViewer.go();
        }
        polymer.snake = snake;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var display;
    (function (display) {
        function tests() {
            var mathisFrame = new mathis.MathisFrame();
            var interpolationStyle = mathis.geometry.InterpolationStyle.none;
            var nb = 8;
            var mamesh = new mathis.Mamesh();
            for (var i = 0; i < nb; i++) {
                var vertex = new mathis.Vertex();
                var angle = 2 * Math.PI * i / (nb);
                vertex.position = new mathis.XYZ(Math.cos(angle), Math.sin(angle), 0);
                mamesh.vertices.push(vertex);
            }
            for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
            }
            mamesh.vertices[0].setTwoOppositeLinks(mamesh.vertices[1], mamesh.vertices[mamesh.vertices.length - 1]);
            mamesh.vertices[mamesh.vertices.length - 1].setTwoOppositeLinks(mamesh.vertices[mamesh.vertices.length - 2], mamesh.vertices[0]);
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.color = new mathis.Color(mathis.Color.names.black);
            linkViewer.go();
            var verticesViewer = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
            verticesViewer.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewer.radiusAbsolute = 0.2;
            verticesViewer.go();
        }
        display.tests = tests;
    })(display = mathis.display || (mathis.display = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function vulca2D() {
            var mathisFrame = new mathis.MathisFrame();
            var camera = mathisFrame.getGrabberCamera();
            camera.setFreeDisplacementMode();
            camera.changePosition(new mathis.XYZ(0, 0, -35));
            var mamesh = new mathis.Mamesh();
            var w1 = 12;
            var h1 = 20;
            var n = 5;
            var m = 5;
            //***********Type1 xxoo***************
            for (var j = 0; j < n; j++) {
                var v_1_in = new mathis.Vertex().setPosition(1, 3 + h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_in);
                for (var i = 0; i < m; i++) {
                    var v_1_C1 = new mathis.Vertex().setPosition(3 + w1 * i, 3 + h1 * j, 0); //DOUBLE
                    var v_1_C2 = new mathis.Vertex().setPosition(6 + w1 * i, 3 + h1 * j, 0); //DOUBLE
                    var v_1_C3 = new mathis.Vertex().setPosition(9 + w1 * i, 3 + h1 * j, 0);
                    var v_1_C4 = new mathis.Vertex().setPosition(12 + w1 * i, 3 + h1 * j, 0);
                    //H
                    var v_1_H1 = new mathis.Vertex().setPosition(3 + w1 * i, 1 + h1 * j, 0); //4
                    var v_1_H2 = new mathis.Vertex().setPosition(3 + w1 * i, 5 + h1 * j, 0);
                    var v_1_H3 = new mathis.Vertex().setPosition(6 + w1 * i, 1 + h1 * j, 0);
                    var v_1_H4 = new mathis.Vertex().setPosition(6 + w1 * i, 5 + h1 * j, 0);
                    var v_1_H5 = new mathis.Vertex().setPosition(9 + w1 * i, 5 + h1 * j, 0);
                    var v_1_H6 = new mathis.Vertex().setPosition(12 + w1 * i, 1 + h1 * j, 0);
                    mamesh.vertices.push(v_1_C1, v_1_C2, v_1_C3, v_1_C4, v_1_H1, v_1_H2, v_1_H3, v_1_H4, v_1_H5, v_1_H6);
                }
                var v_1_out = new mathis.Vertex().setPosition(15 + w1 * 4, 3 + h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_out);
            }
            //Soufre vertices:
            //nonVisible
            var sN1 = new mathis.Vertex().setPosition(10, -1, 0);
            var sN2 = new mathis.Vertex().setPosition(26, -1, 0);
            var sN3 = new mathis.Vertex().setPosition(35, -1, 0);
            var sN4 = new mathis.Vertex().setPosition(48, -1, 0);
            var sN5 = new mathis.Vertex().setPosition(50, -1, 0);
            //reseaux level 1
            //265-267
            var s3_66_a = new mathis.Vertex().setPosition(15, 7, 0);
            var s3_66_b = new mathis.Vertex().setPosition(18, 10, 0);
            var s3_66_c = new mathis.Vertex().setPosition(20, 15, 0);
            //268-273
            var s13_55_a = new mathis.Vertex().setPosition(19, 7, 0);
            var s13_55_b = new mathis.Vertex().setPosition(17, 10, 0);
            var s13_55_c = new mathis.Vertex().setPosition(13, 12, 0);
            var s13_55_d = new mathis.Vertex().setPosition(11, 15, 0);
            var s13_55_f = new mathis.Vertex().setPosition(10, 16, 0);
            var s13_55_g = new mathis.Vertex().setPosition(9, 18, 0);
            //274-277
            var s24_76_a = new mathis.Vertex().setPosition(36, 7, 0);
            var s24_76_b = new mathis.Vertex().setPosition(36, 10, 0);
            var s24_76_c = new mathis.Vertex().setPosition(36, 15, 0);
            var s24_76_d = new mathis.Vertex().setPosition(36, 18, 0);
            //278
            var s43_96_a = new mathis.Vertex().setPosition(59, 14, 0);
            //reseaux level 2
            //279-281
            var s56_107_a = new mathis.Vertex().setPosition(12, 27, 0);
            var s56_107_b = new mathis.Vertex().setPosition(10, 30, 0);
            var s56_107_c = new mathis.Vertex().setPosition(9, 33, 0);
            //282-289
            var s66_137_a = new mathis.Vertex().setPosition(25, 27, 0);
            var s66_137_b = new mathis.Vertex().setPosition(29, 28, 0);
            var s66_137_c = new mathis.Vertex().setPosition(30, 29, 0);
            var s66_137_d = new mathis.Vertex().setPosition(32, 30, 0);
            var s66_137_f = new mathis.Vertex().setPosition(35, 31, 0);
            var s66_137_g = new mathis.Vertex().setPosition(39, 32, 0);
            var s66_137_h = new mathis.Vertex().setPosition(42, 33, 0);
            var s66_137_i = new mathis.Vertex().setPosition(45, 35, 0);
            //290
            var s75_117_a = new mathis.Vertex().setPosition(25, 30, 0);
            //291-293
            var s85_128_a = new mathis.Vertex().setPosition(44, 29, 0);
            var s85_128_b = new mathis.Vertex().setPosition(41, 33, 0);
            var s85_128_c = new mathis.Vertex().setPosition(38, 35, 0);
            //291-293
            var s95_147_a = new mathis.Vertex().setPosition(61, 29, 0);
            var s95_147_b = new mathis.Vertex().setPosition(59, 33, 0);
            var s95_147_c = new mathis.Vertex().setPosition(60, 35, 0);
            mamesh.vertices.push(sN1, sN2, sN3, sN4, sN5);
            mamesh.vertices[4].setOneLink(mamesh.vertices[260]);
            mamesh.vertices[14].setOneLink(mamesh.vertices[261]);
            mamesh.vertices[23].setOneLink(mamesh.vertices[262]);
            mamesh.vertices[34].setOneLink(mamesh.vertices[263]);
            mamesh.vertices[44].setOneLink(mamesh.vertices[264]);
            mamesh.vertices.push(s3_66_a, s3_66_b, s3_66_c);
            mamesh.vertices[265].setTwoOppositeLinks(mamesh.vertices[3], mamesh.vertices[266]);
            mamesh.vertices[266].setTwoOppositeLinks(mamesh.vertices[265], mamesh.vertices[267]);
            mamesh.vertices[267].setTwoOppositeLinks(mamesh.vertices[266], mamesh.vertices[65]);
            mamesh.vertices.push(s13_55_a, s13_55_b, s13_55_c, s13_55_d, s13_55_f, s13_55_g);
            mamesh.vertices[268].setTwoOppositeLinks(mamesh.vertices[13], mamesh.vertices[269]);
            mamesh.vertices[269].setTwoOppositeLinks(mamesh.vertices[268], mamesh.vertices[270]);
            mamesh.vertices[270].setTwoOppositeLinks(mamesh.vertices[269], mamesh.vertices[271]);
            mamesh.vertices[271].setTwoOppositeLinks(mamesh.vertices[270], mamesh.vertices[272]);
            mamesh.vertices[272].setTwoOppositeLinks(mamesh.vertices[271], mamesh.vertices[273]);
            mamesh.vertices[273].setTwoOppositeLinks(mamesh.vertices[272], mamesh.vertices[55]);
            mamesh.vertices.push(s24_76_a, s24_76_b, s24_76_c, s24_76_d);
            mamesh.vertices[274].setTwoOppositeLinks(mamesh.vertices[24], mamesh.vertices[275]);
            mamesh.vertices[275].setTwoOppositeLinks(mamesh.vertices[274], mamesh.vertices[276]);
            mamesh.vertices[276].setTwoOppositeLinks(mamesh.vertices[275], mamesh.vertices[277]);
            mamesh.vertices[277].setTwoOppositeLinks(mamesh.vertices[276], mamesh.vertices[76]);
            mamesh.vertices.push(s43_96_a);
            mamesh.vertices[278].setTwoOppositeLinks(mamesh.vertices[43], mamesh.vertices[96]);
            mamesh.vertices.push(s56_107_a, s56_107_b, s56_107_c);
            mamesh.vertices[279].setTwoOppositeLinks(mamesh.vertices[56], mamesh.vertices[280]);
            mamesh.vertices[280].setTwoOppositeLinks(mamesh.vertices[279], mamesh.vertices[281]);
            mamesh.vertices[281].setTwoOppositeLinks(mamesh.vertices[280], mamesh.vertices[107]);
            mamesh.vertices.push(s66_137_a, s66_137_b, s66_137_c, s66_137_d, s66_137_f, s66_137_g, s66_137_h, s66_137_i);
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
            mamesh.vertices.push(s85_128_a, s85_128_b, s85_128_c);
            mamesh.vertices[291].setTwoOppositeLinks(mamesh.vertices[85], mamesh.vertices[292]);
            mamesh.vertices[292].setTwoOppositeLinks(mamesh.vertices[291], mamesh.vertices[293]);
            mamesh.vertices[293].setTwoOppositeLinks(mamesh.vertices[292], mamesh.vertices[128]);
            mamesh.vertices.push(s95_147_a, s95_147_b, s95_147_c);
            mamesh.vertices[294].setTwoOppositeLinks(mamesh.vertices[95], mamesh.vertices[295]);
            mamesh.vertices[295].setTwoOppositeLinks(mamesh.vertices[294], mamesh.vertices[296]);
            mamesh.vertices[296].setTwoOppositeLinks(mamesh.vertices[295], mamesh.vertices[147]);
            var x = 0;
            for (var k = 0; k < n; k++) {
                mamesh.vertices[0 + x].setOneLink(mamesh.vertices[x + 1]);
                for (var j = 0; j < m; j++) {
                    mamesh.vertices[x + 1 + 10 * j].setTwoOppositeLinks(mamesh.vertices[x + 5 + 10 * j], mamesh.vertices[x + 6 + 10 * j]);
                    mamesh.vertices[x + 2 + 10 * j].setTwoOppositeLinks(mamesh.vertices[x + 7 + 10 * j], mamesh.vertices[x + 8 + 10 * j]);
                    mamesh.vertices[x + 2 + 10 * j].setTwoOppositeLinks(mamesh.vertices[x + 1 + 10 * j], mamesh.vertices[x + 3 + 10 * j]);
                    mamesh.vertices[x + 3 + 10 * j].setTwoOppositeLinks(mamesh.vertices[x + 2 + 10 * j], mamesh.vertices[x + 4 + 10 * j]);
                    mamesh.vertices[x + 3 + 10 * j].setOneLink(mamesh.vertices[x + 9 + 10 * j]);
                    mamesh.vertices[x + 4 + 10 * j].setOneLink(mamesh.vertices[x + 10 + 10 * j]);
                    mamesh.vertices[x + 4 + 10 * j].setTwoOppositeLinks(mamesh.vertices[x + 3 + 10 * j], mamesh.vertices[x + 11 + 10 * j]);
                }
                x = x + 52;
            }
            var mine = [];
            mine = [0, 51, 52, 103, 104, 155, 156, 207, 208, 259];
            var verticesNon = [mamesh.vertices[0], mamesh.vertices[51], mamesh.vertices[52], mamesh.vertices[103],
                mamesh.vertices[104], mamesh.vertices[155], mamesh.vertices[156], mamesh.vertices[207], mamesh.vertices[208],
                mamesh.vertices[259],
                mamesh.vertices[260], mamesh.vertices[261], mamesh.vertices[262], mamesh.vertices[263], mamesh.vertices[264]
            ];
            var verticesViewerNon = new mathis.visu3d.VerticesViewer(verticesNon, mathisFrame.scene); //Not visible
            //verticesViewerNon.go();
            var verticesC = [];
            var xx = 0; //Carbone
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < 5; j++) {
                    mine.push(1 + 10 * j + xx);
                    mine.push(2 + 10 * j + xx);
                    mine.push(3 + 10 * j + xx);
                    mine.push(4 + 10 * j + xx);
                    verticesC.push(mamesh.vertices[1 + 10 * j + xx]);
                    verticesC.push(mamesh.vertices[2 + 10 * j + xx]);
                    verticesC.push(mamesh.vertices[3 + 10 * j + xx]);
                    verticesC.push(mamesh.vertices[4 + 10 * j + xx]);
                }
                xx = xx + 52;
            }
            var verticesViewerC = new mathis.visu3d.VerticesViewer(verticesC, mathisFrame.scene);
            verticesViewerC.color = new mathis.Color(mathis.Color.names.red);
            verticesViewerC.radiusAbsolute = 1.0;
            verticesViewerC.go();
            var verticesH = [];
            var yy = 0;
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < 5; j++) {
                    mine.push(5 + 10 * j + yy, 6 + 10 * j + yy, 7 + 10 * j + yy, 8 + 10 * j + yy, 9 + 10 * j + yy, 10 + 10 * j + yy);
                    verticesH.push(mamesh.vertices[5 + 10 * j + yy]);
                    verticesH.push(mamesh.vertices[6 + 10 * j + yy]);
                    verticesH.push(mamesh.vertices[7 + 10 * j + yy]);
                    verticesH.push(mamesh.vertices[8 + 10 * j + yy]);
                    verticesH.push(mamesh.vertices[9 + 10 * j + yy]);
                    verticesH.push(mamesh.vertices[10 + 10 * j + yy]);
                }
                yy = yy + 52;
            }
            var verticesViewerH = new mathis.visu3d.VerticesViewer(verticesH, mathisFrame.scene); //H
            verticesViewerH.color = new mathis.Color(mathis.Color.names.blue);
            verticesViewerH.radiusAbsolute = 0.3;
            verticesViewerH.go();
            var verticesS = [mamesh.vertices[265], mamesh.vertices[266], mamesh.vertices[267],
                mamesh.vertices[268], mamesh.vertices[269], mamesh.vertices[270], mamesh.vertices[271],
                mamesh.vertices[272], mamesh.vertices[273],
                mamesh.vertices[274], mamesh.vertices[275], mamesh.vertices[276], mamesh.vertices[277],
                mamesh.vertices[278],
                mamesh.vertices[279], mamesh.vertices[280], mamesh.vertices[281],
                mamesh.vertices[282], mamesh.vertices[283], mamesh.vertices[284], mamesh.vertices[285],
                mamesh.vertices[286], mamesh.vertices[287], mamesh.vertices[288], mamesh.vertices[289],
                mamesh.vertices[290],
                mamesh.vertices[291], mamesh.vertices[292], mamesh.vertices[293],
                mamesh.vertices[294], mamesh.vertices[295], mamesh.vertices[296]
            ];
            var verticesViewerS = new mathis.visu3d.VerticesViewer(verticesS, mathisFrame.scene); //S
            verticesViewerS.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewerS.radiusAbsolute = 0.6;
            verticesViewerS.go();
            mine.sort(function (a, b) { return a - b; });
            cc('mine', mine);
            cc('vertices', mamesh.vertices);
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.go();
        }
        polymer.vulca2D = vulca2D;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        //import GrabberCamera = mathis.macamera.GrabberCamera;
        function vulcaSimple() {
            var mathisFrame = new mathis.MathisFrame();
            var mamesh = new mathis.Mamesh();
            //Atomes de carbone de type -CH_2-CH_2-
            var C_unitaire = [];
            //Atomes de carbone de type -CH=CH-
            var C_double = [];
            //Atome de carbone de type -CHS-CHS- (ancien C_double)
            var C_affecte = [];
            //Atomes de soufre
            var S = [];
            //Places possilbes pour la soufre
            var S0 = [];
            var w1 = 20;
            var h1 = 20;
            var n = 3;
            var m = 5;
            /**check if a raw belongs to a matrix*/
            function contains(points, onePoint) {
                for (var _i = 0, points_7 = points; _i < points_7.length; _i++) {
                    var point = points_7[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            }
            function containsN(points, onePoint) {
                if (onePoint in points) {
                    return true;
                }
                return false;
            }
            // function that find index of a given value in a given array
            function findIndex(array, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == value) {
                        var res = i;
                    }
                }
                return res;
            }
            function findValue(array, index) {
                var res;
                for (var i = 0; i < array.length; i++) {
                    if (i = index) {
                        res = array[index];
                    }
                }
                return res;
            }
            function findNeighbours(array, value) {
                for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                    var possibles = array_1[_i];
                }
            }
            /**shuffles an array */
            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            }
            var verticesS = [];
            var verticesS_done = [];
            var verticesC = [];
            var verticesCS = [];
            var verticesNon = [];
            // reseau initial (3 marcomolécule à 5 monomère)
            for (var j = 0; j < n; j++) {
                var v_1_in = new mathis.Vertex().setPosition(1, 3 + h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_in);
                verticesNon.push(v_1_in);
                for (var i = 0; i < m; i++) {
                    var v_1_C1 = new mathis.Vertex().setPosition(3 + w1 * i, 3 + h1 * j, 0);
                    var v_1_C2 = new mathis.Vertex().setPosition(6 + w1 * i, 3 + h1 * j, 0);
                    var v_1_C3 = new mathis.Vertex().setPosition(9 + w1 * i, 3 + h1 * j, 0);
                    var v_1_C4 = new mathis.Vertex().setPosition(12 + w1 * i, 3 + h1 * j, 0);
                    //C_unitaire.push(v_1_C1,v_1_C2);
                    //C_double.push(v_1_C3,v_1_C4);
                    mamesh.vertices.push(v_1_C1, v_1_C2, v_1_C3, v_1_C4);
                    verticesC.push(v_1_C1, v_1_C2);
                    verticesCS.push(v_1_C3, v_1_C4);
                }
                var v_1_out = new mathis.Vertex().setPosition(15 + w1 * 4, 3 + h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_out);
                verticesNon.push(v_1_out);
            }
            //Soufre Grille
            var hS = 2;
            var nS = 8;
            var mS = 5;
            for (var j = 0; j < nS; j++) {
                for (var i = 0; i < mS; i++) {
                    var S1 = new mathis.Vertex().setPosition(3 + w1 * i, 6 + hS * j, 0);
                    var S2 = new mathis.Vertex().setPosition(6 + w1 * i, 6 + hS * j, 0);
                    var S3 = new mathis.Vertex().setPosition(9 + w1 * i, 6 + hS * j, 0);
                    var S4 = new mathis.Vertex().setPosition(12 + w1 * i, 6 + hS * j, 0);
                    mamesh.vertices.push(S1, S2, S3, S4);
                    verticesS.push(S1, S2, S3, S4);
                }
            }
            for (var j = 0; j < nS; j++) {
                for (var i = 0; i < mS; i++) {
                    var S1 = new mathis.Vertex().setPosition(3 + w1 * i, 26 + hS * j, 0);
                    var S2 = new mathis.Vertex().setPosition(6 + w1 * i, 26 + hS * j, 0);
                    var S3 = new mathis.Vertex().setPosition(9 + w1 * i, 26 + hS * j, 0);
                    var S4 = new mathis.Vertex().setPosition(12 + w1 * i, 26 + hS * j, 0);
                    mamesh.vertices.push(S1, S2, S3, S4);
                    verticesS.push(S1, S2, S3, S4);
                }
            }
            /** Algo:
             0. creat a soufre grille?
             1. Choose randomly 2 odd vertexes in C_double
             2. Link them with a bridge of S of random lenght
             3. Take their left neighbours (which are pair) and [go (1)]

            */
            ///                let indexOfVertex = ALLc_new.indexOf( ALLc_new[randomVertex] );
            var min = -4;
            var max = 5;
            for (var i = 0; i < 3; i++) {
                var indexesS = [];
                var values = [];
                //Choose S chain lenght
                var bridgeS = Math.floor(Math.random() * (9 - 1)) + 1;
                //Choose a random vertex in CS by index
                var indexOfRandomVertex1inCS = Math.floor(Math.random() * (verticesCS.length - 1 - 0)) + 0;
                var RandomVertex1inCS = verticesCS[indexOfRandomVertex1inCS];
                cc('RandomVertex1inCS', RandomVertex1inCS);
                // let indexofRandomVertex1inMamesh=mamesh.vertices.indexOf(verticesCS[indexOfRandomVertex1inCS])
                // cc('indexofRandomVertex1inMamesh',indexofRandomVertex1inMamesh)
                // indexesS.push(indexofRandomVertex1inMamesh)
                var x0 = RandomVertex1inCS.position.x;
                var y0 = RandomVertex1inCS.position.y;
                var z0 = RandomVertex1inCS.position.z;
                var coordinates0 = new mathis.XYZ(x0, y0, z0);
                var vertex0 = new mathis.Vertex();
                vertex0.position = coordinates0;
                values.push(coordinates0);
                mamesh.vertices.push(vertex0);
                var indexM = findIndex(mamesh.vertices, vertex0);
                indexesS.push(indexM);
                cc('indexM', indexM);
                cc('values', values);
                var Security = mamesh.vertices;
                var ALLc_new = mamesh.vertices;
                for (var j = 1; j < bridgeS; j++) {
                    var alea1 = Math.floor(Math.random() * (max - min)) + min;
                    var alea2 = Math.floor(Math.random() * (max - min)) + min;
                    var x_1 = values[j - 1].x + alea1;
                    var y = values[j - 1].y + alea2;
                    var coordinates = new mathis.XYZ(x_1, y, 0);
                    var vertex = new mathis.Vertex();
                    vertex.position = coordinates;
                    cc('coordinates', coordinates);
                    //let randomS = Math.floor(Math.random() * (verticesS.length-1 - 0)) + 0;
                    //cc('RandomS',randomS );
                    if (!contains(S, coordinates)) {
                        // mamesh.vertices.push(vertex)
                        S.push(coordinates);
                        verticesS_done.push(vertex);
                        values.push(coordinates);
                        ALLc_new.push(vertex);
                        mamesh.vertices.push(vertex);
                        var indexMM = findIndex(ALLc_new, vertex);
                        indexesS.push(indexMM);
                        cc('indexesS', indexesS);
                    }
                    else {
                        cc('Doublons! Start over:', coordinates);
                        mamesh.vertices = Security;
                        break;
                    }
                }
                cc('indexesS', indexesS);
                var randomVertex2 = Math.floor(Math.random() * (verticesCS.length - 1 - 0)) + 0;
                var indexRandomVertex2 = mamesh.vertices.indexOf(verticesCS[randomVertex2]);
                indexesS.push(indexRandomVertex2);
                cc('indexesS', indexesS);
                for (var i_2 = 1; i_2 < indexesS.length - 1; i_2++) {
                    mamesh.vertices[indexesS[i_2]].setTwoOppositeLinks(mamesh.vertices[indexesS[i_2 - 1]], mamesh.vertices[indexesS[i_2 + 1]]);
                }
                mamesh.vertices[indexesS[0]].setOneLink(mamesh.vertices[indexesS[1]]);
                mamesh.vertices[indexesS.length - 1].setOneLink(mamesh.vertices[indexesS.length - 2]);
            }
            var x = 0;
            for (var k = 0; k < n; k++) {
                mamesh.vertices[0 + x].setOneLink(mamesh.vertices[x + 1]);
                for (var j = 0; j < m; j++) {
                    mamesh.vertices[x + 0 + 4 * j].setOneLink(mamesh.vertices[x + 1 + 4 * j]);
                    mamesh.vertices[x + 1 + 4 * j].setTwoOppositeLinks(mamesh.vertices[x + 0 + 4 * j], mamesh.vertices[x + 2 + 4 * j]);
                    mamesh.vertices[x + 2 + 4 * j].setTwoOppositeLinks(mamesh.vertices[x + 1 + 4 * j], mamesh.vertices[x + 3 + 4 * j]);
                    mamesh.vertices[x + 3 + 4 * j].setTwoOppositeLinks(mamesh.vertices[x + 2 + 4 * j], mamesh.vertices[x + 4 + 4 * j]);
                }
                x = x + 22;
            }
            var verticesViewerS = new mathis.visu3d.VerticesViewer(verticesS, mathisFrame.scene);
            verticesViewerS.color = new mathis.Color(mathis.Color.names.lightyellow);
            verticesViewerS.radiusAbsolute = 0.3;
            verticesViewerS.go();
            var verticesViewerC = new mathis.visu3d.VerticesViewer(verticesC, mathisFrame.scene);
            verticesViewerC.color = new mathis.Color(mathis.Color.names.darkviolet);
            verticesViewerC.radiusAbsolute = 0.7;
            verticesViewerC.go();
            var verticesViewerCS = new mathis.visu3d.VerticesViewer(verticesCS, mathisFrame.scene);
            verticesViewerCS.color = new mathis.Color(mathis.Color.names.red);
            verticesViewerCS.radiusAbsolute = 0.9;
            verticesViewerCS.go();
            var verticesViewerSS = new mathis.visu3d.VerticesViewer(verticesS_done, mathisFrame.scene);
            verticesViewerSS.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewerSS.radiusAbsolute = 0.9;
            verticesViewerSS.go();
            var verticesViewerNon = new mathis.visu3d.VerticesViewer(verticesNon, mathisFrame.scene);
            //verticesViewerNon.go();
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.go();
        }
        polymer.vulcaSimple = vulcaSimple;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
/**
 * Created by vigon on 17/07/2017.
 */
/**
 * Created by vigon on 09/05/2017.
 */
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function start_Chain() {
            {
                var mathisFrame = new mathis.MathisFrame();
                var aPieceOfCode = new mathis.ChainPresentation(mathisFrame);
                var binder = new mathis.appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime();
            }
        }
        polymer.start_Chain = start_Chain;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
/**
 * Created by vigon on 17/07/2017.
 */
var mathis;
(function (mathis) {
    var ChainPresentation = (function () {
        function ChainPresentation(mathisFrame) {
            this.mathisFrame = mathisFrame;
            this.NAME = "VariableReseau";
            this.TITLE = "";
            this.chainSize = 10;
            this.$$$chainSize = [5, 10, 20, 50];
        }
        ChainPresentation.prototype.goForTheFirstTime = function () {
            this.mathisFrame.clearScene();
            this.mathisFrame.addDefaultCamera();
            this.mathisFrame.addDefaultLight();
            this.go();
        };
        ChainPresentation.prototype.go = function () {
            this.mathisFrame.clearScene(false, false);
            var creator = new mathis.polymer.SAW_Creator_static();
            creator.chainSize = this.chainSize;
            var mamesh = creator.go();
            cc(mamesh.toString());
            var verticeViewer = new mathis.visu3d.VerticesViewer(mamesh, this.mathisFrame.scene);
            verticeViewer.radiusAbsolute = 0.1;
            verticeViewer.go();
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, this.mathisFrame.scene);
            linkViewer.go();
            // let creator = new reseau.Regular2d()
            //
            // creator.nbU = this.nbI
            // creator.nbV = 4
            // creator.dirU = new XYZ(0.2, 0, 0)
            // creator.dirV = this.Vj
            // creator.origine = new XYZ(-0.7, -0.7, 0)
            // creator.squareVersusTriangleMaille = this.squareMaille
            //
            // let mamesh = creator.go()
            //
            // new visu3d.VerticesViewer(mamesh, this.mathisFrame.scene).go()
            // new visu3d.LinksViewer(mamesh, this.mathisFrame.scene).go()
            // new visu3d.SurfaceViewer(mamesh, this.mathisFrame.scene).go()
        };
        return ChainPresentation;
    }());
    mathis.ChainPresentation = ChainPresentation;
})(mathis || (mathis = {}));
//# sourceMappingURL=smallProject.js.map