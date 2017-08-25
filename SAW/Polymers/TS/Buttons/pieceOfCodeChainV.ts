

module mathis {
    import GrabberCamera = mathis.macamera.GrabberCamera;
    import vulcaSimple = mathis.polymer.vulcaSimple;
    export class ChainPresentation_V implements appli.PieceOfCode {
        NAME = "ChainPresentation_V"
        TITLE = ""

        nbOfChains = 10
        $$$nbOfChains = [5, 10, 20, 50]

        n = 3; //molecules
        $$$n = [1, 3, 5, 7]

        m = 5; //monomères
        $$$m = [1, 3, 5, 7]





        constructor(private mathisFrame: MathisFrame) {
        }

        goForTheFirstTime() {
            this.mathisFrame.clearScene()
            this.mathisFrame.addDefaultCamera()
            this.mathisFrame.addDefaultLight()
            let camera: GrabberCamera = this.mathisFrame.getGrabberCamera()
            camera.changePosition(new XYZ(0, 0, -40));
            this.go()
        }


        go() {

            this.mathisFrame.clearScene(false, false)

            let creator = new polymer.vulcaSimple()
            creator.nbOfChains = this.nbOfChains;
            creator.m=this.m;
            creator.n=this.n;

            creator.grilleS = this.grilleS;
            creator.C_unitaire=this.C_unitaire;
            creator.C_double = this.C_double;
            creator.S = this.S;
            creator.verticesNon = this.verticesNon;


            let mamesh = creator.go()




            let verticesViewerS = new visu3d.VerticesViewer(this.grilleS, this.mathisFrame.scene);
            verticesViewerS.color = new mathis.Color(mathis.Color.names.lightyellow);
            verticesViewerS.radiusAbsolute = 0.3;
            verticesViewerS.go();

            let verticesViewerC = new visu3d.VerticesViewer(this.C_unitaire, this.mathisFrame.scene);
            verticesViewerC.color = new mathis.Color(mathis.Color.names.darkviolet);
            verticesViewerC.radiusAbsolute = 0.7;
            verticesViewerC.go();

            let verticesViewerCS = new visu3d.VerticesViewer(this.C_double, this.mathisFrame.scene);
            verticesViewerCS.color = new mathis.Color(mathis.Color.names.red);
            verticesViewerCS.radiusAbsolute = 0.9;
            verticesViewerCS.go();


            let verticesViewerSS = new visu3d.VerticesViewer(this.S, this.mathisFrame.scene);
            verticesViewerSS.color = new mathis.Color(mathis.Color.names.yellow);
            verticesViewerSS.radiusAbsolute = 0.9;
            verticesViewerSS.go();


            let verticesViewerNon = new visu3d.VerticesViewer(this.verticesNon, this.mathisFrame.scene);
            //verticesViewerNon.go();



            let linkViewer = new visu3d.LinksViewer(mamesh, this.mathisFrame.scene)
            linkViewer.go()
        }
    }
}
