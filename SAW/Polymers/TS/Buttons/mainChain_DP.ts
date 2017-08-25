module mathis {
    export module polymer {
        export function start_Chain_DP() {
            {
                let mathisFrame = new MathisFrame("pieceOfCodeChain_Init");
                let aPieceOfCode = new ChainPresentation_Init(mathisFrame);
                let binder = new appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime()
            }

            {
                let mathisFrame = new MathisFrame("pieceOfCodeChain_DP");
                let aPieceOfCode = new ChainPresentation_P(mathisFrame);
                let binder = new appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime()
            }
        }
    }
}
