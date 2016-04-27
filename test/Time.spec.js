import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Time from '../src/components/time/Time.jsx';

describe('Time', () => {
  it('should mount correctly', () => {
    const component = mount(<Time />);

    expect(component.find('.time')).to.have.length(1);
  });
});
