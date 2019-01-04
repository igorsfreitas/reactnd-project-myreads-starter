import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// Material Components
import { Tooltip, Icon, FormControl, FormHelperText, Input, InputAdornment, InputLabel } from '@material-ui/core';
// Mocks
import proxy from 'mocks/proxyMock';
// Component
import Text from './index';

describe('Text Component', () => {
  let wrapper, instance;

  beforeEach(() => {
    wrapper = shallow(<Text />);
    instance = wrapper.instance();
  });

  it('Should render the component', () => {
    expect(instance).toBeInstanceOf(Text);
  });

  describe('Methods tests', () => {
    it('Should be return formated object', () => {
      wrapper.setProps({ id: 'ident' });
      expect(instance.formatObject(proxy)).toEqual({
        name: 'ident',
        value: 'mockValue',
        isValid: true,
        isEmpty: false
      });
    });

    it('Should be return true if not pass validator and value is not `` ', () => {
      expect(instance.isValidInput('any')).toBeTruthy();
    });

    it('Should be return true if check on `validator: func` props ', () => {
      wrapper.setProps({ validator: item => item === 'any' });
      expect(instance.isValidInput('any')).toBeTruthy();
    });

    it('Should be set the `input` state with correct values', () => {
      wrapper.setProps({ id: 'ident' });
      instance.handlerInputChange(proxy);
      expect(wrapper.state('input')).toEqual({
        name: 'ident',
        value: 'mockValue',
        isValid: true,
        isEmpty: false
      });
    });

    it('Should be called the `onChange: func` props', () => {
      const spy = sinon.spy();
      wrapper.setProps({
        id: 'ident',
        onChange: spy
      });
      instance.handlerInputChange(proxy);
      expect(spy.calledOnce).toBeTruthy();
    });
  });

  describe('Props tests', () => {
    it('Should rendered InputAdornment if set `description: string` props', () => {
      expect(wrapper.find(InputAdornment)).toHaveLength(0);
      wrapper.setProps({ description: 'someDescription' });
      setTimeout(() => {
        expect(wrapper.find(InputAdornment)).toHaveLength(1);
      }, 200);
    });

    it('Should be call `onChange: func` props on mount the component', () => {
      const spy = sinon.spy();
      wrapper.setProps({
        value: 'ident',
        onChange: spy
      });
      expect(spy.calledOnce).toBeTruthy();
    });

  });
});
