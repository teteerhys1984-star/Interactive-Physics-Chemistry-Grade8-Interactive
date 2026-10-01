import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function MathInline({ tex, label }: { tex: string; label?: string }) {
  const html = useMemo(() => katex.renderToString(tex, { throwOnError: false, displayMode: false }), [tex]);
  return <span className="math-render" dir="ltr" aria-label={label ?? tex} dangerouslySetInnerHTML={{ __html: html }} />;
}
export function MathBlock({ tex, label }: { tex: string; label?: string }) {
  const html = useMemo(() => katex.renderToString(tex, { throwOnError: false, displayMode: true }), [tex]);
  return <div className="math-block" dir="ltr" aria-label={label ?? tex} dangerouslySetInnerHTML={{ __html: html }} />;
}

type NuclearProps = { symbol: string; atomicNumber: number; massNumber?: number; charge?: string; className?: string };
export function NuclearNotation({ symbol, atomicNumber, massNumber, charge, className = '' }: NuclearProps) {
  return <span className={`nuclear-notation ${className}`} dir="ltr" aria-label={`${massNumber ? `${massNumber} ` : ''}${atomicNumber} ${symbol}${charge ?? ''}`}>
    <span className={`nuclear-numbers ${massNumber === undefined ? 'atomic-only' : ''}`} aria-hidden="true">
      {massNumber !== undefined && <span className="mass-number">{massNumber}</span>}
      <span className="atomic-number">{atomicNumber}</span>
    </span>
    <span className="element-symbol">{symbol}</span>
    {charge && <span className="ion-charge">{charge}</span>}
  </span>;
}

export function ChemicalFormula({ formula }: { formula: string }) {
  const tokens = useMemo(() => formula.match(/[A-Z][a-z]?|\d+|[^A-Za-z\d]/g) ?? [], [formula]);
  return <span className="chemical-formula" dir="ltr" aria-label={formula}>{tokens.map((token, index) => /\d+/.test(token) ? <sub key={index}>{token}</sub> : <span key={index}>{token}</span>)}</span>;
}
export function IonNotation({ species, charge }: { species: string; charge: string }) {
  const tokens = useMemo(() => species.match(/[A-Z][a-z]?|\d+|[^A-Za-z\d]/g) ?? [], [species]);
  return <span className="ion-notation" dir="ltr" aria-label={`${species}${charge}`}>{tokens.map((token, index) => /\d+/.test(token) ? <sub key={index}>{token}</sub> : <span key={index}>{token}</span>)}<sup className="ion-charge">{charge}</sup></span>;
}
const valenceByAtomicNumber: Record<number, number> = { 1: 1, 2: 2, 6: 4, 7: 5, 8: 6, 9: 7, 11: 1, 12: 2, 13: 3, 17: 7, 19: 1, 20: 2, 35: 7, 47: 1 };
export function LewisNotation({ symbol, atomicNumber, valenceElectrons = valenceByAtomicNumber[atomicNumber] ?? 0 }: { symbol: string; atomicNumber: number; valenceElectrons?: number }) {
  const positions = ['top', 'right', 'bottom', 'left'];
  const electrons = Array.from({ length: valenceElectrons }, (_, index) => ({ index, position: positions[index < 4 ? index : index - 4] }));
  return <span className="lewis-notation" dir="ltr" aria-label={`تمثيل لويس للعنصر ${symbol}، ${valenceElectrons} إلكترونات تكافؤ`}>
    {positions.map(position => <span className={`lewis-side ${position}`} key={position}>{electrons.filter(electron => electron.position === position).map(electron => <span className="lewis-electron" key={electron.index} aria-hidden="true" />)}</span>)}
    <span className="lewis-symbol">{symbol}</span>
  </span>;
}
export function ChargeValue({ sign, magnitude }: { sign: '+' | '−' | '-'; magnitude?: number }) { return <span className="charge-value" dir="ltr" aria-label={`${sign}${magnitude ?? ''}`}>{sign}{magnitude ?? ''}</span>; }
export function Unit({ children }: { children: string }) { return <span className="unit" dir="ltr">{children}</span>; }
export function ScientificValue({ value, unit }: { value: string | number; unit?: string }) { return <span className="scientific-value" dir="ltr"><span>{value}</span>{unit && <Unit>{unit}</Unit>}</span>; }
