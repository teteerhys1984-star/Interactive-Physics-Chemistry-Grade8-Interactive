import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChemicalFormula, IonNotation, LewisNotation, MathInline, NuclearNotation } from './science';

describe('scientific rendering contracts', () => {
  it('keeps nuclear fields separate and isolated LTR', () => {
    const { container } = render(<NuclearNotation symbol="Cl" atomicNumber={17} massNumber={35} charge="−" />);
    const root = container.querySelector('.nuclear-notation')!;
    expect(root).toHaveAttribute('dir', 'ltr');
    expect(root.querySelector('.mass-number')).toHaveTextContent('35');
    expect(root.querySelector('.atomic-number')).toHaveTextContent('17');
    expect(root.querySelector('.element-symbol')).toHaveTextContent('Cl');
    expect(root.querySelector('.ion-charge')).toHaveTextContent('−');
    expect(root.querySelector('.mass-number')?.textContent).not.toContain('17');
    expect(root.querySelector('.atomic-number')?.textContent).not.toContain('Cl');
  });
  it('renders atomic-only without a mass placeholder or flat 7N token', () => {
    const { container } = render(<NuclearNotation symbol="N" atomicNumber={7} />);
    expect(container.querySelector('.mass-number')).toBeNull();
    expect(container.querySelector('.nuclear-numbers')).toHaveClass('atomic-only');
    expect(container.querySelector('.element-symbol')).toHaveTextContent('N');
    expect(container.querySelector('.atomic-number')).toHaveTextContent('7');
    expect(container.querySelector('.nuclear-notation')?.textContent).toBe('7N');
  });
  it('keeps adjacent nuclei as independent bounding boxes', () => {
    const { container } = render(<div><NuclearNotation symbol="H" atomicNumber={1}/><NuclearNotation symbol="O" atomicNumber={8}/></div>);
    expect(container.querySelectorAll('.nuclear-notation')).toHaveLength(2);
    expect(container.querySelectorAll('.atomic-number')).toHaveLength(2);
  });
  it('uses semantic subscripts for formula and separate ion charge', () => {
    render(<><ChemicalFormula formula="CaCO3"/><IonNotation species="SO4" charge="2−"/></>);
    expect(screen.getByLabelText('CaCO3').querySelector('sub')).toHaveTextContent('3');
    const ion = screen.getByLabelText('SO42−');
    expect(ion.querySelector('sub')).toHaveTextContent('4');
    expect(ion.querySelector('.ion-charge')).toHaveTextContent('2−');
  });
  it('renders Lewis valence electrons as independent directional DOM nodes', () => {
    const { container } = render(<LewisNotation symbol="O" atomicNumber={8} />);
    expect(container.querySelector('.lewis-notation')).toHaveAttribute('dir', 'ltr');
    expect(container.querySelectorAll('.lewis-electron')).toHaveLength(6);
    expect(container.querySelector('.top')?.querySelectorAll('.lewis-electron')).toHaveLength(2);
    expect(container.querySelector('.right')?.querySelectorAll('.lewis-electron')).toHaveLength(2);
    expect(container.querySelector('.bottom')?.querySelectorAll('.lewis-electron')).toHaveLength(1);
    expect(container.querySelector('.left')?.querySelectorAll('.lewis-electron')).toHaveLength(1);
  });
  it('renders mathematics through KaTeX in isolated LTR markup', () => {
    const { container } = render(<MathInline tex="v = \\frac{d}{t}" />);
    expect(container.querySelector('.math-render')).toHaveAttribute('dir', 'ltr');
    expect(container.querySelector('.katex')).toBeInTheDocument();
    expect(container.querySelector('.katex-html')).toBeInTheDocument();
    expect(container.textContent).toContain('d');
    expect(container.textContent).toContain('t');
  });
});
