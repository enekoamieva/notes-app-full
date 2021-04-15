import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';

import Toggable from './Toggable';

describe('<Toggable />', () => {

    let component;

    beforeEach(() => {
        component = render(
            <Toggable buttonLabel="show">
                <div className="test">
                    TestDivContent
                </div>
            </Toggable>
        );
    });

    test('renderizar sus children', () => {
        expect(component.container.querySelector('.test').toBeDefined);
        //component.getByText('TestDivContent');
    });

    test('renderizar sus children', () => {
        const el = component.getByText('TestDivContent');
        expect(el.parentNode).toHaveStyle('display: none');
    });

});