/**
 * Created by vigon on 17/07/2017.
 */



/**
 * Created by vigon on 09/05/2017.
 */


module mathis {

    export module polymer {

        export function start_Chain() {

            {

                let mathisFrame = new MathisFrame()

                let aPieceOfCode = new ChainPresentation(mathisFrame)
                let binder = new appli.Binder(aPieceOfCode, null, mathisFrame)
                binder.go()
                aPieceOfCode.goForTheFirstTime()
            }


        }
    }

}
