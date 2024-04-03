import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TaskModal from '../TaskModal';

describe('TaskModal', () => {

  it('should call onSave function when Save button is clicked', () => {
    // Mock functions
    const setTask = jest.fn();
    const onSave = jest.fn();
    const onCancel = jest.fn();
    
    const { getByText } = render(
      <TaskModal
        task={{ text: '', description: '', deadline: '' }}
        setTask={setTask}
        onSave={onSave}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByText('Save'));

    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel function when the close button is clicked', () => {
    // Mock functions
    const setTask = jest.fn();
    const onSave = jest.fn();
    const onCancel = jest.fn();
    const { getByText } = render(
      <TaskModal
        task={{ text: '', description: '', deadline: '' }}
        setTask={setTask}
        onSave={onSave}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByText('×'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
