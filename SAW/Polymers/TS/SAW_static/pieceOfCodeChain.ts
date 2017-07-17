/**
 * Created by vigon on 17/07/2017.
 */



module mathis{


    export class ChainPresentation implements appli.PieceOfCode {
        NAME = "VariableReseau"
        TITLE = ""

        chainSize=10
        $$$chainSize=[5,10,20,50]

        constructor(private mathisFrame: MathisFrame) {
        }

        goForTheFirstTime() {
            this.mathisFrame.clearScene()
            this.mathisFrame.addDefaultCamera()
            this.mathisFrame.addDefaultLight()

            this.go()
        }

        go() {

            this.mathisFrame.clearScene(false, false)

            let creator = new polymer.SAW_Creator_static()
            creator.chainSize=this.chainSize
            let mamesh = creator.go()
            cc(mamesh.toString())

            let verticeViewer=new visu3d.VerticesViewer(mamesh,this.mathisFrame.scene)
            verticeViewer.radiusAbsolute=0.1
            verticeViewer.go()

            let linkViewer=new visu3d.LinksViewer(mamesh,this.mathisFrame.scene)
            linkViewer.go()


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

        }

    }

}