import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('course and lesson navigation', () => {
  it('exposes Teacher Area from CourseHome and authenticates it', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /مساحة المعلم/ }));
    await user.click(screen.getByRole('button', { name: /فتح منطقة المعلم/ }));
    await user.type(screen.getByLabelText('كلمة المرور'), 'somer173');
    await user.click(screen.getByRole('button', { name: 'دخول' }));
    expect(screen.getByRole('button', { name: 'الحلول التفصيلية للكتاب' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'الاختبار الشامل' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'الحلول التفصيلية للاختبار' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'الاختبار الشامل' }));
    expect(screen.getByText('الاختبار الشامل للدرس')).toBeInTheDocument();
  });
  it('takes the learner from the unified course home to Chemistry Lesson 1', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /الكيمياء/ }));
    expect(screen.getByRole('heading', { name: 'الكيمياء' })).toBeInTheDocument();
    await user.click(screen.getByText('الكيمياء البنيوية'));
    expect(screen.getByRole('heading', { name: 'الكيمياء البنيوية' })).toBeInTheDocument();
    await user.click(screen.getByText('الكيمياء البنيوية'));
    expect(screen.getAllByRole('heading', { name: 'الذرة والعنصر' }).length).toBeGreaterThan(0);
    expect(screen.getAllByText('الوحدة الأولى: الكيمياء البنيوية').length).toBeGreaterThan(0);
  });

  it('keeps Teacher Area out of student content until explicitly opened and authenticated', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /الكيمياء/ }));
    await user.click(screen.getByText('الكيمياء البنيوية'));
    await user.click(screen.getByText('الكيمياء البنيوية'));
    expect(screen.queryByText('ملاحظات تدريسية')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /مساحة المعلم/ }));
    await user.click(screen.getByRole('button', { name: /فتح منطقة المعلم/ }));
    await user.type(screen.getByLabelText('كلمة المرور'), 'somer173');
    await user.click(screen.getByRole('button', { name: 'دخول' }));
    expect(screen.getByRole('button', { name: 'الحلول التفصيلية للكتاب' })).toBeInTheDocument();
    expect(screen.queryByText('ملاحظات تدريسية')).not.toBeInTheDocument();
  });
});
