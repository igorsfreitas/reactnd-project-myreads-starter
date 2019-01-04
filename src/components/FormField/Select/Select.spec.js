import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// Material Imports
import { InputLabel, FormHelperText, MenuItem } from '@material-ui/core';
// Component
import Select from './index';
// Mocks
import proxy from 'mocks/proxyMock';

describe('Select Component', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<Select />);
    instance = wrapper.instance();
  });

  it('Should render the component', () => {
    expect(instance).toBeInstanceOf(Select);
  });

  it('Should be set the `selectedOptions` state with the proxy value', () => {
    instance.handleChange(proxy);
    setTimeout(() => {
      expect(wrapper.state('selectedOptions')).toEqual('mockValue');
    }, 200);
  });

  it('Should call the `onChange: func` prop', () => {
    const spy = sinon.spy();
    wrapper.setProps({ onChange: spy });
    instance.handleChange(proxy);
    expect(spy.calledOnce).toBeTruthy();
  });

  it('Should set selectedOption state is set the `defaultSelectedValue: any` props', () => {
    wrapper = shallow(<Select defaultSelectedValue={15} />);
    expect(wrapper.state('selectedOption')).toEqual(15);
  });

  describe('- render elements -', () => {
    it('Should not render `InputLabel` component if not received `label: string` props', () => {
      wrapper.setProps({ label: '' });
      expect(wrapper.find(InputLabel)).toHaveLength(0);
    });

    it('Should render `InputLabel` component if received `label: string` props', () => {
      wrapper.setProps({ label: 'someLabel' });
      expect(wrapper.find(InputLabel)).toHaveLength(1);
    });

    it('Should not render `FormHelperText` component if not received `helpText: string` props', () => {
      wrapper.setProps({ helpText: '' });
      expect(wrapper.find(FormHelperText)).toHaveLength(0);
    });

    it('Should render `FormHelperText` component if received `helpText: string` props', () => {
      wrapper.setProps({ helpText: 'someHelper' });
      expect(wrapper.find(FormHelperText)).toHaveLength(1);
    });

    it('Should set the the `raised-select` className if pass `variant: string` prop equal to `raised`', () => {
      wrapper.setProps({ variant: 'raised' });
      expect(wrapper.find('.raised-select')).toHaveLength(1);
    });

    it('Should render `MenuItem`s to equal length of `optionsList: array` prop', () => {
      const array = [
        { value: 0, label: 'anyLabelZero' },
        { value: 1, label: 'anyLabelOne' },
        { value: 2, label: 'anyLabelTwo' }
      ];
      wrapper.setProps({ optionList: array });
      expect(wrapper.find(MenuItem)).toHaveLength(array.length);
    });

    it('Should set de selectOption state if pass a defaultSelectedValue on props in DidUdpdate', () => {
      wrapper.setProps({ defaultSelectedValue: 'something' });
      expect(wrapper.state('selectedOption')).toEqual('something');
    });

    it('Should call the `onChange: func` props when mount the component with  `defaultSelectedValue: string` props', () => {
      const spy = sinon.spy();
      wrapper.setProps({
        onChange: spy,
        defaultSelectedValue: 'something'
      });
      expect(spy.calledOnce).toBeTruthy();
    });

  });
});
