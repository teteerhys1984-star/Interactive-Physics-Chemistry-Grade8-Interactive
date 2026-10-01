import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { BookChoice, FinalTest, IsotopeExperiment } from './App';

describe('question interaction standards', () => {
  it('turns a book multiple-choice question into a selectable control without feedback', async () => {
    const user = userEvent.setup();
    render(<BookChoice prompt="اختر" options={['أ', 'ب', 'ج', 'د']} />);
    const option = screen.getByRole('button', { name: 'ب' });
    await user.click(option);
    expect(option).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByText('صحيح', { exact: true })).not.toBeInTheDocument();
    expect(screen.queryByText('خطأ', { exact: true })).not.toBeInTheDocument();
  });
  it('exposes a varied final test with non-MCQ controls', () => {
    render(<FinalTest />);
    expect(screen.getByText(/اختبار متنوع/)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBeGreaterThan(3);
    expect(screen.getByRole('combobox', { name: 'ترتيب السؤال 4' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'إجابة السؤال 5' })).toBeInTheDocument();
  });
});


it('keeps the isotope scientific table readable and marks the active row', async () => {
  render(<IsotopeExperiment />);
  const table = screen.getByTestId('isotope-table');
  expect(table).toHaveClass('scientific-table');
  expect(table.querySelector('.active-row')).toBeTruthy();
  await userEvent.selectOptions(screen.getByLabelText('النظير'), 'deuterium');
  expect(table.querySelector('.active-row')).toHaveTextContent('ديوتيريوم');
});

it('keeps scientific table cells explicitly colored instead of inheriting', () => {
  render(<IsotopeExperiment />);
  const table = screen.getByTestId('isotope-table');
  for (const cell of Array.from(table.querySelectorAll('th, td'))) {
    const styledCell = cell as HTMLElement;
    const computed = getComputedStyle(styledCell);
    expect(computed.color).not.toBe(computed.backgroundColor);
    expect(computed.color).not.toBe('');
    expect(computed.backgroundColor).not.toBe('');
  }
});
