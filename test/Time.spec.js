import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';

import Time from '../src/components/time/Time.jsx';

describe('Time', () => {
  it('should mount correctly', () => {
    const component = mount(<Time />);

    expect(component.find('.time')).to.have.length(1);
  });

  it('should display the correct time for a fixed date', () => {
    const date = moment().set({ year: 2016, month: 9, day: 10 });
    const component = mount(<Time currentTime={ date } />);

    expect(component.text()).to.contain('October 19, 2016');
  });
});
