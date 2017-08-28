/**
 * Created by vigon on 17/07/2017.
 */



module mathis{
    import GrabberCamera = mathis.macamera.GrabberCamera;

    export class ChainPresentation_Init implements appli.PieceOfCode {
        NAME = "ChainPresentation_Init"
        TITLE = ""

        chainSize=10
        $$$chainSize=[5,10,20,50]

        constructor(private mathisFrame: MathisFrame) {
        }

        goForTheFirstTime() {
            this.mathisFrame.clearScene()
            this.mathisFrame.addDefaultCamera()
            this.mathisFrame.addDefaultLight()
            let camera:GrabberCamera= this.mathisFrame.getGrabberCamera()
            camera.changePosition(new XYZ(0,0,-30));

            this.go()
        }


        go() {

            this.mathisFrame.clearScene(false, false)

            let creator = new polymer.SAW_Init()
            creator.chainSize=this.chainSize
            let mamesh = creator.go()

            let verticeViewer=new visu3d.VerticesViewer(mamesh,this.mathisFrame.scene)
            verticeViewer.radiusAbsolute=0.1
            verticeViewer.go()

            let linkViewer=new visu3d.LinksViewer(mamesh,this.mathisFrame.scene)
            linkViewer.go()
        }
    }
}