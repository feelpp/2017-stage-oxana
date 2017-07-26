module mathis {
    export module polymer {
        export function start_Chain_Simple() {
            {
                let mathisFrame = new MathisFrame();
                let aPieceOfCode = new ChainPresentation(mathisFrame);
                let binder = new appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime()
            }
        }


        export function start_Chain_Biased() {
            {
                let mathisFrame = new MathisFrame();
                let aPieceOfCode = new ChainPresentation_B(mathisFrame);
                let binder = new appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime()
            }
        }

    }
}
