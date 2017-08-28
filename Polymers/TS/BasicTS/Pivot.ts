/*TODO check why stoped working!!*/

module mathis {
    export module polymer {
        export class SAW_dynamic_Pivot{

            chainSize=10

            constructor(){
            }

            // function that checks the list of used coordinates
            private contains(points: XYZ[], onePoint: XYZ) :boolean{
            for (let point of points){
                if (geo.distance(point,onePoint)<0.0001) {
                    return true
                }
            }
            return false
            }


            // function that replaces a value 1 at i by value 2
            private replaceValue(array: XYZ[], valueToReplace: XYZ, newValue: XYZ) {
                let index = array.indexOf(valueToReplace);
                if (index !== -1) {
                    array[index] = newValue;
                }
            return array
            }


            // function that find index of a given value in a given array
            private findIndex (array: XYZ[], value: XYZ ): number{
            for (let i = 0; i< array.length; i++) {
                if (array[i] === value) {
                    var res = i;
                }
            }
            return res;
            }


            private replaceValue1 (array: XYZ[], value: XYZ) {
                for(let i=0; i<array.length; i++){
                    if(geo.distance(array[i],value)<0.0001){

                        return i;
                    }
                }
            }



            go():Mamesh{

                cc('DYNAMIC PIVOT STATIC METHOD');
                let start = new Date().getTime();


                let mamesh = new mathis.Mamesh();

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


                if (this.chainSize == 5){
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4);
                }


                else if (this.chainSize == 10){
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9)
                }

                else if (this.chainSize == 20){
                    mamesh.vertices.push(vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9,
                        vertex10, vertex11, vertex12, vertex13, vertex14, vertex15, vertex16, vertex17, vertex18, vertex19
                    );
                }

                else
                {
                    mamesh.vertices.push(
                        vertex0, vertex1, vertex2, vertex3, vertex4, vertex5, vertex6, vertex7, vertex8, vertex9,
                        vertex10, vertex11, vertex12, vertex13, vertex14, vertex15, vertex16, vertex17, vertex18, vertex19,
                        vertex20, vertex21, vertex22, vertex23, vertex24, vertex25, vertex26, vertex27, vertex28, vertex29,
                        vertex30, vertex31, vertex32, vertex33, vertex34, vertex35, vertex36, vertex37, vertex38, vertex39,
                        vertex40, vertex41, vertex42, vertex43, vertex44, vertex45, vertex46, vertex47, vertex48, vertex49
                    );
                }


                //All initial the coordinates are stocked in ALLc (XYZ)
                let ALLc: XYZ[] = [];
                for(let i =0; i<mamesh.vertices.length; i++){
                    ALLc.push(mamesh.vertices[i].position)
                }


                //Counter for unsuccessful attempts
                let attempts = 0;

                //Nb of chains generated (=nb of operations)
                let chain = 1;

                //pre-chain is not validated subchain (Let subchain length e equal to 4, so prechain becomes subchain when prechain = 4)
                let prechain = 0;


                let NOTfinished = true;

                // All modified coordinates are stored in ALLc_new
                let ALLc_new: XYZ[] = ALLc;

                while (NOTfinished) {

                    let ALLc_prenew: XYZ[] = ALLc_new;

                    // Choose a random vertex (by index) in ALLc
                    let randomVertex = Math.floor(Math.random() * (ALLc_new.length-1 - 0)) + 0;
                    cc('Random Vertex in ALLc_new', ALLc_new[randomVertex]);

                    //Learn its value
                    let indexOfVertex = ALLc_new.indexOf( ALLc_new[randomVertex] );
                    let myIndex = this.findIndex(ALLc_new, ALLc_new[randomVertex]);
                    cc('Index of the chosen vertex', indexOfVertex);
                    //cc('MyIndex', myIndex);


                    // Choose randomly one of 7 operations of refletion (over x,y,z,xy,xz,yz or xyz plane)
                    //let randomOperation = Math.floor(Math.random() * (7 - 0)) + 0;
                    let randomOperation= 3;
                    cc('Chosen reflexion operation', randomOperation);

                    // Choose randomly a subchain
                    let subChain: XYZ [] = [];
                    subChain =  ALLc_new;

                    let randomSubChain = Math.floor(Math.random() * (2 - 0)) + 0;
                    if (randomSubChain == 0) {
                        subChain=subChain.slice(0,myIndex+1);
                        cc('Chosen subChain: from head to random vertex ', subChain);

                    }
                    else{
                        subChain=subChain.slice(myIndex,ALLc_new.length);
                        cc('Chosen subChain:  from random vertex to tail ', subChain);
                    }


                    if (randomOperation == 0) {
                        for (let i = 0; i < subChain.length; i++) {
                            let x = mamesh.vertices[i].position.x;
                            let y = mamesh.vertices[i].position.y;
                            let z = mamesh.vertices[i].position.z;
                            let coordinateOld: XYZ = new XYZ(x, y, z);


                            let x_s = mamesh.vertices[randomVertex].position.x;
                            let x_n = x_s + ( x_s - x);

                            let coordinateNew: XYZ = new XYZ(x_n, y, z);
                            //cc('New x,y,z', x_n, y_n, z_n);

                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);

                                let ii = this.replaceValue1(ALLc_prenew,coordinateOld)
                                ALLc_prenew[ii]=coordinateNew

                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }


                            else {

                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain=0;
                                ALLc_prenew=ALLc_new;
                                break;
                            }


                        }
                        ALLc_new=ALLc_prenew;
                        chain= chain + prechain;
                        cc('Validated steps so far', chain);
                    }

                    else if (randomOperation == 1) {
                        for (let i = 0; i < subChain.length; i++) {
                            let x = mamesh.vertices[i].position.x;
                            let y = mamesh.vertices[i].position.y;
                            let z = mamesh.vertices[i].position.z;
                            let coordinateOld: XYZ = new XYZ(x, y, z);


                            let y_s = mamesh.vertices[randomVertex].position.y;
                            let y_n = y_s + (y_s - y);
                            let coordinateNew: XYZ = new XYZ(x, y_n, z);

                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);

                                let ii = this.replaceValue1(ALLc_prenew,coordinateOld)
                                ALLc_prenew[ii]=coordinateNew

                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }


                            else {

                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain=0;
                                ALLc_prenew=ALLc_new;
                                break;
                            }

                        }
                        ALLc_new=ALLc_prenew;
                        chain= chain + prechain;
                        cc('Validated steps so far', chain);
                    }

                    else if (randomOperation == 2) {
                        for (let i = 0; i < subChain.length; i++) {
                            let x = mamesh.vertices[i].position.x;
                            let y = mamesh.vertices[i].position.y;
                            let z = mamesh.vertices[i].position.z;
                            let coordinateOld: XYZ = new XYZ(x, y, z);


                            let z_s = mamesh.vertices[randomVertex].position.z;
                            let z_n = z_s + ( z_s - z);
                            let coordinateNew: XYZ = new XYZ(x, y, z_n);

                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);

                                let ii = this.replaceValue1(ALLc_prenew,coordinateOld)
                                ALLc_prenew[ii]=coordinateNew

                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }


                            else {

                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain=0;
                                ALLc_prenew=ALLc_new;
                                break;
                            }


                        }
                        ALLc_new=ALLc_prenew;
                        chain= chain + prechain;
                        cc('Validated steps so far', chain);
                    }

                    else if (randomOperation == 3) {
                        for (let i = 0; i < subChain.length; i++) {
                            let x = mamesh.vertices[i].position.x;
                            let y = mamesh.vertices[i].position.y;
                            let z = mamesh.vertices[i].position.z;
                            let coordinateOld: XYZ = new XYZ(x, y, z);


                            let x_s = mamesh.vertices[randomVertex].position.x;
                            let x_n = x_s + ( x_s - x);
                            let y_s = mamesh.vertices[randomVertex].position.y;
                            let y_n = y_s + (y_s - y);
                            let z_s = mamesh.vertices[randomVertex].position.z;
                            let z_n = z_s + (z_s - z);
                            let coordinateNew: XYZ = new XYZ(x_n, y_n, z);

                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);

                                let ii = this.replaceValue1(ALLc_prenew,coordinateOld)
                                ALLc_prenew[ii]=coordinateNew

                               // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }


                            else {

                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain=0;
                                ALLc_prenew=ALLc_new;
                                break;
                            }

                        }
                        ALLc_new=ALLc_prenew;
                        chain= chain + prechain;
                        cc('Validated steps so far', chain);
                    }

                    else if (randomOperation == 4) {
                        for (let i = 0; i < subChain.length; i++) {
                            let x = mamesh.vertices[i].position.x;
                            let y = mamesh.vertices[i].position.y;
                            let z = mamesh.vertices[i].position.z;
                            let coordinateOld: XYZ = new XYZ(x, y, z);

                            let x_s = mamesh.vertices[randomVertex].position.x;
                            let x_n = x_s + ( x_s - x);
                            let z_s = mamesh.vertices[randomVertex].position.z;
                            let z_n = z_s + ( z_s - z);
                            let coordinateNew: XYZ = new XYZ(x_n, y, z_n);

                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);

                                let ii = this.replaceValue1(ALLc_prenew,coordinateOld)
                                ALLc_prenew[ii]=coordinateNew

                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }


                            else {

                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain=0;
                                ALLc_prenew=ALLc_new;
                                break;
                            }


                        }
                        ALLc_new=ALLc_prenew;
                        chain= chain + prechain;
                        cc('Validated steps so far', chain);
                    }

                    else if (randomOperation == 5) {
                        for (let i = 0; i < subChain.length; i++) {
                            let x = mamesh.vertices[i].position.x;
                            let y = mamesh.vertices[i].position.y;
                            let z = mamesh.vertices[i].position.z;
                            let coordinateOld: XYZ = new XYZ(x, y, z);


                            let y_s = mamesh.vertices[randomVertex].position.y;
                            let y_n = y_s + (y_s - y);
                            let z_s = mamesh.vertices[randomVertex].position.z;
                            let z_n = z_s + ( z_s - z);
                            let coordinateNew: XYZ = new XYZ(x, y_n, z_n);

                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);

                                let ii = this.replaceValue1(ALLc_prenew,coordinateOld)
                                ALLc_prenew[ii]=coordinateNew

                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }


                            else {

                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain=0;
                                ALLc_prenew=ALLc_new;
                                break;
                            }
                        }
                        ALLc_new=ALLc_prenew;
                        chain= chain + prechain;
                        cc('Validated steps so far', chain);

                    }

                    else if (randomOperation == 6) {
                        for (let i = 0; i < subChain.length; i++) {
                            let x = mamesh.vertices[i].position.x;
                            let y = mamesh.vertices[i].position.y;
                            let z = mamesh.vertices[i].position.z;
                            let coordinateOld: XYZ = new XYZ(x, y, z);
                            //cc('Old x,y,z', x, y, z);


                            let x_s = mamesh.vertices[randomVertex].position.x;
                            let x_n = x_s + ( x_s - x);
                            let y_s = mamesh.vertices[randomVertex].position.y;
                            let y_n = y_s + (y_s - y);
                            let z_s = mamesh.vertices[randomVertex].position.z;
                            let z_n = z_s + ( z_s - z);
                            let coordinateNew: XYZ = new XYZ(x_n, y_n, z_n);
                            //cc('New x,y,z', x_n, y_n, z_n);

                            if (!this.contains(ALLc_new, coordinateNew)) {
                                cc('ALLc_prenew before', ALLc_prenew);

                                let ii = this.replaceValue1(ALLc_prenew,coordinateOld)
                                ALLc_prenew[ii]=coordinateNew

                                // ALLc_prenew = this.replaceValue(ALLc_prenew, coordinateOld, coordinateNew);
                                prechain++;
                                cc('coordinateOld', coordinateOld);
                                cc('coordinateNew', coordinateNew);
                                cc('ALLc_prenew after', ALLc_prenew);
                            }


                            else {

                                cc('!!!Bad configuration- stop counting!!!', coordinateNew);
                                attempts++;
                                prechain=0;
                                ALLc_prenew=ALLc_new;
                                break;
                            }


                        }
                        ALLc_new=ALLc_prenew;
                        chain= chain + prechain;
                        cc('How many chains are generated?:', chain);
                    }

                    NOTfinished = (chain < 1);
                }
                cc('Chain is done!:', ALLc_new);
                cc('Attempts:',attempts);
                cc('Chain:',chain);




                mamesh.vertices=[]

                cc('mamesh.vertices.length:',mamesh.vertices.length);

                for (let i=0; i < ALLc_new.length; i++){
                    let vertex = new mathis.Vertex();
                    vertex.position = ALLc_new[i];
                    mamesh.vertices.push(vertex);
                }



                cc('me',mamesh.vertices.length);



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
