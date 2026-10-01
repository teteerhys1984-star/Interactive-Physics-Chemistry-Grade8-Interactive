import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { BohrExperiment, IsotopeExperiment, OctetExperiment, RutherfordExperiment, ThomsonExperiment } from './App';

describe('Lesson 1 scientific simulations', () => {
  it('Thomson changes the beam path when field direction changes', async () => {
    const user = userEvent.setup(); render(<ThomsonExperiment />);
    const beam = () => document.querySelector('.electron-beam')?.getAttribute('d');
    const before = beam();
    await user.selectOptions(screen.getByLabelText('اتجاه المجال'), 'إلى الأعلى');
    expect(beam()).not.toBe(before);
    expect(screen.getByText(/تنحرف الحزمة إلى الأعلى/)).toBeInTheDocument();
    expect(document.querySelector('.beam-particle animateMotion')).toBeInTheDocument();
  });
  it('Rutherford changes observed counts after launching particles', async () => {
    const user = userEvent.setup(); render(<RutherfordExperiment />);
    expect(screen.getByText('عدد التشغيلات: 0')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'إطلاق جسيمات ألفا' }));
    expect(screen.getByText('عدد التشغيلات: 1')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(document.querySelectorAll('.flying-alpha animateMotion').length).toBe(12);
  });
  it('Bohr changes the rendered atom and distribution when element changes', async () => {
    const user = userEvent.setup(); render(<BohrExperiment />);
    expect(screen.getByText('2 – 8 – 1')).toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText('العنصر'), 'Cl');
    expect(screen.getByText('2 – 8 – 7')).toBeInTheDocument();
    expect(screen.getAllByText('17').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('.electron')).toHaveLength(17);
  });
  it('Octet changes valence dots and ion state through a real action', async () => {
    const user = userEvent.setup(); render(<OctetExperiment />);
    await user.click(screen.getByRole('button', { name: 'فقد إلكترونات' }));
    expect(screen.getByText((_, element) => element?.textContent === 'Na+1 · فقدت 1 إلكترون')).toBeInTheDocument();
    expect(screen.getByText('إلكترونات التكافؤ: 0')).toBeInTheDocument();
  });
  it('Isotopes preserve proton count while changing neutrons and mass', async () => {
    const user = userEvent.setup(); render(<IsotopeExperiment />);
    await user.selectOptions(screen.getByLabelText('النظير'), 'تريتيوم');
    expect(screen.getByText('العدد الكتلي')).toBeInTheDocument();
    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
    expect(screen.getByText('النيوترونات')).toBeInTheDocument();
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);
    expect(screen.getByText('البروتونات')).toBeInTheDocument();
  });
});
