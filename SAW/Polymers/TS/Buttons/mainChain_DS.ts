module mathis {
    export module polymer {
        export function start_Chain_DS() {
            {
                let mathisFrame = new MathisFrame("pieceOfCodeChain_Init");
                let aPieceOfCode = new ChainPresentation_Init(mathisFrame);
                let binder = new appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime()
            }

            {
                let mathisFrame = new MathisFrame("pieceOfCodeChain_DS");
                let aPieceOfCode = new ChainPresentation_S(mathisFrame);
                let binder = new appli.Binder(aPieceOfCode, null, mathisFrame);
                binder.go();
                aPieceOfCode.goForTheFirstTime()
            }


        }
    }
}