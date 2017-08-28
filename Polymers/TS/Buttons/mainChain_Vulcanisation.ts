module mathis {
    export module polymer {
        export function start_Chain_V() {
            {
                let mathisFrame = new MathisFrame("pieceOfCodeChain_V");
                let aPieceOfCode = new ChainPresentation_V(mathisFrame);
                let binder = new appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime()
            }

        }
    }
}

