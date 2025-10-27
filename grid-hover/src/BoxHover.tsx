import { useEffect, useState } from "react"

interface BoxHoverProps {
    row: number,
    column: number,
    symbol: string,
    numberOfTrail?: number
}

export default function BoxHover({ row, column, symbol, numberOfTrail = 10 }: BoxHoverProps) {
    const [symbols, setSymbols] = useState<string[]>([]);
    const [activeIdx, setActiveIdx] = useState<number[]>([]);

    const addToActiveIndex = (id: number) => {
        if(id || id == 0) {
            if(activeIdx.length >= numberOfTrail && !activeIdx.includes(id)) {
                const tempIdx = activeIdx.slice(1, numberOfTrail);
                setActiveIdx(prev => [...tempIdx, id]);
            }
            else {
                if(!activeIdx.includes(id))
                setActiveIdx(prev => [...prev, id]);
            }
        }
    }

    const onHover = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        const hoveredElement = document.elementFromPoint(x, y);

        addToActiveIndex(parseInt(hoveredElement?.classList))
    }

    useEffect(() => {
        const tempSymbols: string[] = [];
        for (let i = 0; i < row * column; i++) {
            tempSymbols.push(symbol);
        }

        setSymbols(tempSymbols);
    }, [symbol, row, column]);

    return(
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${column}, 20px)`,
            gridTemplateRows: `repeat(${row}, 20px)`,
            alignItems: 'center',
            gap: 10
        }} className="container"
            onMouseMove={onHover}
        >
            {
                symbols.map((symbol, idx) => <div key={idx} className={`symbol-container symbol-${idx}`}>
                    <span className={`${idx} ${activeIdx.includes(parseInt(idx))? 'active': ''}`}>{symbol}</span>
                </div>)
            }
        </div>
    )
}