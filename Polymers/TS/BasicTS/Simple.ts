module mathis {
    export module polymer {
        export class SAW_Creator_static_Simple{
            chainSize=10

            constructor(){
            }


            /**check if a raw belongs to a matrix*/
            private  contains(points: XYZ[], onePoint: XYZ) :boolean{
                for (let point of points){
                    if (geo.distance(point,onePoint)<0.0001) {
                        return true
                    }
                }
                return false
            }

            go():Mamesh{
                let start = new Date().getTime();
                cc('SIMPLE STATIC METHOD');

                let NOTfinished = true;
                let security=100;
                let attempts = 0;
                let min = -1;
                let max = 2;



                let mamesh = new mathis.Mamesh();


                while (NOTfinished && attempts<security){
                    let x = 0;
                    let y = 0;
                    let z = 0;

                    let ALLcoordinates: XYZ[]=[];
                    ALLcoordinates[0]=new XYZ(x,y,z);

                    for (let i = 1; i < this.chainSize; i++) {

                        let alea1 = Math.floor(Math.random() * (max - min)) + min;
                        let alea2 = Math.floor(Math.random() * (max - min)) + min;
                        let alea3 = Math.floor(Math.random() * (max - min)) + min;

                        cc('aleas:', alea1,alea2,alea3);
                        x=alea1+x;
                        y=alea2+y;
                        z=alea3+z;
                        //initialisation?
                        let coordinates : XYZ = new XYZ(x,y,z);
                        cc('coordinates',coordinates);

                        if (!this.contains(ALLcoordinates, coordinates) ) {
                            let vertex = new mathis.Vertex();
                            vertex.position=coordinates;
                            ALLcoordinates.push(coordinates);
                            mamesh.vertices.push(vertex);
                        }

                        else {
                            cc('This one is already taken!', coordinates);
                            attempts++;
                            while (mamesh.vertices.length > 0 ) {
                                mamesh.vertices.pop();
                            }

                            break;
                        }
                    }

                    NOTfinished=(ALLcoordinates.length<this.chainSize);
                }

                for (let  i = 1; i < mamesh.vertices.length - 1; i++) {
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