module mathis {
    export module polymer {
        export function start_Chain_Static() {
            {
                let mathisFrame = new MathisFrame("pieceOfCodeChain_SB");
                let aPieceOfCode = new ChainPresentation_A(mathisFrame);
                let binder = new appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime()
            }

            {
                let mathisFrame = new MathisFrame("pieceOfCodeChain_SS");
                let aPieceOfCode = new ChainPresentation_B(mathisFrame);
                let binder = new appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime()
            }

        }
    }
}

