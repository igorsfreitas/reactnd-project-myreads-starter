import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

// Component
import Email from './index';

describe('Email Component', () => {
  let wrapper, instance;
  const input = { target: { value: 'string' } };

  beforeEach(() => {
    wrapper = shallow(<Email onChange={() => {}} />);
    instance = wrapper.instance();
  });

  it('Should render the component', () => {
    expect(instance).toBeInstanceOf(Email);
  });

  it('Should set value input', () => {
    instance.handler(input);
    expect(wrapper.state('input')).toEqual({
      name: 'email',
      value: 'string',
      isEmpty: false,
      isValid: false
    });
  });

  it('Should be call the `onChange` prop method', () => {
    const spy = sinon.spy();
    wrapper.setProps({ onChange: spy });
    instance.handler(input);
    expect(spy.calledOnce).toBeTruthy();
  });

  it('Should return the object', () => {
    expect(instance.formatData('string')).toEqual({
      name: 'email',
      value: 'string',
      isEmpty: false,
      isValid: false
    });
  });

  it('Should be show on warn when not set a `onChange: props`', () => {
    wrapper = shallow(<Email />);
    expect(global.console.warn).toBeCalledWith('The FormFieldEmail needs `onChange()` prop');
  });

  it('Should set the input value with `value: string` props', () => {
    wrapper.setProps({ value: 'something' });
    instance.componentDidMount();
    expect(wrapper.state('input').value).toEqual('something');
  });
});
