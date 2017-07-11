module mathis {
    export module display {
        export function tests() {



            let mathisFrame = new mathis.MathisFrame();
            let interpolationStyle = geometry.InterpolationStyle.none;
            let nb = 8;
            let mamesh = new mathis.Mamesh();

            for (let i=0; i<nb; i++){
                let vertex = new mathis.Vertex();
                let angle = 2*Math.PI * i/ (nb);
                vertex.position = new mathis.XYZ(Math.cos(angle), Math.sin(angle),0);
                mamesh.vertices.push(vertex);
            }


            for (let i = 1; i < mamesh.vertices.length - 1; i++) {
                mamesh.vertices[i].setTwoOppositeLinks(mamesh.vertices[i - 1], mamesh.vertices[i + 1]);
            }
            mamesh.vertices[0].setTwoOppositeLinks(mamesh.vertices[1],mamesh.vertices[mamesh.vertices.length - 1]);
            mamesh.vertices[mamesh.vertices.length - 1].setTwoOppositeLinks(mamesh.vertices[mamesh.vertices.length - 2],mamesh.vertices[0]);



            let linkViewer =new visu3d.LinksViewer(mamesh,mathisFrame.scene);
            linkViewer.color = new mathis.Color(mathis.Color.names.black);
            linkViewer.go();


            let verticesViewer = new mathis.visu3d.VerticesViewer(mamesh,mathisFrame.scene);
            verticesViewer.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewer.radiusAbsolute = 0.2;
            verticesViewer.go();

        }
    }
}







