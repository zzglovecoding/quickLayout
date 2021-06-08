import React from 'react';
import { shallow } from 'enzyme';
import Header from 'Components/header/Header';

test('Header test', () => {
    const header = shallow(<Header />);
});