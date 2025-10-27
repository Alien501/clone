import { useEffect, useState, useRef } from "react"

interface BoxHoverProps {
    row?: number,
    column?: number,
    symbol?: string,
    numberOfTrail?: number
}

export default function BoxHover({ row = 5, column = 5, symbol = '+', numberOfTrail = 10 }: BoxHoverProps) {
    const [symbols, setSymbols] = useState<string[]>([]);
    const [activeIdx, setActiveIdx] = useState<number[]>([]);
    const debounceTimerRef = useRef<number | null>(null);
    const clearingTimerRef = useRef<number | null>(null);

    const addToActiveIndex = (id: number) => {
        if(id !== undefined && id !== null) {
            setActiveIdx(prev => {
                const filtered = prev.filter(idx => idx !== id);
                if(filtered.length < numberOfTrail) {
                    return [...filtered, id];
                } else {
                    return [...filtered.slice(1), id];
                }
            });
        }
    }

    const startDebounceClearing = () => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        if (clearingTimerRef.current) {
            clearTimeout(clearingTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            clearActiveIndexOneByOne();
        }, 800);
    }

    const clearActiveIndexOneByOne = () => {
        setActiveIdx(prev => {
            if (prev.length === 0) return prev;
            
            const newIdx = prev.slice(1);
            
            if (newIdx.length > 0) {
                clearingTimerRef.current = window.setTimeout(() => {
                    clearActiveIndexOneByOne();
                }, 100);
            }
            
            return newIdx;
        });
    }

    const onHover = (e: React.MouseEvent | React.TouchEvent) => {
        let target: HTMLElement | null = null;
        
        if ('touches' in e && e.touches.length > 0) {
            // Touch event
            target = e.touches[0].target as HTMLElement;
        } else {
            // Mouse event
            target = e.target as HTMLElement;
        }
        
        const spanElement = target?.closest('span');
        if (spanElement) {
            const classList = Array.from(spanElement.classList);
            const idxClass = classList.find(cls => !cls.includes('active'));
            const idx = parseInt(idxClass || '');
            
            if (!isNaN(idx)) {
                addToActiveIndex(idx);
                startDebounceClearing();
            }
        }
    }

    useEffect(() => {
        const tempSymbols: string[] = [];
        for (let i = 0; i < row * column; i++) {
            tempSymbols.push(symbol);
        }

        setSymbols(tempSymbols);
    }, [symbol, row, column]);

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
            if (clearingTimerRef.current) {
                clearTimeout(clearingTimerRef.current);
            }
        };
    }, []);

    return(
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${column}, 20px)`,
            gridTemplateRows: `repeat(${row}, 20px)`,
            alignItems: 'center',
            gap: .5,
            touchAction: 'none'
        }} className="container"
            onMouseMove={onHover}
            onTouchMove={onHover}
            onTouchStart={onHover}
        >
            {
                symbols.map((symbol, idx) => <div key={idx} className={`symbol-container symbol-${idx}`}>
                    <span className={`${idx} ${activeIdx.includes(idx)? 'active': ''}`}>{symbol}</span>
                </div>)
            }
        </div>
    )
}