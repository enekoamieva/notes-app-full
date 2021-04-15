import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';

import Note from './Note';

test('renderizado de contenido', () => {

    const note = {
        content: 'this is a test',
        important: true
    }

    const component = render(
        <Note
            note={note}
        />
    )

    component.getByText('this is a test');
    //expect(component.container).toHaveTextContent(note.content);


});


test('clickar sobre el boton para hacer llamadas al evento', () => {

    const note = {
        content: 'this is a test',
        important: true
    }

    const mockHandler = jest.fn();

    const component = render(
        <Note
            note={note}
            handleNoteImportant={mockHandler}
        />
    );

    const button = component.getByText('No importante');

    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
});