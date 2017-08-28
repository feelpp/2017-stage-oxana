var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        var SAW_Creator_static_Biased = (function () {
            function SAW_Creator_static_Biased() {
                this.chainSize = 10;
            }
            SAW_Creator_static_Biased.prototype.contains = function (points, onePoint) {
                for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                    var point = points_1[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            };
            SAW_Creator_static_Biased.prototype.go = function () {
                var start = new Date().getTime();
                cc('BIASED STATIC METHOD');
                var security = 10;
                var NOTfinished = true;
                var attempts = 0;
                var min = -1;
                var max = 2;
                var mamesh = new mathis.Mamesh();
                /**check if a raw belongs to a matrix*/
                // allJumps stores all possibles steps in 3D on [-1;1]- 0,0,0 ; 0,1,1; -1,0,1; etc
                var allJumps = [];
                var none = new mathis.XYZ(0, 0, 0);
                allJumps.push(none);
                while (allJumps.length < 27) {
                    var alea1 = Math.floor(Math.random() * (max - min)) + min;
                    var alea2 = Math.floor(Math.random() * (max - min)) + min;
                    var alea3 = Math.floor(Math.random() * (max - min)) + min;
                    var coordinates = new mathis.XYZ(alea1, alea2, alea3);
                    if (!this.contains(allJumps, coordinates)) {
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
                //cc('validatedVertexes[0]', validatedVertexes[0]);
                while (NOTfinished && attempts < security) {
                    for (var j = 1; j < this.chainSize - 1; j++) {
                        //First, we must sort allJumps and choose those, that will not lead to intersection
                        //We'll keep them in availableJumps
                        var availableJumps = [];
                        for (var i = 0; i < allJumps.length; i++) {
                            //Get the last validated vertex  , check if this vertex is really new; if so - add to availableJumps
                            var testJump = new mathis.XYZ(validatedVertexes[j - 1].x + allJumps[i].x, validatedVertexes[j - 1].y + allJumps[i].y, validatedVertexes[j - 1].z + allJumps[i].z);
                            if (!this.contains(validatedVertexes, testJump)) {
                                availableJumps.push(allJumps[i]);
                            }
                            else {
                                //cc('testJump=testJump.add(allJumps[i]) NOT OK', testJump);
                            }
                        }
                        //cc('availableJumps', availableJumps);
                        //Now we have a list of available jumps at step i that won't lead to self intersection.
                        if (availableJumps.length > 0) {
                            var randomStep = availableJumps[Math.floor(Math.random() * availableJumps.length)];
                            //cc('validatedVertexes[j-1]', validatedVertexes[j - 1]);
                            //cc('randomStep', randomStep);
                            var newVertex = new mathis.XYZ(validatedVertexes[j - 1].x + randomStep.x, validatedVertexes[j - 1].y + randomStep.y, validatedVertexes[j - 1].z + randomStep.z);
                            validatedVertexes.push(newVertex);
                            var vertex = new mathis.Vertex();
                            vertex.position = newVertex;
                            mamesh.vertices.push(vertex);
                            //cc('We add ', newVertex);
                            if (validatedVertexes.length > this.chainSize) {
                                break;
                            }
                        }
                        else {
                            attempts++;
                            //cc('Cul de sac!');
                            while (mamesh.vertices.length > 0) {
                                mamesh.vertices.pop();
                            }
                            break;
                        }
                    }
                    NOTfinished = (validatedVertexes.length < this.chainSize);
                }
                //cc('validatedVertexes', validatedVertexes);
                for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                    mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
                }
                mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
                var end = new Date().getTime();
                cc('Execution Time in sec', (end - start));
                cc('Attempts', attempts);
                cc('chainSize', this.chainSize);
                return mamesh;
            };
            return SAW_Creator_static_Biased;
        }());
        polymer.SAW_Creator_static_Biased = SAW_Creator_static_Biased;
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
            var camera = mathisFrame.getGrabberCamera();
            camera.changePosition(new mathis.XYZ(5, 0, -30));
            //Initial SIR
            var S = [];
            var I = [];
            var R = [];
            //First infected person
            I[0] = new mathis.XYZ(0, 0, 0);
            I[1] = new mathis.XYZ(10, 10, 10);
            I[2] = new mathis.XYZ(10, -10, 10);
            //I[2]=new XYZ(-4,6,-3);
            var vertex0 = new mathis.Vertex();
            vertex0.position = I[0];
            var vertex1 = new mathis.Vertex();
            vertex1.position = I[1];
            var vertex2 = new mathis.Vertex();
            vertex2.position = I[2];
            mamesh.vertices.push(vertex0, vertex1, vertex2);
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
            function outbreak(N, b) {
                var max_t = 20;
                var I = 1;
                var S = N - 1;
                var incidence = [];
                for (var t_1 = 1; t_1 < max_t; t_1++) {
                    var p_inf = 1.0 - Math.exp(-b * I / N);
                    var new_I = 0;
                    for (var i = 0; i < S; i++) {
                        if (Math.random() < p_inf) {
                            new_I++;
                        }
                    }
                    if (new_I == 0) {
                        break;
                    }
                    incidence.push({ t: t_1, I: new_I });
                    S -= new_I;
                    I = new_I;
                }
                return (incidence);
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
            var notEpidemy = true;
            var newlyInfected = 0;
            var I_test = [];
            I_test[0] = new mathis.XYZ(0, 0, 0);
            I_test[1] = new mathis.XYZ(10, 10, 10);
            I_test[2] = new mathis.XYZ(10, -10, 10);
            var I_delta_step = [];
            I_delta_step[0] = new mathis.XYZ(0, 0, 0);
            I_delta_step[1] = new mathis.XYZ(10, 10, 10);
            I_delta_step[2] = new mathis.XYZ(10, -10, 10);
            var t = 0;
            var action = new mathis.PeriodicAction(function () {
                t += 1;
                //while (notEpidemy) {
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
                notEpidemy = (newlyInfected < 150);
                I_test = I_delta_step;
                shuffle(I_test);
                //}
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
                //INFECTED
                var verticesViewer = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
                verticesViewer.vertices = [mamesh.vertices[0], mamesh.vertices[1], mamesh.vertices[2]];
                verticesViewer.color = new mathis.Color(mathis.Color.names.red);
                verticesViewer.radiusAbsolute = 1;
                verticesViewer.go();
                var verticesViewer1 = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene);
                verticesViewer1.color = new mathis.Color(mathis.Color.names.black);
                verticesViewer1.radiusAbsolute = 0.3;
                verticesViewer1.go();
            });
            //action.frameInterval = 5;
            action.nbTimesThisActionMustBeFired = 50;
            // mathisFrame.cleanAllPeriodicActions();
            mathisFrame.pushPeriodicAction(action);
        }
        epi.epi1 = epi1;
    })(epi = mathis.epi || (mathis.epi = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        var SAW_Init = (function () {
            function SAW_Init() {
                this.chainSize = 10;
            }
            SAW_Init.prototype.go = function () {
                cc('Init');
                var mamesh = new mathis.Mamesh();
                //A given SAW
                var vertex0 = new mathis.Vertex().setPosition(0, -1, 0); //0
                var vertex1 = new mathis.Vertex().setPosition(-1, 0, 1); //1
                var vertex2 = new mathis.Vertex().setPosition(0, 0, 1); //2
                var vertex3 = new mathis.Vertex().setPosition(1, 0, 1); //3
                var vertex4 = new mathis.Vertex().setPosition(1, 1, 0); //4
                var vertex5 = new mathis.Vertex().setPosition(2, 2, 0); //5
                var vertex6 = new mathis.Vertex().setPosition(2, 3, -1); //6
                var vertex7 = new mathis.Vertex().setPosition(3, 3, 0); //7
                var vertex8 = new mathis.Vertex().setPosition(3, 4, 0); //8
                var vertex9 = new mathis.Vertex().setPosition(3, 5, -1); //9
                var vertex10 = new mathis.Vertex().setPosition(4, 5, 0); //0
                var vertex11 = new mathis.Vertex().setPosition(4, 4, 1); //1
                var vertex12 = new mathis.Vertex().setPosition(4, 5, 2); //2
                var vertex13 = new mathis.Vertex().setPosition(5, 5, 2); //3
                var vertex14 = new mathis.Vertex().setPosition(5, 6, 1); //4
                var vertex15 = new mathis.Vertex().setPosition(6, 6, 2); //5
                var vertex16 = new mathis.Vertex().setPosition(6, 5, 3); //6
                var vertex17 = new mathis.Vertex().setPosition(7, 4, 3); //7
                var vertex18 = new mathis.Vertex().setPosition(6, 3, 4); //8
                var vertex19 = new mathis.Vertex().setPosition(7, 2, 5); //9
                var vertex20 = new mathis.Vertex().setPosition(8, 3, 5); //0
                var vertex21 = new mathis.Vertex().setPosition(9, 3, 5); //1
                var vertex22 = new mathis.Vertex().setPosition(9, 3, 4); //2
                var vertex23 = new mathis.Vertex().setPosition(8, 4, 4); //3
                var vertex24 = new mathis.Vertex().setPosition(7, 3, 5); //4
                var vertex25 = new mathis.Vertex().setPosition(6, 4, 6); //5
                var vertex26 = new mathis.Vertex().setPosition(7, 5, 6); //6
                var vertex27 = new mathis.Vertex().setPosition(8, 5, 5); //7
                var vertex28 = new mathis.Vertex().setPosition(8, 5, 6); //8
                var vertex29 = new mathis.Vertex().setPosition(9, 5, 7); //9
                var vertex30 = new mathis.Vertex().setPosition(10, 5, 7); //0
                var vertex31 = new mathis.Vertex().setPosition(10, 6, 6); //1
                var vertex32 = new mathis.Vertex().setPosition(10, 7, 6); //2
                var vertex33 = new mathis.Vertex().setPosition(10, 7, 5); //3
                var vertex34 = new mathis.Vertex().setPosition(9, 7, 5); //4
                var vertex35 = new mathis.Vertex().setPosition(10, 6, 6); //5
                var vertex36 = new mathis.Vertex().setPosition(11, 5, 7); //6
                var vertex37 = new mathis.Vertex().setPosition(12, 5, 8); //7
                var vertex38 = new mathis.Vertex().setPosition(11, 6, 9); //8
                var vertex39 = new mathis.Vertex().setPosition(12, 5, 10); //9
                var vertex40 = new mathis.Vertex().setPosition(11, 4, 10); //0
                var vertex41 = new mathis.Vertex().setPosition(12, 4, 11); //1
                var vertex42 = new mathis.Vertex().setPosition(13, 3, 11); //2
                var vertex43 = new mathis.Vertex().setPosition(13, 2, 11); //3
                var vertex44 = new mathis.Vertex().setPosition(12, 1, 10); //4
                var vertex45 = new mathis.Vertex().setPosition(11, 2, 10); //5
                var vertex46 = new mathis.Vertex().setPosition(11, 3, 11); //6
                var vertex47 = new mathis.Vertex().setPosition(12, 3, 10); //7
                var vertex48 = new mathis.Vertex().setPosition(13, 4, 10); //8
                var vertex49 = new mathis.Vertex().setPosition(14, 5, 9); //9
                if (this.chainSize == 5) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4);
                }
                else if (this.chainSize == 10) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9);
                }
                else if (this.chainSize == 20) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9, vertex10, vertex11, vertex12, vertex13, vertex14, vertex15, vertex16, vertex17, vertex18, vertex19);
                }
                else {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9, vertex10, vertex11, vertex12, vertex13, vertex14, vertex15, vertex16, vertex17, vertex18, vertex19, vertex20, vertex21, vertex22, vertex23, vertex24, vertex25, vertex26, vertex27, vertex28, vertex29, vertex30, vertex31, vertex32, vertex33, vertex34, vertex35, vertex36, vertex37, vertex38, vertex39, vertex40, vertex41, vertex42, vertex43, vertex44, vertex45, vertex46, vertex47, vertex48, vertex49);
                }
                for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                    mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
                }
                mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
                return mamesh;
            };
            return SAW_Init;
        }());
        polymer.SAW_Init = SAW_Init;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
/**
 * Created by ushakova on 03/08/17.
 */
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function myVulca() {
            var n = 3; //maromolecules
            var m = 5; //monomères
            var mathisFrame = new mathis.MathisFrame();
            var mamesh = new mathis.Mamesh();
            var camera = mathisFrame.getGrabberCamera();
            camera.changePosition(new mathis.XYZ(0, 0, -150));
            //*****************USEFULL FUNCTIONS************************//
            /**check if a raw belongs to a matrix for XYZ*/
            function contains(points, onePoint) {
                for (var _i = 0, points_3 = points; _i < points_3.length; _i++) {
                    var point = points_3[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            }
            /**check if a raw belongs to a matrix for number*/
            function containsN(points, onePoint) {
                if (onePoint in points) {
                    return true;
                }
                return false;
            }
            /**function that find index of a given value in a given array*/
            function findIndex(array, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == value) {
                        var res = i;
                    }
                }
                return res;
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
            /**Deletes a certain value from array */
            function rm(array, toDelete) {
                for (var i = array.length - 1; i >= 0; i--) {
                    if (array[i] === toDelete) {
                        array.splice(i, 1);
                    }
                }
                return array;
            }
            /**Find a random neighbour */
            function possibleNeighbours_f(me) {
                var me_x1 = me.x + 3;
                var me_x2 = me.x - 3;
                var me_y1 = me.y + 2;
                var me_y2 = me.y - 2;
                var me_y11 = me.y + 3;
                var me_y22 = me.y - 3;
                var coordinates1 = new mathis.XYZ(me_x1, me_y1, 0);
                var coordinates2 = new mathis.XYZ(me_x1, me_y2, 0);
                var coordinates3 = new mathis.XYZ(me_x2, me_y1, 0);
                var coordinates4 = new mathis.XYZ(me_x2, me_y2, 0);
                var coordinates5 = new mathis.XYZ(me_x1, me.y, 0);
                var coordinates6 = new mathis.XYZ(me_x2, me.y, 0);
                var coordinates7 = new mathis.XYZ(me.x, me_y1, 0);
                var coordinates8 = new mathis.XYZ(me.x, me_y2, 0);
                var coordinates9 = new mathis.XYZ(me_x1, me_y11, 0);
                var coordinates10 = new mathis.XYZ(me_x1, me_y22, 0);
                var coordinates11 = new mathis.XYZ(me_x2, me_y11, 0);
                var coordinates12 = new mathis.XYZ(me_x2, me_y22, 0);
                var coordinates13 = new mathis.XYZ(me.x, me_y11, 0);
                var coordinates14 = new mathis.XYZ(me.x, me_y22, 0);
                var coordinates = [];
                coordinates.push(coordinates1, coordinates2, coordinates3, coordinates4, coordinates5, coordinates6, coordinates7, coordinates8, coordinates9, coordinates10, coordinates11, coordinates12, coordinates13, coordinates14);
                var possibleNeighbours = [];
                for (var i = 0; i < coordinates.length; i++) {
                    if (contains(grilleS_XYZ, coordinates[i])) {
                        possibleNeighbours.push(coordinates[i]);
                        cc('coordinates  ok', coordinates[i]);
                    }
                    else {
                        cc('coordinates not ok', coordinates[i]);
                    }
                }
                return possibleNeighbours;
            }
            //Atomes de carbone de type -CH_2-CH_2-
            var C_unitaire_XYZ = []; //C_unitaire
            var C_unitaire = [];
            //Atomes de carbone de type -CH=CH-
            var C_double_XYZ = []; //C_double
            var C_double = [];
            //Atome de carbone de type -CHS-CHS- (ancien C_double)
            var C_affecte_XYZ = [];
            var C_affecte = [];
            //Atomes de soufre
            var S_XYZ = []; //verticesS
            var S = [];
            //Places possilbes pour la soufre
            var grilleS_XYZ = []; //grilleS
            var grilleS = [];
            var verticesNon = [];
            var w1 = 20;
            var h1 = 20;
            //****************Building a grill************************//
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
                    C_unitaire.push(v_1_C1, v_1_C2);
                    C_double.push(v_1_C3, v_1_C4);
                }
                var v_1_out = new mathis.Vertex().setPosition(15 + w1 * 4, 3 + h1 * j, 0); //not visible
                mamesh.vertices.push(v_1_out);
                verticesNon.push(v_1_out);
            }
            //Soufre Grille
            var hS = 2;
            var nS = 8;
            var mS = 5;
            var p = 0;
            for (var k = 0; k < n - 1; k++) {
                for (var j = 0; j < nS; j++) {
                    for (var i = 0; i < mS; i++) {
                        var S1 = new mathis.Vertex().setPosition(3 + w1 * i, 6 + p + hS * j, 0);
                        var S2 = new mathis.Vertex().setPosition(6 + w1 * i, 6 + p + hS * j, 0);
                        var S3 = new mathis.Vertex().setPosition(9 + w1 * i, 6 + p + hS * j, 0);
                        var S4 = new mathis.Vertex().setPosition(12 + w1 * i, 6 + p + hS * j, 0);
                        mamesh.vertices.push(S1, S2, S3, S4);
                        grilleS.push(S1, S2, S3, S4);
                        grilleS_XYZ.push(S1.position, S2.position, S3.position, S4.position);
                    }
                }
                p = p + 20;
            }
            var test = [];
            for (var i = 0; i < C_double.length; i++) {
                test.push(C_double[i]);
            }
            var nbOfChains = 9;
            for (var i = 0; i < nbOfChains; i++) {
                var indexesInMamesh = [];
                //Actual chain at i
                var thisChain = [];
                var thisChain_XYZ = [];
                //Choose S chain lenght
                var bridgeS = Math.floor(Math.random() * (10 - 1)) + 1;
                //Choose a random vertex in CS by index
                var indexOfRandomVertex1 = Math.floor(Math.random() * (test.length - 1 - 0)) + 0;
                var RandomVertex1inCS = test[indexOfRandomVertex1];
                cc('RandomVertex1inCS', RandomVertex1inCS);
                //add it to C_affected
                C_affecte.push(RandomVertex1inCS);
                //delete it from C_double
                rm(test, RandomVertex1inCS);
                //add it to thisChain
                thisChain_XYZ.push(RandomVertex1inCS.position);
                var indexRandomVertex1 = mamesh.vertices.indexOf(test[indexOfRandomVertex1]);
                indexesInMamesh.push(indexRandomVertex1);
                var Security = mamesh.vertices;
                for (var j = 1; j < bridgeS; j++) {
                    cc('thisChain_XYZ[j-1]', thisChain_XYZ[j - 1]);
                    var possible_Neighbours_list = [];
                    possible_Neighbours_list = possibleNeighbours_f(thisChain_XYZ[j - 1]);
                    cc('possible_Neighbours_list', possible_Neighbours_list);
                    var randomNeighbour_index = Math.floor(Math.random() * (possible_Neighbours_list.length - 1 - 0)) + 0;
                    var random_Neighbour = possible_Neighbours_list[randomNeighbour_index];
                    cc('random_Neighbour', random_Neighbour);
                    if (!random_Neighbour) {
                        cc('thisChain_XYZ', thisChain_XYZ);
                        break;
                    }
                    if (!contains(S_XYZ, random_Neighbour)) {
                        S_XYZ.push(random_Neighbour);
                        var coordinates = new mathis.XYZ(random_Neighbour.x, random_Neighbour.y, 0);
                        var vertex = new mathis.Vertex();
                        vertex.position = coordinates;
                        S.push(vertex);
                        mamesh.vertices.push(vertex);
                        cc('S added', coordinates);
                        var index = mamesh.vertices.indexOf(vertex);
                        indexesInMamesh.push(index);
                        thisChain_XYZ.push(random_Neighbour);
                        cc('grille', grilleS_XYZ);
                    }
                    else {
                        cc('Doublons! New chain');
                        mamesh.vertices = Security;
                        break;
                    }
                }
                cc('indexesS', indexesInMamesh);
                var randomVertex2 = Math.floor(Math.random() * (test.length - 1 - 0)) + 0;
                var indexRandomVertex2 = mamesh.vertices.indexOf(test[randomVertex2]);
                C_affecte.push(test[randomVertex2]);
                rm(test, test[randomVertex2]);
                indexesInMamesh.push(indexRandomVertex2);
                for (var i_1 = 1; i_1 < indexesInMamesh.length - 1; i_1++) {
                    mamesh.vertices[indexesInMamesh[i_1]].setTwoOppositeLinks(mamesh.vertices[indexesInMamesh[i_1 - 1]], mamesh.vertices[indexesInMamesh[i_1 + 1]]);
                }
                mamesh.vertices[indexesInMamesh[0]].setOneLink(mamesh.vertices[indexesInMamesh[1]]);
                mamesh.vertices[indexesInMamesh.length - 1].setOneLink(mamesh.vertices[indexesInMamesh.length - 2]);
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
            var verticesViewerS = new mathis.visu3d.VerticesViewer(grilleS, mathisFrame.scene);
            verticesViewerS.color = new mathis.Color(mathis.Color.names.lightyellow);
            verticesViewerS.radiusAbsolute = 0.3;
            verticesViewerS.go();
            var verticesViewerC = new mathis.visu3d.VerticesViewer(C_unitaire, mathisFrame.scene);
            verticesViewerC.color = new mathis.Color(mathis.Color.names.darkviolet);
            verticesViewerC.radiusAbsolute = 0.7;
            verticesViewerC.go();
            var verticesViewerCS = new mathis.visu3d.VerticesViewer(C_double, mathisFrame.scene);
            verticesViewerCS.color = new mathis.Color(mathis.Color.names.red);
            verticesViewerCS.radiusAbsolute = 0.9;
            verticesViewerCS.go();
            /*
             let verticesViewerT= new visu3d.VerticesViewer(test, mathisFrame.scene);
             verticesViewerT.color = new mathis.Color(mathis.Color.names.red);
             verticesViewerT.radiusAbsolute = 0.9;
             verticesViewerT.go();


             let verticesViewerA= new visu3d.VerticesViewer(C_affecte, mathisFrame.scene);
             verticesViewerA.color = new mathis.Color(mathis.Color.names.black);
             verticesViewerA.radiusAbsolute = 0.9;
             verticesViewerA.go();
             */
            var verticesViewerSS = new mathis.visu3d.VerticesViewer(S, mathisFrame.scene);
            verticesViewerSS.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewerSS.radiusAbsolute = 0.9;
            verticesViewerSS.go();
            var verticesViewerNon = new mathis.visu3d.VerticesViewer(verticesNon, mathisFrame.scene);
            //verticesViewerNon.go();
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.go();
        }
        polymer.myVulca = myVulca;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
/*TODO check why stoped working!!*/
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        var SAW_dynamic_Pivot = (function () {
            function SAW_dynamic_Pivot() {
                this.chainSize = 10;
            }
            // function that checks the list of used coordinates
            SAW_dynamic_Pivot.prototype.contains = function (points, onePoint) {
                for (var _i = 0, points_4 = points; _i < points_4.length; _i++) {
                    var point = points_4[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            };
            // function that replaces a value 1 at i by value 2
            SAW_dynamic_Pivot.prototype.replaceValue = function (array, valueToReplace, newValue) {
                var index = array.indexOf(valueToReplace);
                if (index !== -1) {
                    array[index] = newValue;
                }
                return array;
            };
            // function that find index of a given value in a given array
            SAW_dynamic_Pivot.prototype.findIndex = function (array, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] === value) {
                        var res = i;
                    }
                }
                return res;
            };
            SAW_dynamic_Pivot.prototype.replaceValue1 = function (array, value) {
                for (var i = 0; i < array.length; i++) {
                    if (mathis.geo.distance(array[i], value) < 0.0001) {
                        return i;
                    }
                }
            };
            SAW_dynamic_Pivot.prototype.go = function () {
                cc('DYNAMIC PIVOT STATIC METHOD');
                var start = new Date().getTime();
                var mamesh = new mathis.Mamesh();
                var vertex0 = new mathis.Vertex().setPosition(0, -1, 0); //0
                var vertex1 = new mathis.Vertex().setPosition(-1, 0, 1); //1
                var vertex2 = new mathis.Vertex().setPosition(0, 0, 1); //2
                var vertex3 = new mathis.Vertex().setPosition(1, 0, 1); //3
                var vertex4 = new mathis.Vertex().setPosition(1, 1, 0); //4
                var vertex5 = new mathis.Vertex().setPosition(2, 2, 0); //5
                var vertex6 = new mathis.Vertex().setPosition(2, 3, -1); //6
                var vertex7 = new mathis.Vertex().setPosition(3, 3, 0); //7
                var vertex8 = new mathis.Vertex().setPosition(3, 4, 0); //8
                var vertex9 = new mathis.Vertex().setPosition(3, 5, -1); //9
                var vertex10 = new mathis.Vertex().setPosition(4, 5, 0); //0
                var vertex11 = new mathis.Vertex().setPosition(4, 4, 1); //1
                var vertex12 = new mathis.Vertex().setPosition(4, 5, 2); //2
                var vertex13 = new mathis.Vertex().setPosition(5, 5, 2); //3
                var vertex14 = new mathis.Vertex().setPosition(5, 6, 1); //4
                var vertex15 = new mathis.Vertex().setPosition(6, 6, 2); //5
                var vertex16 = new mathis.Vertex().setPosition(6, 5, 3); //6
                var vertex17 = new mathis.Vertex().setPosition(7, 4, 3); //7
                var vertex18 = new mathis.Vertex().setPosition(6, 3, 4); //8
                var vertex19 = new mathis.Vertex().setPosition(7, 2, 5); //9
                var vertex20 = new mathis.Vertex().setPosition(8, 3, 5); //0
                var vertex21 = new mathis.Vertex().setPosition(9, 3, 5); //1
                var vertex22 = new mathis.Vertex().setPosition(9, 3, 4); //2
                var vertex23 = new mathis.Vertex().setPosition(8, 4, 4); //3
                var vertex24 = new mathis.Vertex().setPosition(7, 3, 5); //4
                var vertex25 = new mathis.Vertex().setPosition(6, 4, 6); //5
                var vertex26 = new mathis.Vertex().setPosition(7, 5, 6); //6
                var vertex27 = new mathis.Vertex().setPosition(8, 5, 5); //7
                var vertex28 = new mathis.Vertex().setPosition(8, 5, 6); //8
                var vertex29 = new mathis.Vertex().setPosition(9, 5, 7); //9
                var vertex30 = new mathis.Vertex().setPosition(10, 5, 7); //0
                var vertex31 = new mathis.Vertex().setPosition(10, 6, 6); //1
                var vertex32 = new mathis.Vertex().setPosition(10, 7, 6); //2
                var vertex33 = new mathis.Vertex().setPosition(10, 7, 5); //3
                var vertex34 = new mathis.Vertex().setPosition(9, 7, 5); //4
                var vertex35 = new mathis.Vertex().setPosition(10, 6, 6); //5
                var vertex36 = new mathis.Vertex().setPosition(11, 5, 7); //6
                var vertex37 = new mathis.Vertex().setPosition(12, 5, 8); //7
                var vertex38 = new mathis.Vertex().setPosition(11, 6, 9); //8
                var vertex39 = new mathis.Vertex().setPosition(12, 5, 10); //9
                var vertex40 = new mathis.Vertex().setPosition(11, 4, 10); //0
                var vertex41 = new mathis.Vertex().setPosition(12, 4, 11); //1
                var vertex42 = new mathis.Vertex().setPosition(13, 3, 11); //2
                var vertex43 = new mathis.Vertex().setPosition(13, 2, 11); //3
                var vertex44 = new mathis.Vertex().setPosition(12, 1, 10); //4
                var vertex45 = new mathis.Vertex().setPosition(11, 2, 10); //5
                var vertex46 = new mathis.Vertex().setPosition(11, 3, 11); //6
                var vertex47 = new mathis.Vertex().setPosition(12, 3, 10); //7
                var vertex48 = new mathis.Vertex().setPosition(13, 4, 10); //8
                var vertex49 = new mathis.Vertex().setPosition(14, 5, 9); //9
                if (this.chainSize == 5) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4);
                }
                else if (this.chainSize == 10) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9);
                }
                else if (this.chainSize == 20) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9, vertex10, vertex11, vertex12, vertex13, vertex14, vertex15, vertex16, vertex17, vertex18, vertex19);
                }
                else {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9, vertex10, vertex11, vertex12, vertex13, vertex14, vertex15, vertex16, vertex17, vertex18, vertex19, vertex20, vertex21, vertex22, vertex23, vertex24, vertex25, vertex26, vertex27, vertex28, vertex29, vertex30, vertex31, vertex32, vertex33, vertex34, vertex35, vertex36, vertex37, vertex38, vertex39, vertex40, vertex41, vertex42, vertex43, vertex44, vertex45, vertex46, vertex47, vertex48, vertex49);
                }
                //All initial the coordinates are stocked in ALLc (XYZ)
                var ALLc = [];
                for (var i = 0; i < mamesh.vertices.length; i++) {
                    ALLc.push(mamesh.vertices[i].position);
                }
                //Counter for unsuccessful attempts
                var attempts = 0;
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
                    var myIndex = this.findIndex(ALLc_new, ALLc_new[randomVertex]);
                    cc('Index of the chosen vertex', indexOfVertex);
                    //cc('MyIndex', myIndex);
                    // Choose randomly one of 7 operations of refletion (over x,y,z,xy,xz,yz or xyz plane)
                    //let randomOperation = Math.floor(Math.random() * (7 - 0)) + 0;
                    var randomOperation = 3;
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
                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);
                                var ii = this.replaceValue1(ALLc_prenew, coordinateOld);
                                ALLc_prenew[ii] = coordinateNew;
                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }
                            else {
                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain = 0;
                                ALLc_prenew = ALLc_new;
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
                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);
                                var ii = this.replaceValue1(ALLc_prenew, coordinateOld);
                                ALLc_prenew[ii] = coordinateNew;
                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }
                            else {
                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain = 0;
                                ALLc_prenew = ALLc_new;
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
                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);
                                var ii = this.replaceValue1(ALLc_prenew, coordinateOld);
                                ALLc_prenew[ii] = coordinateNew;
                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }
                            else {
                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain = 0;
                                ALLc_prenew = ALLc_new;
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
                            var z_s = mamesh.vertices[randomVertex].position.z;
                            var z_n = z_s + (z_s - z);
                            var coordinateNew = new mathis.XYZ(x_n, y_n, z);
                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);
                                var ii = this.replaceValue1(ALLc_prenew, coordinateOld);
                                ALLc_prenew[ii] = coordinateNew;
                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }
                            else {
                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain = 0;
                                ALLc_prenew = ALLc_new;
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
                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);
                                var ii = this.replaceValue1(ALLc_prenew, coordinateOld);
                                ALLc_prenew[ii] = coordinateNew;
                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }
                            else {
                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain = 0;
                                ALLc_prenew = ALLc_new;
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
                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);
                                var ii = this.replaceValue1(ALLc_prenew, coordinateOld);
                                ALLc_prenew[ii] = coordinateNew;
                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }
                            else {
                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain = 0;
                                ALLc_prenew = ALLc_new;
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
                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);
                                var ii = this.replaceValue1(ALLc_prenew, coordinateOld);
                                ALLc_prenew[ii] = coordinateNew;
                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }
                            else {
                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain = 0;
                                ALLc_prenew = ALLc_new;
                                break;
                            }
                        }
                        ALLc_new = ALLc_prenew;
                        chain = chain + prechain;
                        cc('How many chains are generated?:', chain);
                    }
                    NOTfinished = (chain < 1);
                }
                cc('Chain is done!:', ALLc_new);
                cc('Attempts:', attempts);
                cc('Chain:', chain);
                mamesh.vertices = [];
                cc('mamesh.vertices.length:', mamesh.vertices.length);
                for (var i = 0; i < ALLc_new.length; i++) {
                    var vertex = new mathis.Vertex();
                    vertex.position = ALLc_new[i];
                    mamesh.vertices.push(vertex);
                }
                cc('me', mamesh.vertices.length);
                for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                    mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
                }
                mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
                var end = new Date().getTime();
                cc('Execution Time in sec', (end - start));
                cc('Attempts', attempts);
                cc('chainSize', this.chainSize);
                return mamesh;
            };
            return SAW_dynamic_Pivot;
        }());
        polymer.SAW_dynamic_Pivot = SAW_dynamic_Pivot;
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
            var camera = mathisFrame.getGrabberCamera();
            //camera.setFreeDisplacementMode()
            camera.changePosition(new mathis.XYZ(0, 0, -20));
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
            mamesh.vertices.push(vertexH0, vertexH1, vertexH2, vertexH3, vertexH4, vertexH5, vertexC0, vertexC1, vertexC2, vertexC3, vertexOUT1, vertexH0i, vertexH1i, vertexH2i, vertexH3i, vertexH4i, vertexH5i, vertexC0i, vertexC1i, vertexC2i, vertexC3i, vertexOUT2, vertex2H0, vertex2H1, vertex2H2, vertex2H3, vertex2H4, vertex2H5, vertex2C0, vertex2C1, vertex2C2, vertex2C3, vertex2OUT1, vertex2H0i, vertex2H1i, vertex2H2i, vertex2H3i, vertex2H4i, vertex2H5i, vertex2C0i, vertex2C1i, vertex2C2i, vertex2C3i, vertex2OUT2);
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
            /*            let verticesViewerS = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //S visible
                        verticesViewerS.vertices= [mamesh.vertices[44],mamesh.vertices[45], mamesh.vertices[46]];
                        verticesViewerS.color = new mathis.Color(mathis.Color.names.yellow);
                        verticesViewerS.radiusAbsolute = 0.8;
                        verticesViewerS.go();
            */
            var verticesViewerS2 = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene); //S non visible
            verticesViewerS2.vertices = [mamesh.vertices[47], mamesh.vertices[48], mamesh.vertices[49], mamesh.vertices[50]];
            verticesViewerS2.color = new mathis.Color(mathis.Color.names.yellow);
            //verticesViewerS.go();
            var verticesViewer1 = new mathis.visu3d.VerticesViewer(mamesh, mathisFrame.scene); //Prochain monomère non visible
            verticesViewer1.vertices = [mamesh.vertices[10], mamesh.vertices[21], mamesh.vertices[32], mamesh.vertices[43]];
            verticesViewer1.color = new mathis.Color(mathis.Color.names.black);
            //verticesViewer1.go();
            function contains(oneVertex, listOfVertexes) {
                for (var _i = 0, listOfVertexes_1 = listOfVertexes; _i < listOfVertexes_1.length; _i++) {
                    var v = listOfVertexes_1[_i];
                    if (mathis.geo.distance(v.position, oneVertex.position) < 0.0001) {
                        return true;
                    }
                }
                return false;
            }
            /*
                        let verticesViewer = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene); //H
                        verticesViewer.vertices= [mamesh.vertices[0], mamesh.vertices[1], mamesh.vertices[2], mamesh.vertices[3], mamesh.vertices[4],mamesh.vertices[5]];
                        verticesViewer.radiusAbsolute = 0.6;
                        verticesViewer.color = new mathis.Color(mathis.Color.names.blue);
                        verticesViewer.go();
            */
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            var model;
            var model1 = BABYLON.Mesh.CreateCylinder("", 1, 1, 1, 12, 12, mathisFrame.scene);
            model1.position.x += 1.5;
            model1.bakeCurrentTransformIntoVertices();
            var model2 = BABYLON.Mesh.CreateCylinder("", 1, 1, 1, 12, 12, mathisFrame.scene);
            model2.position.x -= 1.5;
            model2.bakeCurrentTransformIntoVertices();
            model = BABYLON.Mesh.MergeMeshes([model1, model2]);
            linkViewer.meshModel = model;
            linkViewer.color = new mathis.Color(mathis.Color.names.blue);
            var segmentOrientationFunction;
            linkViewer.color = new mathis.Color(mathis.Color.names.blue);
            var material = new BABYLON.StandardMaterial("", mathisFrame.scene);
            material.diffuseColor = new BABYLON.Color3(0, 0, 0);
            model.material = material;
            var doubles = [];
            doubles = [mamesh.vertices[8], mamesh.vertices[9], mamesh.vertices[19], mamesh.vertices[20], mamesh.vertices[30], mamesh.vertices[31], mamesh.vertices[41], mamesh.vertices[42]];
            segmentOrientationFunction = function (v1, v2) {
                if ((!contains(v1, doubles)) || (!(contains(v2, doubles)))) {
                    return 0;
                }
                else {
                    return 1;
                }
            };
            linkViewer.segmentOrientationFunction = segmentOrientationFunction;
            linkViewer.go();
            var linkViewer1 = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            segmentOrientationFunction = function (v1, v2) {
                if ((contains(v1, doubles)) && ((contains(v2, doubles)))) {
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
        display.show = show;
    })(display = mathis.display || (mathis.display = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        var SAW_Creator_static_Simple = (function () {
            function SAW_Creator_static_Simple() {
                this.chainSize = 10;
            }
            /**check if a raw belongs to a matrix*/
            SAW_Creator_static_Simple.prototype.contains = function (points, onePoint) {
                for (var _i = 0, points_5 = points; _i < points_5.length; _i++) {
                    var point = points_5[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            };
            SAW_Creator_static_Simple.prototype.go = function () {
                var start = new Date().getTime();
                cc('SIMPLE STATIC METHOD');
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
                for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                    mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
                }
                mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
                var end = new Date().getTime();
                cc('Execution Time in sec', (end - start));
                cc('Attempts', attempts);
                cc('chainSize', this.chainSize);
                return mamesh;
            };
            return SAW_Creator_static_Simple;
        }());
        polymer.SAW_Creator_static_Simple = SAW_Creator_static_Simple;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        var SAW_dynamic_Snake = (function () {
            function SAW_dynamic_Snake() {
                this.chainSize = 10;
            }
            // function that checks the list of used coordinates
            SAW_dynamic_Snake.prototype.contains = function (points, onePoint) {
                for (var _i = 0, points_6 = points; _i < points_6.length; _i++) {
                    var point = points_6[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            };
            // function that replaces a value 1 at i by value 2
            SAW_dynamic_Snake.prototype.replaceValue = function (array, valueToReplace, newValue) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == valueToReplace) {
                        array[i] = newValue;
                    }
                }
            };
            // function that find index of a given value in a given array
            SAW_dynamic_Snake.prototype.findIndex = function (array, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == value) {
                        var res = i;
                    }
                }
                return res;
            };
            SAW_dynamic_Snake.prototype.go = function () {
                cc('DYNAMIC SNAKE STATIC METHOD');
                var start = new Date().getTime();
                var mamesh = new mathis.Mamesh();
                //A given SAW
                var vertex0 = new mathis.Vertex().setPosition(0, -1, 0); //0
                var vertex1 = new mathis.Vertex().setPosition(-1, 0, 1); //1
                var vertex2 = new mathis.Vertex().setPosition(0, 0, 1); //2
                var vertex3 = new mathis.Vertex().setPosition(1, 0, 1); //3
                var vertex4 = new mathis.Vertex().setPosition(1, 1, 0); //4
                var vertex5 = new mathis.Vertex().setPosition(2, 2, 0); //5
                var vertex6 = new mathis.Vertex().setPosition(2, 3, -1); //6
                var vertex7 = new mathis.Vertex().setPosition(3, 3, 0); //7
                var vertex8 = new mathis.Vertex().setPosition(3, 4, 0); //8
                var vertex9 = new mathis.Vertex().setPosition(3, 5, -1); //9
                var vertex10 = new mathis.Vertex().setPosition(4, 5, 0); //0
                var vertex11 = new mathis.Vertex().setPosition(4, 4, 1); //1
                var vertex12 = new mathis.Vertex().setPosition(4, 5, 2); //2
                var vertex13 = new mathis.Vertex().setPosition(5, 5, 2); //3
                var vertex14 = new mathis.Vertex().setPosition(5, 6, 1); //4
                var vertex15 = new mathis.Vertex().setPosition(6, 6, 2); //5
                var vertex16 = new mathis.Vertex().setPosition(6, 5, 3); //6
                var vertex17 = new mathis.Vertex().setPosition(7, 4, 3); //7
                var vertex18 = new mathis.Vertex().setPosition(6, 3, 4); //8
                var vertex19 = new mathis.Vertex().setPosition(7, 2, 5); //9
                var vertex20 = new mathis.Vertex().setPosition(8, 3, 5); //0
                var vertex21 = new mathis.Vertex().setPosition(9, 3, 5); //1
                var vertex22 = new mathis.Vertex().setPosition(9, 3, 4); //2
                var vertex23 = new mathis.Vertex().setPosition(8, 4, 4); //3
                var vertex24 = new mathis.Vertex().setPosition(7, 3, 5); //4
                var vertex25 = new mathis.Vertex().setPosition(6, 4, 6); //5
                var vertex26 = new mathis.Vertex().setPosition(7, 5, 6); //6
                var vertex27 = new mathis.Vertex().setPosition(8, 5, 5); //7
                var vertex28 = new mathis.Vertex().setPosition(8, 5, 6); //8
                var vertex29 = new mathis.Vertex().setPosition(9, 5, 7); //9
                var vertex30 = new mathis.Vertex().setPosition(10, 5, 7); //0
                var vertex31 = new mathis.Vertex().setPosition(10, 6, 6); //1
                var vertex32 = new mathis.Vertex().setPosition(10, 7, 6); //2
                var vertex33 = new mathis.Vertex().setPosition(10, 7, 5); //3
                var vertex34 = new mathis.Vertex().setPosition(9, 7, 5); //4
                var vertex35 = new mathis.Vertex().setPosition(10, 6, 6); //5
                var vertex36 = new mathis.Vertex().setPosition(11, 5, 7); //6
                var vertex37 = new mathis.Vertex().setPosition(12, 5, 8); //7
                var vertex38 = new mathis.Vertex().setPosition(11, 6, 9); //8
                var vertex39 = new mathis.Vertex().setPosition(12, 5, 10); //9
                var vertex40 = new mathis.Vertex().setPosition(11, 4, 10); //0
                var vertex41 = new mathis.Vertex().setPosition(12, 4, 11); //1
                var vertex42 = new mathis.Vertex().setPosition(13, 3, 11); //2
                var vertex43 = new mathis.Vertex().setPosition(13, 2, 11); //3
                var vertex44 = new mathis.Vertex().setPosition(12, 1, 10); //4
                var vertex45 = new mathis.Vertex().setPosition(11, 2, 10); //5
                var vertex46 = new mathis.Vertex().setPosition(11, 3, 11); //6
                var vertex47 = new mathis.Vertex().setPosition(12, 3, 10); //7
                var vertex48 = new mathis.Vertex().setPosition(13, 4, 10); //8
                var vertex49 = new mathis.Vertex().setPosition(14, 5, 9); //9
                if (this.chainSize == 5) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4);
                }
                else if (this.chainSize == 10) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9);
                }
                else if (this.chainSize == 20) {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9, vertex10, vertex11, vertex12, vertex13, vertex14, vertex15, vertex16, vertex17, vertex18, vertex19);
                }
                else {
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9, vertex10, vertex11, vertex12, vertex13, vertex14, vertex15, vertex16, vertex17, vertex18, vertex19, vertex20, vertex21, vertex22, vertex23, vertex24, vertex25, vertex26, vertex27, vertex28, vertex29, vertex30, vertex31, vertex32, vertex33, vertex34, vertex35, vertex36, vertex37, vertex38, vertex39, vertex40, vertex41, vertex42, vertex43, vertex44, vertex45, vertex46, vertex47, vertex48, vertex49);
                }
                //All the coordinates are stocked in ALLc
                var ALLc = [];
                for (var i = 0; i < mamesh.vertices.length; i++) {
                    ALLc.push(mamesh.vertices[i].position);
                }
                //Counter for unsuccessful attempts
                var attempts = 0;
                //Nb of generated chains  (=nb of operations)
                var chain = 0;
                var t = 0;
                var test = mamesh.vertices;
                var NOTfinished = true;
                var max = 2;
                var min = 0;
                //for (let y=0; y<chain; y++){
                while (NOTfinished) {
                    t += 0.1;
                    // Choose randomly the end to delete:
                    var choice = Math.floor(Math.random() * (max - min)) + min;
                    //delete head, go to tail
                    if (choice == 0) {
                        var x = test[test.length - 1].position.x;
                        var y = test[test.length - 1].position.y;
                        var z = test[test.length - 1].position.z;
                        var alea_x = Math.floor(Math.random() * (max - min)) + min;
                        var alea_y = Math.floor(Math.random() * (max - min)) + min;
                        var alea_z = Math.floor(Math.random() * (max - min)) + min;
                        cc('TAIL-xyz old:', x, y, z);
                        var xN = alea_x + x;
                        var yN = alea_y + y;
                        var zN = alea_z + z;
                        cc('TAIL-xyz new:', xN, yN, zN);
                        var coordinate = new mathis.XYZ(xN, yN, zN);
                        if (!this.contains(ALLc, coordinate)) {
                            test.shift();
                            ALLc.shift();
                            var vertex = new mathis.Vertex();
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
                    else {
                        var x = test[0].position.x;
                        var y = test[0].position.y;
                        var z = test[0].position.z;
                        var alea_x = Math.floor(Math.random() * (max - min)) + min;
                        var alea_y = Math.floor(Math.random() * (max - min)) + min;
                        var alea_z = Math.floor(Math.random() * (max - min)) + min;
                        cc('HEAD-xyz old:', x, y, z);
                        var xN = alea_x + x;
                        var yN = alea_y + y;
                        var zN = alea_z + z;
                        cc('HEAD xyz new:', xN, yN, zN);
                        var coordinate = new mathis.XYZ(xN, yN, zN);
                        if (!this.contains(ALLc, coordinate)) {
                            var vertex = new mathis.Vertex();
                            test.pop();
                            ALLc.pop();
                            vertex.position = coordinate;
                            test.unshift(vertex);
                            ALLc.unshift(coordinate);
                            chain++;
                        }
                        else {
                            cc('This one is already taken- go back!', coordinate);
                            attempts++;
                        }
                    }
                    NOTfinished = (chain < 1);
                }
                mamesh.vertices = test;
                for (var i = 1; i < mamesh.vertices.length - 1; i++) {
                    mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
                }
                mamesh.vertices[0].setOneLink(mamesh.vertices[1]);
                mamesh.vertices[mamesh.vertices.length - 1].setOneLink(mamesh.vertices[mamesh.vertices.length - 2]);
                var end = new Date().getTime();
                cc('Execution Time in sec', (end - start));
                cc('Attempts', attempts);
                cc('chainSize', this.chainSize);
                return mamesh;
            };
            return SAW_dynamic_Snake;
        }());
        polymer.SAW_dynamic_Snake = SAW_dynamic_Snake;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
/*This class is supposed to creat buttons in CHrome, but as my mesh is made of 5 submeshes, I have no idea how to exort them all
* al once*/
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        var vulcaSimple = (function () {
            function vulcaSimple() {
                this.n = 3; //molecules
                this.m = 5; //monomères
                this.nbOfChains = 3;
            }
            //*****************USEFULL FUNCTIONS************************//
            /**check if a raw belongs to a matrix for XYZ*/
            vulcaSimple.prototype.contains = function (points, onePoint) {
                for (var _i = 0, points_7 = points; _i < points_7.length; _i++) {
                    var point = points_7[_i];
                    if (mathis.geo.distance(point, onePoint) < 0.0001) {
                        return true;
                    }
                }
                return false;
            };
            /**check if a raw belongs to a matrix for number*/
            vulcaSimple.prototype.containsN = function (points, onePoint) {
                if (onePoint in points) {
                    return true;
                }
                return false;
            };
            /**function that find
             *  of a given value in a given array*/
            vulcaSimple.prototype.findIndex = function (array, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == value) {
                        var res = i;
                    }
                }
                return res;
            };
            /**shuffles an array */
            vulcaSimple.prototype.shuffle = function (array) {
                var currentIndex = array.length, temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            };
            /**Deletes a certain value from array */
            vulcaSimple.prototype.rm = function (array, toDelete) {
                for (var i = array.length - 1; i >= 0; i--) {
                    if (array[i] === toDelete) {
                        array.splice(i, 1);
                    }
                }
                return array;
            };
            /**Find a random neighbour */
            vulcaSimple.prototype.go = function () {
                var mamesh = new mathis.Mamesh();
                var grilleS = [];
                var C_unitaire = [];
                var C_double = [];
                var S = [];
                var verticesNon = [];
                function possibleNeighbours_f(me) {
                    var me_x1 = me.x + 3;
                    var me_x2 = me.x - 3;
                    var me_y1 = me.y + 2;
                    var me_y2 = me.y - 2;
                    var me_y11 = me.y + 3;
                    var me_y22 = me.y - 3;
                    var coordinates1 = new mathis.XYZ(me_x1, me_y1, 0);
                    var coordinates2 = new mathis.XYZ(me_x1, me_y2, 0);
                    var coordinates3 = new mathis.XYZ(me_x2, me_y1, 0);
                    var coordinates4 = new mathis.XYZ(me_x2, me_y2, 0);
                    var coordinates5 = new mathis.XYZ(me_x1, me.y, 0);
                    var coordinates6 = new mathis.XYZ(me_x2, me.y, 0);
                    var coordinates7 = new mathis.XYZ(me.x, me_y1, 0);
                    var coordinates8 = new mathis.XYZ(me.x, me_y2, 0);
                    var coordinates9 = new mathis.XYZ(me_x1, me_y11, 0);
                    var coordinates10 = new mathis.XYZ(me_x1, me_y22, 0);
                    var coordinates11 = new mathis.XYZ(me_x2, me_y11, 0);
                    var coordinates12 = new mathis.XYZ(me_x2, me_y22, 0);
                    var coordinates13 = new mathis.XYZ(me.x, me_y11, 0);
                    var coordinates14 = new mathis.XYZ(me.x, me_y22, 0);
                    var coordinates = [];
                    coordinates.push(coordinates1, coordinates2, coordinates3, coordinates4, coordinates5, coordinates6, coordinates7, coordinates8, coordinates9, coordinates10, coordinates11, coordinates12, coordinates13, coordinates14);
                    var possibleNeighbours = [];
                    for (var i = 0; i < coordinates.length; i++) {
                        if (this.contains(grilleS_XYZ, coordinates[i])) {
                            possibleNeighbours.push(coordinates[i]);
                            cc('coordinates  ok', coordinates[i]);
                        }
                        else {
                            cc('coordinates not ok', coordinates[i]);
                        }
                    }
                    return possibleNeighbours;
                }
                //Atomes de carbone de type -CH_2-CH_2-
                var C_unitaire_XYZ = []; //C_unitaire
                //Atomes de carbone de type -CH=CH-
                var C_double_XYZ = []; //C_double
                //Atome de carbone de type -CHS-CHS- (ancien C_double)
                var C_affecte_XYZ = [];
                var C_affecte = [];
                //Atomes de soufre
                var S_XYZ = []; //verticesS
                //Places possilbes pour la soufre
                var grilleS_XYZ = []; //grilleS
                var w1 = 20;
                var h1 = 20;
                //****************Building a grill************************//
                // reseau initial (3 marcomolécule à 5 monomère)
                for (var j = 0; j < this.n; j++) {
                    var v_1_in = new mathis.Vertex().setPosition(1, 3 + h1 * j, 0); //not visible
                    mamesh.vertices.push(v_1_in);
                    verticesNon.push(v_1_in);
                    for (var i = 0; i < this.m; i++) {
                        var v_1_C1 = new mathis.Vertex().setPosition(3 + w1 * i, 3 + h1 * j, 0);
                        var v_1_C2 = new mathis.Vertex().setPosition(6 + w1 * i, 3 + h1 * j, 0);
                        var v_1_C3 = new mathis.Vertex().setPosition(9 + w1 * i, 3 + h1 * j, 0);
                        var v_1_C4 = new mathis.Vertex().setPosition(12 + w1 * i, 3 + h1 * j, 0);
                        //C_unitaire.push(v_1_C1,v_1_C2);
                        //C_double.push(v_1_C3,v_1_C4);
                        mamesh.vertices.push(v_1_C1, v_1_C2, v_1_C3, v_1_C4);
                        C_unitaire.push(v_1_C1, v_1_C2);
                        C_double.push(v_1_C3, v_1_C4);
                    }
                    var v_1_out = new mathis.Vertex().setPosition(15 + w1 * 4, 3 + h1 * j, 0); //not visible
                    mamesh.vertices.push(v_1_out);
                    verticesNon.push(v_1_out);
                }
                //Soufre Grille
                var hS = 2;
                var nS = 8;
                var mS = 5;
                var p = 0;
                for (var k = 0; k < this.n - 1; k++) {
                    for (var j = 0; j < nS; j++) {
                        for (var i = 0; i < mS; i++) {
                            var S1 = new mathis.Vertex().setPosition(3 + w1 * i, 6 + p + hS * j, 0);
                            var S2 = new mathis.Vertex().setPosition(6 + w1 * i, 6 + p + hS * j, 0);
                            var S3 = new mathis.Vertex().setPosition(9 + w1 * i, 6 + p + hS * j, 0);
                            var S4 = new mathis.Vertex().setPosition(12 + w1 * i, 6 + p + hS * j, 0);
                            mamesh.vertices.push(S1, S2, S3, S4);
                            grilleS.push(S1, S2, S3, S4);
                            grilleS_XYZ.push(S1.position, S2.position, S3.position, S4.position);
                        }
                    }
                    p = p + 20;
                }
                var test = [];
                for (var i = 0; i < C_double.length; i++) {
                    test.push(C_double[i]);
                }
                for (var i = 0; i < this.nbOfChains; i++) {
                    var indexesInMamesh = [];
                    //Actual chain at i
                    var thisChain = [];
                    var thisChain_XYZ = [];
                    //Choose S chain lenght
                    var bridgeS = Math.floor(Math.random() * (10 - 1)) + 1;
                    //Choose a random vertex in CS by index
                    var indexOfRandomVertex1 = Math.floor(Math.random() * (test.length - 1 - 0)) + 0;
                    var RandomVertex1inCS = test[indexOfRandomVertex1];
                    cc('RandomVertex1inCS', RandomVertex1inCS);
                    //add it to C_affected
                    C_affecte.push(RandomVertex1inCS);
                    //delete it from C_double
                    this.rm(test, RandomVertex1inCS);
                    //add it to thisChain
                    thisChain_XYZ.push(RandomVertex1inCS.position);
                    var indexRandomVertex1 = mamesh.vertices.indexOf(test[indexOfRandomVertex1]);
                    indexesInMamesh.push(indexRandomVertex1);
                    var Security = mamesh.vertices;
                    for (var j = 1; j < bridgeS; j++) {
                        cc('thisChain_XYZ[j-1]', thisChain_XYZ[j - 1]);
                        var possible_Neighbours_list = [];
                        possible_Neighbours_list = possibleNeighbours_f(thisChain_XYZ[j - 1]);
                        cc('possible_Neighbours_list', possible_Neighbours_list);
                        var randomNeighbour_index = Math.floor(Math.random() * (possible_Neighbours_list.length - 1 - 0)) + 0;
                        var random_Neighbour = possible_Neighbours_list[randomNeighbour_index];
                        cc('random_Neighbour', random_Neighbour);
                        if (!random_Neighbour) {
                            cc('thisChain_XYZ', thisChain_XYZ);
                            break;
                        }
                        if (!this.contains(S_XYZ, random_Neighbour)) {
                            S_XYZ.push(random_Neighbour);
                            var coordinates = new mathis.XYZ(random_Neighbour.x, random_Neighbour.y, 0);
                            var vertex = new mathis.Vertex();
                            vertex.position = coordinates;
                            S.push(vertex);
                            mamesh.vertices.push(vertex);
                            cc('S added', coordinates);
                            var index = mamesh.vertices.indexOf(vertex);
                            indexesInMamesh.push(index);
                            thisChain_XYZ.push(random_Neighbour);
                            cc('grille', grilleS_XYZ);
                        }
                        else {
                            cc('Doublons! New chain');
                            mamesh.vertices = Security;
                            break;
                        }
                    }
                    cc('indexesS', indexesInMamesh);
                    var randomVertex2 = Math.floor(Math.random() * (test.length - 1 - 0)) + 0;
                    var indexRandomVertex2 = mamesh.vertices.indexOf(test[randomVertex2]);
                    C_affecte.push(test[randomVertex2]);
                    this.rm(test, test[randomVertex2]);
                    indexesInMamesh.push(indexRandomVertex2);
                    for (var i_2 = 1; i_2 < indexesInMamesh.length - 1; i_2++) {
                        mamesh.vertices[indexesInMamesh[i_2]].setTwoOppositeLinks(mamesh.vertices[indexesInMamesh[i_2 - 1]], mamesh.vertices[indexesInMamesh[i_2 + 1]]);
                    }
                    mamesh.vertices[indexesInMamesh[0]].setOneLink(mamesh.vertices[indexesInMamesh[1]]);
                    mamesh.vertices[indexesInMamesh.length - 1].setOneLink(mamesh.vertices[indexesInMamesh.length - 2]);
                }
                var x = 0;
                for (var k = 0; k < this.n; k++) {
                    mamesh.vertices[0 + x].setOneLink(mamesh.vertices[x + 1]);
                    for (var j = 0; j < this.m; j++) {
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
                return mamesh;
            };
            return vulcaSimple;
        }());
        polymer.vulcaSimple = vulcaSimple;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function vulca2D() {
            var mathisFrame = new mathis.MathisFrame();
            var camera = mathisFrame.getGrabberCamera();
            camera.setFreeDisplacementMode();
            camera.changePosition(new mathis.XYZ(0, 0, -100));
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
                    var v_1_H1 = new mathis.Vertex().setPosition(3 + w1 * i, 2 + h1 * j, 0); //4
                    var v_1_H2 = new mathis.Vertex().setPosition(3 + w1 * i, 4 + h1 * j, 0);
                    var v_1_H3 = new mathis.Vertex().setPosition(6 + w1 * i, 2 + h1 * j, 0);
                    var v_1_H4 = new mathis.Vertex().setPosition(6 + w1 * i, 4 + h1 * j, 0);
                    var v_1_H5 = new mathis.Vertex().setPosition(9 + w1 * i, 4 + h1 * j, 0);
                    var v_1_H6 = new mathis.Vertex().setPosition(12 + w1 * i, 2 + h1 * j, 0);
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
            //294-296
            var s95_147_a = new mathis.Vertex().setPosition(61, 29, 0);
            var s95_147_b = new mathis.Vertex().setPosition(59, 33, 0);
            var s95_147_c = new mathis.Vertex().setPosition(60, 35, 0);
            //nonVisible
            //297-301
            var sN6 = new mathis.Vertex().setPosition(10, 45, 0);
            var sN7 = new mathis.Vertex().setPosition(26, 45, 0);
            var sN8 = new mathis.Vertex().setPosition(35, 45, 0);
            var sN9 = new mathis.Vertex().setPosition(48, 45, 0);
            var sN10 = new mathis.Vertex().setPosition(50, 45, 0);
            //302-304
            var s33_86_a = new mathis.Vertex().setPosition(45, 7, 0);
            var s33_86_b = new mathis.Vertex().setPosition(51, 12, 0);
            var s33_86_c = new mathis.Vertex().setPosition(48, 17, 0);
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
            mamesh.vertices.push(sN6, sN7, sN8, sN9, sN10);
            mamesh.vertices[108].setOneLink(mamesh.vertices[297]);
            mamesh.vertices[118].setOneLink(mamesh.vertices[298]);
            mamesh.vertices[127].setOneLink(mamesh.vertices[299]);
            mamesh.vertices[138].setOneLink(mamesh.vertices[300]);
            mamesh.vertices[148].setOneLink(mamesh.vertices[301]);
            mamesh.vertices.push(s33_86_a, s33_86_b, s33_86_c);
            mamesh.vertices[302].setTwoOppositeLinks(mamesh.vertices[33], mamesh.vertices[303]);
            mamesh.vertices[303].setTwoOppositeLinks(mamesh.vertices[302], mamesh.vertices[304]);
            mamesh.vertices[304].setTwoOppositeLinks(mamesh.vertices[303], mamesh.vertices[86]);
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
                mamesh.vertices[260], mamesh.vertices[261], mamesh.vertices[262], mamesh.vertices[263], mamesh.vertices[264],
                mamesh.vertices[297], mamesh.vertices[298], mamesh.vertices[299], mamesh.vertices[300], mamesh.vertices[301]
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
            verticesViewerH.radiusAbsolute = 0.4;
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
                mamesh.vertices[294], mamesh.vertices[295], mamesh.vertices[296],
                mamesh.vertices[302], mamesh.vertices[303], mamesh.vertices[304]
            ];
            var verticesViewerS = new mathis.visu3d.VerticesViewer(verticesS, mathisFrame.scene); //S
            verticesViewerS.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewerS.radiusAbsolute = 0.6;
            verticesViewerS.go();
            mine.sort(function (a, b) { return a - b; });
            cc('mine', mine);
            cc('vertices', mamesh.vertices);
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, mathisFrame.scene);
            linkViewer.color = new mathis.Color(mathis.Color.names.black);
            linkViewer.go();
        }
        polymer.vulca2D = vulca2D;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function start_Chain_DP() {
            {
                var mathisFrame = new mathis.MathisFrame("pieceOfCodeChain_Init");
                var aPieceOfCode = new mathis.ChainPresentation_Init(mathisFrame);
                var binder = new mathis.appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime();
            }
            {
                var mathisFrame = new mathis.MathisFrame("pieceOfCodeChain_DP");
                var aPieceOfCode = new mathis.ChainPresentation_P(mathisFrame);
                var binder = new mathis.appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime();
            }
        }
        polymer.start_Chain_DP = start_Chain_DP;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function start_Chain_DS() {
            {
                var mathisFrame = new mathis.MathisFrame("pieceOfCodeChain_Init");
                var aPieceOfCode = new mathis.ChainPresentation_Init(mathisFrame);
                var binder = new mathis.appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime();
            }
            {
                var mathisFrame = new mathis.MathisFrame("pieceOfCodeChain_DS");
                var aPieceOfCode = new mathis.ChainPresentation_S(mathisFrame);
                var binder = new mathis.appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime();
            }
        }
        polymer.start_Chain_DS = start_Chain_DS;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function start_Chain_Static() {
            {
                var mathisFrame = new mathis.MathisFrame("pieceOfCodeChain_SB");
                var aPieceOfCode = new mathis.ChainPresentation_A(mathisFrame);
                var binder = new mathis.appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime();
            }
            {
                var mathisFrame = new mathis.MathisFrame("pieceOfCodeChain_SS");
                var aPieceOfCode = new mathis.ChainPresentation_B(mathisFrame);
                var binder = new mathis.appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime();
            }
        }
        polymer.start_Chain_Static = start_Chain_Static;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var polymer;
    (function (polymer) {
        function start_Chain_V() {
            {
                var mathisFrame = new mathis.MathisFrame("pieceOfCodeChain_V");
                var aPieceOfCode = new mathis.ChainPresentation_V(mathisFrame);
                var binder = new mathis.appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime();
            }
        }
        polymer.start_Chain_V = start_Chain_V;
    })(polymer = mathis.polymer || (mathis.polymer = {}));
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var ChainPresentation_P = (function () {
        function ChainPresentation_P(mathisFrame) {
            this.mathisFrame = mathisFrame;
            this.NAME = "ChainPresentation_P";
            this.TITLE = "";
            this.chainSize = 10;
            this.$$$chainSize = [5, 10, 20, 50];
        }
        ChainPresentation_P.prototype.goForTheFirstTime = function () {
            this.mathisFrame.clearScene();
            this.mathisFrame.addDefaultCamera();
            this.mathisFrame.addDefaultLight();
            var camera = this.mathisFrame.getGrabberCamera();
            camera.changePosition(new mathis.XYZ(0, 0, -30));
            this.go();
        };
        ChainPresentation_P.prototype.go = function () {
            this.mathisFrame.clearScene(false, false);
            var creator = new mathis.polymer.SAW_dynamic_Pivot();
            creator.chainSize = this.chainSize;
            var mamesh = creator.go();
            var verticeViewer = new mathis.visu3d.VerticesViewer(mamesh, this.mathisFrame.scene);
            verticeViewer.radiusAbsolute = 0.1;
            verticeViewer.go();
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, this.mathisFrame.scene);
            linkViewer.go();
        };
        return ChainPresentation_P;
    }());
    mathis.ChainPresentation_P = ChainPresentation_P;
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var ChainPresentation_S = (function () {
        function ChainPresentation_S(mathisFrame) {
            this.mathisFrame = mathisFrame;
            this.NAME = "ChainPresentation_S";
            this.TITLE = "";
            this.chainSize = 10;
            this.$$$chainSize = [5, 10, 20, 50];
        }
        ChainPresentation_S.prototype.goForTheFirstTime = function () {
            this.mathisFrame.clearScene();
            this.mathisFrame.addDefaultCamera();
            this.mathisFrame.addDefaultLight();
            var camera = this.mathisFrame.getGrabberCamera();
            camera.changePosition(new mathis.XYZ(0, 0, -30));
            this.go();
        };
        ChainPresentation_S.prototype.go = function () {
            this.mathisFrame.clearScene(false, false);
            var creator = new mathis.polymer.SAW_dynamic_Snake();
            creator.chainSize = this.chainSize;
            var mamesh = creator.go();
            cc(mamesh.toString());
            var verticeViewer = new mathis.visu3d.VerticesViewer(mamesh, this.mathisFrame.scene);
            verticeViewer.radiusAbsolute = 0.1;
            verticeViewer.go();
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, this.mathisFrame.scene);
            linkViewer.go();
        };
        return ChainPresentation_S;
    }());
    mathis.ChainPresentation_S = ChainPresentation_S;
})(mathis || (mathis = {}));
/**
 * Created by vigon on 17/07/2017.
 */
var mathis;
(function (mathis) {
    var ChainPresentation_Init = (function () {
        function ChainPresentation_Init(mathisFrame) {
            this.mathisFrame = mathisFrame;
            this.NAME = "ChainPresentation_Init";
            this.TITLE = "";
            this.chainSize = 10;
            this.$$$chainSize = [5, 10, 20, 50];
        }
        ChainPresentation_Init.prototype.goForTheFirstTime = function () {
            this.mathisFrame.clearScene();
            this.mathisFrame.addDefaultCamera();
            this.mathisFrame.addDefaultLight();
            var camera = this.mathisFrame.getGrabberCamera();
            camera.changePosition(new mathis.XYZ(0, 0, -30));
            this.go();
        };
        ChainPresentation_Init.prototype.go = function () {
            this.mathisFrame.clearScene(false, false);
            var creator = new mathis.polymer.SAW_Init();
            creator.chainSize = this.chainSize;
            var mamesh = creator.go();
            var verticeViewer = new mathis.visu3d.VerticesViewer(mamesh, this.mathisFrame.scene);
            verticeViewer.radiusAbsolute = 0.1;
            verticeViewer.go();
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, this.mathisFrame.scene);
            linkViewer.go();
        };
        return ChainPresentation_Init;
    }());
    mathis.ChainPresentation_Init = ChainPresentation_Init;
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var ChainPresentation_B = (function () {
        function ChainPresentation_B(mathisFrame) {
            this.mathisFrame = mathisFrame;
            this.NAME = "ChainPresentation_B";
            this.TITLE = "";
            this.chainSize = 10;
            this.$$$chainSize = [5, 10, 20];
        }
        ChainPresentation_B.prototype.goForTheFirstTime = function () {
            this.mathisFrame.clearScene();
            this.mathisFrame.addDefaultCamera();
            this.mathisFrame.addDefaultLight();
            var camera = this.mathisFrame.getGrabberCamera();
            camera.changePosition(new mathis.XYZ(0, 0, -30));
            this.go();
        };
        ChainPresentation_B.prototype.go = function () {
            this.mathisFrame.clearScene(false, false);
            var creator = new mathis.polymer.SAW_Creator_static_Biased();
            creator.chainSize = this.chainSize;
            var mamesh = creator.go();
            cc(mamesh.toString());
            var verticeViewer = new mathis.visu3d.VerticesViewer(mamesh, this.mathisFrame.scene);
            verticeViewer.radiusAbsolute = 0.1;
            verticeViewer.go();
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, this.mathisFrame.scene);
            linkViewer.go();
        };
        return ChainPresentation_B;
    }());
    mathis.ChainPresentation_B = ChainPresentation_B;
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var ChainPresentation_A = (function () {
        function ChainPresentation_A(mathisFrame) {
            this.mathisFrame = mathisFrame;
            this.NAME = "ChainPresentation_A";
            this.TITLE = "";
            this.chainSize = 10;
            this.$$$chainSize = [5, 10, 20];
        }
        ChainPresentation_A.prototype.goForTheFirstTime = function () {
            this.mathisFrame.clearScene();
            this.mathisFrame.addDefaultCamera();
            this.mathisFrame.addDefaultLight();
            var camera = this.mathisFrame.getGrabberCamera();
            camera.changePosition(new mathis.XYZ(0, 0, -30));
            this.go();
        };
        ChainPresentation_A.prototype.go = function () {
            this.mathisFrame.clearScene(false, false);
            var creator = new mathis.polymer.SAW_Creator_static_Simple();
            creator.chainSize = this.chainSize;
            var mamesh = creator.go();
            cc(mamesh.toString());
            var verticeViewer = new mathis.visu3d.VerticesViewer(mamesh, this.mathisFrame.scene);
            verticeViewer.radiusAbsolute = 0.1;
            verticeViewer.go();
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, this.mathisFrame.scene);
            linkViewer.go();
        };
        return ChainPresentation_A;
    }());
    mathis.ChainPresentation_A = ChainPresentation_A;
})(mathis || (mathis = {}));
var mathis;
(function (mathis) {
    var ChainPresentation_V = (function () {
        function ChainPresentation_V(mathisFrame) {
            this.mathisFrame = mathisFrame;
            this.NAME = "ChainPresentation_V";
            this.TITLE = "";
            this.nbOfChains = 10;
            this.$$$nbOfChains = [5, 10, 20, 50];
            this.n = 3; //molecules
            this.$$$n = [1, 3, 5, 7];
            this.m = 5; //monomères
            this.$$$m = [1, 3, 5, 7];
        }
        ChainPresentation_V.prototype.goForTheFirstTime = function () {
            this.mathisFrame.clearScene();
            this.mathisFrame.addDefaultCamera();
            this.mathisFrame.addDefaultLight();
            var camera = this.mathisFrame.getGrabberCamera();
            camera.changePosition(new mathis.XYZ(0, 0, -40));
            this.go();
        };
        ChainPresentation_V.prototype.go = function () {
            this.mathisFrame.clearScene(false, false);
            var creator = new mathis.polymer.vulcaSimple();
            creator.nbOfChains = this.nbOfChains;
            creator.m = this.m;
            creator.n = this.n;
            creator.grilleS = this.grilleS;
            creator.C_unitaire = this.C_unitaire;
            creator.C_double = this.C_double;
            creator.S = this.S;
            creator.verticesNon = this.verticesNon;
            var mamesh = creator.go();
            var verticesViewerS = new mathis.visu3d.VerticesViewer(this.grilleS, this.mathisFrame.scene);
            verticesViewerS.color = new mathis.Color(mathis.Color.names.lightyellow);
            verticesViewerS.radiusAbsolute = 0.3;
            verticesViewerS.go();
            var verticesViewerC = new mathis.visu3d.VerticesViewer(this.C_unitaire, this.mathisFrame.scene);
            verticesViewerC.color = new mathis.Color(mathis.Color.names.darkviolet);
            verticesViewerC.radiusAbsolute = 0.7;
            verticesViewerC.go();
            var verticesViewerCS = new mathis.visu3d.VerticesViewer(this.C_double, this.mathisFrame.scene);
            verticesViewerCS.color = new mathis.Color(mathis.Color.names.red);
            verticesViewerCS.radiusAbsolute = 0.9;
            verticesViewerCS.go();
            var verticesViewerSS = new mathis.visu3d.VerticesViewer(this.S, this.mathisFrame.scene);
            verticesViewerSS.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewerSS.radiusAbsolute = 0.9;
            verticesViewerSS.go();
            var verticesViewerNon = new mathis.visu3d.VerticesViewer(this.verticesNon, this.mathisFrame.scene);
            //verticesViewerNon.go();
            var linkViewer = new mathis.visu3d.LinksViewer(mamesh, this.mathisFrame.scene);
            linkViewer.go();
        };
        return ChainPresentation_V;
    }());
    mathis.ChainPresentation_V = ChainPresentation_V;
})(mathis || (mathis = {}));
//# sourceMappingURL=smallProject.js.map